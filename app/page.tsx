import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SimpleCommunicationSection from "./components/SimpleCommunicationSection";
import FeaturesSection from "./components/FeaturesSection";
import WhyNyapaSection from "./components/WhyNyapaSection";
import ClientsSection from "./components/ClientsSection";
import PricingSection from "./components/PricingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import ArticlesSection from "./components/ArticlesSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SimpleCommunicationSection />
        <FeaturesSection />
        <WhyNyapaSection />
        <ClientsSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
        <ArticlesSection />
      </main>
      <Footer />
    </>
  );
}
