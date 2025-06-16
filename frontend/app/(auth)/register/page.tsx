import RegisterComponent from "@/components/AuthComponents/RegisterComponent";
import React from "react";

function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[70%] ld:w-[30%] mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-500 tracking-tight">
            Create Your Examify Account
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Register to access courses, exams and personalized dashboard.
          </p>
        </div>
        <RegisterComponent />
      </div>
    </main>
  );
}

export default RegisterPage;
