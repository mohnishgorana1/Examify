"use client";

import { BookOpen, GraduationCap, Shield, Users } from "lucide-react";
import { Button } from "../ui/button";


export default function UserCardRolesSection({ user }: { user: any }) {
  const ROLE_BASED_USER_INFO = [
    {
      role: "student",
      title: "Empowering Learners Everywhere",
      desc: "Take secure exams, track performance, and grow with smart feedback.",
      details:
        "As a student, Examify gives you complete visibility over your learning progress. Access live exams, review detailed analytics after every test, and monitor your improvement in each subject. With an intuitive dashboard and instant feedback, you stay focused on what really matters — mastering your skills.",
      icon: GraduationCap,
      footerText: "For Students",
      colorTheme:
        "from-green-600/40 to-green-800/60 border-green-500/30 hover:shadow-green-500/50",
      iconColor: "text-green-400",
      shadowColor: "shadow-green-800/60",
    },
    {
      role: "instructor",
      title: "Powerful Tools for Modern Educators",
      desc: "Create, grade, and analyze — all in one seamless workflow.",
      details:
        "Instructors can easily design secure, customizable exams and automate grading with AI-powered analytics. From managing question banks to tracking student performance trends, Examify helps educators save time and deliver personalized learning experiences with unmatched precision.",
      icon: BookOpen,
      footerText: "For Instructors",
      colorTheme:
        "from-indigo-600/40 to-indigo-800/60 border-indigo-500/30 hover:shadow-indigo-500/50",
      iconColor: "text-indigo-400",
      shadowColor: "shadow-indigo-800/60",
    },
    {
      role: "admin",
      title: "Centralized Control for Institutions",
      desc: "Monitor, manage, and secure your academic ecosystem.",
      details:
        "Admins maintain full oversight of the platform — from user management to analytics and compliance. Configure institution-wide settings, access in-depth reports, and ensure operational integrity. Examify empowers administrators to create a transparent and scalable assessment environment.",
      icon: Shield,
      footerText: "For Administrators",
      colorTheme:
        "from-orange-700/40 to-orange-900/60 border-orange-500/30 hover:shadow-orange-500/50",
      iconColor: "text-orange-400",
      shadowColor: "shadow-orange-800/60",
    },
    {
      role: "unauthenticated",
      title: "All-in-One Assessment Platform",
      desc: "Experience the next generation of online exams and analytics.",
      details:
        "Not logged in? No problem. Explore Examify’s seamless experience — powerful tools for exam creation, secure test environments, and smart result tracking. Get started today and discover how institutions and learners use Examify to simplify assessments.",
      icon: Users,
      footerText: "For Everyone",
      colorTheme:
        "from-neutral-700/40 to-neutral-900/60 border-neutral-600/30 hover:shadow-neutral-500/50",
      iconColor: "text-neutral-400",
      shadowColor: "shadow-neutral-800/60",
    },
  ];
  return (
    <main
      id="roles"
      className=" my-10 pt-20 pb-20 px-6 md:px-20 text-center bg-neutral-950"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-14 text-white uppercase">
        {user ? "Discover Role Experiences" : "Who Can Use Examify?"}
      </h2>

      {/* Increased gap and ensured equal height for all columns */}
      <div className="grid gap-8 md:grid-cols-2 ">
        {ROLE_BASED_USER_INFO.map((info, i) => {
          const IconComponent = info.icon;

          return (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden border border-neutral-800 shadow-sm ${info.shadowColor} bg-neutral-900/80 backdrop-blur-sm transition duration-500 hover:shadow-lg hover:bg-neutral-800/90 flex flex-col h-full`}
            >
              <div className={`p-6 flex flex-col items-start h-full`}>
                <div
                  className={`w-full mb-4 flex md:flex-row flex-col gap-y-3  gap-x-5 md:items-center ${
                    info.colorTheme.split(" ")[0]
                  }  `}
                >
                  <span className="w-min border-2 border-neutral-700 p-1 md:p-2 rounded-xl">
                    <IconComponent
                      className={`w-10 h-10 ${info.iconColor}  ${
                        info.colorTheme.split(" ")[1]
                      }`}
                    />
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {info.title}
                  </h3>
                </div>

                <p className="text-neutral-300 text-base mb-4 text-start">
                  {info.desc}
                </p>

                <p className="text-neutral-500 text-sm mb-6 flex-grow text-justify font-semibold">
                  {info.details}
                </p>

                <p className="w-full mt-auto flex justify-between">
                  <Button
                    className={`px-3 py-1 text-white font-semibold mr-auto transition duration-300 ${
                      info.role === "student"
                        ? "bg-green-600 hover:bg-green-700"
                        : info.role === "instructor"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : info.role === "admin"
                        ? "bg-orange-700 hover:bg-orange-800"
                        : "bg-neutral-600 hover:bg-neutral-700"
                    }`}
                  >
                    {info.footerText}
                  </Button>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
