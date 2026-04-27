import Link from 'next/link';

export default function CustomerPersonaPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </nav>

            {/* Article Container */}
            <article className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <header className="mb-12 border-b-2 border-gray-200 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Bangun Customer Persona agar Program Pemasaran dan CRM Lebih Tepat Sasaran
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <span>Diterbitkan pada 26 Maret 2026</span>
                        <span>•</span>
                        <span>Waktu baca: 7 menit</span>
                    </div>
                </header>

                {/* Introduction */}
                <section className="mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Membangun customer persona adalah salah satu langkah paling penting dalam merancang strategi pemasaran dan CRM yang efektif. Persona pelanggan membantu bisnis "melihat" siapa pelanggan ideal, apa yang mereka butuhkan, dan bagaimana cara berkomunikasi yang paling relevan dengan mereka. Dengan persona yang jelas, program promosi, layanan, dan interaksi dengan pelanggan jarang lagi asal tembak, karena setiap langkah diarahkan pada gambaran pelanggan yang spesifik dan didukung data.
                    </p>
                </section>

                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Apa itu customer persona?</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Customer persona (atau buyer persona) adalah representasi semi‑fiktif dari pelanggan ideal bisnis Anda, yang dibuat berdasarkan data riil dan pengamatan nyata. Persona tidak sekadar "gambaran umum", tetapi profil spesifik yang menggambarkan latar belakang, tujuan, masalah, dan preferensi komunikasi sekelompok pelanggan utama.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Manfaat utama persona:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Membantu fokus pada segmen pelanggan yang benar‑benar bernilai, bukan target yang terlalu umum.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Menjadi panduan dalam membuat konten, penawaran, channel komunikasi, hingga desain produk yang lebih relevan.</span>
                        </li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Langkah membangun persona pelanggan</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Tidak ada satupun persona yang baik jika dibuat hanya dari asumsi. Proses yang kuat biasanya melalui beberapa langkah berikut:
                    </p>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                                <span className="text-blue-600 font-bold">1.</span>
                                <span>Kumpulkan data pelanggan sebenarnya</span>
                            </h3>
                            <p className="text-gray-700 leading-relaxed ml-9">
                                Ambil data dari berbagai sumber: survei, wawancara, histori CRM, aktivitas di media sosial, pola pembelian, dan feedback layanan. Catat demografi (usia, lokasi, pekerjaan), tetapi juga psikografi seperti gaya hidup, nilai, dan kebiasaan belanja.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                                <span className="text-blue-600 font-bold">2.</span>
                                <span>Identifikasi masalah dan tujuan pelanggan</span>
                            </h3>
                            <p className="text-gray-700 leading-relaxed ml-9">
                                Tanyakan: apa yang membuat mereka mencari solusi seperti produk/layanan Anda? Apa tantangan utama yang mereka hadapi? Dengan memahami titik nyeri dan tujuan, bisnis bisa merancang narasi komunikasi dan penawaran yang menyentuh kebutuhan nyata.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                                <span className="text-blue-600 font-bold">3.</span>
                                <span>Kelompokkan pelanggan menjadi persona</span>
                            </h3>
                            <p className="text-gray-700 leading-relaxed ml-9">
                                Gabungkan pelanggan dengan karakteristik serupa menjadi satu persona, misalnya "UMKM yang fokus hemat biaya" atau "freelancer muda yang butuh solusi cepat". Biasanya sebuah bisnis memiliki beberapa persona, bukan hanya satu, untuk menangkap variasi perilaku pelanggan.
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                                <span className="text-blue-600 font-bold">4.</span>
                                <span>Buat profil persona yang hidup</span>
                            </h3>
                            <p className="text-gray-700 leading-relaxed ml-9">
                                Beri nama fiktif, usia, pekerjaan, latar belakang, tujuan, tantangan, dan preferensi komunikasi (email, chat, media sosial, dll). Tambahkan juga elemen seperti hobi atau nilai‑nilai yang dianut agar persona terasa lebih manusiawi dan mudah dipahami oleh tim.
                            </p>
                        </div>

                        {/* Step 5 */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                                <span className="text-blue-600 font-bold">5.</span>
                                <span>Simpan dan sebarkan ke semua tim</span>
                            </h3>
                            <p className="text-gray-700 leading-relaxed ml-9">
                                Setelah jadi, profil persona bisa disimpan di sistem CRM atau dokumen internal, lalu dijadikan referensi oleh tim sales, marketing, dan customer service. Hal ini memastikan semua departemen berbicara dengan "bahasa" dan target yang sama.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Contoh sederhana persona pelanggan</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Sebagai gambaran praktis, sebuah toko fashion online bisa memiliki persona seperti:
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-6">
                        <div className="space-y-4">
                            <div>
                                <strong className="text-gray-900 block mb-1">Nama:</strong>
                                <p className="text-gray-700">Sarah, 25 tahun, pekerja kreatif di Jakarta.</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Latar belakang:</strong>
                                <p className="text-gray-700">Sering update tren di Instagram dan TikTok, mengikuti influencer fashion.</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Tujuan:</strong>
                                <p className="text-gray-700">Mencari pakaian yang modis, nyaman, dan harga terjangkau untuk aktivitas harian dan kerja.</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Tantangan:</strong>
                                <p className="text-gray-700">Sulit menemukan brand yang konsisten kualitasnya dan cepat dalam pengiriman.</p>
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Preferensi komunikasi:</strong>
                                <p className="text-gray-700">Sering berinteraksi lewat media sosial, chat, dan email promosi yang personal.</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                        Dengan persona seperti ini, tim tidak lagi membuat promosi "umum untuk semua", tetapi bisa merancang konten Instagram, promo flash sale, dan pesan personal yang pas untuk karakter Sarah.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Mengapa persona harus berbasis data</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Banyak bisnis salah langkah karena persona dibuat dari asumsi, bukan fakta. Artikel‑artikel tentang customer persona menekankan pentingnya:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Menggunakan data aktual (transaksi, riwayat interaksi, survai) untuk membangun persona.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Tidak hanya fokus pada demografi (usia, gender), tetapi juga perilaku dan motivasi pelanggan.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Mengupdate persona secara berkala sesuai perubahan tren, perilaku, dan data baru.</span>
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed">
                        Dengan persona yang kuat dan berbasis data, program CRM dan pemasaran menjadi lebih personal, hemat biaya, dan lebih efektif dalam membangun hubungan jangka panjang dengan pelanggan.
                    </p>
                </section>

                {/* Call to Action */}
                <section className="mt-16 pt-12 border-t-2 border-gray-200">
                    <div className="bg-green-50 rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Siap membangun persona pelanggan Anda?</h3>
                        <p className="text-gray-700 mb-6">
                            Biarkan kami membantu Anda mengidentifikasi dan memahami pelanggan ideal dengan lebih baik menggunakan data dan insights yang akurat.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                        >
                            Konsultasi Sekarang
                        </Link>
                    </div>
                </section>
            </article>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-16">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <p className="text-gray-400">
                        © 2026 NYAPA. Semua hak dilindungi.
                    </p>
                </div>
            </footer>
        </main>
    );
}
