"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import nyapaIconNav from "../images/nyapa-icon-nav.png";
import nyapaLogo from "../images/nyapa.png";
import globe from "../images/globe.png";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Tentang", href: "/#tentang" },
        { name: "Layanan", href: "/#layanan" },
        { name: "Harga", href: "/#harga" },
        { name: "Artikel", href: "/#artikel" },
        { name: "FAQ", href: "/#faq" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between md:mx-8">
                    <div className="flex items-center gap-2">
                        <Image
                            width={50} height={30}
                            src={nyapaIconNav}
                            alt="Logo Nyapa"
                            className="w-8 md:w-10 h-auto"
                        />
                        <Link href="/">
                            <Image
                                width={80} height={30}
                                src={nyapaLogo}
                                alt="Nyapa"
                                className="hidden md:block w-20 h-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-purple-900 hover:text-purple-700 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA + Other Buttons */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link
                            href="https://app.nyapa.id/auth/register"
                            className="hidden sm:inline-flex rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-800 transition-colors"
                        >
                            Coba Sekarang
                        </Link>

                        {/* Globe Button (Desktop/Tablet) */}
                        <button className="hidden sm:block p-2 text-gray-700">
                            <Image
                                width={20} height={20}
                                src={globe}
                                alt="globe"
                            />
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-purple-900 hover:bg-purple-50 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    ></div>

                    {/* Menu Content */}
                    <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col p-6 animate-slide-in-right">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <Image
                                    width={40} height={25}
                                    src={nyapaIconNav}
                                    alt="Logo Nyapa"
                                />
                                <Image
                                    width={70} height={25}
                                    src={nyapaLogo}
                                    alt="Nyapa"
                                />
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-purple-900 hover:bg-purple-50 rounded-lg"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-semibold text-purple-900 hover:text-orange-500 transition-colors border-b border-gray-50 pb-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 py-6">
                            <Link
                                href="https://app.nyapa.id/auth/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full text-center rounded-xl bg-orange-500 px-6 py-4 text-base font-bold text-white hover:bg-purple-800 transition-colors"
                            >
                                Coba Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
