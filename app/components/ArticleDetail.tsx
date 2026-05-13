"use client";

import { Article } from "../service/api";
import Link from "next/link";
import Image from "next/image";

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Calculate reading time approximately (200 words per minute)
  const calculateReadingTime = (content?: string) => {
    if (!content) return 1;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return time > 0 ? time : 1;
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12 border-b-2 border-gray-200 pb-8">
        <div className="mb-6 text-sm">
          <Link
            href="/articles"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Kembali ke Daftar Artikel
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {article.status.toUpperCase()}
            </span>
          </div>
          <span>•</span>
          <span>
            Diterbitkan pada{" "}
            {formatDate(article.published_at || article.created_at)}
          </span>
          <span>•</span>
          <span>Waktu baca: {calculateReadingTime(article.content)} menit</span>
        </div>

        {article.featured_image && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-xl">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-blue text-black prose-headings:text-black prose-p:text-black prose-p:leading-relaxed prose-li:text-black prose-strong:text-black prose-a:text-black prose-blockquote:text-black prose-code:text-black prose-td:text-black prose-th:text-black prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: article.content || "" }}
      />

      {/* Tags Section */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-500 text-sm font-medium">Tags:</span>
            {article.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/articles/tag/${tag.slug}`}
                className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold rounded-full border border-gray-100 transition-all"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action (Optional - keep it for consistency with landing page) */}
      <section className="mt-16 pt-12 border-t-2 border-gray-200">
        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Siap mengimplementasikan CRM untuk bisnis Anda?
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-lg">
            Hubungi kami untuk konsultasi gratis dan pelajari bagaimana solusi
            CRM kami dapat membantu Anda membangun hubungan pelanggan yang lebih
            baik.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#FF5100] hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </article>
  );
}
