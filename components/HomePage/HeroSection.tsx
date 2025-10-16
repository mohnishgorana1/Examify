'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { Spotlight } from "../ui/spotlight";

export default function  HeroSection ({ user, appUser }: { user: any; appUser: any })  {
  return (
    <main className="relative overflow-hidden min-h-[95vh] flex flex-col items-center justify-center px-6 md:px-20 pt-20 text-center bg-neutral-950 ">
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
    </main>
  );
};