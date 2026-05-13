"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import RichTextEditor from "../../../../components/RichTextEditor";
import TagInput from "../../../../components/TagInput";
import apiService, {
  ArticleCreatePayload,
  Category,
} from "../../../../service/api";
// import authService from "../../../../service/auth";
import { useToast } from "../../../../components/Toast";

/**
 * Helper to convert Date to ISO string with local timezone offset
 * e.g., 2026-05-04T12:00:00+07:00
 */
const toLocalISOString = (date: Date) => {
  const offset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
  const offsetSign = offset >= 0 ? "+" : "-";

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${offsetSign}${offsetHours}:${offsetMinutes}`;
};

interface ArticleForm {
  title: string;
  slug: string;
  category_id: string;
  tags: string[];
  excerpt: string;
  content: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  status: string;
  published_at: string;
}

export default function ArticleEditPage() {
  const { showToast, ToastComponent } = useToast();
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const [form, setForm] = useState<ArticleForm>({
    title: "",
    slug: "",
    category_id: "",
    tags: [],
    excerpt: "",
    content: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    status: "draft",
    published_at: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageInputMode, setImageInputMode] = useState<"file" | "url">("file");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ALLOWED_IMAGE_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".svg",
    ".bmp",
  ];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  // Fetch existing article data
  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await apiService.getArticleById(articleId);
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          featured_image: data.featured_image || "",
          category_id: data.category_id || "",
          tags: data.tags?.map((t) => t.name) || [],
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          meta_keywords: data.meta_keywords || "",
          status: data.status || "draft",
          published_at: data.published_at
            ? (() => {
                const d = new Date(data.published_at);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                const hours = String(d.getHours()).padStart(2, "0");
                const minutes = String(d.getMinutes()).padStart(2, "0");
                return `${year}-${month}-${day}T${hours}:${minutes}`;
              })()
            : "",
        });
        if (data.featured_image) {
          setImagePreview(data.featured_image);
          // Auto-detect URL mode if image looks like a URL
          if (data.featured_image.startsWith("http")) {
            setImageInputMode("url");
          }
        }
      } catch (err) {
        console.error("Failed to fetch article:", err);
        setErrorMessage("Gagal memuat data artikel.");
      } finally {
        setIsFetching(false);
      }
    }
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = useCallback(
    (field: keyof ArticleForm) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => {
        const value = e.target.value;
        setForm((prev) => ({
          ...prev,
          [field]: value,
          // Auto-generate slug from title (only if slug is empty)
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
    [],
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

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageError(null);

        // Validate extension
        const ext = "." + file.name.split(".").pop()?.toLowerCase();
        if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
          setImageError(
            `Format file tidak didukung. Gunakan: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`,
          );
          e.target.value = "";
          return;
        }

        // Validate size
        if (file.size > MAX_FILE_SIZE) {
          setImageError("Ukuran file terlalu besar. Maksimal 5MB.");
          e.target.value = "";
          return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setForm((prev) => ({ ...prev, featured_image: file.name }));
      }
    },
    [],
  );

  const handleImageUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;
      setForm((prev) => ({ ...prev, featured_image: url }));
      setImagePreview(url || null);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const payload: Partial<ArticleCreatePayload> = {
        title: form.title,
        slug: form.slug,
        content: form.content,
        status: form.status,
        excerpt: form.excerpt || undefined,
        featured_image: form.featured_image || undefined,
        category_id: form.category_id || undefined,
        tags: form.tags || undefined,
        meta_title: form.meta_title || undefined,
        meta_description: form.meta_description || undefined,
        meta_keywords: form.meta_keywords || undefined,
        published_at: form.published_at
          ? toLocalISOString(new Date(form.published_at))
          : undefined,
      };

      await apiService.updateArticle(
        articleId,
        payload,
        imageFile || undefined,
      );

      // Success
      showToast("Artikel berhasil diperbarui!", "success");
      setTimeout(() => {
        router.push("/cms/artikel");
      }, 1000);
    } catch (err: any) {
      console.error("Error updating article:", err);
      const msg =
        err.response?.data?.message ||
        "Gagal memperbarui artikel. Silakan coba lagi.";
      setErrorMessage(msg);
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  }, [form, router, articleId, imageFile]);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 bg-white transition-colors";

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
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
          <p className="text-gray-500">Memuat data artikel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-300 w-full flex gap-8">
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
            URL: /artikel/
            <span className="text-gray-600">{form.slug || "..."}</span>
          </p>
        </FormGroup>

        {/* Excerpt */}
        <FormGroup label="Excerpt">
          <textarea
            className={`${inputClass} min-h-20 resize-y`}
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
          {/* Toggle between file upload and URL input */}
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => {
                setImageInputMode("file");
                setImagePreview(null);
                setImageFile(null);
                setImageError(null);
                setForm((prev) => ({ ...prev, featured_image: "" }));
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                imageInputMode === "file"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => {
                setImageInputMode("url");
                setImagePreview(null);
                setImageFile(null);
                setImageError(null);
                setForm((prev) => ({ ...prev, featured_image: "" }));
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                imageInputMode === "url"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              URL Gambar
            </button>
          </div>

          {imageInputMode === "file" ? (
            <div className="flex gap-4 items-start">
              <label className="w-30 h-30 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors flex-shrink-0">
                <svg
                  className="w-7 h-7 mb-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-[10px] text-center px-2">
                  Upload Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {imageError && (
                <p className="text-xs text-red-500 mt-1 shrink-0 self-center">
                  {imageError}
                </p>
              )}
              {imagePreview && (
                <div className="w-30 h-30 rounded-lg overflow-hidden relative shrink-0 border border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                      setForm((prev) => ({ ...prev, featured_image: "" }));
                    }}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="url"
                className={inputClass}
                placeholder="https://example.com/image.jpg"
                value={form.featured_image}
                onChange={handleImageUrlChange}
              />
              {imagePreview && (
                <div className="w-full max-w-[240px] aspect-video rounded-lg overflow-hidden relative border border-gray-200">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={() => setImagePreview(null)}
                  />
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
          )}
        </FormGroup>

        {/* ── SEO Meta Section ── */}
        <div className="border border-gray-200 rounded-lg bg-white p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
          <h3 className="text-sm font-semibold text-gray-800">
            Publish Settings
          </h3>

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

        {/* Category & Tags */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Article Metadata
          </h3>
          <FormGroup label="Category">
            <select
              className={inputClass}
              value={form.category_id}
              onChange={handleChange("category_id")}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup label="Tags">
            <TagInput
              value={form.tags}
              onChange={(tags) => setForm((prev) => ({ ...prev, tags }))}
              placeholder="Add tags..."
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Type and press enter to add tags
            </p>
          </FormGroup>{" "}
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
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                Memperbarui...
              </span>
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Perbarui Artikel
              </>
            )}
          </button>

          <Link
            href="/cms/artikel"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium border border-gray-200 flex justify-center items-center gap-2 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            Kembali ke daftar
          </Link>
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
