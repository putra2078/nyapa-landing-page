"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiService, { Article } from "../../service/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ArticleDetail from "../../components/ArticleDetail";

export default function ArticlePage() {
    const params = useParams();
    const id = params.id as string;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const data = await apiService.getPublicArticleById(id);
                setArticle(data);
            } catch (err: any) {
                console.error("Error fetching article:", err);
                setError(err.message || "Gagal memuat artikel.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[60vh] flex-grow pt-24 pb-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500 font-medium">Memuat artikel...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-24">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ups! Terjadi kesalahan</h2>
                        <p className="text-gray-600 mb-8">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                ) : article ? (
                    <ArticleDetail article={article} />
                ) : (
                    <div className="text-center py-24">
                        <h2 className="text-2xl font-bold text-black mb-2">Artikel tidak ditemukan</h2>
                        <p className="text-gray-600">Maaf, artikel yang Anda cari tidak tersedia.</p>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
