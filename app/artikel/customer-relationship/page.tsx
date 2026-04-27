import Link from 'next/link';

export default function RelationshipInCRMPage() {
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
                        Pahami Apa Itu "Relationship" dalam Bisnis dan CRM
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                        <span>Diterbitkan pada 26 Maret 2026</span>
                        <span>•</span>
                        <span>Waktu baca: 8 menit</span>
                    </div>
                </header>

                {/* Introduction */}
                <section className="mb-12">
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        Dalam konteks CRM dan pemasaran modern, "relationship" bukan sekadar transaksi satu‑respon, tetapi seluruh rangkaian hubungan jangka panjang antara pelanggan dan bisnis. Customer relationship adalah cara perusahaan membangun, menjaga, dan mengelola interaksi yang positif dengan pelanggan, sehingga mereka merasa dihargai, puas, dan memiliki keterikatan emosional dengan brand.
                    </p>
                </section>

                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Definisi "relationship" dalam CRM</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Dalam CRM, relationship merujuk pada bagaimana perusahaan membangun dan memelihara hubungan yang berkelanjutan dengan pelanggan lewat komunikasi, layanan, dan pengalaman yang konsisten. Bukan hanya "melayani saat ada masalah", melainkan menciptakan pola interaksi yang terus‑menerus, mulai dari pertama kali pelanggan mengenal brand sampai menjadi pelanggan setia.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Beberapa sumber menjelaskan bahwa:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Customer relationship</strong>
                                <span className="text-gray-700"> adalah strategi untuk menjaga hubungan baik dengan pelanggan dan meningkatkan loyalitas, bukan hanya mengejar satu kali penjualan.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">CRM</strong>
                                <span className="text-gray-700"> adalah pendekatan terstruktur untuk mengelola hubungan dengan pelanggan, dengan bantuan data dan proses yang terintegrasi.</span>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Jenis‑jenis hubungan pelanggan</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Hubungan pelanggan tidak selalu sama untuk setiap pelanggan. Beberapa artikel mengelompokkan customer relationship menjadi beberapa jenis, misalnya:
                    </p>

                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Relationship transaksional</h3>
                            <p className="text-gray-700">
                                Hubungan yang lebih fokus pada kebutuhan praktis dan harga, biasanya terjadi pada pembeli yang hanya mencari produk, bukan kedekatan emosional.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-600">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Relationship emosional</h3>
                            <p className="text-gray-700">
                                Hubungan yang terbentuk dari kedekatan perasaan, seperti kepercayaan, kesamaan nilai, atau pengalaman personal yang berkesan.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-600">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Relationship jangka panjang (loyalitas tinggi)</h3>
                            <p className="text-gray-700">
                                Pelanggan yang terus kembali, sering bertransaksi, dan bahkan menjadi brand ambassador karena hubungan yang sudah terbangun sebelumnya.
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                        Dengan memahami jenis relationship ini, bisnis bisa menyesuaikan strategi komunikasi, reward, dan layanan yang lebih tepat untuk masing‑masing kelompok pelanggan.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Mengapa "relationship" sangat penting?</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Banyak sumber menegaskan bahwa membangun hubungan pelanggan yang kuat jauh lebih penting daripada sekadar mengejar transaksi satu kali. Beberapa alasan utama:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Meningkatkan loyalitas pelanggan:</strong>
                                <span className="text-gray-700"> pelanggan yang merasa diperhatikan cenderung bertahan lebih lama, lebih sering berbelanja ulang, dan lebih resisten terhadap godaan kompetitor.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Meningkatkan customer lifetime value (CLV):</strong>
                                <span className="text-gray-700"> hubungan yang baik membuat satu pelanggan memberikan kontribusi pendapatan yang lebih besar dalam jangka panjang.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Memperkuat stabilitas bisnis:</strong>
                                <span className="text-gray-700"> biaya mempertahankan pelanggan yang sudah ada lebih rendah daripada memperoleh pelanggan baru, sehingga hubungan yang kuat membantu mengurangi churn dan menjaga kinerja bisnis lebih stabil.</span>
                            </div>
                        </li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Komponen penting dalam membangun relationship</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Agar "relationship" tidak hanya slogan, perlu ada beberapa komponen nyata yang dibangun di dalam sistem CRM dan operasional bisnis.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Beberapa komponen utama yang sering disebut:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Komunikasi yang konsisten dan responsif:</strong>
                                <span className="text-gray-700"> merespons pertanyaan dengan cepat, menyelesaikan keluhan, dan selalu memberikan informasi yang jelas.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Personalisasi interaksi:</strong>
                                <span className="text-gray-700"> menggunakan data pelanggan (riwayat pembelian, preferensi, persona) untuk membuat komunikasi yang terasa lebih personal, bukan pesan generik.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Pengalaman pelanggan yang positif:</strong>
                                <span className="text-gray-700"> mulai dari proses pembelian, layanan purna jual, hingga cara komunikasi dengan pelanggan, semuanya harus mendorong perasaan nyaman dan percaya.</span>
                            </div>
                        </li>
                    </ul>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-6">
                        <p className="text-gray-700 leading-relaxed">
                            CRM yang baik menjadi "pipa" yang menghubungkan komponen ini, sehingga setiap interaksi dicatat, dianalisis, dan digunakan untuk memperbaiki hubungan berikutnya.
                        </p>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Contoh sederhana penerapan "relationship"</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Sebagai ilustrasi, sebuah toko online yang memahami konsep relationship tidak hanya fokus pada diskon besar, tetapi juga:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Menyapa pelanggan dengan nama, menawarkan rekomendasi berdasarkan riwayat pembelian, dan mengirim pesan ulang tahun atau ucapan terima kasih.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Menyelesaikan masalah pengiriman atau barang cacat dengan cepat dan sopan, sehingga pelanggan merasa dihargai dan bersedia kembali berbelanja.</span>
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed">
                        Dengan begitu, hubungan bukan hanya "jual beli", melainkan hubungan yang saling menguntungkan: pelanggan merasa dirawat, sementara bisnis mendapatkan pelanggan yang lebih loyal dan berkontribusi lebih besar dalam jangka panjang.
                    </p>
                </section>

                {/* Call to Action */}
                <section className="mt-16 pt-12 border-t-2 border-gray-200">
                    <div className="bg-purple-50 rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Bangun relationship yang kuat dengan pelanggan Anda</h3>
                        <p className="text-gray-700 mb-6">
                            Mari kita ciptakan strategi relationship management yang tepat untuk bisnis Anda dan tingkatkan loyalitas pelanggan secara berkelanjutan.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                        >
                            Mulai Sekarang
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
