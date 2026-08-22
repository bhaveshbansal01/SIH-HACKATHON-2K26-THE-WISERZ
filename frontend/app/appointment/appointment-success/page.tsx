"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AppointmentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const patientName =
    searchParams.get("patient_name") || "Patient";

  const treatment =
    searchParams.get("treatment") || "Selected Treatment";

  const doctor =
    searchParams.get("doctor") || "Selected Doctor";

  const hospital =
    searchParams.get("hospital") || "Selected Hospital";

  const date =
    searchParams.get("date") || "Selected Date";

  return (
    <main className="min-h-screen bg-[#f8f7fb] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">

        <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl md:p-12">

          {/* SUCCESS ICON */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl text-green-600">
              ✓
            </span>
          </div>

          {/* HEADING */}
          <p className="mt-6 text-sm font-bold tracking-wider text-[#7C3AED]">
            APPOINTMENT CONFIRMED
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Your Appointment is Booked!
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-gray-600">
            Thank you, {patientName}. Your consultation request
            has been successfully submitted. Our healthcare team
            will contact you shortly with further details.
          </p>

          {/* APPOINTMENT DETAILS */}
          <div className="mt-8 rounded-2xl bg-[#faf7ff] p-6 text-left">

            <h2 className="mb-5 text-lg font-bold text-slate-900">
              Appointment Details
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                <span className="text-gray-500">
                  Patient
                </span>

                <span className="text-right font-semibold text-slate-900">
                  {patientName}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                <span className="text-gray-500">
                  Treatment
                </span>

                <span className="text-right font-semibold text-slate-900">
                  {treatment}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                <span className="text-gray-500">
                  Doctor
                </span>

                <span className="text-right font-semibold text-slate-900">
                  {doctor}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-gray-200 pb-3">
                <span className="text-gray-500">
                  Hospital
                </span>

                <span className="text-right font-semibold text-slate-900">
                  {hospital}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Date
                </span>

                <span className="text-right font-semibold text-slate-900">
                  {date}
                </span>
              </div>

            </div>
          </div>

          {/* INFO */}
          <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
            Please keep your email and phone available. You may
            receive confirmation or follow-up communication from
            the hospital.
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() => router.push("/")}
              className="flex-1 rounded-xl bg-[#DFC5FE] px-6 py-3 font-semibold text-[#4C1D95] transition hover:bg-[#d4b5f5]"
            >
              Back to Home
            </button>

            <button
              onClick={() => router.push("/treatments")}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-gray-50"
            >
              Explore Treatments
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}

export default function AppointmentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8f7fb] flex items-center justify-center">
          <p className="text-gray-500">
            Loading appointment details...
          </p>
        </main>
      }
    >
      <AppointmentSuccessContent />
    </Suspense>
  );
}