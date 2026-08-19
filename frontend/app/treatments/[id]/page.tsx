"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function TreatmentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/treatments/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Treatment not found");
        }

        const data = await response.json();

        setTreatment(data);
      } catch (err) {
        console.error("Treatment details error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load treatment details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTreatment();
    }
  }, [params.id]);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f7fb]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 animate-pulse rounded-3xl bg-white p-8 shadow-sm">
            <div className="h-16 w-16 rounded-2xl bg-gray-200" />
            <div className="mt-6 h-10 w-2/3 rounded bg-gray-200" />
            <div className="mt-4 h-5 w-1/3 rounded bg-gray-200" />

            <div className="mt-8 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error
  if (error || !treatment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7fb] px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">🏥</div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Treatment Not Found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error || "We couldn't find this treatment."}
          </p>

          <button
            onClick={() => router.push("/treatments")}
            className="mt-7 rounded-xl bg-[#DFC5FE] px-6 py-3 font-semibold text-[#4C1D95] hover:bg-[#C9A7F5]"
          >
            Back to Treatments
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7fb]">

      {/* HEADER */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">

          <button
            onClick={() => router.push("/treatments")}
            className="text-sm font-medium text-gray-500 transition hover:text-[#6D28D9]"
          >
            ← Back to Treatments
          </button>

        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}
          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm sm:p-10">

            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DFC5FE]/40 text-3xl">
              🩺
            </div>

            {/* Specialty */}
            <div className="mt-7">
              <span className="rounded-full bg-[#DFC5FE]/30 px-4 py-2 text-xs font-semibold text-[#6D28D9]">
                {treatment.specialty}
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {treatment.name}
            </h1>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-slate-900">
                About this treatment
              </h2>

              <p className="mt-4 text-base leading-8 text-gray-600">
                {treatment.description}
              </p>
            </div>

            {/* Why choose */}
            <div className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">
                Treatment Information
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#f8f7fb] p-5">
                  <p className="text-sm text-gray-500">
                    Estimated Cost
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {treatment.estimated_cost}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f8f7fb] p-5">
                  <p className="text-sm text-gray-500">
                    Treatment Duration
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {treatment.duration}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT - BOOKING CARD */}
          <div className="h-fit rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

            <div className="rounded-2xl bg-gradient-to-br from-[#DFC5FE]/40 to-white p-5">

              <p className="text-sm font-semibold text-[#6D28D9]">
                READY TO GET STARTED?
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Book a Consultation
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Connect with experienced doctors and trusted
                hospitals for your treatment.
              </p>

            </div>

            {/* Treatment Summary */}
            <div className="mt-6 space-y-4">

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-sm text-gray-500">
                  Treatment
                </span>

                <span className="max-w-[180px] text-right text-sm font-semibold text-slate-900">
                  {treatment.name}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-sm text-gray-500">
                  Specialty
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {treatment.specialty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Estimated Cost
                </span>

                <span className="text-sm font-semibold text-slate-900">
                  {treatment.estimated_cost}
                </span>
              </div>

            </div>

            {/* Book */}
            <button
              onClick={() =>
                router.push(
                  `/appointment?treatment=${encodeURIComponent(
                    treatment.name
                  )}`
                )
              }
              className="mt-7 w-full rounded-xl bg-[#DFC5FE] px-6 py-4 font-bold text-[#4C1D95] shadow-sm transition hover:bg-[#C9A7F5] hover:shadow-md"
            >
              Book Consultation →
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              No payment required to request a consultation
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}