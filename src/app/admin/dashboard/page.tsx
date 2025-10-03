// app/admin/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useArticles, useCreateArticle, useUpdateArticle, useDeleteArticle } from '@/hooks/api/useArticles';
import { useCategories } from '@/hooks/api/useCategories';
import NewsTable from './NewsTable';
import NewsForm from './NewsForm';
import ConfirmDialog from './ConfirmDialog';
import Card from '@/components/Card';
import Title from '@/components/Title';
import Text from '@/components/Text';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  categoryId?: string;
  image?: string; // Tambahkan field image
  authorId: string;
  slug: string;
  publishedAt: string | null;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
}

interface ArticleForm {
  id?: string;
  title: string;
  content: string;
  published: boolean;
  image?: File | null;
  categoryId?: string;
}

export default function DashboardPage() {
  const { data: articlesData, isLoading } = useArticles({ published: undefined }); // Get all articles including unpublished
  const { data: categoriesData } = useCategories();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<ArticleForm | null>(null);
  const [deleteData, setDeleteData] = useState<Article | null>(null);

  // Extract articles from the API response
  const articles = articlesData?.data || [];

  // Handle submit form (create or update)
  const handleSubmit = (data: ArticleForm) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('published', data.published ? 'true' : 'false');
    if (data.categoryId) formData.append('categoryId', data.categoryId);
    if (data.image) formData.append('image', data.image);
    
    if (data.id) {
      updateArticle.mutate({ id: data.id, article: formData }, { 
        onSuccess: () => {
          setFormOpen(false);
          setEditData(null);
        },
        onError: (error) => {
          console.error("Error updating article:", error);
          alert("Gagal memperbarui artikel");
        }
      });
    } else {
      createArticle.mutate(formData, { 
        onSuccess: () => setFormOpen(false),
        onError: (error) => {
          console.error("Error creating article:", error);
          alert("Gagal membuat artikel baru");
        }
      });
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteData) {
      deleteArticle.mutate(deleteData.id, { 
        onSuccess: () => setDeleteData(null),
        onError: (error) => {
          console.error("Error deleting article:", error);
          alert("Gagal menghapus artikel");
        }
      });
    }
  };

  const publishedArticles = articles.filter(a => a.published);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
        <div className="flex justify-end mb-4">
          <Link
            href="/admin/user-management"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition"
          >
            Manajemen User
          </Link>
        </div>
      
      {/* Statistik Card */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <Title>Total Artikel</Title>
          <Text className="mt-2 text-3xl font-bold">{articles.length}</Text>
        </Card>
        <Card>
          <Title>Artikel Publik</Title>
          <Text className="mt-2 text-3xl font-bold">{publishedArticles.length}</Text>
        </Card>
        <Card>
          <Title>Draft</Title>
          <Text className="mt-2 text-3xl font-bold">{articles.filter((a: Article) => !a.published).length}</Text>
        </Card>
        <Card>
          <Title>Average Views</Title>
          <Text className="mt-2 text-3xl font-bold">
            {articles.length ? Math.floor(articles.reduce((sum: number, a: Article) => sum + (a.viewCount || 0), 0) / articles.length) : 0}
          </Text>
        </Card>
      </div>

      {/* Tombol Tambah Berita */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => { 
            setEditData(null); 
            setFormOpen(true); 
          }}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          + Tambah Berita
        </button>
      </div>

      {/* Tabel Berita */}
      <NewsTable
        articles={articles.map((a: Article) => ({
          id: a.id,
          title: a.title,
          published: a.published,
          views: a.viewCount,
          createdAt: a.createdAt,
        }))}
        onEdit={(article) => {
          const full = articles.find((a: Article) => String(a.id) === String(article.id));
          if (!full) return;
          setEditData({
            id: full.id,
            title: full.title,
            content: full.content,
            published: full.published,
            categoryId: full.categoryId,
          });
          setFormOpen(true);
        }}
        onDelete={(article) => {
          const full = articles.find((a: Article) => String(a.id) === String(article.id));
          if (full) setDeleteData(full);
        }}
      />

      {/* Form Tambah/Edit */}
      <NewsForm
        open={formOpen}
        initialData={editData || undefined}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Konfirmasi Hapus */}
      <ConfirmDialog
        open={!!deleteData}
        title="Hapus Berita"
        description={`Yakin ingin menghapus berita "${deleteData?.title}"?`}
        onCancel={() => setDeleteData(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}