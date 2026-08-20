"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ADMIN_EMAIL = "admin@mediindia.com";
const ADMIN_PASSWORD = "admin123";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    if (
      email.trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", email.trim().toLowerCase());

      router.push("/admin");
      return;
    }

    setError("Invalid email or password.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-slate-900">
              MediIndia <span className="text-[#2563A6]">Care</span>
            </h1>
          </Link>

          <p className="mt-2 text-sm text-gray-500">
            Healthcare made simple
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-gray-100 bg-white p-7 sm:p-9 shadow-[0_15px_50px_rgba(0,0,0,0.10)]">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              Admin Login
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to access the MediIndia Care dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2563A6] focus:ring-2 focus:ring-[#2563A6]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2563A6] focus:ring-2 focus:ring-[#2563A6]/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#DFC5FE] px-5 py-3.5 font-semibold text-[#4C1D95] transition hover:bg-[#C9A7F5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>


          {/* Back to website */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-[#2563A6] hover:underline"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}