import Link from "next/link";
import Image from "next/image";
import heroIllustration from "../images/hero-illustration.png";
import heroText from "../images/hero-main-text.png";
import whatsappIcon from "../images/whatsapp-icon.png";
import computerBottomLeft from "../images/computer-hero-bottomleft.png";
import computerTopRight from "../images/computer-hero-topright.png";
import textureHero from "../images/texture-hero.png";

export default function HeroSection() {
    return (
        <section id="hero" className="relative overflow-hidden pt-16">
            {/* Background Base - Orange */}
            <div className="absolute inset-0 bg-[#FF5100]"></div>

            {/* Background Diagonal - Purple */}
            <div
                className="absolute inset-0 bg-[#341145]"
                style={{ clipPath: 'polygon(0 40%, 100% 80%, 100% 100%, 0% 100%)' }}
            >
                <div className="absolute inset-0 mix-blend-overlay opacity-50">
                    <Image
                        src={textureHero}
                        alt="Background texture"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                {/* Purple overlay to ensure it is dark purple */}
                <div className="absolute inset-0 bg-[#341145]/60 mix-blend-multiply pointer-events-none"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    {/* Right Content - Image/Illustration Placeholder */}
                    <div className="flex justify-start lg:justify-end">
                        <Image
                            src={heroIllustration}
                            alt="Hero Illustration"
                            className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
                            priority
                        />
                    </div>
                    <div className="flex justify-center lg:justify-start">
                        <div className="absolute top-1/6 right-1/4">
                            <Image
                                src={heroText}
                                alt="Hero Text"
                                className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
                                priority
                            />
                        </div>
                        <div className="absolute top-1/8 right-2/12">
                            <Image
                                src={whatsappIcon}
                                alt="WhatsApp Icon"
                                className="w-max h-max"
                                priority
                            />
                        </div>
                        <div className="absolute">
                            <button className="bg-purple-900 w-max px-8 h-12 rounded-full font-bold">
                                Coba Gratis 1 Bulan!
                            </button>
                        </div>
                    </div>

                    {/* Left Content */}
                    <div className="text-white space-y-6">

                    </div>

                </div>
            </div>
            {/* Device mockups section - Overlapping the bottom boundary */}
            <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-0 lg:-mt-12 pb-16 md:pb-32">
                <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center">

                    {/* Background Text and Button (Centered) */}
                    <div className="relative z-20 text-center flex flex-col items-center max-w-2xl px-4 pointer-events-auto mt-20 md:mt-0">
                        <p className="text-white text-xl md:text-2xl lg:text-3xl font-light leading-snug mb-8">
                            Satu aplikasi untuk chat, broadcast,<br className="hidden md:block" />
                            dan <span className="font-bold">kelola pelanggan lebih rapi.</span>
                        </p>
                        <Link href="#" className="bg-[#FF5100] hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg">
                            Coba Gratis Sekarang!
                        </Link>
                    </div>

                    {/* Left Laptop */}
                    <div className="absolute left-0 bottom-1/6 w-[55%] md:w-[40%] lg:w-[30%] z-10 -ml-12 md:-ml-16 lg:-ml-8 translate-y-28 md:translate-y-20">
                        <Image
                            src={computerBottomLeft}
                            alt="Tampilan laptop di kiri bawah"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>

                    {/* Right Tablet */}
                    <div className="absolute right-0 top-1/4 w-[60%] md:w-[45%] lg:w-[35%] z-10 -mr-16 md:-mr-20 lg:-mr-12 -translate-y-16 md:-translate-y-24">
                        <Image
                            src={computerTopRight}
                            alt="Tampilan tablet di kanan atas"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}
