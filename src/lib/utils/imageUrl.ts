// lib/utils/imageUrl.ts
export const getImageUrl = (filename?: string | null): string | null => {
  if (!filename) return null;
  // Gunakan URL khusus untuk uploads
  return `${process.env.NEXT_PUBLIC_UPLOADS_URL}/${filename}`;
};