import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="scroll-section text-neutral-400 pt-12 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4">Examify</h3>
          <p className="text-sm">
            The premier platform for online exam management, analytics, and
            success.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-indigo-500 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-indigo-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-400 transition-colors"
              >
                Support / Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-indigo-500 mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 transition-colors"
              >
                Security
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-indigo-500 mb-4">
            Get In Touch
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-medium text-neutral-300">Email:</span>{" "}
              support@examify.com
            </li>
            <li>
              <span className="font-medium text-neutral-300">Phone:</span> +91
              98765 43210
            </li>
            <li>
              <span className="font-medium text-neutral-300">Office:</span>{" "}
              Examify HQ, Neemuch, Madhya Pradesh, India
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-neutral-800 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Examify. All rights reserved. Built with
        Next.js and Tailwind CSS.
      </div>
    </footer>
  );
}

export default Footer;
