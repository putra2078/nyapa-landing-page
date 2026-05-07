"use client";

import { useEffect, useState } from "react";
import apiService, { Article } from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function ArticlesListPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const data = await apiService.getPublicArticles();
                // Filter to only show published articles
                const published = data.filter((a) => a.status === "published");
                setArticles(published);
            } catch (err: any) {
                console.error("Error fetching articles:", err);
                setError(err.message || "Gagal memuat daftar artikel.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <main className="min-h-screen flex flex-col bg-[#F9FAFB]">
            <Navbar />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-grow pt-24 pb-12">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Blog & Artikel <span className="text-[#FF5100]">Nyapa</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Temukan wawasan terbaru, tips, dan strategi untuk membangun hubungan pelanggan yang lebih baik.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5100]"></div>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <p className="text-red-500 font-medium mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="text-[#FF5100] font-bold hover:underline"
                        >
                            Coba lagi
                        </button>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <p className="text-gray-500 text-lg">Belum ada artikel yang diterbitkan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.id}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                    {article.featured_image ? (
                                        <img
                                            src={article.featured_image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2 py-1 rounded tracking-wider uppercase shadow-sm">
                                            {formatDate(article.published_at || article.created_at)}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF5100] transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                        {article.excerpt || "Baca selengkapnya mengenai artikel ini..."}
                                    </p>
                                    <div className="mt-auto pt-4 flex items-center text-[#FF5100] font-bold text-sm">
                                        Selengkapnya

                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
