"use client";

import { useEffect, useState } from "react";


export default function HomeClient() {
 const [user, setUser] = useState<any>(null); 
 
   useEffect(() => {
     // This runs only on client
     const storedUser = localStorage.getItem("user");
     if (storedUser) {
       try {
         setUser(JSON.parse(storedUser));
       } catch (error) {
         console.error("Failed to parse user:", error);
       }
     }
   }, []);
  return (
    <div className="max-w-4xl md:max-w-5xl mx-auto text-center">
      {user ? (
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user.name} 👋
          </h2>
          <p className="text-gray-600 mb-4">
            Continue where you left off, and track your exam performance.
          </p>
        </section>
      ) : (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Why Choose Examify?</h2>
          <p className="text-gray-600 mb-4">
            Empowering students and educators to simplify exams with smart
            tools.
          </p>
        </section>
      )}

      <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-emerald-100 transition">
          <h3 className="text-xl font-bold mb-2">
            📚 {user ? "Your Exams" : "Smart Exam Creation"}
          </h3>
          <p className="text-gray-600">
            {user
              ? "Quickly access and manage your upcoming and past exams."
              : "Easily create, edit, and manage exams with multiple question types."}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-emerald-100 transition">
          <h3 className="text-xl font-bold mb-2">👩‍🏫 Role Based Access</h3>
          <p className="text-gray-600">
            Students, Instructors, and Admins each have their own personalized
            dashboard.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-emerald-100 transition">
          <h3 className="text-xl font-bold mb-2">
            📈 {user ? "Your Analytics" : "Performance Analytics"}
          </h3>
          <p className="text-gray-600">
            {user
              ? "See your latest performance metrics and exam scores."
              : "View results, rankings, and progress tracking in real-time."}
          </p>
        </div>
      </div>
    </div>
  );
}
