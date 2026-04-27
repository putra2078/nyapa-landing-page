"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import bannerLogin from "../images/banner-login.jpg";
import nyapaLogo from "../images/footer-nyapa-icon.png";
import authService, { RegisterPayload } from "../service/auth";

declare global {
    interface Window {
        grecaptcha: any;
    }
}

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterPayload>({
        fullname: "",
        email: "",
        phone: "",
        companyName: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Load reCAPTCHA script
    useEffect(() => {
        const script = document.createElement("script");
        // Using a placeholder site key as requested - update with actual site key
        script.src = "https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleRegister = async (token: string) => {
        try {
            // Note: Token reCAPTCHA dikirim ke backend jika backend mendukungnya
            // Misalnya ditambahkan ke header atau payload
            const response = await authService.register(formData);
            authService.saveAuth(response.data);
            router.push("/");
        } catch (err: unknown) {
            if (err && typeof err === "object" && "response" in err) {
                const axiosErr = err as { response?: { data?: { message?: string } } };
                setError(axiosErr.response?.data?.message || "Registrasi gagal. Silakan coba lagi.");
            } else {
                setError("Terjadi kesalahan. Silakan coba lagi.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Password dan Konfirmasi Password tidak cocok.");
            return;
        }

        setIsLoading(true);
        setError("");

        // Execute reCAPTCHA
        if (typeof window !== "undefined" && window.grecaptcha) {
            window.grecaptcha.ready(function () {
                window.grecaptcha.execute('reCAPTCHA_site_key', { action: 'submit' }).then(function (token: string) {
                    handleRegister(token);
                }).catch(() => {
                    setError("Gagal memverifikasi reCAPTCHA. Silakan coba lagi.");
                    setIsLoading(false);
                });
            });
        } else {
            setError("reCAPTCHA belum dimuat. Silakan refresh halaman.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-[25%] relative overflow-hidden">
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
            </div>

            {/* Right Panel - Register Form */}
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
                        Buat akun baru
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Sudah punya akun?{" "}
                        <Link
                            href="/login"
                            className="text-[#FF5100] font-semibold hover:underline"
                        >
                            Masuk di sini
                        </Link>
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nama Lengkap */}
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-semibold text-[#1a1a1a] mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                id="fullname"
                                type="text"
                                value={formData.fullname}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* No. Handphone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-[#1a1a1a] mb-1">
                                No. Handphone
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Nama Perusahaan */}
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-semibold text-[#1a1a1a] mb-1">
                                Nama Perusahaan
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-[#1a1a1a] mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#1a1a1a] pr-12 focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
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

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#1a1a1a] mb-1">
                                Konfirmasi Password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-[#1a1a1a] pr-12 focus:outline-none focus:ring-2 focus:ring-[#341145] focus:border-transparent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showConfirmPassword ? (
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
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-[#341145] text-white font-semibold rounded-lg hover:bg-[#4a1d5e] active:bg-[#2a0d38] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Memproses..." : "Daftar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
