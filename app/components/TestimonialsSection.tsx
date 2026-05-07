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
                <div className="text-center mb-10 md:mb-16">
                    <div className="flex justify-center px-4">
                        <Image
                            src={testimoniHeader}
                            alt="Apa kata mereka?"
                            className="w-full max-w-xs sm:max-w-sm md:w-max md:h-max object-contain"
                        />
                    </div>
                </div>

                {/* Infinite Scroll Testimonials */}
                <div className="overflow-hidden">
                    <div className="flex animate-scroll-left w-max">
                        {/* Original set */}
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={`a-${index}`}
                                className="flex-shrink-0 w-64 md:w-80 mx-4 md:mx-8 bg-white rounded-2xl p-5 md:p-6 flex flex-col shadow-md"
                            >
                                <div className="flex items-center gap-3 mb-4 md:mb-5">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-sm md:text-base font-bold shrink-0">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-semibold text-sm md:text-base">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-gray-500 text-xs md:text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                    {testimonial.quote}
                                </p>
                            </div>
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={`b-${index}`}
                                className="flex-shrink-0 w-64 md:w-80 mx-4 md:mx-8 bg-white rounded-2xl p-5 md:p-6 flex flex-col shadow-md"
                            >
                                <div className="flex items-center gap-3 mb-4 md:mb-5">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-sm md:text-base font-bold shrink-0">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="text-gray-900 font-semibold text-sm md:text-base">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-gray-500 text-xs md:text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                    {testimonial.quote}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
