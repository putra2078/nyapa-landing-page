"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bannerLogin from "../images/banner-login.jpg";
import nyapaLogo from "../images/footer-nyapa-icon.png";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: implement login logic
        console.log("Login:", { email, password });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-[25%] relative overflow-hidden">
                {/* Orange accent strip */}
                {/* <div className="absolute left-0 top-0 bottom-0 w-16 bg-[#FF5100] z-10" /> */}

                {/* Purple background */}
                {/* <div className="absolute inset-0 bg-[#341145]" /> */}

                {/* Banner image */}
                <div className="absolute inset-0">
                    <Image
                        src={bannerLogin}
                        alt="Handshake"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Overlay gradient */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#341145]/90 via-[#341145]/40 to-transparent z-10" /> */}

                {/* Text content */}
                {/* <div className="relative z-20 flex flex-col justify-between p-12 w-full">
                    <div className="mt-32">
                        <h2 className="text-white text-4xl xl:text-5xl font-bold leading-tight">
                            sudah<br />
                            siap<br />
                            nyapa<br />
                            hari ini?
                        </h2>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                        <Image
                            src={nyapaLogo}
                            alt="Nyapa Logo"
                            width={40}
                            height={40}
                        />
                        <span className="text-white text-2xl font-bold">nyapa</span>
                    </div>
                </div> */}
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-10 lg:hidden">
                        <Image
                            src={nyapaLogo}
                            alt="Nyapa Logo"
                            width={32}
                            height={32}
                        />
                        <span className="text-[#341145] text-xl font-bold">nyapa</span>
                    </div>

                    {/* Header */}
                    <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                        Masuk ke akun anda
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Tidak punya akun?{" "}
                        <Link
                            href="#"
                            className="text-[#FF5100] font-semibold hover:underline"
                        >
                            Buat sekarang!
                        </Link>
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-[#1a1a1a] mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-[#1a1a1a]"
                                >
                                    Password
                                </label>
                                <Link
                                    href="#"
                                    className="text-sm text-[#FF5100] font-semibold hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[#1a1a1a] pr-12 focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#341145] text-white font-semibold rounded-lg hover:bg-[#4a1d5e] active:bg-[#2a0d38] transition-colors cursor-pointer"
                        >
                            Masuk
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
