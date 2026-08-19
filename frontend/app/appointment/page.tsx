"use client";

import { useState } from "react";

export default function AppointmentPage() {
  const [form, setForm] = useState({
    patient_name: "",
    doctor_name: "",
    date: "",
    hospital_name: "",
    treatment_name: "",
    patient_email: "",
    patient_phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book appointment");
      }

      setMessage(
        `Appointment submitted successfully. Appointment ID: ${data.id}`
      );

      setForm({
        patient_name: "",
        doctor_name: "",
        date: "",
        hospital_name: "",
        treatment_name: "",
        patient_email: "",
        patient_phone: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-purple-600"></span>

            <span className="text-sm font-semibold text-purple-700">
              Trusted Healthcare • World-Class Treatment
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Book Your{" "}
            <span className="text-purple-700">
              Consultation
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Connect with trusted hospitals and expert doctors in India.
            Make your healthcare journey simple, transparent and secure.
          </p>

        </div>

        {/* Appointment Card */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-100/60 md:p-10">

          {/* Card Header */}
          <div className="mb-8 rounded-2xl bg-[#DFC5FE]/35 p-5">

            <h2 className="text-xl font-bold text-slate-900">
              Patient & Appointment Details
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Enter your details to request a consultation with your
              preferred healthcare provider.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Patient Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Patient Name
                </label>

                <input
                  name="patient_name"
                  value={form.patient_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="patient_email"
                  value={form.patient_email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="patient_phone"
                  value={form.patient_phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit phone number"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Appointment Date */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Appointment Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Hospital */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Hospital
                </label>

                <input
                  name="hospital_name"
                  value={form.hospital_name}
                  onChange={handleChange}
                  required
                  placeholder="Hospital name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Doctor */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Doctor
                </label>

                <input
                  name="doctor_name"
                  value={form.doctor_name}
                  onChange={handleChange}
                  required
                  placeholder="Doctor name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Treatment */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Treatment
                </label>

                <input
                  name="treatment_name"
                  value={form.treatment_name}
                  onChange={handleChange}
                  required
                  placeholder="Treatment you are interested in"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm font-semibold text-purple-800">
                {message}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-[#DFC5FE] px-6 py-4 text-base font-bold text-slate-900 shadow-sm transition hover:bg-[#d5b8f4] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Submitting Appointment..."
                : "Book Consultation"}
            </button>

          </form>
        </div>

        {/* Trust Features */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#DFC5FE] font-bold text-purple-700">
              +
            </div>

            <h3 className="font-semibold text-slate-900">
              Verified Hospitals
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Find trusted healthcare providers across India.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#DFC5FE] font-bold text-purple-700">
              +
            </div>

            <h3 className="font-semibold text-slate-900">
              Expert Doctors
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Connect with experienced medical professionals.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#DFC5FE] font-bold text-purple-700">
              +
            </div>

            <h3 className="font-semibold text-slate-900">
              Simple & Secure
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Submit your consultation request safely and easily.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}