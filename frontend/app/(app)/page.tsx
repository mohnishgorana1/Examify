import CTASection from "@/components/HomePage/CTASection";
import FeaturesSection from "@/components/HomePage/FeaturesSection";
import HomeClient from "@/components/HomePage/HomeClient";
import HeroSection from "@/components/HomePage/HeroSection";
import UserRolesSection from "@/components/HomePage/UserRolesSection";
import React from "react";
import TestimonialSection from "@/components/HomePage/Testimonials";
function HomePage() {
  return (
    <main className="bg-neutral-900">
      <HeroSection />
      <HomeClient />
      <FeaturesSection />
      <UserRolesSection />
      <CTASection />
      <TestimonialSection />
    </main>
  );
}

export default HomePage;
