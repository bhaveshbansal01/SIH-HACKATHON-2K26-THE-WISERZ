"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    // Name validation
    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo user storage
    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: "user",
    };

    localStorage.setItem("user", JSON.stringify(user));

    setSuccess("Account created successfully!");

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#DFC5FE]/20 blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#2563A6]/5 blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[460px]">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.10)] p-7 sm:p-9">

          {/* Back */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm font-medium text-[#2563A6] hover:text-[#1D4F85] transition mb-7"
          >
            <span className="text-lg">←</span>
            Back to Website
          </button>

          {/* Logo */}
          <div className="text-center mb-8">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-3xl font-bold tracking-tight text-slate-900"
            >
              MediIndia{" "}
              <span className="text-[#2563A6]">
                Care
              </span>
            </button>

            <p className="mt-2 text-sm text-gray-500">
              Your journey to better health starts here
            </p>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Join MediIndia Care and explore trusted healthcare
              providers and treatments.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSignup}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-slate-800"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                className="block w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm outline-none transition-all focus:border-[#2563A6] focus:ring-4 focus:ring-[#2563A6]/10 placeholder:text-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-slate-800"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="block w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm outline-none transition-all focus:border-[#2563A6] focus:ring-4 focus:ring-[#2563A6]/10 placeholder:text-gray-400"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-slate-800"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
                className="block w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm outline-none transition-all focus:border-[#2563A6] focus:ring-4 focus:ring-[#2563A6]/10 placeholder:text-gray-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-semibold text-slate-800"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className="block w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-slate-900 text-sm outline-none transition-all focus:border-[#2563A6] focus:ring-4 focus:ring-[#2563A6]/10 placeholder:text-gray-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl bg-[#DFC5FE] text-[#4C1D95] font-semibold text-sm transition-all hover:bg-[#C9A7F5] hover:shadow-md active:scale-[0.99]"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-semibold text-[#2563A6] hover:underline"
              >
                Login
              </button>
            </p>
          </div>

          {/* Small trust text */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Trusted Healthcare • Secure Experience
          </div>
        </div>
      </div>
    </main>
  );
}