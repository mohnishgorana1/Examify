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

  // useEffect(() => {
  //   // This runs only on client
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       setUser(JSON.parse(storedUser));
  //     } catch (error) {
  //       console.error("Failed to parse user:", error);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    (async () => {
      const token = await getValidAccessToken();
      // console.log("Token in Header:", token);
    })();
  }, []);

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
    <header className="h-16 bg-white shadow flex items-center justify-between px-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-2xl font-bold tracking-tight text-emerald-700 hover:text-emerald-900 transition"
      >
        <GraduationCap size={24} className="mt-1" />
        <span className="font-[Playfair_Display]">Examify</span>
      </Link>

      {/* large screen navlinks */}
      <nav className="md:flex gap-4 hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={` hover:text-black transition-all border-b-2 ${
              pathname === link.href
                ? "border-emerald-700 text-emerald-700 font-semibold"
                : "border-transparent"
            }`}
          >
            {link.name}
          </Link>
        ))}
        {user && (
          <Link
            href={getDashboardLink()}
            className={`hover:text-black transition-all border-b-2 ${
              pathname === getDashboardLink()
                ? "border-emerald-700 text-emerald-700 font-semibold"
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
            <MenubarTrigger>
              <MdMenu />
            </MenubarTrigger>
            <MenubarContent>
              {navLinks.map((link) => (
                <MenubarItem key={link.href} asChild>
                  <Link href={link.href}>{link.name}</Link>
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
                  <MenubarItem>Account</MenubarItem>
                  <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
                </>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </span>

      {/* menubar for big screen that holds only account stuff*/}
      <span className="hidden md:flex ">
        <Menubar className="hover:shadow-gray-500 hover:shadow-sm duration-300">
          <MenubarMenu>
            <MenubarTrigger>
              <MdMenu className="text-xl font-bold bg-transparent" />
            </MenubarTrigger>
            <MenubarContent>
              {user ? (
                <>
                  <MenubarItem asChild>
                    <Link href={getDashboardLink()}>Dashboard</Link>
                  </MenubarItem>
                  <MenubarItem onClick={() => {}}>View Profile</MenubarItem>
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
