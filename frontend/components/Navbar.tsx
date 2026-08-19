"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Treatments", href: "/treatments" },
    { name: "Hospitals", href: "/hospitals" },
    { name: "Doctors", href: "/doctors" },
    { name: "About India", href: "/about-india" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#DFC5FE] text-[#DFC5FE] text-xl font-bold">
            +
          </div>

          <div className="leading-tight">
            <h1 className="text-[17px] font-bold text-[#2563A6]">
              MediIndia Care
            </h1>

            <p className="text-[9px] text-gray-400 tracking-wide">
              Your Health, Our Priority
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 text-[12px] font-semibold text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-3 py-2 rounded-lg hover:text-[#7C3AED] hover:bg-[#DFC5FE]/20 transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#7C3AED] transition-colors"
            >
              <span>🌐</span>
              <span>EN</span>
              <span
                className={`text-xs transition-transform ${
                  languageOpen ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-9 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => setLanguageOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#DFC5FE]/20 transition-colors"
                >
                  🇬🇧 English
                </button>

                <button
                  onClick={() => setLanguageOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#DFC5FE]/20 transition-colors"
                >
                  🇮🇳 Hindi
                </button>
              </div>
            )}
          </div>

          {/* Login */}
          <button className="border border-[#DFC5FE] text-[#7C3AED] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#DFC5FE]/15 transition-all">
            Login
          </button>

          {/* Sign Up */}
          <button className="bg-[#DFC5FE] text-[#4C1D95] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#C9A7F5] transition-all shadow-sm">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-[#DFC5FE] text-[#7C3AED] text-xl"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-sm">
          <div className="flex flex-col gap-1">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-700 hover:text-[#7C3AED] hover:bg-[#DFC5FE]/20 transition-all"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-gray-100 mt-2 pt-3 flex gap-3">
              <button className="flex-1 border border-[#DFC5FE] text-[#7C3AED] py-2.5 rounded-lg text-sm font-semibold">
                Login
              </button>

              <button className="flex-1 bg-[#DFC5FE] text-[#4C1D95] py-2.5 rounded-lg text-sm font-semibold">
                Sign Up
              </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
