import LoginComponent from "@/components/AuthComponents/LoginComponent";
import React from "react";

function Login() {
  return (
    <main className="flex items-center justify-center h-[75vh] md:h-[80vh]">
      <div className="max-w-[90%] md:max-w-[70%] lg:max-w-[40%] mx-auto mt-10 bg-neutral-800 shadow-lg p-6 rounded-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 tracking-tight">
            Log in to your Examify Account
          </h2>
          <p className="text-white-600 text-sm mt-2 text-white">
            Welcome to access exams and personalized dashboard.
          </p>
        </div>
        <LoginComponent />
      </div>
    </main>
  );
}

export default Login;
