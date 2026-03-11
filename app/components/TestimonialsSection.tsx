import Image from "next/image";
import testimoniHeader from "../images/testimoni-header.png";
export default function TestimonialsSection() {
    const testimonials = [
        {
            name: "A. Pratama",
            role: "CEO • Klinik Optik",
            quote:
                '"Sekarang follow-up lebih cepat dan rapi. Pipeline terlihat jelas."',
            avatar: "AP",
        },
        {
            name: "K. Putri",
            role: "Marketing • Dental Group",
            quote:
                '"IG & WA di satu layar. DM jadi gampang di-handle."',
            avatar: "KP",
        },
        {
            name: "I. Saputra",
            role: "Head of Marketing • Education",
            quote:
                '"Konversi janji temu naik 28% setelah alur follow-up dibenahi."',
            avatar: "IS",
        },
        {
            name: "R. Hidayat",
            role: "CEO • Klinik Aman",
            quote:
                '"Sekarang follow-up lebih cepat dan rapi. Pipeline terlihat jelas."',
            avatar: "RH",
        },
    ];

    return (
        <section id="testimoni" className="bg-[#341145] py-16 md:py-24">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex justify-center">
                        <Image
                        src={testimoniHeader}
                        alt="Apa kata mereka?"
                        className="w-max h-max object-contain"
                        />
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 flex flex-col shadow-md"
                        >
                            {/* Author - Top */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-sm font-bold shrink-0">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="text-gray-900 font-semibold text-sm">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-gray-500 text-xs">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {testimonial.quote}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
