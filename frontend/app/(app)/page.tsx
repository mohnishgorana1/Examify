import CTASection from "@/components/HomePage/CTASection";
import FeaturesSection from "@/components/HomePage/FeaturesSection";
import HomeClient from "@/components/HomePage/HomeClient";
import HeroSection from "@/components/HomePage/HeroSection";
import UserRolesSection from "@/components/HomePage/UserRolesSection";
import React from "react";
function HomePage() {
  return (
    <main>
      <HeroSection />
      <section className="py-10 px-4 md:px-12 bg-gray-50">
        <HomeClient />
      </section>
      <FeaturesSection />
      <UserRolesSection />
      <CTASection />
    </main>
  );
}

export default HomePage;
