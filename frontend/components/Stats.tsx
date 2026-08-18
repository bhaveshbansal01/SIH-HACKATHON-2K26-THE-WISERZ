export default function Stats() {
  const stats = [
    {
      number: "500+",
      text: "Hospitals & Clinics",
    },
    {
      number: "2000+",
      text: "Expert Doctors",
    },
    {
      number: "50K+",
      text: "Happy Patients",
    },
    {
      number: "20+",
      text: "Specialties",
    },
  ];

  return (
    <section className="grid grid-cols-4 gap-5 px-10 py-10 bg-white">

      {stats.map((item) => (
        <div
          key={item.number}
          className="border rounded-xl p-6 text-center shadow-sm"
        >
          <h2 className="text-3xl font-bold text-blue-600">
            {item.number}
          </h2>

          <p className="text-gray-600 mt-2">
            {item.text}
          </p>

        </div>
      ))}

    </section>
  );
}