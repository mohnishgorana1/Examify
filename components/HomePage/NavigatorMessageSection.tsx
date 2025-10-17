'use client'

import Link from "next/link";
import { Button } from "../ui/button";

export default function  NavigatorMessageSection ({
  appUser,
  user,
}: {
  appUser: any;
  user: any;
})  {
  return (
    <main className="py-24 px-6 md:px-20 bg-gradient-to-b min-h-[90vh] from-gray-900 via-gray-800 to-gray-900 text-center flex items-center justify-center flex-col">
      <h2 className="text-4xl font-bold mb-6">
        {user ? "Need Help Navigating?" : "Ready to revolutionize exams?"}
      </h2>
      <p className="text-lg mb-8">
        {user
          ? "Visit your dashboard to manage exams, results, and more."
          : "Join hundreds of users simplifying their online assessments with Examify."}
      </p>
      <Link href={appUser ? `/dashboard/${appUser?.role}` : "/sign-in"} className="h-12">
        <Button className="bg-neutral-900 text-white h-10 md:h-14 cursor-pointer px-8 md:px-12 py-3 md:py-4 rounded-md text-lg font-semibold hover:bg-neutral-950 transition">
          {user ? "Go to Dashboard" : "Get Started Now"}
        </Button>
      </Link>
    </main>
  );
};
