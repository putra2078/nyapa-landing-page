import Link from "next/link";
import Image from "next/image";
import crmArticle from "../images/crm-article.png";
import technology from "../images/technology.png";
import textureHero from "../images/texture-hero.png";
import articleHeader from "../images/article-header.png";

export default function ArticlesSection() {
    const articles = [
        {
            title: "Arsitektur CRM yang Harus Kamu Ketahui!",
            excerpt:
                "Kerangka kerja yang menguraikan strategi, struktur, dan proses untuk membangun hubungan jangka panjang dengan pelanggan.",
            image: crmArticle,
        },
        {
            title: "Bangun Customer Persona, Agar Program Kamu Lebih Pas!",
            excerpt:
                "Mulailah dengan melakukan riset mendalam untuk mengumpulkan data demografi, identifikasi masalah",
            image: technology,
        },
        {
            title: 'Pahami Apa Itu "Relationship" agar Tidak Salah Langkah!',
            excerpt:
                "Konsep hubungan (relationship) yang berpusat pada pelanggan dengan komunikasi dua arah..",
            image: technology,
        },
    ];

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

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex justify-center">
                        <Image
                        src={articleHeader}
                        alt="Artikel yang kamu butuhkan!"
                        className="w-max h-max object-contain"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {articles.map((article, index) => (
                        <Link
                            key={index}
                            href="#"
                            className="group bg-white/15 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:bg-white/20"
                        >
                            {/* Image */}
                            <div className="w-full aspect-[3/4] overflow-hidden">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                                    {article.title}
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {article.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="#"
                        className="inline-flex items-center gap-2 rounded-full bg-[#FF5100] hover:bg-orange-600 px-8 py-3 text-base font-semibold text-white transition-colors"
                    >
                        Baca Artikel Lainnya
                    </Link>
                </div>
            </div>
        </section>
    );
}
