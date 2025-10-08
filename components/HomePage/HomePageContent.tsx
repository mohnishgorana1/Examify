"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { useUser } from "@clerk/nextjs";

gsap.registerPlugin(ScrollTrigger);

export default function HomePageContent() {
  const { user, isLoaded } = useUser();

  const homeClientHeadingText = user
    ? [{ text: "Welcome" }, { text: "back," }, { text: `${user.firstName} 👋` }]
    : [{ text: "Why" }, { text: "Choose" }, { text: "Examify ?" }];

  const features = user
    ? [
        {
          title: "Quick Access",
          desc: "Access your recent exams, notifications, and messages instantly. Never miss a deadline or an important update.",
        },
        {
          title: "Personal Dashboard",
          desc: "Everything you need in one place — view your results, review past attempts, and track overall progress metrics easily.",
        },
        {
          title: "Secure Platform",
          desc: "Your data and exam records are stored safely and privately, protected by modern encryption and security best practices.",
        },
      ]
    : [
        {
          title: "Easy Exam Creation",
          desc: "Create and schedule exams with flexible formats — including MCQ, Subjective, and fill-in-the-blank question types.",
        },
        {
          title: "Role-Based Dashboards",
          desc: "Students, Instructors, and Admins have tailored interfaces for maximum efficiency and relevant feature access.",
        },
        {
          title: "Secure & Scalable",
          desc: "Built with best practices to ensure data safety and provide consistent performance even with thousands of concurrent users.",
        },
      ];

  // Enhanced content for the HomeClient Section (replacing the previous generic array)
  const homeClientCards = [
    {
      title: "Exam Scheduling",
      desc: "Set exam dates, duration, and access controls with a few clicks. Manage time zones and student groups seamlessly.",
    },
    {
      title: "Real-time Monitoring",
      desc: "Supervise active exams, track student engagement, and generate instantaneous proctoring alerts.",
    },
    {
      title: "Detailed Analytics",
      desc: "Gain insights into student performance, question difficulty, and overall class results with comprehensive reports.",
    },
  ];

  const roles = [
    {
      role: "Student",
      desc: "Take exams, view results, and track your progress easily. Access study materials and mock tests anytime.",
      href: "/register",
    },
    {
      role: "Instructor",
      desc: "Create, manage, and evaluate exams for your students. Effortlessly grade subjective answers and provide feedback.",
      href: "/register",
    },
    {
      role: "Admin",
      desc: "Manage the platform, users, and permissions with full control. Oversee institutional performance and system security.",
      href: "/register",
    },
  ];

  const testimonials = [
    {
      name: "Anjali Sharma",
      role: "NEET Aspirant",
      feedback:
        "Examify helped me practice hundreds of mock tests with ease and the detailed result analysis showed me exactly where to focus.",
      rating: 5,
    },
    {
      name: "Rohit Mehta",
      role: "Instructor (Physics)",
      feedback:
        "As an instructor, the evaluation dashboard is a game-changer. Grading subjective papers is now faster and much more consistent.",
      rating: 4.5,
    },
    {
      name: "Sneha Kulkarni",
      role: "B.Tech Final Year",
      feedback:
        "The platform is so intuitive! Whether it's for practice exams or semester assessments, Examify is smooth and reliable.",
      rating: 4.8,
    },
    {
      name: "Karan Verma",
      role: "MBA Entrance Student",
      feedback:
        "I used Examify to prepare for CAT and it made a huge difference. The interface mimics the actual exam perfectly.",
      rating: 4.9,
    },
    {
      name: "Dr. Neeta Joshi",
      role: "College Dean",
      feedback:
        "We implemented Examify in our institution to digitize our semester assessments. The setup was easy and the data security is top-notch.",
      rating: 5,
    },
  ];

  useEffect(() => {
    gsap.utils.toArray(".scroll-section").forEach((section: any) => {
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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="relative overflow-hidden text-white bg-neutral-950">
      {/* Hero Section - The starting point of the content is synced with the header's neutral-900 background */}
      <section className="relative overflow-hidden min-h-[85vh] flex flex-col items-center justify-center px-6 md:px-20 py-18  text-center bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950">
        {/* Animated blobs */}
        <div className="absolute w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-4xl mx-auto my-auto animate-fade-in-up">
          {/* Heading Gradient */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            Crack Exams with Confidence
          </h1>
          <p className="text-sm md:text-lg lg:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Examify helps students, instructors, and admins manage, prepare, and
            succeed in online exams — smarter and faster.
          </p>

          {user ? (
            <div className="space-x-5 animate-fade-in-up delay-400">
              <Link href="/register">
                <Button className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-md shadow-indigo-500/40 text-white">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button className="cursor-pointer bg-neutral-50 hover:bg-neutral-200 text-indigo-600 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-md shadow-neutral-300/40 font-semibold">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <Link href={`/dashboard/${user.publicMetadata.role || "student"}`}>
              <Button className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-sm shadow-indigo-500/40">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes blob {
            0%,
            100% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-blob {
            animation: blob 10s infinite ease-in-out;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 5s ease infinite;
          }
        `}</style>
      </section>

      {/* HomeClient Section - UPDATED CONTENT HERE */}
      <section className="scroll-section min-h-[75vh] px-5 py-12 md:py-20 md:px-20 text-center flex flex-col items-center justify-center bg-neutral-950">
        <h2 className="text-4xl font-bold mb-2">
          <TypewriterEffectSmooth
            words={homeClientHeadingText}
            className="text-white"
          />
        </h2>
        <p className="text-neutral-400 mb-8">
          {user
            ? "Continue where you left off, and track your exam performance."
            : "Empowering students and educators to simplify exams with smart tools."}
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-6 text-left">
          {homeClientCards.map((card, i) => (
            <Tilt
              key={i}
              glareEnable
              scale={1.05}
              glareMaxOpacity={0.2}
              className="shadow-lg shadow-neutral-800 bg-neutral-950 border-t border-neutral-800 text-white p-6 rounded-lg hover:shadow-md hover:shadow-indigo-800 transition"
            >
              <h3 className="text-xl font-bold mb-2 text-indigo-500">
                {card.title}
              </h3>
              {/* Using the new descriptive text */}
              <p className="text-neutral-400 text-sm">{card.desc}</p>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Features Section - UPDATED CONTENT IN ARRAY DEFINITION */}
      <section className="scroll-section py-18 px-6 md:px-20 bg-neutral-950">
        <h2 className="text-4xl font-bold text-center mb-14">
          {user ? "Your Personalized Experience" : "Why Choose Examify?"}
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, i) => (
            <Tilt
              key={i}
              glareEnable
              scale={1.05}
              glareMaxOpacity={0.2}
              className="bg-neutral-900 p-6 rounded-2xl shadow-md hover:shadow-indigo-500 transition"
            >
              <h3 className="text-indigo-500 text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-300 text-sm">{feature.desc}</p>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Roles Section - UPDATED CONTENT IN ARRAY DEFINITION */}
      <section className="scroll-section py-18 px-6 md:px-20 text-center bg-neutral-950">
        <h2 className="text-4xl font-bold mb-14 text-indigo-500">
          {user ? "Know Your Role" : "Who is it for?"}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {roles.map(({ role, desc, href }, i) => (
            <Tilt
              key={i}
              glareEnable
              scale={1.05}
              glareMaxOpacity={0.2}
              className="border-t shadow-lg shadow-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-indigo-500 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{role}</h3>
              {/* Using the new descriptive text */}
              <p className="text-neutral-400 text-sm mb-4">{desc}</p>
              {!user && (
                <Link
                  href={href}
                  className="text-indigo-500 font-medium hover:underline"
                >
                  Get Started →
                </Link>
              )}
            </Tilt>
          ))}
        </div>
      </section>

      {/* CTA Section (No content change needed, already descriptive) */}
      <section className="scroll-section py-24 px-6 md:px-20 bg-gradient-to-b from-indigo-600 to-indigo-800 text-center">
        <h2 className="text-4xl font-bold mb-6">
          {user ? "Need Help Navigating?" : "Ready to revolutionize exams?"}
        </h2>
        <p className="text-lg mb-8">
          {user
            ? "Visit your dashboard to manage exams, results, and more."
            : "Join hundreds of users simplifying their online assessments with Examify."}
        </p>
        <Link
          href={user ? `/dashboard/${user.publicMetadata.role}` : "/register"}
        >
          <Button className="bg-neutral-900 text-white cursor-pointer px-8 py-3 rounded-md text-lg font-semibold hover:bg-neutral-950 transition">
            {user ? "Go to Dashboard" : "Get Started Now"}
          </Button>
        </Link>
      </section>

      {/* Testimonials Section - UPDATED CONTENT IN ARRAY DEFINITION */}
      <section className="scroll-section py-24 px-6 md:px-20 bg-neutral-900">
        <h2 className="text-4xl font-bold text-center mb-14">
          What Our Users Say
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Tilt
              key={i}
              glareEnable
              scale={1.05}
              glareMaxOpacity={0.2}
              className="bg-neutral-900 border shadow-lg shadow-neutral-800 rounded-xl p-6 hover:shadow-indigo-500 transition"
            >
              <p className="text-neutral-300 text-sm mb-4">
                &quot;{t.feedback}&quot;
              </p>
              <div>
                <div className="text-indigo-500 font-semibold">{t.name}</div>
                <div className="text-neutral-400 text-sm">{t.role}</div>
                {/* Kept stars yellow for universal rating color */}
                <div className="text-yellow-400 text-sm mt-2">
                  {"★".repeat(Math.floor(t.rating)) + (t.rating % 1 ? "½" : "")}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="scroll-section py-6 text-center text-neutral-500 bg-neutral-950">
        © {new Date().getFullYear()} Examify. All rights reserved.
      </footer>
    </div>
  );
}
