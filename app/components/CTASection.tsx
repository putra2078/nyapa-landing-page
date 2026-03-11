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
                    <div className="text-center lg:text-left">
                        <div className="flex justify-start">
                            <Image
                                src={ctaHeader}
                                alt="Mulai menyapa pelangganmu hari ini !"
                                className="w-max h-max object-contain"
                            />
                        </div>
                        <Link
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-12 py-4 text-base font-semibold text-white hover:bg-orange-600 transition-colors"
                        >
                            Coba Gratis Sekarang!
                        </Link>
                    </div>

                    {/* Right - Illustration Placeholder */}
                    <div className="flex justify-center lg:justify-end">
                        <Image
                            src={ctaIllustration}
                            alt="Illustration"
                            className="w-max h-max object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
