import Link from 'next/link';

export default function CRMArchitecturePage() {
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
                        Arsitektur CRM yang Harus Diketahui untuk Membangun Program Hubungan Pelanggan yang Tepat
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
                        Customer Relationship Management (CRM) bukan sekadar software penjualan, melainkan sebuah arsitektur sistem yang menyatukan data pelanggan, proses bisnis, dan teknologi agar hubungan dengan pelanggan bisa dibangun secara lebih terarah dan berkelanjutan. Untuk memastikan program CRM efektif, perusahaan perlu memahami struktur arsitekturnya, cara membangun customer persona dari data yang ada, dan bagaimana konsep "relationship" memengaruhi setiap keputusan di dalam sistem tersebut.
                    </p>
                </section>

                {/* Section 1 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Apa itu arsitektur CRM?</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Arsitektur CRM adalah kerangka desain sistem yang menjelaskan bagaimana data pelanggan diintegrasikan, bagaimana proses bisnis dijalankan, dan bagaimana teknologi pendukung bekerja bersama untuk mendukung hubungan pelanggan. Dalam arsitektur yang baik, komponen utama CRM—seperti basis data pelanggan, proses operasional, analitik, kolaborasi tim, dan keamanan data—dibuat saling terhubung sehingga informasi tidak "terisolasi" di satu departemen saja.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Struktur arsitektur CRM biasanya dikelompokkan ke dalam tiga lapisan dasar:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Arsitektur data:</strong>
                                <span className="text-gray-700"> tempat semua informasi pelanggan, riwayat interaksi, pembelian, dan preferensi disimpan dan diatur dalam database terpusat.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Arsitektur aplikasi:</strong>
                                <span className="text-gray-700"> berisi modul‑modul CRM seperti manajemen kontak, sales automation, marketing campaign, dan layanan pelanggan yang saling terhubung.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Arsitektur teknologi:</strong>
                                <span className="text-gray-700"> infrastruktur yang menjalankan sistem CRM, baik berbasis cloud maupun on‑premise, dengan memperhatikan skalabilitas, keamanan, dan privasi data.</span>
                            </div>
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed">
                        Arsitektur yang terintegrasi memungkinkan perusahaan membaca pelanggan secara holistik, sehingga program pemasaran dan layanan bisa lebih personal dan relevan.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Komponen kunci dalam arsitektur CRM</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Beberapa sumber menyebut bahwa sistem CRM modern terdiri dari lima komponen utama yang bekerja sama dalam satu arsitektur. Secara praktis, komponen‑komponen ini menjadi "pipa" yang menghubungkan data pelanggan ke berbagai fungsi bisnis:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Manajemen data pelanggan:</strong>
                                <span className="text-gray-700"> basis data terpusat yang menyimpan nama, kontak, riwayat pembelian, preferensi, dan segmen pelanggan.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Manajemen interaksi pelanggan:</strong>
                                <span className="text-gray-700"> sistem yang mencatat setiap interaksi (email, chat, telepon, media sosial) agar tim bisa melihat riwayat pelanggan dengan lengkap.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Otomasi penjualan dan pemasaran:</strong>
                                <span className="text-gray-700"> modul untuk mengelola lead, pipeline, campaign, dan follow‑up secara otomatis berdasarkan aturan yang sudah ditetapkan.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Layanan dan dukungan pelanggan:</strong>
                                <span className="text-gray-700"> fitur untuk mengelola tiket, komplain, dan solusi, sehingga pengalaman pelanggan tetap terjaga bahkan setelah pembelian.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Alat kolaboratif dan analitik:</strong>
                                <span className="text-gray-700"> ruang kerja bersama tim (sales, marketing, CS) dan fitur analisis untuk melihat tren, performa kampanye, dan perilaku pelanggan.</span>
                            </div>
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed">
                        Dengan komponen‑komponen ini terintegrasi dalam satu arsitektur, program CRM bisa berjalan lebih efisien dan data pelanggan benar‑benar digunakan sebagai "panduan" keputusan, bukan sekadar catatan.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Menghubungkan arsitektur CRM dengan customer persona</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Untuk program CRM yang "pas", arsitektur teknis tidak boleh dipisahkan dari pemahaman terhadap siapa sebenarnya pelanggan yang dilayani. Di sinilah customer persona menjadi penting: arsitektur CRM yang baik menyediakan data, sedangkan persona membantu menafsirkan data tersebut menjadi wajah nyata pelanggan.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Cara membangun persona dengan memanfaatkan arsitektur CRM:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Kumpulkan data dari sistem CRM:</strong>
                                <span className="text-gray-700"> gunakan riwayat pembelian, channel interaksi, wilayah, dan frekuensi kontak untuk memahami pola pelanggan.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Gabungkan menjadi kelompok:</strong>
                                <span className="text-gray-700"> pelanggan dengan karakteristik serupa dikelompokkan, lalu dibentuk menjadi persona yang jelas (misalnya "startup founder 28–35 tahun, fokus efisiensi biaya dan kecepatan layanan").</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Simpan persona di dalam CRM:</strong>
                                <span className="text-gray-700"> sehingga saat tim sales atau marketing membuat campaign, mereka bisa mengarahkan pesan, penawaran, dan channel sesuai persona yang sudah terdefinisi.</span>
                            </div>
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed">
                        Dengan begitu, arsitektur CRM tidak hanya menyimpan data, tetapi juga menjadi "peta" yang menunjukkan siapa persona prioritas, apa kebutuhan mereka, dan bagaimana hubungan dengan mereka sebaiknya dibangun.
                    </p>
                </section>

                {/* Section 4 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Pahami "Relationship" agar tidak salah langkah</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        CRM yang berbasis pada relationship menekankan bahwa hubungan dengan pelanggan bukan satu‑satu transaksi, melainkan rangkaian interaksi yang saling terhubung. Arsitektur CRM yang baik memastikan setiap interaksi di catat, tersinkron, dan bisa diakses oleh semua tim, sehingga pelanggan tidak merasa sedang "berbicara ke orang berbeda-beda" tiap kali menghubungi perusahaan.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Beberapa prinsip penting untuk memahami "relationship" dalam arsitektur CRM:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Satu pelanggan, satu profil:</strong>
                                <span className="text-gray-700"> semua data pelanggan (sales, marketing, layanan) harus terhubung ke satu profil agar konteks hubungan konsisten.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Hubungan = riwayat + prediksi:</strong>
                                <span className="text-gray-700"> tim tidak hanya melihat apa yang sudah terjadi, tetapi juga menggunakan data analitik untuk menebak kebutuhan berikutnya (misalnya pelanggan yang sering membeli produk A bisa ditawari add‑on B).</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <div>
                                <strong className="text-gray-900">Hubungan lintas tim:</strong>
                                <span className="text-gray-700"> arsitektur CRM yang kolaboratif memudahkan tim sales, marketing, dan CS saling bertukar informasi, sehingga program tidak terlalu "agresif" atau terlalu "dingin".</span>
                            </div>
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed">
                        Jika "relationship" tidak dipahami, program CRM bisa salah langkah: misalnya mengirim promosi yang tidak relevan, follow‑up yang terlalu sering, atau malah mengabaikan pelanggan yang sudah sering bertransaksi.
                    </p>
                </section>

                {/* Section 5 */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Contoh penerapan praktis di bisnis</h2>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Ambil contoh bisnis digital di Jakarta yang menerapkan arsitektur CRM yang terintegrasi:
                    </p>

                    <ul className="space-y-4 mb-6 ml-4">
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Data pelanggan disimpan di satu basis data terpusat, dengan modul penjualan, marketing automation, dan layanan yang saling terhubung.</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Tim mengolah data tersebut menjadi beberapa persona, misalnya "freelancer muda", "UMKM ritel kecil", dan "karyawan kantor".</span>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span className="text-gray-700">Setiap program CRM (promo, onboarding, retention, upselling) dirancang sesuai persona dan konteks hubungan, sehingga komunikasi terasa lebih personal dan tidak generik.</span>
                        </li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed">
                        Dengan menggabungkan pemahaman arsitektur CRM, pembuatan customer persona, dan prinsip "relationship", perusahaan bisa merancang program yang lebih tepat sasaran, mengurangi kesalahan strategi, dan membangun hubungan jangka panjang dengan pelanggan.
                    </p>
                </section>

                {/* Call to Action */}
                <section className="mt-16 pt-12 border-t-2 border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Siap mengimplementasikan CRM untuk bisnis Anda?</h3>
                        <p className="text-gray-700 mb-6">
                            Hubungi kami untuk konsultasi gratis dan pelajari bagaimana solusi CRM kami dapat membantu Anda membangun hubungan pelanggan yang lebih baik.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                        >
                            Hubungi Kami
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
