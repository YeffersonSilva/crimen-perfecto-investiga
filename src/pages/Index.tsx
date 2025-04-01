
import AppLayout from "@/components/AppLayout";
import HeroSection from "@/components/HeroSection";
import FeaturedCases from "@/components/FeaturedCases";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <AppLayout>
      <HeroSection />
      <FeaturedCases />
      <PricingSection />
      <TestimonialSection />
    </AppLayout>
  );
};

export default Index;
