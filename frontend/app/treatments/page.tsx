"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Treatment = {
  id: number;
  name: string;
  specialty: string;
  description: string;
  estimated_cost: string;
  duration: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function TreatmentsPage() {
  const router = useRouter();

  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All Specialties");

  // Fetch treatments
  const fetchTreatments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/treatments`);

      if (!response.ok) {
        throw new Error("Unable to load treatments. Please try again.");
      }

      const data = await response.json();

      setTreatments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Treatment fetch error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load treatments. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  // Get unique specialties
  const specialties = useMemo(() => {
    const unique = Array.from(
      new Set(
        treatments
          .map((treatment) => treatment.specialty)
          .filter(Boolean)
      )
    );

    return ["All Specialties", ...unique];
  }, [treatments]);

  // Filter treatments
  const filteredTreatments = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return treatments.filter((treatment) => {
      const matchesSearch =
        treatment.name?.toLowerCase().includes(searchText) ||
        treatment.specialty?.toLowerCase().includes(searchText) ||
        treatment.description?.toLowerCase().includes(searchText);

      const matchesSpecialty =
        specialty === "All Specialties" ||
        treatment.specialty === specialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [treatments, search, specialty]);

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#DFC5FE]/10 to-[#DFC5FE]/25">

        {/* Decorative lavender blur */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DFC5FE]/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">

          {/* Back */}
          <button
            onClick={() => router.back()}
            className="mb-7 text-sm font-medium text-gray-500 transition hover:text-[#6D28D9]"
          >
            ← Back
          </button>

          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DFC5FE]/70 bg-[#DFC5FE]/25 px-4 py-2 text-sm font-semibold text-[#6D28D9]">
              <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
              Medical Treatments
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Find the Right{" "}
              <span className="text-[#2563A6]">
                Treatment
              </span>{" "}
              for You
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Explore trusted medical treatments in India,
              understand estimated costs and treatment duration,
              and connect with the right healthcare professionals.
            </p>

          </div>

          {/* =====================================================
              SEARCH + FILTER
          ===================================================== */}

          <div className="mt-10 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_15px_45px_rgba(0,0,0,0.10)] backdrop-blur-xl">

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_280px]">

              {/* Search */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3.5 transition focus-within:border-[#DFC5FE] focus-within:ring-2 focus-within:ring-[#DFC5FE]/30">

                <span className="text-xl text-[#2563A6]">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search treatments, specialties..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

              </div>

              {/* Specialty Filter */}
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-600 outline-none transition focus:border-[#DFC5FE] focus:ring-2 focus:ring-[#DFC5FE]/30"
              >
                {specialties.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          TREATMENTS CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-16">

        {/* Section heading */}
        {!loading && !error && treatments.length > 0 && (
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Popular Treatments
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredTreatments.length} treatment
                {filteredTreatments.length !== 1 ? "s" : ""} available
              </p>
            </div>

            {(search || specialty !== "All Specialties") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSpecialty("All Specialties");
                }}
                className="text-sm font-semibold text-[#6D28D9] hover:underline"
              >
                Clear Filters
              </button>
            )}

          </div>
        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="h-2 bg-[#DFC5FE]/40" />

                <div className="animate-pulse p-6">

                  <div className="flex justify-between">
                    <div className="h-12 w-12 rounded-xl bg-gray-200" />
                    <div className="h-6 w-24 rounded-full bg-gray-200" />
                  </div>

                  <div className="mt-6 h-6 w-3/4 rounded bg-gray-200" />

                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-5/6 rounded bg-gray-200" />
                    <div className="h-3 w-2/3 rounded bg-gray-200" />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="h-16 rounded-xl bg-gray-200" />
                    <div className="h-16 rounded-xl bg-gray-200" />
                  </div>

                  <div className="mt-6 h-11 rounded-xl bg-gray-200" />

                </div>
              </div>
            ))}

          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-10 text-center">

            <div className="text-4xl">
              ⚠️
            </div>

            <h2 className="mt-4 text-xl font-bold text-red-800">
              Unable to load treatments
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={fetchTreatments}
              className="mt-6 rounded-xl bg-[#DFC5FE] px-6 py-3 text-sm font-semibold text-[#4C1D95] transition hover:bg-[#C9A7F5]"
            >
              Try Again
            </button>

          </div>
        )}

        {/* =====================================================
            EMPTY DATABASE
        ===================================================== */}

        {!loading &&
          !error &&
          treatments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-[#DFC5FE]/10 p-12 text-center">

              <div className="text-5xl">
                🏥
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No treatments available
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                There are currently no treatments available
                in the system.
              </p>

            </div>
          )}

        {/* =====================================================
            NO SEARCH RESULTS
        ===================================================== */}

        {!loading &&
          !error &&
          treatments.length > 0 &&
          filteredTreatments.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-[#DFC5FE]/10 p-12 text-center">

              <div className="text-5xl">
                🔎
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No treatments found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try searching for another treatment or specialty.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSpecialty("All Specialties");
                }}
                className="mt-5 text-sm font-semibold text-[#6D28D9] hover:underline"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* =====================================================
            TREATMENT CARDS
        ===================================================== */}

        {!loading &&
          !error &&
          filteredTreatments.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredTreatments.map((treatment) => (
                <article
                  key={treatment.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]"
                >

                  {/* Lavender top line */}
                  <div className="h-1.5 bg-gradient-to-r from-[#DFC5FE] via-[#C9A7F5] to-[#DFC5FE]" />

                  <div className="flex flex-1 flex-col p-6">

                    {/* Icon + Specialty */}
                    <div className="flex items-start justify-between gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DFC5FE]/35 text-2xl transition group-hover:bg-[#DFC5FE]/55">
                        🩺
                      </div>

                      <span className="rounded-full bg-[#DFC5FE]/25 px-3 py-1.5 text-xs font-semibold text-[#6D28D9]">
                        {treatment.specialty}
                      </span>

                    </div>

                    {/* Name */}
                    <h2 className="mt-6 text-xl font-bold leading-snug text-slate-900">
                      {treatment.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-relaxed text-gray-600">
                      {treatment.description}
                    </p>

                    {/* Cost + Duration */}
                    <div className="mt-6 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs font-medium text-gray-500">
                          Estimated Cost
                        </p>

                        <p className="mt-1.5 text-sm font-bold text-slate-900">
                          {treatment.estimated_cost}
                        </p>
                      </div>

                      <div className="rounded-xl bg-gray-50 p-4">
                        <p className="text-xs font-medium text-gray-500">
                          Duration
                        </p>

                        <p className="mt-1.5 text-sm font-bold text-slate-900">
                          {treatment.duration}
                        </p>
                      </div>

                    </div>

                    {/* Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">

                      {/* View Details */}
                      <button
                        onClick={() =>
                          router.push(
                            `/treatments/${treatment.id}`
                          )
                        }
                        className="rounded-xl border border-[#DFC5FE] bg-white px-3 py-3 text-sm font-semibold text-[#6D28D9] transition hover:bg-[#DFC5FE]/15"
                      >
                        View Details
                      </button>

                      {/* Book */}
                      <button
                        onClick={() =>
                          router.push(
                            `/appointment?treatment=${encodeURIComponent(
                              treatment.name
                            )}`
                          )
                        }
                        className="rounded-xl bg-[#DFC5FE] px-3 py-3 text-sm font-semibold text-[#4C1D95] shadow-sm transition hover:bg-[#C9A7F5] hover:shadow-md"
                      >
                        Book Consultation
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      {!loading && !error && treatments.length > 0 && (
        <section className="border-t border-gray-100 bg-gradient-to-br from-white to-[#DFC5FE]/15">

          <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DFC5FE]/40 text-2xl">
              💜
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
              Not sure which treatment you need?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Our healthcare team can help you find the right
              treatment, hospital and doctor for your medical journey.
            </p>

            <button
              onClick={() => router.push("/appointment")}
              className="mt-7 rounded-xl bg-[#DFC5FE] px-7 py-3.5 font-semibold text-[#4C1D95] shadow-sm transition hover:bg-[#C9A7F5] hover:shadow-md"
            >
              Book a Consultation
            </button>

          </div>

        </section>
      )}

    </main>
  );
}