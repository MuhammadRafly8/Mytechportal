// lib/axios.ts
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/lib/api';

// Buat instance axios dengan baseURL
// Catatan: Jangan set 'Content-Type' global ke 'application/json'
// agar request dengan FormData (upload file) tetap terbaca oleh multer.
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor untuk menambahkan token
apiClient.interceptors.request.use(
  (config) => {
    // Cek di browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Jika payload adalah FormData, biarkan browser yang set boundary.
    // Hapus Content-Type agar tidak mengoverride multipart boundary.
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      if (config.headers && 'Content-Type' in config.headers) {
        delete (config.headers as any)['Content-Type'];
      }
    } else {
      // Untuk payload non-FormData, set JSON secara eksplisit jika belum ada
      if (config.headers && !config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;