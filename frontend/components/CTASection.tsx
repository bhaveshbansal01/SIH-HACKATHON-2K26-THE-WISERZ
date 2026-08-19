import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">

        {/* CTA Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#DFC5FE] via-[#E8D8FC] to-white border border-[#DFC5FE]/50 shadow-[0_15px_50px_rgba(124,58,237,0.12)]">

          {/* Decorative Circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/30 blur-2xl" />
          <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#C9A7F5]/30 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-10 px-7 sm:px-10 lg:px-16 py-12 sm:py-14 lg:py-16">

            {/* Left */}
            <div className="max-w-3xl">

              <span className="inline-flex items-center gap-2 bg-white/70 border border-white px-4 py-2 rounded-full text-sm font-semibold text-[#6D28D9]">
                Your Health Matters
              </span>

              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                Ready to Start Your{" "}
                <span className="text-[#2563A6]">
                  Medical Journey?
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-700">
                Find trusted hospitals, experienced doctors and affordable
                treatments across India. Take the first step towards better
                healthcare today.
              </p>

              {/* Trust Points */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-gray-700">

                <span className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  Verified Hospitals
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  Expert Doctors
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  Secure Booking
                </span>

              </div>

            </div>


            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[210px]">

              <Link
                href="/hospitals"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2563A6] text-white font-semibold text-sm shadow-md hover:bg-[#1D4F82] hover:shadow-lg transition-all"
              >
                Explore Hospitals
                <span>→</span>
              </Link>

              <Link
                href="/treatments"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/80 border border-white text-[#4C1D95] font-semibold text-sm hover:bg-white transition-all"
              >
                Find Treatments
                <span>→</span>
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}