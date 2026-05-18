"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import textureHero from "../images/texture-hero.png";
import articleHeader from "../images/article-header.png";
import apiService, { Article } from "../service/api";

export default function ArticlesSection() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await apiService.getPublicArticles();
                // Only show published articles, limit to 3
                const published = data.filter((a) => a.status === "published").slice(0, 3);
                setArticles(published);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    return (
        <section id="artikel" className="relative bg-[#341145] py-16 md:py-24 overflow-hidden">
            {/* Texture Background */}
            <div className="absolute inset-0 mix-blend-overlay opacity-50">
                <Image
                    src={textureHero}
                    alt="Background texture"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[#341145] mix-blend-multiply pointer-events-none"></div>
            </div>

            <div className="relative mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16 px-4">
                    <div className="flex justify-center">
                        <Image
                            src={articleHeader}
                            alt="Artikel yang kamu butuhkan!"
                            className="w-full max-w-xs sm:max-w-sm md:w-max md:h-max object-contain"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center text-white/70 py-16">
                        <p>Belum ada artikel tersedia.</p>
                    </div>
                ) : (
                    <div className={`flex overflow-x-auto pb-10 md:pb-0 md:flex-wrap md:justify-center gap-6 md:gap-8 max-w-6xl mx-auto px-6 md:px-0 snap-x snap-mandatory scrollbar-hide ${articles.length === 1 ? 'justify-center' : 'justify-start md:justify-center'}`}>
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.id}`}
                                className="flex-shrink-0 snap-center group bg-white/15 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:bg-white/20 w-[280px] md:w-[calc(33.333%-2rem)] max-w-sm flex flex-col"
                            >
                                {/* Image */}
                                <div className="w-full aspect-[3/4] overflow-hidden">
                                    {article.featured_image ? (
                                        <img
                                            src={article.featured_image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/10 flex items-center justify-center">
                                            <span className="text-white/40 text-4xl">📄</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                                        {article.excerpt || ""}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* CTA Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-2 rounded-full bg-[#FF5100] hover:bg-orange-600 px-8 py-3 text-base font-semibold text-white transition-colors"
                    >
                        Baca Artikel Lainnya
                    </Link>
                </div>
            </div>
        </section>
    );
}
