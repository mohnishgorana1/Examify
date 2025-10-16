"use client";

import {
  Shield,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
  FileText,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Tilt from "react-parallax-tilt";
import { useMemo } from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";


const RoleCard = ({ card, role }: { card: any; role: string }) => {
  const IconComponent = card.icon;

  return (
    <Tilt
      key={card.title}
      glareEnable
      scale={1.03}
      glareMaxOpacity={0.2}
      transitionSpeed={0.8}
      className={`shadow-md shadow-neutral-800/60 transition duration-300 ease-in-out  rounded-xl overflow-hidden group border border-neutral-800/50 bg-neutral-900
         ${
           role === "admin"
             ? "shadow-yellow-800 hover:shadow-yellow-900"
             : role === "instructor"
             ? "shadow-indigo-600 hover:shadow-indigo-700"
             : role === "student"
             ? "shadow-green-800 hover:shadow-green-800"
             : "shadow-indigo-600 hover:shadow-indigo-700"
         }
        `}
    >
      <div
        className={`p-4 ${card.placeholderColor} h-40 flex items-center justify-center`}
      >
        {/* Dummy Image Placeholder */}
        <IconComponent className="w-12 h-12 text-white/80 group-hover:text-white transition duration-300" />
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 text-white transition`}>
          {card.title}
        </h3>
        <p className="text-neutral-400 text-sm h-14 overflow-hidden mb-4">
          {card.desc}
        </p>

        {/* Conditional Button based on role/link */}
        <Link href={card.href}>
          <Button
            className={`w-full text-white text-lg py-4 md:py-5 font-semibold transition-all duration-300 ${
              role === "admin"
                ? "bg-orange-900 hover:bg-orange-950"
                : role === "instructor"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : role === "student"
                ? "bg-green-800 hover:bg-green-900"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {card.buttonText}
          </Button>
        </Link>
      </div>
    </Tilt>
  );
};

export default function ClientCardsSection({
  appUser,
  user,
}: {
  appUser: any;
  user: any;
}) {
  const ROLE_BASED_CLIENT_CARDS = {
    student: [
      {
        title: "Upcoming & Live Exams",
        desc: "View your personal exam schedule, join live tests, and see countdown timers for all required and optional assessments.",
        icon: Clock,
        buttonText: "Go to Schedule",
        href: "/dashboard/student",
        placeholderColor: "bg-green-900/40 border-green-500/30",
      },
      {
        title: "View Past Results & Review",
        desc: "Access detailed reports on completed exams, review correct/incorrect answers, and track your proficiency across subjects.",
        icon: BarChart3,
        buttonText: "View Results",
        href: "/dashboard/student",
        placeholderColor: "bg-green-800/40 border-green-500/30",
      },
      {
        title: "Personal Dashboard & Progress",
        desc: "Monitor your overall learning progress, completion rates, and set goals. Your personalized hub for all things Examify.",
        icon: LayoutDashboard,
        buttonText: "My Dashboard",
        href: "/dashboard/student",
        placeholderColor: "bg-green-700/40 border-green-500/30",
      },
    ],
    admin: [
      {
        title: "User Management & Audits",
        desc: "Maintain complete control over all user accounts (Instructors/Students). View logs, assign roles, and manage permissions from a central hub.",
        icon: Users,
        buttonText: "Manage Users",
        href: "/dashboard/admin/users",
        placeholderColor: "bg-orange-900/40 border-orange-500/30",
      },
      {
        title: "System Configuration",
        desc: "Configure global platform settings, integrations, and branding. Ensure the system is optimized and compliant with institutional policy.",
        icon: Settings,
        buttonText: "System Settings",
        href: "/dashboard/admin/settings",
        placeholderColor: "bg-orange-800/40 border-orange-500/30",
      },
      {
        title: "Global Analytics & Revenue",
        desc: "Access high-level data on platform performance, exam volume, and user engagement. Generate institution-wide performance reports.",
        icon: BarChart3,
        buttonText: "View Reports",
        href: "/dashboard/admin/analytics",
        placeholderColor: "bg-orange-700/40 border-orange-500/30",
      },
    ],
    instructor: [
      {
        title: "Create & Manage Exams",
        desc: "Quickly set up new exams, schedule live tests, and manage your question bank. Support for multiple question formats (MCQ, T/F).",
        icon: FileText,
        buttonText: "New Exam",
        href: "/dashboard/instructor/exams/new",
        placeholderColor: "bg-indigo-900/40 border-indigo-500/30",
      },
      {
        title: "Gradebook & Evaluation",
        desc: "Review and grade student submissions, especially subjective answers. Access instant performance metrics for each class and student.",
        icon: GraduationCap,
        buttonText: "Open Gradebook",
        href: "/dashboard/instructor/gradebook",
        placeholderColor: "bg-indigo-800/40 border-indigo-500/30",
      },
      {
        title: "Question Bank Hub",
        desc: "Organize, tag, and reuse questions efficiently across multiple courses. Import new questions in bulk for rapid content development.",
        icon: BookOpen,
        buttonText: "Manage Questions",
        href: "/dashboard/instructor/questions",
        placeholderColor: "bg-indigo-700/40 border-indigo-500/30",
      },
    ],
    unauthenticated: [
      {
        title: "Effortless Exam Creation",
        desc: "Create and deploy secure exams in minutes, not hours. Access powerful question banking and auto-grading features.",
        icon: FileText,
        buttonText: "View Demo",
        href: "/demo",
        placeholderColor: "bg-neutral-800/40 border-neutral-600/30",
      },
      {
        title: "Secure & Fair Testing",
        desc: "Ensure academic integrity with anti-cheating measures and upcoming AI-powered proctoring features. Trustworthy results every time.",
        icon: Shield,
        buttonText: "Explore Security",
        href: "/features/security",
        placeholderColor: "bg-neutral-700/40 border-neutral-600/30",
      },
      {
        title: "Role-Based Experience",
        desc: "Tailored interfaces for Students, Instructors, and Admins. Get the tools you need without the clutter. Optimized for efficiency.",
        icon: Users,
        buttonText: "See Roles",
        href: "/#roles",
        placeholderColor: "bg-neutral-600/40 border-neutral-600/30",
      },
    ],
  };
  
  const currentRole = appUser?.role || "unauthenticated";

  const homeClientHeadingText = appUser
    ? [{ text: "Welcome" }, { text: "back," }, { text: `${appUser.name} 👋` }]
    : [{ text: "Why" }, { text: "Choose" }, { text: "Examify ?" }];

  const cardsToRender = useMemo(() => {
    return (
      ROLE_BASED_CLIENT_CARDS[currentRole]||
      ROLE_BASED_CLIENT_CARDS.unauthenticated
    );
  }, [currentRole]);

  return (
    <main className="min-h-[75vh] px-5 py-12 md:py-10 md:px-20 text-center flex flex-col items-center justify-center bg-neutral-950 border-t">
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
      <p className="text-neutral-200 mb-8 max-w-2xl mx-auto">
        {user ? (
          <span>
            Quick access to the most important actions for your{" "}
            <strong className="capitalize">{currentRole}</strong> account.
          </span>
        ) : (
          "Discover the core features that simplify online assessment for every user."
        )}
      </p>
      <div className="grid md:grid-cols-3 gap-8 mt-6 text-left w-full max-w-6xl">
        {cardsToRender.map((card, i) => (
          <RoleCard key={i} card={card} role={currentRole} />
        ))}
      </div>
    </main>
  );
}
