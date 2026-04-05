import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import QuoteForm from "@/components/QuoteForm";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <QuoteForm />
      <MapSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
