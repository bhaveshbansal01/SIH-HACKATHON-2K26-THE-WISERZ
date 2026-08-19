export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Search",
      description:
        "Search for trusted hospitals, doctors and treatments based on your needs.",
      icon: "⌕",
    },
    {
      number: "02",
      title: "Explore",
      description:
        "Compare hospitals, specialists, treatments, facilities and estimated costs.",
      icon: "⌖",
    },
    {
      number: "03",
      title: "Choose",
      description:
        "Select the hospital, treatment and doctor that best suits your requirements.",
      icon: "✓",
    },
    {
      number: "04",
      title: "Book",
      description:
        "Submit your appointment request and start your medical journey with confidence.",
      icon: "→",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">

      {/* Soft Lavender Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#DFC5FE]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] bg-[#DFC5FE]/15 border border-[#DFC5FE]/40 px-4 py-2 rounded-full">
            Simple &amp; Transparent
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
            From finding the right healthcare provider to booking your
            appointment, we make your medical journey simple and stress-free.
          </p>

        </div>


        {/* Steps */}
        <div className="relative mt-14">

          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-[38px] left-[12%] right-[12%] h-px bg-gradient-to-r from-[#DFC5FE]/20 via-[#DFC5FE] to-[#DFC5FE]/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group text-center"
              >

                {/* Number + Icon */}
                <div className="relative z-10 mx-auto w-[76px] h-[76px] rounded-2xl bg-white border border-[#DFC5FE]/50 shadow-[0_8px_25px_rgba(124,58,237,0.08)] flex items-center justify-center group-hover:-translate-y-1 group-hover:shadow-[0_12px_30px_rgba(124,58,237,0.15)] transition-all duration-300">

                  <div className="w-12 h-12 rounded-xl bg-[#DFC5FE]/20 text-[#7C3AED] flex items-center justify-center text-xl font-bold">
                    {step.icon}
                  </div>

                  {/* Step Number */}
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#DFC5FE] text-[#4C1D95] text-xs font-bold flex items-center justify-center border-4 border-white">
                    {index + 1}
                  </span>

                </div>


                {/* Content */}
                <div className="mt-6">

                  <p className="text-xs font-bold tracking-[0.2em] text-[#7C3AED]">
                    STEP {step.number}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-[#2563A6] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-500 max-w-[280px] mx-auto">
                    {step.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>


        {/* Bottom Trust Message */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600">

          <span className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Verified Healthcare Providers
          </span>

          <span className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Transparent Treatment Costs
          </span>

          <span className="flex items-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            Secure Appointment Requests
          </span>

        </div>

      </div>
    </section>
  );
}