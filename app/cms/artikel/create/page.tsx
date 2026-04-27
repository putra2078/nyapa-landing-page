"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RichTextEditor from "../../../components/RichTextEditor";
import apiService, { ArticleCreatePayload } from "../../../service/api";
import authService from "../../../service/auth";
import { useToast } from "../../../components/Toast";

interface ArticleForm {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    status: string;
    published_at: string;
}

export default function ArticleCreatePage() {
    const { showToast, ToastComponent } = useToast();
    const router = useRouter();
    const [form, setForm] = useState<ArticleForm>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        status: "draft",
        published_at: "",
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = useCallback(
        (field: keyof ArticleForm) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                const value = e.target.value;
                setForm((prev) => ({
                    ...prev,
                    [field]: value,
                    // Auto-generate slug from title
                    ...(field === "title" && !prev.slug
                        ? {
                            slug: value
                                .toLowerCase()
                                .replace(/[^a-z0-9\s-]/g, "")
                                .replace(/\s+/g, "-")
                                .replace(/-+/g, "-")
                                .trim(),
                        }
                        : {}),
                }));
            },
        []
    );

    const generateSlug = useCallback(() => {
        setForm((prev) => ({
            ...prev,
            slug: prev.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim(),
        }));
    }, []);

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setForm((prev) => ({ ...prev, featured_image: file.name }));
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const payload: ArticleCreatePayload = {
                title: form.title,
                slug: form.slug,
                content: form.content,
                status: form.status,
                excerpt: form.excerpt || undefined,
                featured_image: form.featured_image || undefined,
                meta_title: form.meta_title || undefined,
                meta_description: form.meta_description || undefined,
                meta_keywords: form.meta_keywords || undefined,
            };

            await apiService.createArticle(payload);

            // Success
            showToast("Artikel berhasil dibuat!", "success");
            setTimeout(() => {
                router.push("/cms/artikel");
            }, 1000);
        } catch (err: any) {
            console.error("Error creating article:", err);
            const msg = err.response?.data?.message || "Gagal membuat artikel. Silakan coba lagi.";
            setErrorMessage(msg);
            showToast(msg, "error");
        } finally {
            setIsLoading(false);
        }
    }, [form, router]);

    const inputClass =
        "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 bg-white transition-colors";

    return (
        <div className="max-w-[1200px] w-full flex gap-8">
            {/* ───── Left: Main Form ───── */}
            <div className="flex-1 space-y-6">
                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Title */}
                <FormGroup label="Title" required>
                    <input
                        type="text"
                        className={inputClass}
                        placeholder="Masukkan judul artikel"
                        value={form.title}
                        onChange={handleChange("title")}
                    />
                </FormGroup>

                {/* Slug */}
                <FormGroup label="Slug" required>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className={`${inputClass} flex-1`}
                            placeholder="judul-artikel-anda"
                            value={form.slug}
                            onChange={handleChange("slug")}
                        />
                        <button
                            type="button"
                            onClick={generateSlug}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-medium border border-gray-300 transition-colors whitespace-nowrap"
                        >
                            Generate
                        </button>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">
                        URL: /artikel/<span className="text-gray-600">{form.slug || "..."}</span>
                    </p>
                </FormGroup>

                {/* Excerpt */}
                <FormGroup label="Excerpt">
                    <textarea
                        className={`${inputClass} min-h-[80px] resize-y`}
                        placeholder="Ringkasan singkat artikel (opsional)"
                        value={form.excerpt}
                        onChange={handleChange("excerpt")}
                    />
                </FormGroup>

                {/* Content */}
                <FormGroup label="Content" required>
                    <RichTextEditor
                        value={form.content}
                        onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                        placeholder="Mulai menulis konten artikel Anda di sini..."
                        minHeight="300px"
                    />
                </FormGroup>

                {/* Featured Image */}
                <FormGroup label="Featured Image">
                    <div className="flex gap-4 items-start">
                        <label className="w-[120px] h-[120px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors flex-shrink-0">
                            <svg className="w-7 h-7 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[10px] text-center px-2">Upload Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                        {imagePreview && (
                            <div className="w-[120px] h-[120px] rounded-lg overflow-hidden relative flex-shrink-0 border border-gray-200">
                                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setForm((prev) => ({ ...prev, featured_image: "" }));
                                    }}
                                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                </FormGroup>

                {/* ── SEO Meta Section ── */}
                <div className="border border-gray-200 rounded-lg bg-white p-5 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        SEO Settings
                    </h3>

                    <FormGroup label="Meta Title">
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="Judul untuk mesin pencari (opsional)"
                            value={form.meta_title}
                            onChange={handleChange("meta_title")}
                        />
                        <p className="text-[11px] text-gray-400 mt-1">
                            {form.meta_title.length}/60 karakter
                        </p>
                    </FormGroup>

                    <FormGroup label="Meta Description">
                        <textarea
                            className={`${inputClass} min-h-[60px] resize-y`}
                            placeholder="Deskripsi untuk mesin pencari (opsional)"
                            value={form.meta_description}
                            onChange={handleChange("meta_description")}
                        />
                        <p className="text-[11px] text-gray-400 mt-1">
                            {form.meta_description.length}/160 karakter
                        </p>
                    </FormGroup>

                    <FormGroup label="Meta Keywords">
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="keyword1, keyword2, keyword3 (opsional)"
                            value={form.meta_keywords}
                            onChange={handleChange("meta_keywords")}
                        />
                    </FormGroup>
                </div>
            </div>

            {/* ───── Right: Sidebar ───── */}
            <div className="w-[280px] space-y-5 flex-shrink-0">
                {/* Status & Publish */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-800">Publish Settings</h3>

                    <FormGroup label="Status" required>
                        <select
                            className={inputClass}
                            value={form.status}
                            onChange={handleChange("status")}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </FormGroup>

                    <FormGroup label="Published At">
                        <input
                            type="datetime-local"
                            className={inputClass}
                            value={form.published_at}
                            onChange={handleChange("published_at")}
                        />
                        <p className="text-[11px] text-gray-400 mt-1">
                            Kosongkan untuk menyimpan sebagai draft
                        </p>
                    </FormGroup>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium flex justify-center items-center gap-2 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Menyimpan...
                            </span>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Simpan Artikel
                            </>
                        )}
                    </button>

                    <Link
                        href="/cms/artikel"
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium border border-gray-200 flex justify-center items-center gap-2 transition-colors"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        Kembali ke daftar
                    </Link>
                </div>

                {/* Summary Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 text-xs">
                    <h4 className="font-semibold text-gray-700 text-sm">Ringkasan</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Judul</span>
                            <span className="text-gray-800 text-right max-w-[150px] truncate">
                                {form.title || "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${form.status === "published"
                                    ? "bg-green-100 text-green-700"
                                    : form.status === "archived"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {form.status}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Konten</span>
                            <span className="text-gray-800">
                                {form.content.length > 0 ? `${form.content.length} char` : "—"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Featured Image</span>
                            <span className="text-gray-800">
                                {form.featured_image ? "✓" : "—"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <ToastComponent />
        </div>
    );
}

// ── Sub-components ──

function FormGroup({
    label,
    required = false,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}
