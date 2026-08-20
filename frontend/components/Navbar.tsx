// This component creates the website's navigation bar
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Treatments", href: "/#treatments" },
    { name: "Hospitals", href: "/hospitals" },
    { name: "Doctors", href: "/doctors" },
    { name: "About India", href: "/#about-india" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Contact", href: "/#contact" },
  ];

  const goToLogin = () => {
    setMobileOpen(false);
    router.push("/login");
  };

  const goToSignup = () => {
    setMobileOpen(false);
    router.push("/signup");
  };

  const selectLanguage = (selectedLanguage: "EN" | "HI") => {
    setLanguage(selectedLanguage);
    setLanguageOpen(false);

    // Save selected language for the current browser
    localStorage.setItem("language", selectedLanguage);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#DFC5FE] overflow-hidden bg-white">
            <Image
              src="/images/logo.jpg"
              alt="MediIndia Care Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
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

          {/* LANGUAGE */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setLanguageOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-[#7C3AED] transition-colors"
            >
              <span>🌐</span>

              <span>
                {language}
              </span>

              <span
                className={`text-xs transition-transform ${
                  languageOpen ? "rotate-180" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-10 w-40 bg-white border border-gray-200 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] py-2 z-[100]">

                {/* English */}
                <button
                  type="button"
                  onClick={() => selectLanguage("EN")}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    language === "EN"
                      ? "bg-[#DFC5FE]/20 text-[#6D28D9] font-semibold"
                      : "text-gray-700 hover:bg-[#DFC5FE]/15"
                  }`}
                >
                  🇬🇧 English
                </button>

                {/* Hindi */}
                <button
                  type="button"
                  onClick={() => selectLanguage("HI")}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    language === "HI"
                      ? "bg-[#DFC5FE]/20 text-[#6D28D9] font-semibold"
                      : "text-gray-700 hover:bg-[#DFC5FE]/15"
                  }`}
                >
                  🇮🇳 Hindi
                </button>

              </div>
            )}
          </div>

          {/* Login */}
          <button
            type="button"
            onClick={goToLogin}
            className="border border-[#DFC5FE] text-[#7C3AED] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#DFC5FE]/15 transition-all"
          >
            Login
          </button>

          {/* Sign Up */}
          <button
            type="button"
            onClick={goToSignup}
            className="bg-[#DFC5FE] text-[#4C1D95] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#C9A7F5] transition-all shadow-sm"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
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

            {/* Navigation */}
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

            {/* Mobile Language */}
            <div className="border-t border-gray-100 mt-2 pt-3">

              <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">
                Language
              </p>

              <div className="flex gap-2 px-4">

                <button
                  type="button"
                  onClick={() => selectLanguage("EN")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition ${
                    language === "EN"
                      ? "bg-[#DFC5FE]/20 border-[#DFC5FE] text-[#6D28D9]"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  🇬🇧 English
                </button>

                <button
                  type="button"
                  onClick={() => selectLanguage("HI")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition ${
                    language === "HI"
                      ? "bg-[#DFC5FE]/20 border-[#DFC5FE] text-[#6D28D9]"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  🇮🇳 Hindi
                </button>

              </div>
            </div>

            {/* Mobile Login + Signup */}
            <div className="border-t border-gray-100 mt-3 pt-3 flex gap-3">

              <button
                type="button"
                onClick={goToLogin}
                className="flex-1 border border-[#DFC5FE] text-[#7C3AED] py-2.5 rounded-lg text-sm font-semibold hover:bg-[#DFC5FE]/15 transition-all"
              >
                Login
              </button>

              <button
                type="button"
                onClick={goToSignup}
                className="flex-1 bg-[#DFC5FE] text-[#4C1D95] py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C9A7F5] transition-all"
              >
                Sign Up
              </button>

            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
