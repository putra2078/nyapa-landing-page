import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between mx-8">
                    <div className="flex items-center gap-2">
                        <Image
                            width={50} height={30} 
                            src="/Group1.png"
                            alt="Logo Nyapa"
                        />
                        <Link href="/">
                            <Image
                                width={80} height={30}
                                src="/nyapa.png"
                                alt="Nyapa"
                            />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#tentang" className="text-sm font-medium text-purple-900 hover:text-purple-700">
                            Tentang
                        </Link>
                        <Link href="#layanan" className="text-sm font-medium text-purple-900 hover:text-purple-700">
                            Layanan
                        </Link>
                        <Link href="#harga" className="text-sm font-medium text-purple-900 hover:text-purple-700">
                            Harga
                        </Link>
                        <Link href="#artikel" className="text-sm font-medium text-purple-900 hover:text-purple-700">
                            Artikel
                        </Link>
                        <Link href="#faq" className="text-sm font-medium text-purple-900 hover:text-purple-700">
                            FAQ
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-800 transition-colors"
                        >
                            Coba Sekarang
                        </Link>

                        {/* Mobile Menu Button */}
                        <button className="p-2 text-gray-700">
                            <Image
                            width={20} height={20}
                            src="/globe.png"
                            alt="globe"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
