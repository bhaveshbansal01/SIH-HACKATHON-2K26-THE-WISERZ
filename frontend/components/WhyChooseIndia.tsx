const reasons = [
  {
    title: "World-Class Care",
    description:
      "Access advanced medical facilities, modern technology and internationally trained healthcare professionals.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.048-.133-2.065-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Affordable Treatment",
    description:
      "Get high-quality medical treatment at competitive costs without compromising on care or safety.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4 1.343 4 3-1.79 3-4 3m0-12V6m0 12v-2m8-4a8 8 0 11-16 0 8 8 0 0116 0z"
        />
      </svg>
    ),
  },
  {
    title: "Medical Tourism",
    description:
      "Combine quality healthcare with India's rich culture, beautiful destinations and comfortable travel experience.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
  {
    title: "Safe & Secure",
    description:
      "Choose trusted healthcare providers and accredited hospitals with patient-focused support throughout your journey.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M12 3l7 4v5c0 4.5-2.9 8.4-7 9-4.1-.6-7-4.5-7-9V7l7-4z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 12l2 2 4-4"
        />
      </svg>
    ),
  },
];

export default function WhyChooseIndia() {
  return (
    <section className="bg-gradient-to-b from-white via-[#DFC5FE]/5 to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] bg-[#DFC5FE]/15 border border-[#DFC5FE]/40 px-4 py-2 rounded-full">
            Why MediIndia Care?
          </span>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Why Choose{" "}
            <span className="text-[#2563A6]">India</span> for Treatment?
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            From world-class hospitals to affordable treatment, India offers
            everything you need for a safe and successful medical journey.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-12">

          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group relative p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#DFC5FE]/60 transition-all duration-300"
            >

              {/* Top Accent */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-[#DFC5FE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#DFC5FE]/15 text-[#7C3AED] flex items-center justify-center group-hover:bg-[#DFC5FE]/30 transition-colors">
                {reason.icon}
              </div>

              {/* Content */}
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {reason.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {reason.description}
              </p>

              {/* Small Arrow */}
              <div className="mt-5 text-[#2563A6] text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <span>→</span>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}