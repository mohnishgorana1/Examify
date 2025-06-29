"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export default function NotFound() {
  const router = useRouter();

  // Trigger confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <main className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-950 text-white px-4">
      {/* Floating gradient blobs */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-orange-500 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-yellow-500 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      {/* 404 */}
      <h1
        className="text-8xl font-bold text-orange-500 mb-4 animate-pulse"
        style={{ textShadow: "0 0 20px #f97316, 0 0 50px #f97316" }}
      >
        404
      </h1>

      {/* Typewriter text */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-2 typewriter">
        Page Not Found
      </h2>
      <p className="text-neutral-400 text-center max-w-md mb-6 animate-fade-in-up delay-200">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 animate-fade-in-up delay-400">
        <Link href="/">
          <Button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:scale-105 hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/50">
            Go to Home
          </Button>
        </Link>

        <Button
          onClick={() => router.back()}
          className="bg-neutral-700 text-white px-6 py-3 rounded-xl hover:scale-105 hover:bg-neutral-600 transition-all duration-300 shadow-lg hover:shadow-neutral-500/50"
        >
          Go Back
        </Button>
      </div>

      {/* Styles */}
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
          animation: blob 8s infinite ease-in-out;
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

        /* Typewriter effect */
        .typewriter {
          overflow: hidden;
          border-right: 2px solid orange;
          white-space: nowrap;
          animation: typing 2s steps(20, end), blink 0.75s step-end infinite;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 14ch;
          }
        }

        @keyframes blink {
          0%,
          100% {
            border-color: transparent;
          }
          50% {
            border-color: orange;
          }
        }
      `}</style>
    </main>
  );
}
