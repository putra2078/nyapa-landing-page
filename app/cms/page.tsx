"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import apiService, { Article } from "../service/api";

const stats = [
    { label: "Total Artikel", value: "24", icon: "📝", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Published", value: "18", icon: "✅", color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Draft", value: "6", icon: "📋", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    { label: "Total Views", value: "1.2K", icon: "👁️", color: "bg-purple-50 text-purple-700 border-purple-200" },
];

const quickLinks = [
    { label: "Buat Artikel Baru", href: "/cms/artikel/create", icon: "✏️", desc: "Tulis dan publish artikel baru" },
    { label: "Kelola Artikel", href: "/cms/artikel", icon: "📄", desc: "Lihat dan edit semua artikel" },
];

export default function CMSDashboardPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const items = await apiService.getArticles();
                setArticles(items);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, []);

    const totalArticles = articles.length;
    const publishedArticles = articles.filter(a => a.status === "published").length;
    const draftArticles = articles.filter(a => a.status === "draft").length;

    const dynamicStats = [
        { label: "Total Artikel", value: totalArticles.toString(), icon: "📝", color: "bg-blue-50 text-blue-700 border-blue-200" },
        { label: "Published", value: publishedArticles.toString(), icon: "✅", color: "bg-green-50 text-green-700 border-green-200" },
        { label: "Draft", value: draftArticles.toString(), icon: "📋", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
        { label: "Total Views", value: "-", icon: "👁️", color: "bg-purple-50 text-purple-700 border-purple-200" },
    ];

    const recentItems = articles.slice(0, 5);

    return (
        <div className="max-w-[1100px] w-full space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Selamat datang di CMS. Berikut ringkasan konten Anda.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {dynamicStats.map((s) => (
                    <div
                        key={s.label}
                        className={`border rounded-xl p-5 flex items-center gap-4 ${s.color}`}
                    >
                        <span className="text-2xl">{s.icon}</span>
                        <div>
                            <p className="text-2xl font-bold">
                                {loading && s.label !== "Total Views" ? "..." : s.value}
                            </p>
                            <p className="text-xs opacity-80">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="border border-gray-200 bg-white rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xl">{link.icon}</span>
                            <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                                {link.label}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">{link.desc}</p>
                    </Link>
                ))}
            </div>

            {/* Recent Articles */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-900">Artikel Terbaru</h2>
                    <Link
                        href="/cms/artikel"
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Lihat semua →
                    </Link>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                        <tr>
                            <th className="text-left px-5 py-3 font-medium">Judul</th>
                            <th className="text-left px-5 py-3 font-medium">Status</th>
                            <th className="text-left px-5 py-3 font-medium">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3} className="px-5 py-4 text-center text-sm text-gray-500">
                                    Memuat data...
                                </td>
                            </tr>
                        ) : recentItems.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="px-5 py-4 text-center text-sm text-gray-500">
                                    Belum ada artikel.
                                </td>
                            </tr>
                        ) : (
                            recentItems.map((a) => (
                                <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    <td className="px-5 py-3.5 font-medium text-gray-800">{a.title}</td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium ${a.status === "published"
                                                ? "bg-green-100 text-green-700"
                                                : a.status === "archived"
                                                    ? "bg-orange-100 text-orange-700"
                                                    : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-500">
                                        {new Date(a.created_at).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
