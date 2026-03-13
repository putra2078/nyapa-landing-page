import Image from "next/image";
import featureTopLeftIcon from "../images/feature-icon-tl.png";
import featureBottomRightIcon from "../images/feature-icon-br.png";
import featureHeader from "../images/feature-header.png";
import textureHero from "../images/texture-hero.png";
import featureBroadcastIcon from "../images/megaphone.png";
import featureContactIcon from "../images/contacts.png";
import featureRealtimeIcon from "../images/lightning.png";
import featureTeamIcon from "../images/people.png";
export default function FeaturesSection() {


    return (
        <section id="layanan" className="relative bg-[#341145] w-full py-16 md:py-24">
            {/* Texture Background */}
            <div className="absolute inset-0 mix-blend-overlay opacity-50">
                <Image
                    src={textureHero}
                    alt="Background texture"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[#341145] mix-blend-multiply pointer-events-none"></div>
            </div>
            <div className="absolute w-[15%] h-[25%] top-0 left-10">
                <div className="absolute w-max h-max -top-20 left-0">
                    <Image
                        src={featureTopLeftIcon}
                        alt="feature icon top left"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex justify-center w-full h-max mb-12 md:mb-16">
                    <Image
                        src={featureHeader}
                        alt="feature header"
                        className="w-max h-max object-contain"
                    />
                </div>

                {/* Features Grid */}
                <div className="grid w-[85%] grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
                    <div className="relative w-max h-max">
                        <div className="flex">
                            <Image
                                src={featureBroadcastIcon}
                                alt="feature icon top right"
                                className="w-[max] h-[max] object-contain"
                            />
                            <div className="relative w-max h-max top-0 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Broadcast Pesan Sekali Klik</p>
                                <p>Kirim promo & informasi ke banyak <br /> pelanggan sekaligus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-max h-max mt-20">
                        <div className="flex">
                            <Image
                                src={featureContactIcon}
                                alt="feature icon top right"
                                className="w-max h-max object-contain"
                            />
                            <div className="relative w-max h-max top-0 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Kelola & Label Kontak</p>
                                <p>Buat sapaan lebih personal dengan data <br /> pelanggan yang lengkap.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-max h-max">
                        <div className="flex">
                            <Image
                                src={featureRealtimeIcon}
                                alt="feature icon top right"
                                className="w-max h-max object-contain"
                            />
                            <div className="relative w-max h-max top-0 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Chat Real Time, Multi Channel</p>
                                <p>Satu dashboard untuk balas pesan dari <br /> berbagai platform.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-max h-max mt-20">
                        <div className="flex">
                            <Image
                                src={featureTeamIcon}
                                alt="feature icon top left"
                                className="w-max h-max object-contain"
                            />
                            <div className="relative w-max h-max top-4 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Tambah Tim Tanpa Batas</p>
                                <p>Kolaborasi jadi lebih mudah, semua bisa ikut <br /> menyapa.</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-10 w-max h-max">
                        <div className="absolute -bottom-20 right-0 w-max h-max">
                            <Image
                                src={featureBottomRightIcon}
                                alt="feature icon bottom right"
                                className="w-max h-max object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
