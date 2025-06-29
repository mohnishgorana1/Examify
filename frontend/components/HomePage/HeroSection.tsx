"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();
  return (
    // <section className="min-h-[86vh] relative overflow-hidden py-24 px-6 md:px-20 text-center bg-gradient-to-b from-neutral-800 to-neutral-800 flex flex-col items-center justify-center">
    //   {/* Background pattern or gradient blob */}
    //   <div className="w-full absolute flex justify-between inset-0 pointer-events-none">
    //     <div className="absolute top-10 left-10 md:top-10 md:left-10 w-36 h-36 md:w-72 md:h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-pulse"></div>
    //     <div className="absolute bottom-10 right-10 md:bottom-20 md:right-10 w-36 h-36 md:w-64 md:h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-90 animate-pulse"></div>
    //   </div>

    //   <div className="relative z-10 max-w-4xl mx-auto">
    //     <h1 className="text-4xl md:text-5xl font-extrabold text-white-900 mb-6 leading-tight tracking-tight">
    //       <span className="text-neutral-50">Crack Exams with</span>{" "}
    //       <span className="text-orange-500">Confidence</span>
    //     </h1>
    //     <p className="text-sm md:text-lg lg:text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
    //       Examify helps students, instructors, and admins manage, prepare, and
    //       succeed in online exams — smarter and faster.
    //     </p>

    //     {!user ? (
    //       <div className="mx-auto space-x-5">
    //         <Link href="/register">
    //           <Button className="cursor-pointer bg-orange-500 hover:bg-orange-500 w-30 md:w-48">
    //             Get Started
    //           </Button>
    //         </Link>
    //         <Link href="/login">
    //           <Button
    //             className="cursor-pointer bg-neutral-50 hover:bg-neutral-300 text-orange-500 w-30 md:w-48"
    //           >
    //             Login
    //           </Button>
    //         </Link>
    //       </div>
    //     ) : (
    //       <Link href={`/dashboard/${user?.role || "/dashboard/student"}`}>
    //         <Button className="bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition shadow-md">
    //           Go to Dashboard
    //         </Button>
    //       </Link>
    //     )}
    //   </div>
    // </section>

    <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-20 py-24 text-center bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950">
      {/* Animated blobs */}
      <div className="absolute w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
        {/* Headline with animated gradient */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Crack Exams with Confidence
        </h1>

        <p className="text-sm md:text-lg lg:text-lg text-neutral-300 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
          Examify helps students, instructors, and admins manage, prepare, and
          succeed in online exams — smarter and faster.
        </p>

        {/* Buttons */}
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
  );
}
