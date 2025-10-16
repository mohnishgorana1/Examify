"use client";
import { useState } from "react";
import {
  Bell,
  BookOpen,
  GraduationCap,
  Layers,
  ListChecks,
  Rocket,
  Settings,
  Shield,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Lock,
  Activity,
  Code,
} from "lucide-react";
import Image from "next/image";

// --- Feature Data Definition (Unchanged) ---
const ROLE_BASED_FEATURES = {
  student: [
    {
      title: "Exam & Course Navigator",
      desc: "Easily view your enrolled courses, upcoming exam schedule, deadlines, and direct links to start tests. Your academic roadmap in one view.",
      icon: BookOpen,
      status: "Available",
    },
    {
      title: "Detailed Performance Analytics",
      desc: "Review past scores, sectional breakdowns, question-level analysis, and track improvement over time against peer averages.",
      icon: TrendingUp,
      status: "Coming Soon",
    },
    {
      title: "Certification & Achievement Hub",
      desc: "Access printable certificates for completed courses and exams. View your earned badges and milestone achievements instantly.",
      icon: Trophy,
      status: "Coming Soon",
    },
    {
      title: "Real-time Notifications & Alerts",
      desc: "Get instant alerts for exam starts, submission deadlines, score releases, and important announcements from instructors or administration.",
      icon: Bell,
      status: "Coming Soon",
    },
  ],
  instructor: [
    {
      title: "Exam Creation & Management Suite",
      desc: "Design complex assessments, manage question banks, set advanced proctoring rules, and schedule exams with granular control over availability.",
      icon: ListChecks,
      status: "Available",
    },
    {
      title: "Class & Cohort Oversight 🧑",
      desc: "View student lists, track enrollment, manage access permissions, and organize students into specific cohorts for targeted exam delivery.",
      icon: Users,
      status: "Coming Soon",
    },
    {
      title: "One-Click Result Processing",
      desc: "Automated scoring for objective questions and a streamlined, secure interface for manual grading of subjective answers, saving time.",
      icon: GraduationCap,
      status: "Coming Soon",
    },
    {
      title: "Integrated Proctoring Review",
      desc: "Access detailed proctoring logs, flag suspicious activity for review, and confirm test validity directly from the grading interface.",
      icon: UserCheck,
      status: "Coming Soon",
    },
  ],
  admin: [
    {
      title: "Global User & Role Management",
      desc: "Control access levels, assign roles (Student/Instructor/Admin), manage user lifecycle, and enforce platform-wide security policies.",
      icon: Settings,
      status: "Available",
    },
    {
      title: "System-wide Security Monitoring",
      desc: "Access full audit logs, monitor real-time platform activity, manage security settings, and ensure compliance with regulatory standards.",
      icon: Shield,
      status: "Coming Soon",
    },
    {
      title: "Platform Health & Usage Metrics",
      desc: "Detailed reports on server load, feature usage, user engagement, and data export options for strategic decision-making.",
      icon: Activity,
      status: "Coming Soon",
    },
    {
      title: "Advanced API Integration Hub",
      desc: "Manage and configure connections with external LMS systems (e.g., Canvas, Moodle) via secure, custom APIs and webhooks.",
      icon: Layers,
      status: "Coming Soon",
    },
  ],
  unauthenticated: [
    {
      title: "Future-Proof Platform Roadmap",
      desc: "See our continuous updates and new features, including AI proctoring (Q1 2026) and advanced integration APIs.",
      icon: Rocket,
      status: "",
    },
    {
      title: "Easy Exam Creation Demo",
      desc: "Explore the simplicity of creating exams with flexible formats—MCQ, Subjective, and fill-in-the-blank question types.",
      icon: ListChecks,
      status: "",
    },
    {
      title: "Secure & Private by Design",
      desc: "Your data and exam records are stored safely, protected by modern encryption and best-in-class security practices.",
      icon: Lock,
      status: "",
    },
    {
      title: "Extensible Codebase",
      desc: "Built on modern, scalable technologies to ensure high availability and easy feature expansion.",
      icon: Code,
      status: "",
    },
  ],
};

// --- Component Definition ---
export default function UserFeatureSection() {
  const [activeRole, setActiveRole] = useState("student");

  const roles = [
    {
      key: "student",
      title: "Student Access",
      desc: "Academic Navigation & Analytics",
      icon: BookOpen,
      features: ROLE_BASED_FEATURES.student,
    },
    {
      key: "instructor",
      title: "Instructor Tools",
      desc: "Assessment Creation & Grading",
      icon: GraduationCap,
      features: ROLE_BASED_FEATURES.instructor,
    },
    {
      key: "admin",
      title: "System Administration",
      desc: "User Control & Security",
      icon: Settings,
      features: ROLE_BASED_FEATURES.admin,
    },
    {
      key: "unauthenticated",
      title: "Platform Core",
      desc: "Security, Roadmap & Integrity",
      icon: Rocket,
      features: ROLE_BASED_FEATURES.unauthenticated,
    },
  ];

  // Updated Dark Neutral Background Style
  const darkNeutralBackgroundStyle = {
    backgroundColor: "#0A0A0A",
    backgroundImage: `linear-gradient(to bottom, #111111 0%, #0A0A0A 100%)`,
  };

  const activeRoleData = roles.find((r) => r.key === activeRole);
  const BackgroundIconComponent = activeRoleData ? activeRoleData.icon : null;

  return (
    <main
      className=" py-20 px-4 md:px-0 text-center min-h-screen relative overflow-hidden"
      style={darkNeutralBackgroundStyle} // DARK NEUTRAL BASE
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white uppercase tracking-wider">
          Role-Based System Access
        </h2>
        <p className="text-gray-400 text-lg mb-20 max-w-5xl mx-auto">
          View the specialized tools granted by each system role through the
          Focus Window.
        </p>

        <main className="flex flex-col md:flex-row md:space-x-8 max-w-6xl mx-auto text-start">
          {/* LEFT: Fixed Role Navigation Panel (Dark Gray Base, Indigo Accent) */}
          <div className="w-full md:w-1/4 mb-10 md:mb-0 space-y-3 py-4 px-2 border border-gray-800 rounded-lg bg-gray-800">
            {roles.map((role) => {
              const isActive = role.key === activeRole;
              return (
                <button
                  key={role.key}
                  onClick={() => setActiveRole(role.key)}
                  className={`
                    w-full p-3 rounded-lg transition-all duration-300 text-start group
                    ${
                      isActive
                        ? "bg-gray-900/50 shadow-sm border shadow-indigo-800 text-indigo-300"
                        : "text-gray-200/70 hover:bg-gray-700/50 border border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    {/* Icon remains Indigo */}
                    <span className="p-3 bg-gray-700 rounded-xl">
                      {" "}
                      <role.icon className="h-5 w-5 flex-shrink-0 text-indigo-200 group-hover:text-indigo-300" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">
                        {role.title}
                      </span>
                      {/* Description text is now muted gray */}
                      <span className="text-xs text-gray-400 opacity-70">
                        {role.desc}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
            <div className="mt-4"></div>

            <div className="hidden md:flex flex-grow items-center justify-center rounded-lg">
              <Image
                src={"/examImage.jpg"}
                height={240}
                width={240}
                alt="image"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* RIGHT: Focus Window (Content Area) */}
          {activeRoleData && (
            <div className="w-full md:w-3/4 p-6 md:p-8 relative overflow-hidden rounded-xl border border-gray-700/50 shadow-2xl shadow-black/50 bg-gray-800/90 backdrop-blur-sm min-h-[400px]">
              {BackgroundIconComponent && (
                <div
                  key={activeRole + "-bg"}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-4 animate-slideFadeIn"
                >
                  <BackgroundIconComponent className="w-4/5 h-4/5 text-indigo-500" />
                </div>
              )}

              <div
                key={activeRoleData.key + "-content"}
                className="relative z-10 text-start animate-fadeIn"
              >
                <div className="space-y-2 mb-8 border-b pb-4 border-gray-700">
                  <h1 className="text-3xl font-extrabold text-indigo-400">
                    {activeRoleData.title} Overview
                  </h1>
                  <h3 className="text-md text-gray-300 opacity-90 font-medium">
                    {activeRoleData.desc}. Specialized features below.
                  </h3>
                </div>

                <div className="divide-y divide-y-gray-800">
                  {activeRoleData.features.map((feature, idx) => {
                    const IconComponent = feature.icon;
                    return (
                      <div
                        key={idx}
                        className="py-4 flex items-start transition-all duration-300 -mx-4 px-4 hover:bg-gray-700/70 rounded-md cursor-pointer "
                      >
                        <div className="p-2 md:p-4 mr-4 flex-shrink-0 bg-gray-900 rounded-full">
                          <IconComponent className="h-5 w-5 text-indigo-400" />
                        </div>

                        <div>
                          <h2
                            className={`text-white text-lg font-bold mb-0.5 flex flex-col md:flex-row items-start md:items-baseline`}
                          >
                            {feature.title}
                            <span>
                              {feature.status === "Coming Soon" && (
                                <span className="my-2 md:my-0 md:ml-2 text-[10px] font-medium text-yellow-400/50 bg-yellow-900/20 px-2 py-0.5 rounded-full border border-yellow-800/30">
                                  Coming Soon
                                </span>
                              )}
                              {feature.status === "Available" && (
                                <span className="my-2 md:my-0 md:ml-2 text-[10px] font-medium text-green-400/50 bg-green-900/20 px-3 py-0.5 rounded-full border border-green-800/30">
                                  Available
                                </span>
                              )}
                            </span>
                          </h2>
                          <p className="text-gray-400 text-sm mt-2">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes slideFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 0.05;
            transform: scale(1);
          }
        }
        .animate-slideFadeIn {
          animation: slideFadeIn 0.8s ease-out;
        }
      `}</style>
    </main>
  );
}
