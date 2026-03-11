import Image from "next/image";
import medisyIcon from "../images/medisy.png";
import klinikKeluargaIcon from "../images/klinik-keluarga.png";
import klinikGigiIcon from "../images/klinik-gigi.png";
import apotekIcon from "../images/apotek.png";
import bidanIcon from "../images/bidan.png";
import ningrumIcon from "../images/ningrum.png";
import homeyIcon from "../images/homey.png";
import royalKesturiIcon from "../images/royal-kesturi.png";
import clientHeader from "../images/client-header.png";
export default function ClientsSection() {
    // Placeholder brand names/logos
    const clients = [
        medisyIcon,
        klinikKeluargaIcon,
        klinikGigiIcon,
        apotekIcon,
        bidanIcon,
        ningrumIcon,
        homeyIcon,
        royalKesturiIcon,
    ];

    return (
        <section id="klien" className="bg-[#341145]">
            {/* Section Header */}
                <div className="flex justify-center text-center mb-12">
                    <Image
                    src={clientHeader}
                    alt="Mereka yang sudah menyapa"
                    className="w-max h-max object-contain"
                    />
                </div>
            <div className="w-full px-4 sm:px-6 lg:px-8 bg-orange-500 py-16">
                {/* Client Logos Grid */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="w-24 h-12 md:w-36 md:h-18 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium"
                        >
                            <Image
                            src={client}
                            alt="Company logo"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
