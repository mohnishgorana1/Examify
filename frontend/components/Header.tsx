"use client";
import React, { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react"; // or any icon library
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authLinks, navLinks } from "@/constants/navlinks";
import axios from "axios";
import { URLs } from "@/constants/urls";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // const [user, setUser] = useState<any>(null);
  const { user, getValidAccessToken, logout } = useAuth();
  let currentPathname = "";
  if (pathname.startsWith("/")) {
    currentPathname = "/";
  }
  if (pathname.startsWith("/career")) {
    currentPathname = "/career";
  }
  if (pathname.startsWith("/about")) {
    currentPathname = "/about";
  }
  if (pathname.startsWith("/contact")) {
    currentPathname = "/contact";
  }
  if (pathname.startsWith("/dashboard")) {
    currentPathname = "/dashboard";
  }

  const handleLogout = async () => {
    const token = await getValidAccessToken();

    const logoutResponse = await axios.get(
      `${URLs.backend}/api/v1/auth/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    if (logoutResponse.data.success) {
      logout();
      router.push("/");
    }
  };

  const getDashboardLink = () => {
    return user?.role ? `/dashboard/${user?.role}` : "/dashboard/student";
  };
  return (
    <header className="h-16 bg-neutral-800 shadow flex items-center justify-between px-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-2xl font-bold tracking-tight text-orange-500/80 hover:text-orange-500 transition"
      >
        <GraduationCap size={24} className="mt-1" />
        <span className="font-[Playfair_Display]">Examify</span>
      </Link>

      {/* large screen navlinks */}
      <nav className="md:flex gap-4 hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="">
            <span
              className={`pb-[1px] text-white hover:text-orange-500 transition-all border-b-2 ${
                currentPathname === link.href
                  ? "border-orange-500 text-orange-500 font-semibold"
                  : "border-transparent"
              }`}
            >
              {link.name}
            </span>
          </Link>
        ))}
        {user && (
          <Link
            href={getDashboardLink()}
            className={`text-white hover:text-orange-500 transition-all border-b-2 ${
              pathname === getDashboardLink()
                ? "border-orange-500 text-orange-500 font-semibold"
                : "border-transparent"
            }`}
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* menu bar for small screen*/}
      <span className="md:hidden">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="p-1 border border-neutral-400 rounded-sm hover:text-neutral-200 duration-300  ">
              <MdMenu className="text-neutral-400 hover:text-neutral-200 duration-300 text-xl" />
            </MenubarTrigger>
            <MenubarContent className="flex flex-col">
              {navLinks.map((link) => (
                <MenubarItem key={link.href} asChild>
                  <Link href={link.href} className="">
                    {link.name}
                  </Link>
                </MenubarItem>
              ))}
              {user && (
                <MenubarItem asChild>
                  <Link href={getDashboardLink()}>Dashboard</Link>
                </MenubarItem>
              )}
              <MenubarSeparator />
              {!user &&
                authLinks.map((link) => (
                  <MenubarItem key={link.href} asChild>
                    <Link href={link.href}>{link.name}</Link>
                  </MenubarItem>
                ))}
              <MenubarSeparator />
              {user && (
                <>
                  <MenubarItem>
                    <Link href={"/profile"}>View Profile</Link>
                  </MenubarItem>
                  <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
                </>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </span>

      {/* menubar for big screen that holds only account stuff*/}
      <span className="hidden md:flex ">
        <Menubar className="">
          <MenubarMenu>
            <MenubarTrigger className="p-1 border border-neutral-400 rounded-sm hover:text-neutral-200 duration-300  ">
              <MdMenu className="text-neutral-400 hover:text-neutral-200 duration-300 text-xl" />
            </MenubarTrigger>
            <MenubarContent className="flex flex-col">
              {user ? (
                <>
                  <MenubarItem>
                    <Link href={getDashboardLink()}>Dashboard</Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href={"/profile"}>View Profile</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
                </>
              ) : (
                <>
                  {authLinks.map((link) => (
                    <MenubarItem key={link.href} asChild>
                      <Link href={link.href}>{link.name}</Link>
                    </MenubarItem>
                  ))}
                </>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </span>
    </header>
  );
}

export default Header;
