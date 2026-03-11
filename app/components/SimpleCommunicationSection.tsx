import Image from "next/image";
import simpleCommHeader from "../images/simple-comm-header.png";
import paperPlane from "../images/paper-plane.png";
import simpleCommMockup from "../images/simple-comm-mockup.png";

export default function SimpleCommunicationSection() {
    return (
        <section id="simple-communication" className="relative bg-[#341145] py-16 md:py-24 overflow-x-clip">
            {/* Yellow Background Shape */}
            <div className="absolute top-48 md:top-56 lg:top-64 right-0 bottom-16 lg:bottom-24 w-[45%] lg:w-[50%] lg:h-[60%] bg-[#FCE346] rounded-l-3xl lg:rounded-l-[3rem] hidden md:block"></div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Image and Airplane */}
                <div className="flex justify-center items-center mb-16 md:mb-20 -mt-8 md:-mt-12">
                    <div className="relative">
                        <Image
                            src={simpleCommHeader}
                            alt="Simple Communication Made Easy"
                            className="h-20 md:h-28 lg:h-45 w-auto object-contain"
                        />
                        <Image
                            src={paperPlane}
                            alt="Paper plane"
                            className="absolute -top-6 -right-16 md:-top-10 md:-right-24 lg:-top-4 lg:-right-40 h-16 md:h-24 lg:h-32 w-auto object-contain drop-shadow-xl"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white space-y-5 lg:pr-8">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-light leading-snug">
                            Bangun kedekatan pelanggan<br />
                            lewat <span className="font-bold">percakapan sederhana.</span>
                        </h2>

                        <div className="space-y-4 text-sm md:text-base text-purple-50/90 font-light">
                            <p>
                                Nyapa membantu bisnis menjangkau<br className="hidden md:block" />
                                pelanggan di satu tempat.
                            </p>
                            <p>
                                mulai dari broadcast pesan, balas chat<br className="hidden md:block" />
                                real-time, hingga kelola data pelanggan<br className="hidden md:block" />
                                dengan lebih personal.
                            </p>
                            <p>
                                Semudah menyapa, seefektif CRM<br className="hidden md:block" />
                                profesional.
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Mockup */}
                    <div className="relative z-10 w-full flex justify-center">
                        <div className="w-full origin-center" style={{ transform: 'scale(1.4)' }}>
                            <Image
                                src={simpleCommMockup}
                                alt="screenshot app"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Yellow Background Shape (Optional depending on design needs) */}
            {/* <div className="absolute bottom-0 right-0 left-0  bg-[#FCE346] md:hidden rounded-t-3xl -z-0"></div> */}
        </section>
    );
}
