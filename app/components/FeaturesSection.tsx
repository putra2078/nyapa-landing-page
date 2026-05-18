// import Image from "next/image";
// import featureTopLeftIcon from "../images/feature-icon-tl.png";
// import featureBottomRightIcon from "../images/feature-icon-br.png";
// import featureHeader from "../images/feature-header.png";
// import textureHero from "../images/texture-hero.png";
// import featureBroadcastIcon from "../images/megaphone.png";
// import featureContactIcon from "../images/contacts.png";
// import featureRealtimeIcon from "../images/lightning.png";
// import featureTeamIcon from "../images/people.png";
// export default function FeaturesSection() {


//     return (
//         <section id="layanan" className="relative bg-[#341145] w-full py-16 md:py-24">
//             {/* Texture Background */}
//             <div className="absolute inset-0 mix-blend-overlay opacity-50">
//                 <Image
//                     src={textureHero}
//                     alt="Background texture"
//                     fill
//                     className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-[#341145] mix-blend-multiply pointer-events-none"></div>
//             </div>
//             <div className="absolute w-[15%] h-[25%] top-0 left-10">
//                 <div className="absolute w-max h-max -top-20 left-0">
//                     <Image
//                         src={featureTopLeftIcon}
//                         alt="feature icon top left"
//                     />
//                 </div>
//             </div>
//             <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 {/* Section Header */}
//                 <div className="flex justify-center w-full h-max mb-12 md:mb-16">
//                     <Image
//                         src={featureHeader}
//                         alt="feature header"
//                         className="w-max h-max object-contain"
//                     />
//                 </div>

//                 {/* Features Grid */}
//                 <div className="grid w-[85%] grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
//                     <div className="relative w-max h-max">
//                         <div className="flex">
//                             <Image
//                                 src={featureBroadcastIcon}
//                                 alt="feature icon top right"
//                                 className="w-[max] h-[max] object-contain"
//                             />
//                             <div className="relative w-max h-max top-0 left-10 text-white">
//                                 <p className="font-bold text-4xl mb-4">Broadcast Pesan Sekali Klik</p>
//                                 <p>Kirim promo & informasi ke banyak <br /> pelanggan sekaligus.</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="relative w-max h-max mt-20">
//                         <div className="flex">
//                             <Image
//                                 src={featureContactIcon}
//                                 alt="feature icon top right"
//                                 className="w-max h-max object-contain"
//                             />
//                             <div className="relative w-max h-max top-0 left-10 text-white">
//                                 <p className="font-bold text-4xl mb-4">Kelola & Label Kontak</p>
//                                 <p>Buat sapaan lebih personal dengan data <br /> pelanggan yang lengkap.</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="relative w-max h-max">
//                         <div className="flex">
//                             <Image
//                                 src={featureRealtimeIcon}
//                                 alt="feature icon top right"
//                                 className="w-max h-max object-contain"
//                             />
//                             <div className="relative w-max h-max top-0 left-10 text-white">
//                                 <p className="font-bold text-4xl mb-4">Chat Real Time, Multi Channel</p>
//                                 <p>Satu dashboard untuk balas pesan dari <br /> berbagai platform.</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="relative w-max h-max mt-20">
//                         <div className="flex">
//                             <Image
//                                 src={featureTeamIcon}
//                                 alt="feature icon top left"
//                                 className="w-max h-max object-contain"
//                             />
//                             <div className="relative w-max h-max top-4 left-10 text-white">
//                                 <p className="font-bold text-4xl mb-4">Tambah Tim Tanpa Batas</p>
//                                 <p>Kolaborasi jadi lebih mudah, semua bisa ikut <br /> menyapa.</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 right-10 w-max h-max">
//                         <div className="absolute -bottom-20 right-0 w-max h-max">
//                             <Image
//                                 src={featureBottomRightIcon}
//                                 alt="feature icon bottom right"
//                                 className="w-max h-max object-contain"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

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
    const features = [
        {
            icon: featureBroadcastIcon,
            title: "Broadcast Pesan Sekali Klik",
            desc: "Kirim promo & informasi ke banyak pelanggan sekaligus.",
        },
        {
            icon: featureContactIcon,
            title: "Kelola & Label Kontak",
            desc: "Buat sapaan lebih personal dengan data pelanggan yang lengkap.",
            offsetDesktop: true,
        },
        {
            icon: featureRealtimeIcon,
            title: "Chat Real Time, Multi Channel",
            desc: "Satu dashboard untuk balas pesan dari berbagai platform.",
        },
        {
            icon: featureTeamIcon,
            title: "Tambah Tim Tanpa Batas",
            desc: "Kolaborasi jadi lebih mudah, semua bisa ikut menyapa.",
            offsetDesktop: true,
            topOffset: true,
        },
    ];

    return (
        <section id="layanan" className="relative bg-[#341145] w-full py-16 md:py-24 z-10">
            {/* Texture Background */}
            <div className="absolute inset-0 mix-blend-overlay opacity-50">
                <Image src={textureHero} alt="Background texture" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#341145] mix-blend-multiply pointer-events-none"></div>
            </div>

            {/* Decorator Top Left - hidden on mobile to avoid overflow */}
            <div className="hidden md:block absolute w-max h-max -top-20 left-10 z-10">
                <Image src={featureTopLeftIcon} alt="feature icon top left" />
            </div>

            {/* Decorator Bottom Right - hidden on mobile to avoid overflow */}
            <div className="hidden md:block absolute -bottom-20 right-10 z-10">
                <Image src={featureBottomRightIcon} alt="feature icon bottom right" />
            </div>

            <div className="relative flex flex-col justify-center items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex justify-center w-full mb-10 md:mb-16">
                    <Image
                        src={featureHeader}
                        alt="feature header"
                        className="w-[80%] sm:w-auto max-w-full h-auto object-contain"
                    />
                </div>

                {/* ====== MOBILE LAYOUT ====== */}
                <div className="flex flex-col gap-8 w-full sm:hidden">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="shrink-0 w-12 h-12 relative">
                                <Image src={f.icon} alt={f.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="text-white">
                                <p className="font-bold text-xl mb-1">{f.title}</p>
                                <p className="text-sm text-purple-100/80 font-light">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ====== DESKTOP LAYOUT (tidak diubah strukturnya) ====== */}
                <div className="hidden sm:grid w-[85%] grid-cols-1 sm:grid-cols-2 gap-4 md:gap-2">
                    <div className="relative w-max h-max">
                        <div className="flex">
                            <Image src={featureBroadcastIcon} alt="broadcast icon" className="w-[max] h-[max] object-contain" />
                            <div className="relative w-max h-max top-0 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Broadcast Pesan Sekali Klik</p>
                                <p>Kirim promo & informasi ke banyak <br /> pelanggan sekaligus.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-max h-max mt-20">
                        <div className="flex">
                            <Image src={featureContactIcon} alt="contact icon" className="w-max h-max object-contain" />
                            <div className="relative w-max h-max top-0 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Kelola & Label Kontak</p>
                                <p>Buat sapaan lebih personal dengan data <br /> pelanggan yang lengkap.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-max h-max">
                        <div className="flex">
                            <Image src={featureRealtimeIcon} alt="realtime icon" className="w-max h-max object-contain" />
                            <div className="relative w-max h-max top-0 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Chat Real Time, Multi Channel</p>
                                <p>Satu dashboard untuk balas pesan dari <br /> berbagai platform.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-max h-max mt-20">
                        <div className="flex">
                            <Image src={featureTeamIcon} alt="team icon" className="w-max h-max object-contain" />
                            <div className="relative w-max h-max top-4 left-10 text-white">
                                <p className="font-bold text-4xl mb-4">Tambah Tim Tanpa Batas</p>
                                <p>Kolaborasi jadi lebih mudah, semua bisa ikut <br /> menyapa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}