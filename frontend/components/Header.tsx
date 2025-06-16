"use client";
import React from "react";
import { Button } from "./ui/button";
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
import { usePathname } from "next/navigation";
import { authLinks, navLinks } from "@/constants/navlinks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/store/userSlice";

function Header() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const getDashboardLink = () => {
    return user?.role ? `/${user.role}` : "/student";
  };
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-4">
      <h1 className="text-2xl font-extrabold tracking-wide font-sans">
        <span className="">Examify</span>
      </h1>

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
                  <MenubarItem>Logout</MenubarItem>
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
                  <MenubarItem onClick={() => dispatch(logout())}>
                    Logout
                  </MenubarItem>
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
