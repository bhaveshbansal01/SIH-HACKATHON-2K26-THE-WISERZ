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

export default function AIRecommendationPage() {
  const router = useRouter();

  const [problem, setProblem] = useState("");
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [recommendations, setRecommendations] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  // Fetch real treatments from backend
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/treatments`
        );

        if (!response.ok) {
          throw new Error("Unable to load treatment data.");
        }

        const data = await response.json();

        setTreatments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load treatment information. Please try again."
        );
      } finally {
        setFetching(false);
      }
    };

    fetchTreatments();
  }, []);

  const getRecommendation = () => {
    if (!problem.trim()) {
      setRecommendations([]);
      setError("Please describe your health concern.");
      return;
    }

    setLoading(true);
    setError("");

    const query = problem.toLowerCase();

    // Smart recommendation based on treatment,
    // specialty and description
    const scored = treatments
      .map((treatment) => {
        const text = `
          ${treatment.name}
          ${treatment.specialty}
          ${treatment.description}
        `.toLowerCase();

        const words = query
          .split(/\s+/)
          .filter((word) => word.length > 2);

        let score = 0;

        words.forEach((word) => {
          if (text.includes(word)) {
            score++;
          }
        });

        return {
          treatment,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.treatment);

    setRecommendations(scored.slice(0, 3));

    if (scored.length === 0) {
      setError(
        "No direct treatment match found. Please try describing your concern differently."
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}

      <section className="bg-gradient-to-br from-[#DFC5FE]/40 via-white to-white">

        <div className="mx-auto max-w-5xl px-6 py-14">

          <button
            onClick={() => router.push("/")}
            className="mb-8 text-sm font-medium text-gray-500 hover:text-[#6D28D9]"
          >
            ← Back to Website
          </button>

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DFC5FE] text-3xl shadow-sm">
              ✨
            </div>

            <h1 className="mt-6 text-4xl font-bold text-slate-900">
              Smart Treatment Recommendation
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Describe your healthcare concern and discover
              relevant treatments available through MediIndia Care.
            </p>

          </div>

        </div>

      </section>

      {/* Recommendation Input */}

      <section className="mx-auto max-w-4xl px-6 py-10">

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg md:p-8">

          <label className="block text-sm font-semibold text-slate-800">
            What healthcare concern are you looking for help with?
          </label>

          <textarea
            value={problem}
            onChange={(e) => {
              setProblem(e.target.value);
              setError("");
            }}
            placeholder="Example: I am looking for treatment related to heart problems..."
            rows={5}
            className="mt-3 w-full resize-none rounded-2xl border border-gray-200 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-[#DFC5FE] focus:ring-2 focus:ring-[#DFC5FE]"
          />

          <button
            onClick={getRecommendation}
            disabled={loading || fetching}
            className="mt-5 w-full rounded-xl bg-[#DFC5FE] px-6 py-4 font-semibold text-[#4C1D95] transition hover:bg-[#d4b5f5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Finding Recommendations..."
              : "Get Recommendation"}
          </button>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

        </div>

        {/* Results */}

        {recommendations.length > 0 && (

          <div className="mt-10">

            <div className="mb-6">

              <p className="text-sm font-semibold text-[#7C3AED]">
                RECOMMENDED FOR YOU
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Relevant Treatments
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                These treatments were matched with your
                healthcare concern.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {recommendations.map((treatment) => (

                <div
                  key={treatment.id}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DFC5FE]/40 text-2xl">
                      🩺
                    </div>

                    <span className="rounded-full bg-[#DFC5FE]/30 px-3 py-1 text-xs font-semibold text-[#6D28D9]">
                      {treatment.specialty}
                    </span>

                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {treatment.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {treatment.description}
                  </p>

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

                  <button
                    onClick={() =>
                      router.push(
                        `/appointment?treatment=${encodeURIComponent(
                          treatment.name
                        )}`
                      )
                    }
                    className="mt-6 w-full rounded-xl bg-[#DFC5FE] px-4 py-3 font-semibold text-[#4C1D95] hover:bg-[#d4b5f5]"
                  >
                    Book Consultation
                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

      </section>

    </main>
  );
}