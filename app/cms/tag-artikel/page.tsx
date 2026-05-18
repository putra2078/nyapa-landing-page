"use client";

import React, { useState, useEffect, useCallback } from "react";
import apiService, { Tag, Pagination } from "../../service/api";
import { useToast } from "../../components/Toast";
import Modal from "../../components/Modal";

export default function TagManagementPage() {
  const { showToast, ToastComponent } = useToast();
  const [tags, setTags] = useState<Tag[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState("");
  const [tagSlug, setTagSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTags = useCallback(
    async (searchQuery?: string) => {
      setIsLoading(true);
      try {
        const response = await apiService.getTags({
          page,
          limit: 10,
          search: searchQuery !== undefined ? searchQuery : search || undefined,
        });
        setTags(response.data || []);
        setPagination(response.pagination);
      } catch (error) {
        console.error("Error fetching tags:", error);
        showToast("Gagal memuat daftar tag", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [page, search, showToast],
  );

  useEffect(() => {
    // Only fetch automatically on page change
    fetchTags();
  }, [page]); // Removed fetchTags from dependencies to prevent infinite loop/keystroke fetch

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTags(search);
  };

  const openCreateModal = () => {
    setEditingTag(null);
    setTagName("");
    setTagSlug("");
    setIsModalOpen(true);
  };

  const openEditModal = (tag: Tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagSlug(tag.slug);
    setIsModalOpen(true);
  };

  const handleSaveTag = async () => {
    if (!tagName.trim()) {
      showToast("Nama tag tidak boleh kosong", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingTag) {
        await apiService.updateTag(editingTag.id, {
          name: tagName,
          slug: tagSlug || undefined,
        });
        showToast("Tag berhasil diperbarui", "success");
      } else {
        await apiService.createTag({
          name: tagName,
          slug: tagSlug || undefined,
        });
        showToast("Tag berhasil dibuat", "success");
      }
      setIsModalOpen(false);
      fetchTags();
    } catch (error) {
      console.error("Error saving tag:", error);
      interface ApiError {
        response?: {
          data?: {
            message?: string | string[];
          };
        };
        message?: string;
      }
      const err = error as ApiError;
      const msg =
        err.response?.data?.message || err.message || "Gagal menyimpan tag";
      showToast(Array.isArray(msg) ? msg.join(", ") : String(msg), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus tag ini?")) return;

    try {
      await apiService.deleteTag(id);
      showToast("Tag berhasil dihapus", "success");
      fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
      showToast("Gagal menghapus tag", "error");
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">Tag Management</h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Tag
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Cari tag..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 transition-colors"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
            <tr>
              <th className="px-6 py-3">Nama Tag</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Dibuat Pada</th>
              <th className="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex justify-center items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memuat data...
                  </div>
                </td>
              </tr>
            ) : tags.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  Tidak ada tag ditemukan.
                </td>
              </tr>
            ) : (
              tags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {tag.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tag.slug}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(tag.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(tag)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {pagination && pagination.total_page > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Showing page {pagination.page} of {pagination.total_page} (
              {pagination.total} total)
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-600 disabled:opacity-50 text-xs font-medium"
              >
                Previous
              </button>
              <button
                disabled={page === pagination.total_page}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-600 disabled:opacity-50 text-xs font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTag ? "Edit Tag" : "Tambah Tag Baru"}
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Tag <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              placeholder="Contoh: Teknologi"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Slug (Opsional)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 bg-white"
              placeholder="teknologi"
              value={tagSlug}
              onChange={(e) => setTagSlug(e.target.value)}
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Biarkan kosong untuk generate otomatis dari nama.
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSaveTag}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </Modal>

      <ToastComponent />
    </div>
  );
}
