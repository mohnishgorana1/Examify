"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { navLinks } from "@/constants/navlinks";
import { useAppUser } from "@/contexts/UserContext";

export default function Header() {
  const pathname = usePathname();
  const { user, isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  const { appUser } = useAppUser();

  const dashboardPath = `/dashboard/${appUser?.role || "student"}`;
  return (
    <header className="w-full sticky top-0 z-50 bg-neutral-900 pb-3">
      <div className="max-w-7xl md:max-w-[99%] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-500 flex items-center "
        >
          <GraduationCap size={24} className="mt-1 mr-1" />
          Examify
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-indigo-400"
                  : "text-neutral-300 hover:text-indigo-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {isSignedIn && (
            <Link
              href={dashboardPath}
              className={`text-sm font-medium transition-colors ${
                pathname === dashboardPath
                  ? "text-indigo-400"
                  : "text-neutral-300 hover:text-indigo-400"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isSignedIn ? (
            <>
              <UserButton afterSignOutUrl="/" />
              <SignOutButton>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-200 hover:text-indigo-400"
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              {/* Changed bg-indigo-600/700 from blue/indigo to maintain palette */}
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-300 hover:text-indigo-400"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-neutral-900 border-neutral-800"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="text-2xl font-bold text-indigo-500 flex items-center "
                  >
                    <GraduationCap size={24} className="mt-1 mr-1" />
                    Examify
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-5 mt-6 items-center justify-center w-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium ${
                      pathname === link.href
                        ? "text-indigo-400"
                        : "text-neutral-300 hover:text-indigo-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href={dashboardPath}
                  className={`text-sm font-medium transition-colors ${
                    pathname === dashboardPath
                      ? "text-indigo-400"
                      : "text-neutral-300 hover:text-indigo-400"
                  }`}
                >
                  Dashboard
                </Link>

                <div className="w-full pt-5 border-t border-neutral-800 flex flex-col gap-3 px-3">
                  {isSignedIn ? (
                    <span className="flex items-center justify-between ">
                      <UserButton afterSignOutUrl="/" />
                      <SignOutButton>
                        <Button
                          variant="outline"
                          className="border-neutral-700 text-neutral-200 hover:text-indigo-400"
                        >
                          Sign Out
                        </Button>
                      </SignOutButton>
                    </span>
                  ) : (
                    <SignInButton mode="modal">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                        Sign In
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
