import Link from "next/link";
import Image from "next/image";
import iconNyapa from "../images/footer-nyapa-icon.png";
import textNyapa from "../images/text-nyapa.png";
import instagramIcon from "../images/instagram.png";
import facebookIcon from "../images/facebook.png";
import whatsappIcon from "../images/whatsapp.png";

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-white pt-12 pb-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top Row: Logo + Nav Links | Social Icons */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
                    {/* Left: Logo + Nav */}
                    <div className="space-y-5">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Image
                                src={iconNyapa}
                                alt="Nyapa icon"
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Nav Links */}
                        <div className="flex items-center gap-8">
                            <Link
                                href="#"
                                className="text-md font-bold text-gray-300 hover:text-white transition-colors"
                            >
                                Tentang Nyapa
                            </Link>
                            <Link
                                href="#"
                                className="text-md font-bold text-gray-300 hover:text-white transition-colors"
                            >
                                Blog & Artikel
                            </Link>
                            <Link
                                href="mailto:info@nyapa.id"
                                className="text-md font-bold text-gray-300 hover:text-white transition-colors"
                            >
                                info@nyapa.id
                            </Link>
                        </div>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:opacity-80 transition-opacity">
                            <Image
                                src={instagramIcon}
                                alt="Instagram"
                                className="w-10 h-10"
                            />
                        </Link>
                        <Link href="#" className="hover:opacity-80 transition-opacity">
                            <Image
                                src={facebookIcon}
                                alt="Facebook"
                                className="w-10 h-10"
                            />
                        </Link>
                        <Link href="#" className="hover:opacity-80 transition-opacity">
                            <Image
                                src={whatsappIcon}
                                alt="WhatsApp"
                                className="w-10 h-10"
                            />
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mb-6"></div>

                {/* Bottom Row: Copyright | Terms */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © Nyapa 2025 All Rights Reserved.
                    </p>
                    <Link
                        href="#"
                        className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
}
