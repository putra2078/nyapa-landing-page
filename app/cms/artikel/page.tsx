"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import apiService, { Article } from "../../service/api";
import { useToast } from "../../components/Toast";
import Modal from "../../components/Modal";

export default function ArticleCMSPage() {
    const { showToast, ToastComponent } = useToast();
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await apiService.getArticles();
                setArticles(data);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const handleDeleteClick = (id: string) => {
        setSelectedArticleId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedArticleId) return;

        setIsDeleting(true);
        try {
            await apiService.deleteArticle(selectedArticleId);
            setArticles((prev) => prev.filter((a) => a.id !== selectedArticleId));
            showToast("Artikel berhasil dihapus", "success");
        } catch (error) {
            showToast("Gagal menghapus artikel", "error");
        } finally {
            setIsDeleting(false);
            setIsModalOpen(false);
            setSelectedArticleId(null);
        }
    };

    const filteredArticles = useMemo(() => {
        return articles.filter((a) => {
            const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "" || a.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [articles, searchQuery, statusFilter]);

    return (
        <div className="max-w-[1200px] w-full text-sm">
            {/* Page Actions */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manajemen Artikel</h1>
                    <p className="text-gray-500 mt-1">Kelola artikel-artikel untuk landing page Anda.</p>
                </div>
                <Link href="/cms/artikel/create">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded text-sm font-medium transition-colors">
                        + Tambah Artikel Baru
                    </button>
                </Link>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200 flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Cari judul artikel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-4 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                >
                    <option value="">Semua Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 uppercase text-xs font-semibold text-gray-500 tracking-wider">
                            <th className="p-4">Judul Artikel</th>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    Memuat data artikel...
                                </td>
                            </tr>
                        ) : filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <tr
                                    key={article.id}
                                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-4 font-medium text-gray-800">{article.title}</td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(article.created_at).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-[11px] font-medium border ${article.status === "published"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : article.status === "archived"
                                                    ? "bg-orange-50 text-orange-700 border-orange-200"
                                                    : "bg-gray-50 text-gray-600 border-gray-200"
                                                }`}
                                        >
                                            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link href={`/cms/artikel/edit/${article.id}`}>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(article.id)}
                                                className="text-red-600 hover:text-red-800 font-medium transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    {searchQuery || statusFilter ? "Artikel tidak ditemukan." : "Belum ada artikel."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ToastComponent />

            <Modal
                isOpen={isModalOpen}
                title="Hapus Artikel"
                message="Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                type="danger"
                isLoading={isDeleting}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
