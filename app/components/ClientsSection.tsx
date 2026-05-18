// import Image from "next/image";
// import medisyIcon from "../images/medisy.png";
// import klinikKeluargaIcon from "../images/klinik-keluarga.png";
// import klinikGigiIcon from "../images/klinik-gigi.png";
// import apotekIcon from "../images/apotek.png";
// import bidanIcon from "../images/bidan.png";
// import ningrumIcon from "../images/ningrum.png";
// import homeyIcon from "../images/homey.png";
// import royalKesturiIcon from "../images/royal-kesturi.png";
// import clientHeader from "../images/client-header.png";

// export default function ClientsSection() {
//     const clients = [
//         medisyIcon,
//         klinikKeluargaIcon,
//         klinikGigiIcon,
//         apotekIcon,
//         bidanIcon,
//         ningrumIcon,
//         homeyIcon,
//         royalKesturiIcon,
//     ];

//     return (
//         <section id="klien" className="bg-[#341145]">
//             {/* Section Header */}
//             <div className="flex justify-center text-center mb-12">
//                 <Image
//                     src={clientHeader}
//                     alt="Mereka yang sudah menyapa"
//                     className="w-max h-max object-contain"
//                 />
//             </div>

//             {/* Infinite Scroll Marquee */}
//             <div className="w-full bg-orange-500 py-16 overflow-hidden">
//                 <div className="flex animate-scroll-left w-max">
//                     {/* Original set */}
//                     {clients.map((client, index) => (
//                         <div
//                             key={`a-${index}`}
//                             className="flex-shrink-0 w-24 h-12 md:w-36 md:h-18 mx-6 md:mx-10 rounded-lg flex items-center justify-center"
//                         >
//                             <Image src={client} alt="Company logo" />
//                         </div>
//                     ))}
//                     {/* Duplicate set for seamless loop */}
//                     {clients.map((client, index) => (
//                         <div
//                             key={`b-${index}`}
//                             className="flex-shrink-0 w-24 h-12 md:w-36 md:h-18 mx-6 md:mx-10 rounded-lg flex items-center justify-center"
//                         >
//                             <Image src={client} alt="Company logo" />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }


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
            <div className="flex justify-center text-center mb-8 md:mb-12 px-4">
                <Image
                    src={clientHeader}
                    alt="Mereka yang sudah menyapa"
                    className="w-full max-w-xs sm:max-w-sm md:w-max md:h-max object-contain"
                />
            </div>

            {/* Infinite Scroll Marquee */}
            <div className="w-full bg-orange-500 py-8 md:py-16 overflow-hidden">
                <div className="flex animate-scroll-left w-max">
                    {/* Original set */}
                    {clients.map((client, index) => (
                        <div
                            key={`a-${index}`}
                            className="flex-shrink-0 w-16 h-10 md:w-36 md:h-18 mx-4 md:mx-10 rounded-lg flex items-center justify-center"
                        >
                            <Image
                                src={client}
                                alt="Company logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {clients.map((client, index) => (
                        <div
                            key={`b-${index}`}
                            className="flex-shrink-0 w-16 h-10 md:w-36 md:h-18 mx-4 md:mx-10 rounded-lg flex items-center justify-center"
                        >
                            <Image
                                src={client}
                                alt="Company logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}