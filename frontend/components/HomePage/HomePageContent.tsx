"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Button } from "../ui/button";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

gsap.registerPlugin(ScrollTrigger);

export default function UltraProHomePage() {
  const { user } = useAuth();

  const homeClientHeadingText = user
    ? [{ text: "Welcome" }, { text: "back," }, { text: `${user.name} 👋` }]
    : [{ text: "Why" }, { text: "Choose" }, { text: "Examify ?" }];

  const features = user
    ? [
        {
          title: "Quick Access",
          desc: "Access your recent exams, notifications, and messages instantly.",
        },
        {
          title: "Personal Dashboard",
          desc: "Everything you need in one place — results, attempts, and more.",
        },
        {
          title: "Secure Platform",
          desc: "Your data and exam records are stored safely and privately.",
        },
      ]
    : [
        {
          title: "Easy Exam Creation",
          desc: "Create and schedule exams with flexible formats — MCQ, Subjective, and more.",
        },
        {
          title: "Role-Based Dashboards",
          desc: "Students, Instructors, and Admins have tailored interfaces for efficiency.",
        },
        {
          title: "Secure & Scalable",
          desc: "Built with best practices to ensure data safety and performance at scale.",
        },
      ];

  const roles = [
    {
      role: "Student",
      desc: "Take exams, view results, and track your progress easily.",
      href: "/register",
    },
    {
      role: "Instructor",
      desc: "Create, manage, and evaluate exams for your students.",
      href: "/register",
    },
    {
      role: "Admin",
      desc: "Manage the platform, users, and permissions with full control.",
      href: "/register",
    },
  ];

  const testimonials = [
    {
      name: "Anjali Sharma",
      role: "NEET Aspirant",
      feedback:
        "Examify helped me practice hundreds of mock tests with ease...",
      rating: 5,
    },
    {
      name: "Rohit Mehta",
      role: "Instructor (Physics)",
      feedback: "As an instructor, the dashboard is a game-changer...",
      rating: 4.5,
    },
    {
      name: "Sneha Kulkarni",
      role: "B.Tech Final Year",
      feedback:
        "The platform is so intuitive! Whether it's for practice exams...",
      rating: 4.8,
    },
    {
      name: "Karan Verma",
      role: "MBA Entrance Student",
      feedback:
        "I used Examify to prepare for CAT and it made a huge difference...",
      rating: 4.9,
    },
    {
      name: "Dr. Neeta Joshi",
      role: "College Dean",
      feedback:
        "We implemented Examify in our institution to digitize our semester assessments...",
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

  return (
    <div className="relative overflow-hidden bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-20 py-24 text-center bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950">
        {/* Animated blobs */}
        <div className="absolute w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Crack Exams with Confidence
          </h1>
          <p className="text-sm md:text-lg lg:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Examify helps students, instructors, and admins manage, prepare, and
            succeed in online exams — smarter and faster.
          </p>

          {!user ? (
            <div className="space-x-5 animate-fade-in-up delay-400">
              <Link href="/register">
                <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-orange-500/40">
                  Get Started
                </Button>
              </Link>
              <Link href="/login">
                <Button className="cursor-pointer bg-neutral-50 hover:bg-neutral-200 text-orange-500 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-neutral-300/40">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <Link href={`/dashboard/${user?.role || "student"}`}>
              <Button className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-sm shadow-orange-500/40">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>

        {/* Blob animations */}
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

      {/* HomeClient Section */}
      <section className="scroll-section min-h-[75vh] px-5 py-12 md:py-24 md:px-20 text-center flex flex-col items-center justify-center">
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
        <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
          {["Your Exams", "Role Based Access", "Your Analytics"].map(
            (title, i) => (
              <Tilt
                key={i}
                glareEnable={true}
                glareMaxOpacity={0.2}
                scale={1.05}
                className="bg-neutral-800 p-6 rounded-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-neutral-400 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </Tilt>
            )
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="scroll-section py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          {user ? "Your Personalized Experience" : "Why Choose Examify?"}
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, i) => (
            <Tilt
              key={i}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.05}
              className="bg-neutral-800 p-6 rounded-2xl hover:shadow-orange-500 transition"
            >
              <h3 className="text-orange-500 text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-300 text-sm">{feature.desc}</p>
            </Tilt>
          ))}
        </div>
      </section>

      {/* User Roles Section */}
      <section className="scroll-section py-24 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-14">
          {user ? "Know Your Role" : "Who is it for?"}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {roles.map(({ role, desc, href }, i) => (
            <Tilt
              key={i}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.05}
              className="border p-6 rounded-lg hover:shadow-orange-500 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{role}</h3>
              <p className="text-neutral-400 text-sm mb-4">{desc}</p>
              {!user && (
                <Link
                  href={href}
                  className="text-orange-500 font-medium hover:underline"
                >
                  Get Started →
                </Link>
              )}
            </Tilt>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="scroll-section py-24 px-6 md:px-20 bg-gradient-to-b from-orange-500 to-orange-700 text-center">
        <h2 className="text-4xl font-bold mb-6">
          {user ? "Need Help Navigating?" : "Ready to revolutionize exams?"}
        </h2>
        <p className="text-lg mb-8">
          {user
            ? "Visit your dashboard to manage exams, results, and more."
            : "Join hundreds of users simplifying their online assessments with Examify."}
        </p>
        <Link href={user ? `/dashboard/${user.role}` : "/register"}>
          <button className="bg-neutral-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-neutral-800 transition">
            {user ? "Go to Dashboard" : "Get Started Now"}
          </button>
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="scroll-section py-24 px-6 md:px-20 bg-neutral-900">
        <h2 className="text-4xl font-bold text-center mb-14">
          What Our Users Say
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Tilt
              key={i}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.05}
              className="bg-neutral-800 rounded-xl p-6 hover:shadow-orange-500 transition"
            >
              <p className="text-neutral-300 text-sm mb-4">
                &quot;{t.feedback}&quot;
              </p>
              <div>
                <div className="text-orange-500 font-semibold">{t.name}</div>
                <div className="text-neutral-400 text-sm">{t.role}</div>
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

//! 2
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import Link from "next/link";
// import { Button } from "../ui/button";

// import { motion } from "framer-motion";
// import Tilt from "react-parallax-tilt";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

// gsap.registerPlugin(ScrollTrigger);

// export default function UltraProHomePage() {
//   const { user } = useAuth();

//   const homeClientHeadingText = user
//     ? [
//         {
//           text: `Welcome`,
//         },
//         {
//           text: "back,",
//         },
//         {
//           text: `${user.name} 👋`,
//         },
//       ]
//     : [
//         {
//           text: "Why",
//         },
//         {
//           text: "Choose",
//         },
//         {
//           text: "Examify ?",
//         },
//       ];

//   const features = user
//     ? [
//         {
//           title: "Quick Access",
//           desc: "Access your recent exams, notifications, and messages instantly.",
//         },
//         {
//           title: "Personal Dashboard",
//           desc: "Everything you need in one place — results, attempts, and more.",
//         },
//         {
//           title: "Secure Platform",
//           desc: "Your data and exam records are stored safely and privately.",
//         },
//       ]
//     : [
//         {
//           title: "Easy Exam Creation",
//           desc: "Create and schedule exams with flexible formats — MCQ, Subjective, and more.",
//         },
//         {
//           title: "Role-Based Dashboards",
//           desc: "Students, Instructors, and Admins have tailored interfaces for efficiency.",
//         },
//         {
//           title: "Secure & Scalable",
//           desc: "Built with best practices to ensure data safety and performance at scale.",
//         },
//       ];

//   const roles = [
//     {
//       role: "Student",
//       desc: "Take exams, view results, and track your progress easily.",
//       href: "/register",
//     },
//     {
//       role: "Instructor",
//       desc: "Create, manage, and evaluate exams for your students.",
//       href: "/register",
//     },
//     {
//       role: "Admin",
//       desc: "Manage the platform, users, and permissions with full control.",
//       href: "/register",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Anjali Sharma",
//       role: "NEET Aspirant",
//       feedback:
//         "Examify helped me practice hundreds of mock tests with ease...",
//       rating: 5,
//     },
//     {
//       name: "Rohit Mehta",
//       role: "Instructor (Physics)",
//       feedback: "As an instructor, the dashboard is a game-changer...",
//       rating: 4.5,
//     },
//     {
//       name: "Sneha Kulkarni",
//       role: "B.Tech Final Year",
//       feedback:
//         "The platform is so intuitive! Whether it's for practice exams...",
//       rating: 4.8,
//     },
//     {
//       name: "Karan Verma",
//       role: "MBA Entrance Student",
//       feedback:
//         "I used Examify to prepare for CAT and it made a huge difference...",
//       rating: 4.9,
//     },
//     {
//       name: "Dr. Neeta Joshi",
//       role: "College Dean",
//       feedback:
//         "We implemented Examify in our institution to digitize our semester assessments...",
//       rating: 5,
//     },
//   ];

//   useEffect(() => {
//     // Animate sections on scroll
//     gsap.utils.toArray(".scroll-section").forEach((section: any) => {
//       gsap.from(section, {
//         opacity: 0,
//         y: 50,
//         duration: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//       });
//     });
//   }, []);

//   return (
//     <div className="relative overflow-hidden bg-neutral-950 text-white">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-20 py-24 text-center bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950">
//         {/* Animated blobs */}
//         <div className="absolute w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

//         <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
//           {/* Headline with animated gradient */}
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
//             Crack Exams with Confidence
//           </h1>

//           <p className="text-sm md:text-lg lg:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
//             Examify helps students, instructors, and admins manage, prepare, and
//             succeed in online exams — smarter and faster.
//           </p>

//           {/* Buttons */}
//           {!user ? (
//             <div className="space-x-5 animate-fade-in-up delay-400">
//               <Link href="/register">
//                 <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-orange-500/40">
//                   Get Started
//                 </Button>
//               </Link>
//               <Link href="/login">
//                 <Button className="cursor-pointer bg-neutral-50 hover:bg-neutral-200 text-orange-500 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-neutral-300/40">
//                   Login
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Link href={`/dashboard/${user?.role || "student"}`}>
//               <Button className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-sm shadow-orange-500/40">
//                 Go to Dashboard
//               </Button>
//             </Link>
//           )}
//         </div>

//         {/* Blob animations */}
//         <style jsx>{`
//           @keyframes blob {
//             0%,
//             100% {
//               transform: translate(0px, 0px) scale(1);
//             }
//             33% {
//               transform: translate(30px, -50px) scale(1.1);
//             }
//             66% {
//               transform: translate(-20px, 20px) scale(0.9);
//             }
//           }
//           .animate-blob {
//             animation: blob 10s infinite ease-in-out;
//           }
//           .animation-delay-2000 {
//             animation-delay: 2s;
//           }
//           .animation-delay-4000 {
//             animation-delay: 4s;
//           }
//           @keyframes fadeInUp {
//             0% {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             100% {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-fade-in-up {
//             animation: fadeInUp 1s forwards;
//           }
//           .delay-200 {
//             animation-delay: 0.2s;
//           }
//           .delay-400 {
//             animation-delay: 0.4s;
//           }
//           @keyframes gradientShift {
//             0% {
//               background-position: 0% 50%;
//             }
//             50% {
//               background-position: 100% 50%;
//             }
//             100% {
//               background-position: 0% 50%;
//             }
//           }
//           .animate-gradient {
//             background-size: 200% 200%;
//             animation: gradientShift 5s ease infinite;
//           }
//         `}</style>
//       </section>

//       {/* HomeClient Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="min-h-[75vh] px-5 py-12 md:py-24 md:px-20 text-center flex flex-col items-center justify-center"
//       >
//         {user ? (
//           <motion.h2 className="text-4xl font-bold mb-2">
//             <TypewriterEffectSmooth words={homeClientHeadingText}  className="text-white"/>
//           </motion.h2>
//         ) : (
//           <motion.h2 className="text-3xl font-semibold mb-2">
//             <TypewriterEffectSmooth words={homeClientHeadingText} className="text-white" />
//           </motion.h2>
//         )}
//         <motion.p className="text-neutral-400 mb-8">
//           {user
//             ? "Continue where you left off, and track your exam performance."
//             : "Empowering students and educators to simplify exams with smart tools."}
//         </motion.p>
//         <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
//           {["Your Exams", "Role Based Access", "Your Analytics"].map(
//             (title, i) => (
//               <Tilt
//                 key={i}
//                 glareEnable={true}
//                 glareMaxOpacity={0.2}
//                 scale={1.05}
//                 className="bg-neutral-800 p-6 rounded-lg hover:shadow-xl transition"
//               >
//                 <h3 className="text-xl font-bold mb-2">{title}</h3>
//                 <p className="text-neutral-400 text-sm">
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 </p>
//               </Tilt>
//             )
//           )}
//         </div>
//       </motion.section>

//       {/* Features Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="py-24 px-6 md:px-20"
//       >
//         <h2 className="text-4xl font-bold text-center mb-14">
//           {user ? "Your Personalized Experience" : "Why Choose Examify?"}
//         </h2>
//         <div className="grid gap-10 md:grid-cols-3">
//           {features.map((feature, i) => (
//             <Tilt
//               key={i}
//               glareEnable={true}
//               glareMaxOpacity={0.2}
//               scale={1.05}
//               className="bg-neutral-800 p-6 rounded-2xl hover:shadow-orange-500 transition"
//             >
//               <h3 className="text-orange-500 text-xl font-semibold mb-3">
//                 {feature.title}
//               </h3>
//               <p className="text-neutral-300 text-sm">{feature.desc}</p>
//             </Tilt>
//           ))}
//         </div>
//       </motion.section>

//       {/* User Roles Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="py-24 px-6 md:px-20 text-center"
//       >
//         <h2 className="text-4xl font-bold mb-14">
//           {user ? "Know Your Role" : "Who is it for?"}
//         </h2>
//         <div className="grid gap-8 md:grid-cols-3">
//           {roles.map(({ role, desc, href }, i) => (
//             <Tilt
//               key={i}
//               glareEnable={true}
//               glareMaxOpacity={0.2}
//               scale={1.05}
//               className="border p-6 rounded-lg hover:shadow-orange-500 transition"
//             >
//               <h3 className="text-xl font-semibold mb-2">{role}</h3>
//               <p className="text-neutral-400 text-sm mb-4">{desc}</p>
//               {!user && (
//                 <Link
//                   href={href}
//                   className="text-orange-500 font-medium hover:underline"
//                 >
//                   Get Started →
//                 </Link>
//               )}
//             </Tilt>
//           ))}
//         </div>
//       </motion.section>

//       {/* CTA Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="py-24 px-6 md:px-20 bg-gradient-to-b from-orange-500 to-orange-700 text-center"
//       >
//         <h2 className="text-4xl font-bold mb-6">
//           {user ? "Need Help Navigating?" : "Ready to revolutionize exams?"}
//         </h2>
//         <p className="text-lg mb-8">
//           {user
//             ? "Visit your dashboard to manage exams, results, and more."
//             : "Join hundreds of users simplifying their online assessments with Examify."}
//         </p>
//         <Link href={user ? `/dashboard/${user.role}` : "/register"}>
//           <button className="bg-neutral-900 px-8 py-3 rounded-md text-lg font-semibold hover:bg-neutral-800 transition">
//             {user ? "Go to Dashboard" : "Get Started Now"}
//           </button>
//         </Link>
//       </motion.section>

//       {/* Testimonials Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="py-24 px-6 md:px-20 bg-neutral-900"
//       >
//         <h2 className="text-4xl font-bold text-center mb-14">
//           What Our Users Say
//         </h2>
//         <div className="grid gap-10 md:grid-cols-3">
//           {testimonials.map((t, i) => (
//             <Tilt
//               key={i}
//               glareEnable={true}
//               glareMaxOpacity={0.2}
//               scale={1.05}
//               className="bg-neutral-800 rounded-xl p-6 hover:shadow-orange-500 transition"
//             >
//               <p className="text-neutral-300 text-sm mb-4">
//                 &quot;{t.feedback}&quot;
//               </p>
//               <div>
//                 <div className="text-orange-500 font-semibold">{t.name}</div>
//                 <div className="text-neutral-400 text-sm">{t.role}</div>
//                 <div className="text-yellow-400 text-sm mt-2">
//                   {"★".repeat(Math.floor(t.rating)) + (t.rating % 1 ? "½" : "")}
//                 </div>
//               </div>
//             </Tilt>
//           ))}
//         </div>
//       </motion.section>

//       {/* Footer */}
//       <motion.footer
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="py-6 text-center text-neutral-500 bg-neutral-950"
//       >
//         © {new Date().getFullYear()} Examify. All rights reserved.
//       </motion.footer>
//     </div>
//   );
// }

//! 1
// "use client";
// import React from "react";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { useAuth } from "@/context/AuthContext";
// function HomePageContent() {
//   const { user } = useAuth();

//   const features = user
//     ? [
//         {
//           title: "Quick Access",
//           desc: "Access your recent exams, notifications, and messages instantly.",
//         },
//         {
//           title: "Personal Dashboard",
//           desc: "Everything you need in one place — results, attempts, and more.",
//         },
//         {
//           title: "Secure Platform",
//           desc: "Your data and exam records are stored safely and privately.",
//         },
//       ]
//     : [
//         {
//           title: "Easy Exam Creation",
//           desc: "Create and schedule exams with flexible formats — MCQ, Subjective, and more.",
//         },
//         {
//           title: "Role-Based Dashboards",
//           desc: "Students, Instructors, and Admins have tailored interfaces for efficiency.",
//         },
//         {
//           title: "Secure & Scalable",
//           desc: "Built with best practices to ensure data safety and performance at scale.",
//         },
//       ];

//   const roles = [
//     {
//       role: "Student",
//       desc: "Take exams, view results, and track your progress easily.",
//       href: "/register",
//     },
//     {
//       role: "Instructor",
//       desc: "Create, manage, and evaluate exams for your students.",
//       href: "/register",
//     },
//     {
//       role: "Admin",
//       desc: "Manage the platform, users, and permissions with full control.",
//       href: "/register",
//     },
//   ];

//   const testimonials = [
//     {
//       name: "Anjali Sharma",
//       role: "NEET Aspirant",
//       feedback:
//         "Examify helped me practice hundreds of mock tests with ease. The UI is clean, the questions are updated regularly, and the instant results helped me identify my weak topics. Highly recommended for serious learners!",
//       rating: 5,
//     },
//     {
//       name: "Rohit Mehta",
//       role: "Instructor (Physics)",
//       feedback:
//         "As an instructor, the dashboard is a game-changer. I can create exams, track student performance, and get analytics all in one place. Their team is also very responsive and open to feedback.",
//       rating: 4.5,
//     },
//     {
//       name: "Sneha Kulkarni",
//       role: "B.Tech Final Year",
//       feedback:
//         "The platform is so intuitive! Whether it's for practice exams or submitting assignments, everything works smoothly. I especially liked the instant ranking system after each test.",
//       rating: 4.8,
//     },
//     {
//       name: "Karan Verma",
//       role: "MBA Entrance Student",
//       feedback:
//         "I used Examify to prepare for CAT and it made a huge difference. The ability to analyze past test data, see detailed explanations, and improve my weak sections really helped me boost my score.",
//       rating: 4.9,
//     },
//     {
//       name: "Dr. Neeta Joshi",
//       role: "College Dean",
//       feedback:
//         "We implemented Examify in our institution to digitize our semester assessments. The onboarding process was seamless, and the support team guided us through every step. It's now an essential part of our exam workflow.",
//       rating: 5,
//     },
//   ];

//   return (
//     <div>
//       {/* hero section */}
//       <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-20 py-24 text-center bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950">
//         {/* Animated blobs */}
//         <div className="absolute w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
//         <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

//         <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
//           {/* Headline with animated gradient */}
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
//             Crack Exams with Confidence
//           </h1>

//           <p className="text-sm md:text-lg lg:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
//             Examify helps students, instructors, and admins manage, prepare, and
//             succeed in online exams — smarter and faster.
//           </p>

//           {/* Buttons */}
//           {!user ? (
//             <div className="space-x-5 animate-fade-in-up delay-400">
//               <Link href="/register">
//                 <Button className="cursor-pointer bg-orange-500 hover:bg-orange-600 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-orange-500/40">
//                   Get Started
//                 </Button>
//               </Link>
//               <Link href="/login">
//                 <Button className="cursor-pointer bg-neutral-50 hover:bg-neutral-200 text-orange-500 w-30 md:w-48 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-neutral-300/40">
//                   Login
//                 </Button>
//               </Link>
//             </div>
//           ) : (
//             <Link href={`/dashboard/${user?.role || "student"}`}>
//               <Button className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-sm shadow-orange-500/40">
//                 Go to Dashboard
//               </Button>
//             </Link>
//           )}
//         </div>

//         {/* Blob animations */}
//         <style jsx>{`
//           @keyframes blob {
//             0%,
//             100% {
//               transform: translate(0px, 0px) scale(1);
//             }
//             33% {
//               transform: translate(30px, -50px) scale(1.1);
//             }
//             66% {
//               transform: translate(-20px, 20px) scale(0.9);
//             }
//           }
//           .animate-blob {
//             animation: blob 10s infinite ease-in-out;
//           }
//           .animation-delay-2000 {
//             animation-delay: 2s;
//           }
//           .animation-delay-4000 {
//             animation-delay: 4s;
//           }
//           @keyframes fadeInUp {
//             0% {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             100% {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-fade-in-up {
//             animation: fadeInUp 1s forwards;
//           }
//           .delay-200 {
//             animation-delay: 0.2s;
//           }
//           .delay-400 {
//             animation-delay: 0.4s;
//           }
//           @keyframes gradientShift {
//             0% {
//               background-position: 0% 50%;
//             }
//             50% {
//               background-position: 100% 50%;
//             }
//             100% {
//               background-position: 0% 50%;
//             }
//           }
//           .animate-gradient {
//             background-size: 200% 200%;
//             animation: gradientShift 5s ease infinite;
//           }
//         `}</style>
//       </section>

//       {/* home client  section*/}
//       <section className="min-h-[75vh] px-5 py-12 md:pt-0 md:pb-10 md:px-20 mx-auto text-center bg-gradient-to-b from-neutral-950 from-20% via-neutral-900 via-85% to-neutral-800 to-95% flex flex-col items-center justify-center">
//         {user ? (
//           <section className="mb-8">
//             <h2 className="text-4xl font-bold mb-2 text-white">
//               Welcome back, {user.name} 👋
//             </h2>
//             <p className="text-white-600 mb-4 text-neutral-400">
//               Continue where you left off, and track your exam performance.
//             </p>
//           </section>
//         ) : (
//           <section className="mb-8">
//             <h2 className="text-2xl font-semibold mb-2 text-white">
//               Why Choose Examify?
//             </h2>
//             <p className="text-white-600 mb-4 text-neutral-400">
//               Empowering students and educators to simplify exams with smart
//               tools.
//             </p>
//           </section>
//         )}

//         <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
//           <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
//             <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
//               📚 {user ? "Your Exams" : "Smart Exam Creation"}
//             </h3>
//             <p className="text-neutral-400 text-xs md:text-lg">
//               {user
//                 ? "Quickly access and manage your upcoming and past exams."
//                 : "Easily create, edit, and manage exams with multiple question types."}
//             </p>
//           </div>
//           <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
//             <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
//               👩‍🏫 Role Based Access
//             </h3>
//             <p className="text-neutral-400 text-xs md:text-lg">
//               Students, Instructors, and Admins each have their own personalized
//               dashboard.
//             </p>
//           </div>
//           <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
//             <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
//               📈 {user ? "Your Analytics" : "Performance Analytics"}
//             </h3>
//             <p className="text-neutral-400 text-xs md:text-lg">
//               {user
//                 ? "See your latest performance metrics and exam scores."
//                 : "View results, rankings, and progress tracking in real-time."}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* feature section */}
//       <section className="min-h-[80vh] md:min-h-[90vh] relative py-16 md:py-16 px-6 md:px-20 bg-neutral-950 overflow-hidden flex items-center justify-center">
//         {/* Background blobs */}
//         <div className="absolute inset-0 z-0">
//           <div className="absolute top-0 right-10 w-40 h-40 bg-orange-400 opacity-5 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute top-0 left-10 w-40 h-40 bg-orange-400 opacity-5 rounded-full blur-3xl animate-pulse"></div>
//         </div>

//         <div className="relative z-10">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-14">
//             {user ? "Your Personalized Experience" : "Why Choose Examify?"}
//           </h2>

//           <div className="grid gap-10 md:grid-cols-3">
//             {features.map((feature, i) => (
//               <div
//                 key={i}
//                 className="bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-neutral-500  transition-all duration-300"
//               >
//                 <h3 className="md:text-xl font-semibold text-orange-500 mb-3 text-sm">
//                   {feature.title}
//                 </h3>
//                 <p className="text-neutral-200 leading-relaxed md:text-lg text-xs">
//                   {feature.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* user role section */}
//       <section className="min-h-[60vh] pt-2 pb-24 px-6 md:px-20 bg-gradient-to-b bg-neutral-950 text-white">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           {user ? "Know Your Role" : "Who is it for?"}
//         </h2>
//         <div className="grid gap-8 md:grid-cols-3">
//           {roles.map(({ role, desc, href }) => (
//             <div
//               key={role}
//               className="border p-6 rounded-lg shadow-md hover:shadow-neutral-400 duration-500 transition"
//             >
//               <h3 className="md:text-xl text-lg font-semibold mb-2 ">{role}</h3>
//               <p className="md:text-sm text-xs text-white-600 mb-4">{desc}</p>
//               {!user && (
//                 <Link
//                   href={href}
//                   className="md:text-lg text-xs text-orange-500 font-medium hover:underline"
//                 >
//                   Get Started →
//                 </Link>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA section */}
//       <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-orange-500 to-orange-700 text-white text-center rounded-b-4xl">
//         {user ? (
//           <>
//             <h2 className="text-3xl font-bold mb-4">Need Help Navigating?</h2>
//             <p className="text-lg mb-6">
//               Visit your dashboard to manage exams, results, and more.
//             </p>
//             <Link
//               href={`/${user.role}`}
//               className="px-6 py-3 font-semibold duration-300 bg-neutral-900 rounded-xl hover:bg-neutral-950 hover:text-orange-500"
//             >
//               Go to Dashboard
//             </Link>
//           </>
//         ) : (
//           <>
//             <h2 className="text-3xl font-bold mb-4">
//               Ready to revolutionize exams?
//             </h2>
//             <p className="text-lg mb-6">
//               Join hundreds of users simplifying their online assessments with
//               Examify.
//             </p>
//             <Link
//               href={"/register"}
//               className="px-6 py-3 font-semibold duration-300 bg-neutral-900 rounded-xl hover:bg-neutral-950 hover:text-orange-500"
//             >
//               Get Started Now
//             </Link>
//           </>
//         )}
//       </section>

//       {/* testimonial section */}
//       <section className="bg-neutral-900 text-white py-20 px-6 md:px-20">
//         <div className="max-w-6xl mx-auto text-center mb-12">
//           <h2 className="text-4xl font-bold text-white-800 mb-4">
//             What Our Users Say
//           </h2>
//           <p className="text-white-600 text-lg max-w-3xl mx-auto">
//             Hear from students and educators who’ve transformed their exam
//             experience with Examify.
//           </p>
//         </div>

//         <div className="grid gap-10 md:grid-cols-3">
//           {testimonials.map((t, i) => (
//             <div
//               key={i}
//               className="bg-neutral-800 rounded-xl shadow-sm border border-neutral-700 p-6 flex flex-col justify-between  hover:shadow-neutral-500 "
//             >
//               <p className="text-white-700 text-sm leading-relaxed mb-4">
//                 "{t.feedback}"
//               </p>
//               <div className="mt-auto">
//                 <div className="text-orange-500 font-semibold">{t.name}</div>
//                 <div className="text-white-500 text-sm">{t.role}</div>
//                 <div className="text-yellow-400 mt-2 text-sm">
//                   {"★".repeat(Math.floor(t.rating)) + (t.rating % 1 ? "½" : "")}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default HomePageContent;
