"use client";

import { useState } from "react";

export default function Navbar() {
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      {/* max-w-7xl hatakar w-full lagaya hai aur flex-1 add kiya hai */}
      <div className="w-full px-6 lg:px-12 h-[72px] flex items-center justify-between">

        {/* Logo (Far Left) */}
        <a href="/" className="flex items-center gap-2 shrink-0">
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
        </a>

        {/* Navigation Links (Center) */}
        <div className="hidden lg:flex items-center gap-8 text-[12px] font-medium text-gray-700">
          <a href="/" className="hover:text-[#DFC5FE] transition-colors">Home</a>
          <a href="/treatments" className="hover:text-[#DFC5FE] transition-colors">Treatments</a>
          <a href="/hospitals" className="hover:text-[#DFC5FE] transition-colors">Hospitals</a>
          <a href="/doctors" className="hover:text-[#DFC5FE] transition-colors">Doctors</a>
          <a href="/about-india" className="hover:text-[#DFC5FE] transition-colors">About India</a>
          <a href="/how-it-works" className="hover:text-[#DFC5FE] transition-colors">How It Works</a>
          <a href="/contact" className="hover:text-[#DFC5FE] transition-colors">Contact</a>
        </div>

        {/* Right Side Controls (Far Right) */}
        <div className="flex items-center gap-4 shrink-0">

          {/* Language Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-[#DFC5FE] transition-colors"
            >
              <span className="text-base">🌐</span>
              <span>EN</span>
              <span className={`text-xs transition-transform ${languageOpen ? "rotate-180" : ""}`}>
                ⌄
              </span>
            </button>

            {languageOpen && (
              <div className="absolute right-0 top-9 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <button onClick={() => setLanguageOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#DFC5FE]/20 transition-colors">
                  🇬🇧 English
                </button>
                <button onClick={() => setLanguageOpen(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#DFC5FE]/20 transition-colors">
                  🇮🇳 Hindi
                </button>
              </div>
            )}
          </div>

          {/* Login + Sign Up Buttons */}
          <div className="flex gap-3">
            <button className="border border-purple-300 text-purple-700 px-5 py-2 rounded-lg text-sm font-medium">
              Login
            </button>
            <button className="bg-purple-300 text-white px-5 py-2 rounded-lg text-sm font-medium">
              Sign Up
            </button>
          </div>

        </div>

      </div>
    </nav>
  );
}
