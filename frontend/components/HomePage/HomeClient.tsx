

//* 2

// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useEffect, useRef } from "react";
// import confetti from "canvas-confetti";

// export default function HomeClient() {
//   const { user } = useAuth();
//   const confettiRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const duration = 4 * 1000;
//     const animationEnd = Date.now() + duration;

//     (function frame() {
//       confetti({
//         particleCount: 3,
//         angle: 60,
//         spread: 55,
//         origin: { x: 0 },
//         colors: ["#f97316", "#facc15", "#fb923c"],
//         scalar: 0.8,
//       });
//       confetti({
//         particleCount: 3,
//         angle: 120,
//         spread: 55,
//         origin: { x: 1 },
//         colors: ["#f97316", "#facc15", "#fb923c"],
//         scalar: 0.8,
//       });

//       if (Date.now() < animationEnd) {
//         requestAnimationFrame(frame);
//       }
//     })();
//   }, []);

//   return (
//     <div className="relative min-h-[75vh] px-5 py-12 md:pt-0 md:pb-10 md:px-20 mx-auto text-center bg-gradient-to-b from-neutral-950 from-20% via-neutral-900 via-85% to-neutral-800 to-95% flex flex-col items-center justify-center overflow-hidden">
//       {/* Confetti Canvas */}
//       <canvas
//         ref={confettiRef}
//         className="absolute inset-0 w-full h-full pointer-events-none"
//       />

//       {user ? (
//         <section className="mb-8 animate-fade-in-up">
//           <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
//             Welcome back, {user.name} 👋
//           </h2>
//           <p className="text-neutral-400 text-lg">
//             Continue where you left off, and track your exam performance.
//           </p>
//         </section>
//       ) : (
//         <section className="mb-8 animate-fade-in-up">
//           <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
//             Why Choose Examify?
//           </h2>
//           <p className="text-neutral-400 text-lg">
//             Empowering students and educators to simplify exams with smart
//             tools.
//           </p>
//         </section>
//       )}

//       <div className="grid md:grid-cols-3 gap-6 mt-6 text-left w-full animate-fade-in-up delay-200">
//         <div className="bg-neutral-800 p-6 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-orange-500/40 shadow-lg">
//           <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
//             📚 {user ? "Your Exams" : "Smart Exam Creation"}
//           </h3>
//           <p className="text-neutral-400 text-xs md:text-base">
//             {user
//               ? "Quickly access and manage your upcoming and past exams."
//               : "Easily create, edit, and manage exams with multiple question types."}
//           </p>
//         </div>
//         <div className="bg-neutral-800 p-6 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-orange-500/40 shadow-lg">
//           <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
//             👩‍🏫 Role Based Access
//           </h3>
//           <p className="text-neutral-400 text-xs md:text-base">
//             Students, Instructors, and Admins each have their own personalized
//             dashboard.
//           </p>
//         </div>
//         <div className="bg-neutral-800 p-6 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-orange-500/40 shadow-lg">
//           <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
//             📈 {user ? "Your Analytics" : "Performance Analytics"}
//           </h3>
//           <p className="text-neutral-400 text-xs md:text-base">
//             {user
//               ? "See your latest performance metrics and exam scores."
//               : "View results, rankings, and progress tracking in real-time."}
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in-up {
//           animation: fadeInUp 1.2s ease forwards;
//         }
//         .delay-200 {
//           animation-delay: 0.2s;
//         }
//         @keyframes gradientShift {
//           0% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//           100% {
//             background-position: 0% 50%;
//           }
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradientShift 6s ease infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// * 1

"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const { user } = useAuth();

  return (
    <div className="min-h-[75vh] px-5 py-12 md:pt-0 md:pb-10 md:px-20 mx-auto text-center bg-gradient-to-b from-neutral-950 from-20% via-neutral-900 via-85% to-neutral-800 to-95% flex flex-col items-center justify-center">
      {user ? (
        <section className="mb-8">
          <h2 className="text-4xl font-bold mb-2 text-white">
            Welcome back, {user.name} 👋
          </h2>
          <p className="text-white-600 mb-4 text-neutral-400">
            Continue where you left off, and track your exam performance.
          </p>
        </section>
      ) : (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-white">Why Choose Examify?</h2>
          <p className="text-white-600 mb-4 text-neutral-400">
            Empowering students and educators to simplify exams with smart
            tools.
          </p>
        </section>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
        <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
            📚 {user ? "Your Exams" : "Smart Exam Creation"}
          </h3>
          <p className="text-neutral-400 text-xs md:text-lg">
            {user
              ? "Quickly access and manage your upcoming and past exams."
              : "Easily create, edit, and manage exams with multiple question types."}
          </p>
        </div>
        <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">👩‍🏫 Role Based Access</h3>
          <p className="text-neutral-400 text-xs md:text-lg">
            Students, Instructors, and Admins each have their own personalized
            dashboard.
          </p>
        </div>
        <div className="bg-neutral-800 p-6 rounded-lg hover:shadow-md hover:shadow-neutral-500 duration-300 transition">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
            📈 {user ? "Your Analytics" : "Performance Analytics"}
          </h3>
          <p className="text-neutral-400 text-xs md:text-lg">
            {user
              ? "See your latest performance metrics and exam scores."
              : "View results, rankings, and progress tracking in real-time."}
          </p>
        </div>
      </div>
    </div>
  );
}
