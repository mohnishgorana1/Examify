"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { useUser } from "@clerk/nextjs";
import { useAppUser } from "@/contexts/UserContext";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { Spotlight } from "../ui/spotlight";
import { BarChart2, Shield, Zap } from "lucide-react";
import { NumberTicker } from "../ui/number-ticker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

export default function HomePageContent() {
  const { user, isLoaded } = useUser();
  const { appUser } = useAppUser();

  const homeClientHeadingText = appUser
    ? [{ text: "Welcome" }, { text: "back," }, { text: `${appUser.name} 👋` }]
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

  const stats = [
    {
      value: 50,
      startValue: "10",
      valueAppendText: "+",
      label: "Exams Conducted",
    },
    {
      value: "4",
      startValue: "0",
      valueAppendText: "/5",
      label: "Average User Rating",
    },
    {
      value: 10,
      startValue: "1",
      valueAppendText: "+",
      label: "Institutions Trusted",
    },
  ];
  const staticFeatures = [
    {
      icon: Zap,
      title: "Instant Setup & Deployment",
      desc: `Launch your first assessment in under 5 minutes. No complex configuration, just rapid deployment.`,
      descStatus: "",
      status: "Available",
    },
    {
      icon: Shield,
      title: "AI-Powered Proctored Security",
      desc: `Maintain exam integrity with advanced anti-cheating measures and real-time monitoring. `,
      descStatus: "*Fully launching Q1 2025*",
      status: "Future Feature",
    },
    {
      icon: BarChart2,
      title: "Advanced Performance Analytics",
      desc: `Get deep insights into question performance, student trends, and class proficiency instantly. `,
      descStatus: "*Data modeling in progress*",
      status: "Future Feature",
    },
  ];

  const roles = [
    {
      role: "Student",
      desc: "Track progress, take secure tests, and review results with detailed feedback.",
      href: "/register",
      color: "text-green-400",
    },
    {
      role: "Instructor",
      desc: "Effortlessly create exams, manage question banks, and grade subjective answers faster.",
      href: "/register",
      color: "text-indigo-400",
    },
    {
      role: "Admin",
      desc: "Full institutional oversight, user management, and platform configuration control.",
      href: "/register",
      color: "text-red-400",
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

  const faqs = [
    {
      question:
        "What types of exams and question formats does Examify support?",
      answer:
        "Currently, Examify supports core objective formats, including **Multiple-Choice Questions (MCQ)** and **True/False**. We are actively developing support for **Short Descriptive/Subjective answers** and **Numerical answers**, which will be available soon. You can combine the currently supported types within a single exam for comprehensive assessment.",
    },
    {
      question:
        "Is Examify secure enough for conducting high-stakes institutional exams?",
      answer:
        "While we are confident in our current security measures for individual instructors (including **secure login** and **role-based access**), we are committed to building full institutional security. We are implementing **modern encryption standards** for all data and records. Our **AI-powered proctoring** and advanced anti-cheating measures, launching in Q1 2026, will solidify Examify as a trusted platform for high-stakes assessments.",
    },
    {
      question: "What is the current cost to use Examify?",
      answer:
        "Currently, **Examify is completely free to use**! Instructors can create and deploy any number of exams, and students can join and take those exams at no charge. We are focused on growing our user base and gathering feedback. Future paid tiers will be introduced for advanced features and institutional licenses, but core features will remain accessible.",
    },
    {
      question: "What is the 'AI-Powered Proctored Security' feature?",
      answer:
        "This is a major future feature (launching **Q1 2026**) designed to maintain exam integrity remotely. It will use artificial intelligence to **monitor student activity** during the exam via webcam and screen. The system will flag potential cheating behaviors, such as looking away from the screen, detecting unauthorized materials, or the presence of a second person, ensuring a fair and verifiable testing environment.",
    },
    {
      question:
        "Can I integrate Examify with my existing Learning Management System (LMS)?",
      answer:
        "While direct, out-of-the-box LMS integration is not yet a core feature, Examify's robust **data export capabilities (e.g., CSV reports)** allow for easy transfer of results and grades to your existing systems. We are currently developing seamless integration APIs for popular LMS platforms like **Moodle and Canvas**.",
    },
    {
      question:
        "Does Examify offer different dashboards and features for various user roles?",
      answer:
        "Yes, the platform is **fully role-based** for maximum efficiency. **Students** get a dashboard to track progress and take secure tests. **Instructors** have dedicated tools for exam creation, question bank management, grading, and analytics. **Admins** maintain comprehensive institutional oversight, including user management and platform configuration.",
    },
    {
      question: "How long does it take to set up and deploy my first exam?",
      answer:
        "Our platform is designed for **instant deployment**. Instructors can create their first exam, select questions from the bank (or add new ones), define parameters, and schedule it in **under 5 minutes**. Our intuitive interface eliminates complex setup processes.",
    },
    {
      question:
        "Is there a limit to the number of students or exams I can host?",
      answer:
        "Examify is built to be **scalable**. Our infrastructure can support thousands of concurrent users and a high volume of exams without performance degradation. For institutional licenses, there are typically no hard limits, ensuring reliable service even during peak assessment periods.",
    },
    {
      question: "How do I get technical support or training for my staff?",
      answer:
        "We offer dedicated support for all users. Our documentation and **self-help center** are available 24/7. For institutional clients, we provide personalized **onboarding and training sessions** for instructors and administrators, along with priority technical support via email and dedicated chat channels.",
    },
  ];

  useEffect(() => {
    // Scroll-based animations for sections
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

    // Optional: GSAP animation for the Hero Card (on component mount)
    gsap.fromTo(
      "#hero-mockup",
      { scale: 0.9, opacity: 0, y: 50, rotateX: 10 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8,
      }
    );
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
      {/* hero section */}
      <section className="relative overflow-hidden min-h-[95vh] flex flex-col items-center justify-center px-6 md:px-20 pt-20 text-center bg-neutral-950 ">
        <Spotlight
          className="-top-40 left-0 md:left-20 md:-top-10"
          fill="rgb(99 102 241 / 0.5)"
        />
        <Spotlight
          className="-top-40 right-0 md:right-20 md:-top-10 scale-x-[-1]"
          fill="rgb(99 102 241 / 0.5)"
        />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center space-y-10 ">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-1 leading-snug  bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-600 bg-clip-text text-transparent animate-gradient-shift">
            EXAMIFY
          </h1>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-snug  bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-600 bg-clip-text text-transparent animate-gradient-shift">
            The Future of <br className="md:hidden" /> Online Assessment is Here
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto mb-10 animate-fade-in delay-200">
            Examify delivers secure, scalable, and intelligent platform for all
            your exam management needs—from practice tests to institutional
            assessments.
          </p>

          {!user ? (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mb-10 animate-fade-in delay-400">
              <Link href="/sign-in">
                <Button className="w-64 sm:w-48 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-xl shadow-indigo-500/30 text-white font-semibold py-7 text-lg">
                  Start for Free
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="w-64 sm:w-48 bg-neutral-900 border-indigo-500 text-indigo-400 hover:bg-neutral-800 transition-all duration-300 py-7 text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mb-10 animate-fade-in delay-400">
              <Link href={`/dashboard/${appUser?.role}`}>
                <Button className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:scale-[1.02] mb-16">
                  Go to <span className="capitalize">{appUser?.role}</span>{" "}
                  Dashboard
                </Button>
              </Link>
              {appUser && appUser.role === "student" && (
                <Link href={`/become-instructor`}>
                  <Button className="px-8 py-3 rounded-md text-lg font-semibold bg-transparent transition-all duration-300 hover:scale-[1.02] mb-16 text-white bg-gradient-to-r from-amber-700 to-pink-500">
                    Become Instructor
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
        <style jsx>{`
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
          .animate-fade-in {
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
          .animate-gradient-shift {
            background-size: 200% 200%;
            animation: gradientShift 5s ease infinite;
          }

          @keyframes growUp {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }
          .animate-grow-up {
            transform-origin: bottom;
            animation: growUp 1s ease-out forwards;
          }

          @keyframes progress {
            0% {
              width: 0%;
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .animate-progress {
            animation: progress 1.5s ease-out forwards;
          }
        `}</style>
      </section>

      {/* Instructor dashboard insights tilt card */}
      <section className="hidden relative overflow-hidden md:flex flex-col items-center justify-center px-6 md:px-20  pb-12 text-center bg-neutral-950">
        <Tilt
          glareEnable
          scale={1.01}
          glareMaxOpacity={0.2}
          perspective={1000}
          className="w-full max-w-4xl mt-4"
        >
          <div
            id="hero-mockup"
            className="relative rounded-xl border bg-neutral-900 backdrop-blur-sm shadow-2xl shadow-indigo-900/50 transition duration-500 ease-in-out hover:shadow-indigo-500/30"
          >
            <div className="w-full h-80 bg-neutral-800 rounded-xl overflow-hidden relative">
              {/* Visual element representing the platform/exam interface */}
              <div className="absolute top-0 left-0 w-full h-full p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-indigo-400">
                    Instructor Dashboard Insights
                  </span>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-30px)]">
                  {/* Feature 1: Exam Creation Workflow */}
                  <div className="col-span-2 bg-neutral-950 p-4 rounded-lg flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-indigo-400">
                      Quick Exam Scheduling
                    </h3>
                    <p className="text-neutral-500 text-sm">
                      Define parameters, select question types, and set the exam
                      time in three simple steps.
                    </p>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-indigo-500">1.</span>
                        <span className="text-neutral-300">Create Exam</span>
                        <div className="ml-auto w-[25%] h-2 bg-green-500/30 rounded-full animate-progress"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-indigo-500">1.</span>
                        <span className="text-neutral-300">Schedule Exam</span>
                        <div className="ml-auto w-[40%] h-2 bg-green-500/50 rounded-full animate-progress"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-indigo-500">2.</span>
                        <span className="text-neutral-300">Add Questions</span>
                        <div className="ml-auto w-[55%] h-2 bg-green-500/60 rounded-full animate-progress delay-100"></div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-indigo-500">3.</span>
                        <span className="text-neutral-300">Publish</span>
                        <div className="ml-auto w-[70%] h-2 bg-green-500 rounded-full animate-progress delay-200"></div>
                      </div>
                    </div>
                  </div>
                  {/* Feature 2: Real-time Monitoring/Metrics */}
                  <div className="col-span-1 bg-neutral-950 p-4 rounded-lg hidden md:block">
                    <h3 className="text-xl font-bold text-indigo-400 mb-2">
                      Real-time <br /> Result Monitoring
                    </h3>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-neutral-400">Active Students:</span>
                      <span className="text-green-400 font-bold">45 / 50</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-3">
                      <span className="text-neutral-400">Avg. Score:</span>
                      <span className="text-yellow-400 font-bold">78%</span>
                    </div>
                    <div className="w-full h-12 bg-indigo-800/50 rounded-md flex items-center justify-center text-sm font-medium">
                      View Live Analytics
                    </div>
                    <p className="text-neutral-500 text-xs mt-3">
                      Track progress, time, and engagement of all participants
                      instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </section>

      {/* Live stats  */}
      <section className="mt-15 scroll-section py-24 px-6 md:px-20 bg-neutral-950 border-t border-b border-neutral-900/50 ">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <p className="text-5xl md:text-6xl font-extrabold text-indigo-500/70 mb-2">
                {/* {idx !== 1 ? ( */}
                <NumberTicker
                  value={Number(stat.value)}
                  startValue={Number(stat.startValue)}
                  delay={`${idx === 1 && Number(1)}`}
                  className="tracking-tighter font-extrabold whitespace-pre-wrap text-indigo-500/70"
                />
                {stat.valueAppendText}
              </p>
              <h3 className="text-lg text-neutral-300 font-medium">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* data stream layout */}
      <section className="pt-20 pb-5 px-6 md:px-20 bg-neutral-950">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 text-indigo-400 uppercase cursor-pointer">
          Core Platform Advantages
        </h2>
        <p className="text-center text-indigo-200/80 max-w-2xl mx-auto mb-16 ">
          A seamless experience for every user role,
          <br className="hidden md:flex" /> built on a foundation of security
          and smart automation.
        </p>

        {/* Vertical Data Stream Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line Connector */}
          <div className="absolute left-1/2 -ml-0.5 top-0 w-px h-full bg-neutral-800 hidden md:block"></div>

          {staticFeatures.map((feature, i) => (
            <div
              key={i}
              className={`data-stream-item flex items-start gap-6 md:gap-12 mb-16 relative ${
                i % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Connector Dot */}
              <div className="hidden md:block absolute left-1/2 top-15 w-4 h-4 md:w-5 md:h-5 rounded-full bg-indigo-400 border-4 border-neutral-950 z-10 -ml-2.5 md:-ml-[11px]"></div>

              {/* Content Card (Left or Right) */}
              <div
                className={`w-full md:w-5/12 bg-neutral-900 shadow-neutral-700/50 rounded-xl p-6 shadow-md ${
                  i % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    i % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <feature.icon className="w-8 h-8 text-indigo-400 mb-2" />
                  {/* Status Tag for Future Features */}
                  {feature.status !== "Available" && (
                    <span className="mb-2 text-xs font-medium text-yellow-400/50 bg-yellow-900/20 px-2 py-0.5 rounded-full border border-yellow-800/30">
                      Coming Soon
                    </span>
                  )}
                  {feature.status === "Available" && (
                    <span className="mb-2 text-xs font-medium text-green-400/50 bg-green-900/20 px-3 py-1 rounded-full border border-green-800/30">
                      Available
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-400 text-sm">{feature.desc}</p>
                <p className="text-neutral-200 text-sm font-bold my-0.5">
                  {feature.descStatus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* client cards */}
      <section className="scroll-section min-h-[75vh] px-5 py-12 md:py-10 md:px-20 text-center flex flex-col items-center justify-center bg-neutral-950 border-t">
        <h2 className="hidden md:flex font-bold mb-2">
          <TypewriterEffectSmooth
            words={homeClientHeadingText}
            className="text-white"
          />
        </h2>
        <h2 className="md:hidden font-bold mb-2 text-xl">
          {appUser?.name
            ? `Welcome back ${appUser?.name}`
            : "Why Choose Examify!"}
        </h2>
        <p className="text-neutral-200 mb-8">
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
              <h3 className="text-xl font-bold mb-2 text-indigo-400">
                {card.title}
              </h3>
              <p className="text-neutral-400 text-sm">{card.desc}</p>
            </Tilt>
          ))}
        </div>
      </section>

      {/* features card */}
      <section className="scroll-section py-18 px-6 md:px-20 bg-neutral-950">
        <h2 className="text-4xl font-bold text-center mb-14">
          {user ? "Your Personalized Experience" : "Examify Feature"}
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
              <h3 className="text-indigo-500 text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-300 text-sm">{feature.desc}</p>
            </Tilt>
          ))}
        </div>
      </section>

      {/* user roles card */}
      <section className="scroll-section pt-12  mb-28 px-6 md:px-20 text-center bg-neutral-950">
        <h2 className="text-4xl font-bold mb-14 text-white">
          {user ? "Know Your Role" : "Who is it for?"}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {roles.map(({ role, desc, href, color }, i) => (
            <Tilt
              key={i}
              glareEnable
              scale={1.05}
              glareMaxOpacity={0.2}
              className="border-t shadow-lg shadow-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-indigo-500 transition"
            >
              <h3 className={`text-xl font-semibold mb-2 ${color}`}>{role}</h3>
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

      {/* navigator messages */}
      <section className="scroll-section py-24 px-6 md:px-20 bg-gradient-to-b from-indigo-600 to-indigo-800 text-center">
        <h2 className="text-4xl font-bold mb-6">
          {user ? "Need Help Navigating?" : "Ready to revolutionize exams?"}
        </h2>
        <p className="text-lg mb-8">
          {user
            ? "Visit your dashboard to manage exams, results, and more."
            : "Join hundreds of users simplifying their online assessments with Examify."}
        </p>
        <Link href={appUser ? `/dashboard/${appUser?.role}` : "/sign-in"}>
          <Button className="bg-neutral-900 text-white cursor-pointer px-8 py-3 rounded-md text-lg font-semibold hover:bg-neutral-950 transition">
            {user ? "Go to Dashboard" : "Get Started Now"}
          </Button>
        </Link>
      </section>

      {/* FAQs Accordion based */}
      <section className="scroll-section py-24 px-6 md:px-20 bg-neutral-950 border-t border-neutral-900/50">
        <h2 className="text-4xl font-bold text-center mb-14 text-indigo-400">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i + 1}`}
                className="border-b border-neutral-800"
              >
                <AccordionTrigger className="text-left text-lg hover:no-underline transition-colors duration-200 py-4 text-white hover:text-indigo-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-base pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      {/* testimonials */}
      <section className="scroll-section testimonial-section py-24 px-6 md:px-20 bg-neutral-900">
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
                <div className="text-yellow-400 text-sm mt-2">
                  {"★".repeat(Math.floor(t.rating)) + (t.rating % 1 ? "½" : "")}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </section>
    </div>
  );
}
