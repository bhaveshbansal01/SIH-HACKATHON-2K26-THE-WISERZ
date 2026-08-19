"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type AppointmentData = {
  id: number;
  patient_name: string;
  doctor_name: string;
  date: string;
  hospital_name: string;
  treatment_name: string;
  patient_email: string;
  patient_phone: string;
  status?: string;
};

type Hospital = {
  id: number;
  name: string;
  city?: string;
};

type Doctor = {
  id: number;
  name: string;
  specialization?: string;
};

type Treatment = {
  id: number;
  name: string;
  specialty?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AppointmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    patient_name: "",
    doctor_name: "",
    date: "",
    hospital_name: "",
    treatment_name: searchParams.get("treatment") || "",
    patient_email: "",
    patient_phone: "",
  });

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingTreatments, setLoadingTreatments] = useState(true);

  const [hospitalError, setHospitalError] = useState("");
  const [doctorError, setDoctorError] = useState("");
  const [treatmentError, setTreatmentError] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<AppointmentData | null>(null);

  // Load hospitals, doctors and treatments
  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const response = await fetch(`${API_URL}/api/hospitals`);

        if (!response.ok) {
          throw new Error("Failed to load hospitals");
        }

        const data = await response.json();

        setHospitals(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Hospital API error:", err);
        setHospitalError(
          "Unable to load hospitals. Please try again."
        );
      } finally {
        setLoadingHospitals(false);
      }
    };

    const loadDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);

        if (!response.ok) {
          throw new Error("Failed to load doctors");
        }

        const data = await response.json();

        setDoctors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Doctor API error:", err);
        setDoctorError(
          "Unable to load doctors. Please try again."
        );
      } finally {
        setLoadingDoctors(false);
      }
    };

    const loadTreatments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/treatments`);

        if (!response.ok) {
          throw new Error("Failed to load treatments");
        }

        const data = await response.json();

        setTreatments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Treatment API error:", err);
        setTreatmentError(
          "Unable to load treatments. Please try again."
        );
      } finally {
        setLoadingTreatments(false);
      }
    };

    loadHospitals();
    loadDoctors();
    loadTreatments();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // Required field validation
    if (
      !form.patient_name.trim() ||
      !form.patient_email.trim() ||
      !form.patient_phone.trim() ||
      !form.date ||
      !form.hospital_name ||
      !form.doctor_name ||
      !form.treatment_name
    ) {
      setError("All appointment details are required.");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.patient_email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(form.patient_phone)) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    // Past date validation
    if (form.date < today) {
      setError(
        "Please select today or a future appointment date."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/appointments`,
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
        throw new Error(
          data.error || "Failed to book appointment"
        );
      }

      // Show success screen
      setSuccess(data);
    } catch (err) {
      console.error("Appointment error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // SUCCESS SCREEN
  // ------------------------------------------------

  if (success) {
    return (
      <main className="min-h-screen bg-[#f8f7fb] px-6 py-12">
        <div className="mx-auto max-w-3xl">

          {/* Success Icon */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <span className="text-4xl text-green-600">
                ✓
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold text-slate-900">
              Appointment Confirmed!
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Your consultation request has been successfully
              submitted. Our healthcare team will review your
              request and contact you shortly.
            </p>
          </div>

          {/* Appointment Card */}
          <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-100/50 md:p-8">

            {/* Appointment ID */}
            <div className="rounded-2xl bg-[#DFC5FE]/35 p-5">
              <p className="text-sm font-medium text-purple-700">
                APPOINTMENT ID
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                #{success.id}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                Please keep this ID for future reference.
              </p>
            </div>

            {/* Details */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-slate-900">
                Appointment Details
              </h2>

              <div className="mt-5 divide-y divide-slate-100">

                {/* Patient */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Patient
                  </span>

                  <span className="font-semibold text-slate-900">
                    {success.patient_name}
                  </span>
                </div>

                {/* Doctor */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Doctor
                  </span>

                  <span className="font-semibold text-slate-900">
                    {success.doctor_name}
                  </span>
                </div>

                {/* Hospital */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Hospital
                  </span>

                  <span className="font-semibold text-slate-900">
                    {success.hospital_name}
                  </span>
                </div>

                {/* Treatment */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Treatment
                  </span>

                  <span className="font-semibold text-slate-900">
                    {success.treatment_name}
                  </span>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Appointment Date
                  </span>

                  <span className="font-semibold text-slate-900">
                    {success.date}
                  </span>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Email
                  </span>

                  <span className="font-semibold text-slate-900">
                    {success.patient_email}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Phone
                  </span>

                  <span className="font-semibold text-slate-900">
                    {success.patient_phone}
                  </span>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-slate-500">
                    Status
                  </span>

                  <span className="inline-flex w-fit rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    {success.status || "Pending"}
                  </span>
                </div>

              </div>
            </div>

            {/* Message */}
            <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-5">
              <p className="text-sm leading-6 text-purple-900">
                <strong>What happens next?</strong>
                <br />
                Our team will verify your consultation request
                and contact you using the phone number or email
                provided above.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => router.push("/")}
                className="flex-1 rounded-xl bg-[#DFC5FE] px-6 py-4 font-bold text-[#4C1D95] transition hover:bg-[#d5b8f4]"
              >
                Back to Home
              </button>

              <button
                onClick={() => router.push("/doctors")}
                className="flex-1 rounded-xl border border-purple-200 bg-white px-6 py-4 font-bold text-purple-700 transition hover:bg-purple-50"
              >
                Explore Doctors
              </button>

            </div>
          </div>

          {/* Bottom Trust Message */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Thank you for choosing MediIndia Care 🇮🇳
            </p>
          </div>

        </div>
      </main>
    );
  }

  // ------------------------------------------------
  // APPOINTMENT FORM
  // ------------------------------------------------

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
            Connect with trusted hospitals and expert doctors
            in India. Make your healthcare journey simple,
            transparent and secure.
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
              Enter your details to request a consultation
              with your preferred healthcare provider.
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
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
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
                  min={today}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
                />
              </div>

              {/* Hospital */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Hospital
                </label>

                <select
                  name="hospital_name"
                  value={form.hospital_name}
                  onChange={handleChange}
                  required
                  disabled={loadingHospitals}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="">
                    {loadingHospitals
                      ? "Loading hospitals..."
                      : "Select Hospital"}
                  </option>

                  {hospitals.map((hospital) => (
                    <option
                      key={hospital.id}
                      value={hospital.name}
                    >
                      {hospital.name}
                      {hospital.city
                        ? ` — ${hospital.city}`
                        : ""}
                    </option>
                  ))}
                </select>

                {hospitalError && (
                  <p className="mt-2 text-sm text-red-600">
                    {hospitalError}
                  </p>
                )}
              </div>

              {/* Doctor */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Doctor
                </label>

                <select
                  name="doctor_name"
                  value={form.doctor_name}
                  onChange={handleChange}
                  required
                  disabled={loadingDoctors}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="">
                    {loadingDoctors
                      ? "Loading doctors..."
                      : "Select Doctor"}
                  </option>

                  {doctors.map((doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.name}
                    >
                      {doctor.name}
                      {doctor.specialization
                        ? ` — ${doctor.specialization}`
                        : ""}
                    </option>
                  ))}
                </select>

                {doctorError && (
                  <p className="mt-2 text-sm text-red-600">
                    {doctorError}
                  </p>
                )}
              </div>

              {/* Treatment */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Treatment
                </label>

                <select
                  name="treatment_name"
                  value={form.treatment_name}
                  onChange={handleChange}
                  required
                  disabled={loadingTreatments}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-purple-300 focus:ring-4 focus:ring-purple-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                >
                  <option value="">
                    {loadingTreatments
                      ? "Loading treatments..."
                      : "Select Treatment"}
                  </option>

                  {treatments.map((treatment) => (
                    <option
                      key={treatment.id}
                      value={treatment.name}
                    >
                      {treatment.name}
                      {treatment.specialty
                        ? ` — ${treatment.specialty}`
                        : ""}
                    </option>
                  ))}
                </select>

                {treatmentError && (
                  <p className="mt-2 text-sm text-red-600">
                    {treatmentError}
                  </p>
                )}
              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* Submit Button */}
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

          {/* Hospitals */}
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

          {/* Doctors */}
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

          {/* Secure */}
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