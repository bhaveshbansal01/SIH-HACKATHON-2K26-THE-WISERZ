const hospitals = [
  {
    name: "Apollo Hospitals",
    city: "New Delhi",
    speciality: "Multi-Specialty",
    description:
      "Advanced healthcare services with experienced specialists and modern medical facilities.",
  },
  {
    name: "Fortis Hospital",
    city: "Mumbai",
    speciality: "Cardiology & Oncology",
    description:
      "Comprehensive treatment with specialist doctors and advanced diagnostic facilities.",
  },
  {
    name: "Medanta - The Medicity",
    city: "Gurugram",
    speciality: "Multi-Specialty",
    description:
      "Leading medical centre offering advanced treatments across multiple specialties.",
  },
  {
    name: "Artemis Hospital",
    city: "Gurugram",
    speciality: "Multi-Specialty",
    description:
      "Modern hospital providing international-standard healthcare services.",
  },
];

export default function HospitalsPage() {
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
            className="flex-1 border rounded-lg px-5 py-3 bg-white"
          />

          <select className="border rounded-lg px-5 py-3 bg-white">
            <option>All Cities</option>
            <option>New Delhi</option>
            <option>Mumbai</option>
            <option>Gurugram</option>
          </select>

        </div>


        <div className="grid md:grid-cols-2 gap-6">

          {hospitals.map((hospital) => (
            <div
              key={hospital.name}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >

              <div className="flex justify-between">

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {hospital.name}
                  </h2>

                  <p className="text-blue-600 mt-1">
                    {hospital.speciality}
                  </p>
                </div>

                <span className="text-gray-500">
                  {hospital.city}
                </span>

              </div>


              <p className="text-gray-600 mt-5">
                {hospital.description}
              </p>


              <button className="mt-6 bg-blue-600 text-white px-5 py-3 rounded-lg">
                View Hospital
              </button>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}