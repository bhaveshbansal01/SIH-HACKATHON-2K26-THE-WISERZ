export default function Stats() {
  const stats = [
    {
      number: "500+",
      text: "Hospitals & Clinics",
      icon: "▥",
    },
    {
      number: "2000+",
      text: "Expert Doctors",
      icon: "♙",
    },
    {
      number: "50K+",
      text: "Happy Patients",
      icon: "☺",
    },
    {
      number: "20+",
      text: "Specialties",
      icon: "✦",
    },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-0 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.10)] overflow-hidden">

      {stats.map((item, index) => (
        <div
          key={item.number}
          className={`
            flex items-center gap-4 px-5 sm:px-7 py-5 sm:py-6
            hover:bg-[#DFC5FE]/10 transition-all
            ${index !== 1 ? "lg:border-r border-gray-100" : ""}
            ${index < 2 ? "border-b lg:border-b-0 border-gray-100" : ""}
          `}
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#DFC5FE]/20 text-[#7C3AED] flex items-center justify-center text-xl">
            {item.icon}
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {item.number}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {item.text}
            </p>
          </div>
        </div>
      ))}

    </section>
  );
}