import Image from "next/image";
import chatIcon from "../images/chat-icon.png";
import targetIcon from "../images/target-icon.png";
import crownIcon from "../images/crown-icon.png";
import whyNyapaHeader from "../images/why-nyapa-header.png";
export default function WhyNyapaSection() {
    // const benefits = [
    //     {
    //         icon: "📉",
    //         title: "Cost Efficient",
    //         description: "Hemat biaya operasional dengan menggunakan satu platform untuk semua channel komunikasi.",
    //     },
    //     {
    //         icon: "👥",
    //         title: "Adi Personum",
    //         description: "Personalisasi komunikasi dengan pelanggan untuk meningkatkan engagement.",
    //     },
    //     {
    //         icon: "📈",
    //         title: "Tingkatkan Konversi",
    //         description: "Optimalkan konversi dengan respon yang cepat dan tepat kepada pelanggan.",
    //     },
    // ];

    return (
        <section id="kenapa-nyapa" className="bg-[#341145] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex justify-center">
                        <Image
                        src={whyNyapaHeader}
                        alt="Kenapa bisnismu butuh nyapa?"
                        className="w-max h-auto"
                        />
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-8">
                        <div className="bg-white/20 rounded-2xl py-16 px-2 text-center shadow-lg">
                            <div className="flex">
                                <Image
                                src={chatIcon}
                                alt="Chat message icon"
                                className="w-full h-full mb-10 mt-4 object-contain"
                                />
                            </div>
                            <div className="mb-4 mt-12">
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    Cepat & Efisien
                                </h3>
                                <p className="text-white text-xl font-light">Semua pesan dalam <br /> satu tempat.</p>
                            </div>
                        </div>

                        <div className="bg-white/20 rounded-2xl py-12 px-2 text-center shadow-lg">
                            <div className="flex justify-center">
                                <Image
                                src={targetIcon}
                                alt="Chat message icon"
                                className="w-max h-max mb-4 object-contain"
                                />
                            </div>
                            <div className="mb-4 mt-12">
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    Lebih Personal
                                </h3>
                                <p className="text-white text-xl font-light">Kenali pelanggan lewat <br /> data dan tabel.</p>
                            </div>
                        </div>

                        <div className="bg-white/20 rounded-2xl py-12 px-2 text-center shadow-lg">
                            <div className="flex justify-center">
                                <Image
                                src={crownIcon}
                                alt="Chat message icon"
                                className="w-max h-max mb-4 object-contain"
                                />
                            </div>
                            <div className="mb-4 mt-12">
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    Tingkatkan Loyalitas
                                </h3>
                                <p className="text-white text-xl font-light">Sapa pelanggan secara <br /> konsisten dan hangat.</p>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
}
