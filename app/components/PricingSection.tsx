import Image from "next/image";
import pricingHeader from "../images/pricing-header.png";
import Link from "next/link";

export default function PricingSection() {
    const plans = [
        {
            name: "Starter",
            price: "Rp149rb",
            period: "per bulan",
            features: [
                "Kontak & pelanggan dasar",
                "Inbox multichannel (1 channel)",
                "Template pesan",
            ],
            cta: "Pilih",
            highlight: false,
            badge: null,
            ctaStyle: "orange",
        },
        {
            name: "Growth",
            price: "Rp499rb",
            period: "per bulan",
            features: [
                "Semua di Starter",
                "2–3 channel (WA/IG/FB)",
                "Automasi dasar & tag",
                "Laporan ringkas",
            ],
            cta: "Pilih",
            highlight: true,
            badge: "Most Popular",
            ctaStyle: "orange",
        },
        {
            name: "Pro",
            price: "Rp1.199jt",
            period: "per bulan",
            features: [
                "Semua di Growth",
                "5 channel + Webhook",
                "Automasi lanjutan",
                "Reporting & dashboard",
            ],
            cta: "Pilih",
            highlight: false,
            badge: null,
            ctaStyle: "orange",
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "sesuai kebutuhan",
            features: [
                "Integrasi khusus & SLA",
                "Jumlah channel fleksibel",
                "Keamanan & audit",
                "Dukungan prioritas",
            ],
            cta: "Hubungi Sales",
            highlight: false,
            badge: null,
            ctaStyle: "orange",
        },
    ];

    return (
        <section id="harga" className="bg-[#341145] py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex justify-center">
                        <Image
                        src={pricingHeader}
                        alt="Pilih paket yang pas untuk tim kamu"
                        className="w-max h-max object-contain"
                        />
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-2xl p-7 flex flex-col shadow-lg"
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-[#FF5100] text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3">
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-1">
                                <span className="text-3xl font-bold text-[#FF5100]">
                                    {plan.price}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mb-5">{plan.period}</p>

                            {/* Features */}
                            <ul className="space-y-2 mb-8 flex-1">
                                {plan.features.map((feature, fIndex) => (
                                    <li
                                        key={fIndex}
                                        className="text-gray-700 text-sm"
                                    >
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link
                                href="#"
                                className="block text-center bg-[#FF5100] hover:bg-orange-600 text-white rounded-xl py-3 px-6 font-semibold text-sm transition-colors"
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
