"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUser } from "@clerk/nextjs";
import { useAppUser } from "@/contexts/UserContext";
import { TextShimmerWave } from "../ui/text-shimmer-wave";

import HeroSection from "./HeroSection";
import InstructorDashboardInsights from "./InstructorDashboardInsights";
import LiveStatsSection from "./LiveStatsSection";
import ClientCardsSection from "./ClientCardsSection";
import DataStreamLayoutSection from "./DataStreamLayoutSection";
import UserCardRolesSection from "./UserCardRolesSection";
import NavigatorMessageSection from "./NavigatorMessageSection";
import FAQSection from "./FAQSection";
import TestimonialSection from "./TestimonialSection";
import UserFeatureSection from "./UserFeatureSection";

gsap.registerPlugin(ScrollTrigger);

// ++++++++++ MAIN COMPONENT ++++++++++++++

export default function HomePageContent() {
  const { user, isLoaded } = useUser();
  const { appUser } = useAppUser();

  useEffect(() => {
    // Scroll-based animations for sections
    gsap.utils.toArray(".scroll-section").forEach((section: any) => {
      console.log("scroll section")
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  if (!isLoaded)
    return (
      <main className="w-full h-[90vh] flex items-center my-auto justify-center bg-neutral-950">
        <h1 className="text-white text-lg md:text-2xl ">
          <TextShimmerWave
            className="font-mono text-lg md:text-2xl lg:text-3xl"
            duration={1}
          >
            Loading...
          </TextShimmerWave>
        </h1>
      </main>
    );

  return (
    <div className="relative overflow-hidden text-white bg-neutral-950">
      <section className="">
        <HeroSection user={user} appUser={appUser} />
      </section>

      <section className="scroll-section translate-y-8">
        <InstructorDashboardInsights />
      </section>

      <section className="scroll-section translate-y-8">
        <LiveStatsSection />
      </section>

      <section className="scroll-section translate-y-8 ">
        <ClientCardsSection appUser={appUser} user={user} />
      </section>

      <section className="scroll-section translate-y-8 ">
        <DataStreamLayoutSection />
      </section>

      <section className="scroll-section translate-y-8">
        <UserCardRolesSection user={user} />
      </section>

      <section className="scroll-section translate-y-8">
        <UserFeatureSection />
      </section>

      <section className="scroll-section translate-y-8">
        <NavigatorMessageSection user={user} appUser={appUser} />
      </section>

      <section className="scroll-section translate-y-8">
        <FAQSection />
      </section>

      <section className="scroll-section translate-y-8">
        <TestimonialSection />
      </section>
    </div>
  );
}
