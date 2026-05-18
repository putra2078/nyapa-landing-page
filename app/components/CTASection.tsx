import Link from "next/link";
import Image from "next/image";
import ctaHeader from "../images/cta-section-header.png";
import ctaIllustration from "../images/cta-section-illustration.png";

export default function CTASection() {
    return (
        <section id="cta" className="bg-[#341145] py-16 md:py-24 relative">

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start mb-8">
                            <Image
                                src={ctaHeader}
                                alt="Mulai menyapa pelangganmu hari ini !"
                                className="w-full max-w-xs sm:max-w-sm md:w-max md:h-max object-contain"
                            />
                        </div>
                        <Link
                            href="https://app.nyapa.id/auth/register"
                            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3 md:px-12 md:py-4 text-sm md:text-base font-semibold text-white hover:bg-orange-600 transition-colors"
                        >
                            Coba Gratis Sekarang!
                        </Link>
                    </div>

                    {/* Right - Illustration */}
                    <div className="flex justify-center lg:justify-end">
                        <Image
                            src={ctaIllustration}
                            alt="Illustration"
                            className="w-full max-w-xs sm:max-w-md lg:max-w-none lg:w-auto h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
