"use client";

import { useEffect, useState } from "react";

type Hospital = {
  id: number;
  name: string;
  city: string;
  specialty: string;
  address?: string;
  image?: string;
};

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All Cities");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hospitals");

        if (!response.ok) {
          throw new Error("Failed to fetch hospitals");
        }

        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const cities = [
    "All Cities",
    ...Array.from(new Set(hospitals.map((hospital) => hospital.city))),
  ];

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(search.toLowerCase()) ||
      hospital.specialty.toLowerCase().includes(search.toLowerCase());

    const matchesCity =
      city === "All Cities" || hospital.city === city;

    return matchesSearch && matchesCity;
  });

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="bg-blue-700 text-white px-10 py-16">
        <h1 className="text-5xl font-bold">
          Find Hospitals in India
        </h1>

        <p className="mt-4 text-blue-100 text-lg">
          Explore trusted healthcare providers and find the right
          hospital for your treatment.
        </p>
      </section>

      <section className="px-10 py-12">

        <div className="flex gap-4 mb-10">

          <input
            type="text"
            placeholder="Search hospitals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-5 py-3 bg-white"
          />

          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded-lg px-5 py-3 bg-white"
          >
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>

        </div>

        {loading ? (
          <p className="text-gray-600">
            Loading hospitals...
          </p>
        ) : filteredHospitals.length === 0 ? (
          <p className="text-gray-600">
            No hospitals found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >

                <div className="flex justify-between">

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {hospital.name}
                    </h2>

                    <p className="text-blue-600 mt-1">
                      {hospital.specialty}
                    </p>
                  </div>

                  <span className="text-gray-500">
                    {hospital.city}
                  </span>

                </div>

                {hospital.address && (
                  <p className="text-gray-500 mt-3">
                    {hospital.address}
                  </p>
                )}

                <button className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg">
                  View Hospital
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}