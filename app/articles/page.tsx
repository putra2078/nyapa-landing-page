"use client";

import { useEffect, useState, useMemo } from "react";
import apiService, { Article, Category, TagSnapshot } from "../service/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ArticlesListPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableTags, setAvailableTags] = useState<TagSnapshot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesData, categoriesData] = await Promise.all([
          apiService.getPublicArticles(),
          apiService.getCategories(),
        ]);

        // Filter to only show published articles
        const published = articlesData.filter((a) => a.status === "published");
        setArticles(published);
        setCategories(categoriesData);

        // Extract unique tags from articles
        const tagsMap = new Map<string, TagSnapshot>();
        published.forEach((article) => {
          article.tags?.forEach((tag) => {
            tagsMap.set(tag.id, tag);
          });
        });
        setAvailableTags(Array.from(tagsMap.values()));
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Gagal memuat data artikel.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Search filter
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags?.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || article.category_id === selectedCategory;

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tagId) =>
          article.tags?.some((tag) => tag.id === tagId),
        );

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [articles, searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Blog & Artikel <span className="text-[#FF5100]">Nyapa</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Temukan wawasan terbaru, tips, dan strategi untuk membangun hubungan
            pelanggan yang lebih baik.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cari Artikel
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul atau tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5100]/20 focus:border-[#FF5100] transition-all"
                />
                <svg
                  className="absolute right-4 top-3.5 h-5 w-5 text-gray-400"
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
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF5100]/20 focus:border-[#FF5100] transition-all appearance-none cursor-pointer"
              >
                <option value="all">Semua Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Filter Berdasarkan Tag
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTags.includes(tag.id)
                        ? "bg-[#FF5100] text-white shadow-md shadow-[#FF5100]/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="px-4 py-1.5 text-sm font-semibold text-[#FF5100] hover:underline"
                  >
                    Hapus Filter
                  </button>
                )}
              </div>
            </div>
          )}
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
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">
              {searchQuery ||
              selectedCategory !== "all" ||
              selectedTags.length > 0
                ? "Tidak ada artikel yang sesuai dengan filter Anda."
                : "Belum ada artikel yang diterbitkan."}
            </p>
            {(searchQuery ||
              selectedCategory !== "all" ||
              selectedTags.length > 0) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedTags([]);
                }}
                className="mt-4 text-[#FF5100] font-bold hover:underline"
              >
                Reset Filter
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
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
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
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
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <button
                          key={tag.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!selectedTags.includes(tag.id)) {
                              toggleTag(tag.id);
                            }
                          }}
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded transition-colors ${
                            selectedTags.includes(tag.id)
                              ? "bg-[#FF5100] text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          #{tag.name}
                        </button>
                      ))}
                    </div>
                  )}{" "}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF5100] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt ||
                      "Baca selengkapnya mengenai artikel ini..."}
                  </p>
                  <div className="mt-auto pt-4 flex items-center text-[#FF5100] font-bold text-sm">
                    Selengkapnya
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
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
