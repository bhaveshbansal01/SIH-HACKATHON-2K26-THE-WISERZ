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

export default function AIRecommendationWidget() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState("");
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [recommendations, setRecommendations] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/treatments`
        );

        if (!response.ok) {
          throw new Error("Unable to load treatments");
        }

        const data = await response.json();

        setTreatments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Treatment fetch error:", err);
      }
    };

    fetchTreatments();
  }, []);

  const getRecommendation = () => {
    if (!problem.trim()) {
      setError("Please describe your healthcare concern.");
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setError("");

    const query = problem.toLowerCase();

    const words = query
      .split(/\s+/)
      .filter((word) => word.length > 2);

    const scored = treatments
      .map((treatment) => {
        const text = `
          ${treatment.name}
          ${treatment.specialty}
          ${treatment.description}
        `.toLowerCase();

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

    setRecommendations(scored.slice(0, 2));

    if (scored.length === 0) {
      setError(
        "No direct match found. Try describing your concern differently."
      );
    }

    setLoading(false);
  };

  const closeWidget = () => {
    setOpen(false);
    setRecommendations([]);
    setError("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">

      {/* EXPANDED PANEL */}

      {open && (
        <div className="mb-3 w-[340px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

          {/* Header */}

          <div className="flex items-center justify-between bg-[#DFC5FE] px-5 py-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg">
                ✨
              </div>

              <div>
                <h3 className="font-bold text-[#4C1D95]">
                  Smart Treatment Finder
                </h3>

                <p className="text-xs text-[#5B21B6]">
                  Find relevant treatments
                </p>
              </div>

            </div>

            <button
              onClick={closeWidget}
              className="text-lg font-bold text-[#4C1D95] hover:opacity-70"
              aria-label="Close"
            >
              ×
            </button>

          </div>

          {/* BODY */}

          <div className="p-5">

            <p className="text-sm leading-relaxed text-gray-600">
              Tell us what kind of healthcare treatment
              you are looking for.
            </p>

            <textarea
              value={problem}
              onChange={(e) => {
                setProblem(e.target.value);
                setError("");
              }}
              placeholder="Example: heart problem..."
              rows={3}
              className="mt-4 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#DFC5FE] focus:ring-2 focus:ring-[#DFC5FE]"
            />

            <button
              onClick={getRecommendation}
              disabled={loading}
              className="mt-3 w-full rounded-xl bg-[#DFC5FE] px-4 py-3 text-sm font-semibold text-[#4C1D95] transition hover:bg-[#d4b5f5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Finding..."
                : "Get Recommendation"}
            </button>

            {/* ERROR */}

            {error && (
              <div className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* RESULTS */}

            {recommendations.length > 0 && (
              <div className="mt-5">

                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#7C3AED]">
                  Recommended
                </p>

                <div className="space-y-3">

                  {recommendations.map((treatment) => (

                    <div
                      key={treatment.id}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                    >

                      <div className="flex items-start justify-between gap-2">

                        <h4 className="font-bold text-slate-900">
                          {treatment.name}
                        </h4>

                        <span className="rounded-full bg-[#DFC5FE]/50 px-2 py-1 text-[10px] font-semibold text-[#6D28D9]">
                          {treatment.specialty}
                        </span>

                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-gray-600">
                        {treatment.description}
                      </p>

                      <div className="mt-3 flex gap-3 text-xs">

                        <span className="text-gray-600">
                          Cost:{" "}
                          <strong className="text-slate-900">
                            {treatment.estimated_cost}
                          </strong>
                        </span>

                        <span className="text-gray-600">
                          Duration:{" "}
                          <strong className="text-slate-900">
                            {treatment.duration}
                          </strong>
                        </span>

                      </div>

                      <button
                        onClick={() =>
                          router.push(
                            `/appointment?treatment=${encodeURIComponent(
                              treatment.name
                            )}`
                          )
                        }
                        className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#6D28D9] ring-1 ring-[#DFC5FE] hover:bg-[#DFC5FE]/20"
                      >
                        Book Consultation
                      </button>

                    </div>

                  ))}

                </div>

              </div>
            )}

          </div>

          {/* Full AI page */}

          <div className="border-t border-gray-100 px-5 py-3 text-center">

            <button
              onClick={() =>
                router.push("/ai-recommendation")
              }
              className="text-xs font-semibold text-[#6D28D9] hover:underline"
            >
              Open full recommendation page →
            </button>

          </div>

        </div>
      )}

      {/* FLOATING BUTTON */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 rounded-full bg-[#DFC5FE] px-5 py-3 text-sm font-bold text-[#4C1D95] shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-[#d4b5f5] hover:shadow-xl"
        >

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg">
            ✨
          </span>

          <span>
            Find Your Treatment
          </span>

        </button>
      )}

    </div>
  );
}