"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Spotlight } from "../ui/Spotlight";

function ProfileComponent() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="h-full pt-5 md:pt-24 px-4 flex flex-col items-center justify-evenly gap-y-4">
        <div className="relative flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-[slideDot_1.5s_ease-in-out_infinite] [animation-delay:0.4s]"></div>

          <style jsx>{`
            @keyframes slideDot {
              0% {
                transform: translateX(0);
                opacity: 1;
              }
              50% {
                transform: translateX(10px);
                opacity: 0.5;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
        <h1 className="animate-pulse text-white text-3xl">
          Loading your profile...
        </h1>
      </main>
    );
  }

  return (
    <div className="relative h-full pt-5 md:pt-10 px-4 flex md:items-center md:justify-evenly ">
      <div
        className="absolute top-30 left-50 right-50 md:top-20 md:left-20 h-24 w-24 bg-orange-400 rounded-full opacity-10 animate-pulse"
        style={{ filter: "blur(80px)" }}
      />
      <div
        className="hidden md:block absolute bottom-5 right-20 h-24 w-24 bg-orange-400 rounded-full opacity-10 animate-pulse"
        style={{ filter: "blur(80px)" }}
      />
      <section className="hidden md:flex flex-col justify-between pl-2 font-bold py-16 text-8xl gy-5">
        <span className="bg-gradient-to-br from-35% from-orange-500 via-55% via-neutral-700 to-70% to-neutral-800 bg-clip-text text-transparent">
          View
        </span>
        <span className="bg-gradient-to-br from-35% from-orange-500 via-55% via-neutral-700 to-70% to-neutral-800 bg-clip-text text-transparent">
          Profile
        </span>
      </section>
      <section className="flex flex-col items-center gap-y-5">
        <h1 className="md:hidden text-orange-500 text-3xl font-semibold">
          View Profile Details
        </h1>
        <div className="flex flex-col gap-y-3 text-white">
          <h2 className="font-bold text-xl md:text-4xl">{user.name}</h2>
          <div className="text-lg">
            <p>
              <span className="font-semibold text-neutral-300">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-neutral-300">Phone:</span>{" "}
              {user.phone}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold text-neutral-300">Role:</span>{" "}
              {user.role}
            </p>
            {user.dob && (
              <p>
                <span className="font-semibold text-neutral-300">DOB:</span>{" "}
                {new Date(user.dob).toLocaleDateString()}
              </p>
            )}
          </div>
          <div>
            <p>
              <span className="font-semibold text-neutral-300">Verified:</span>{" "}
              {user.isVerified ? (
                <span className="text-green-500 font-semibold">Yes</span>
              ) : (
                <span className="text-red-500 font-semibold">No</span>
              )}
            </p>
            <p>
              <span className="font-semibold text-neutral-300">Joined On:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileComponent;
