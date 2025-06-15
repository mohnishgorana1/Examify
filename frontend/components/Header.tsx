'use client'
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

function Header() {
  const pathname = usePathname();
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
            className={`text-gray-700 hover:text-black transition-all border-b-2 ${
              pathname === link.href
                ? "border-black font-semibold"
                : "border-transparent"
            }`}
          >
            {link.name}
          </Link>
        ))}
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
              <MenubarSeparator />
              {authLinks.map((link) => (
                <MenubarItem key={link.href} asChild>
                  <Link href={link.href}>{link.name}</Link>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </span>

      {/* menubar for big screen that holds only account stuff*/}
      <span className="hidden md:flex ">
        <Menubar className="hover:shadow-gray-500 hover:shadow-sm duration-300">
          <MenubarMenu>
            <MenubarTrigger >
              <MdMenu size={24}/>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Account Status</MenubarItem>
              <MenubarSeparator />
              {authLinks.map((link) => (
                <MenubarItem key={link.href} asChild>
                  <Link href={link.href}>{link.name}</Link>
                </MenubarItem>
              ))}
              <MenubarSeparator />
              <MenubarItem>Logout</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </span>
    </header>
  );
}

export default Header;
