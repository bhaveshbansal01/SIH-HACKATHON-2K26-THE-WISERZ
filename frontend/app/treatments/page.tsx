"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/treatments`
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load treatments. Please try again."
          );
        }

        const data = await response.json();

        setTreatments(
          Array.isArray(data) ? data : []
        );
      } catch (err) {
        console.error(
          "Treatment fetch error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load treatments. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f7fb]">

      {/* HEADER */}

      <section className="bg-white border-b border-gray-100">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <button
            onClick={() => router.back()}
            className="mb-6 text-sm font-medium text-gray-500 hover:text-[#6D28D9]"
          >
            ← Back
          </button>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-sm font-semibold text-[#7C3AED]">
                MEDICAL TREATMENTS
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                Treatments & Services
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Explore available treatments, understand
                the expected cost and duration, and choose
                the right healthcare service for your needs.
              </p>

            </div>

            <button
              onClick={() => router.push("/appointment")}
              className="rounded-xl bg-[#DFC5FE] px-6 py-3 font-semibold text-[#4C1D95] transition hover:bg-[#d4b5f5]"
            >
              Book Consultation
            </button>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* LOADING */}

        {loading && (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl bg-white shadow-sm"
              />

            ))}

          </div>

        )}

        {/* ERROR */}

        {!loading && error && (

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">

            <h2 className="font-semibold">
              Unable to load treatments
            </h2>

            <p className="mt-2 text-sm">
              {error}
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>

          </div>

        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          treatments.length === 0 && (

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

              <div className="text-4xl">
                🏥
              </div>

              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                No treatments available
              </h2>

              <p className="mt-2 text-gray-500">
                There are currently no treatments
                available in the system.
              </p>

            </div>

          )}

        {/* TREATMENTS */}

        {!loading &&
          !error &&
          treatments.length > 0 && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {treatments.map((treatment) => (

                <div
                  key={treatment.id}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Icon */}

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DFC5FE]/40 text-2xl">
                      🩺
                    </div>

                    <span className="rounded-full bg-[#DFC5FE]/30 px-3 py-1 text-xs font-semibold text-[#6D28D9]">
                      {treatment.specialty}
                    </span>

                  </div>

                  {/* Name */}

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    {treatment.name}
                  </h2>

                  {/* Description */}

                  <p className="mt-3 min-h-[60px] text-sm leading-relaxed text-gray-600">
                    {treatment.description}
                  </p>

                  {/* Details */}

                  <div className="mt-5 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-gray-50 p-3">

                      <p className="text-xs text-gray-500">
                        Estimated Cost
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {treatment.estimated_cost}
                      </p>

                    </div>

                    <div className="rounded-xl bg-gray-50 p-3">

                      <p className="text-xs text-gray-500">
                        Duration
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {treatment.duration}
                      </p>

                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={() =>
                        router.push(
                          `/appointment?treatment=${encodeURIComponent(
                            treatment.name
                          )}`
                        )
                      }
                      className="flex-1 rounded-xl bg-[#DFC5FE] px-4 py-3 text-sm font-semibold text-[#4C1D95] transition hover:bg-[#d4b5f5]"
                    >
                      Book Consultation
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

      </section>

    </main>
  );
}