import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import WhyChooseIndia from "@/components/WhyChooseIndia";
import PopularTreatments from "@/components/PopularTreatments";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* HERO + STATS */}
      <section className="relative overflow-hidden bg-white">

        {/* Taj Mahal Background
            ONLY covers Hero + slight area behind Stats */}
        {/* Taj Mahal Background - RIGHT SIDE ONLY */}
<div className="absolute top-0 right-0 h-[720px] w-full lg:w-[64%] overflow-hidden">

  <img
    src="/images/taj-mahal.jpg"
    alt="Taj Mahal"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Strong White → Image Blend */}
  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white lg:via-white/35 lg:to-transparent" />

  {/* Bottom Fade into White */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

  {/* Very subtle Lavender Tint */}
  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#DFC5FE]/10" />

</div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-20">

          <div className="min-h-[650px] flex items-center">

            <div className="w-full lg:w-[68%] py-16 lg:py-20">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#DFC5FE]/25 border border-[#DFC5FE]/60 text-[#6D28D9] px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">

                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />

                Trusted Healthcare • World-Class Treatment
              </div>


              {/* Heading */}
              <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl xl:text-[62px] font-bold leading-[1.06] tracking-tight text-slate-900 max-w-3xl">

                Your Journey to Better{" "}

                <span className="text-[#2563A6]">
                  Health
                </span>{" "}

                Starts in India

              </h1>


              {/* Description */}
              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-600">

                Find world-class hospitals, expert doctors and affordable
                treatments in India. We make your medical journey simple,
                transparent and secure.

              </p>


              {/* FLOATING SEARCH BAR */}
              <div className="mt-9 w-full max-w-[900px]">

                <div className="rounded-2xl border border-white/80 bg-white/90 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-3">

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto] gap-3">

                    {/* Search */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white">

                      <span className="text-[#2563A6] text-lg">
                        ⌕
                      </span>

                      <input
                        type="text"
                        placeholder="Search treatments, hospitals..."
                        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
                      />

                    </div>


                    {/* City */}
                    <button
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-left hover:border-[#DFC5FE] hover:bg-[#DFC5FE]/5 transition"
                    >

                      <span className="text-[#2563A6]">
                        ⌖
                      </span>

                      <span className="text-sm text-gray-500">
                        Select City
                      </span>

                    </button>


                    {/* Category */}
                    <button
                      className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-white text-left hover:border-[#DFC5FE] hover:bg-[#DFC5FE]/5 transition"
                    >

                      <div className="flex items-center gap-3">

                        <span className="text-[#2563A6]">
                          ✚
                        </span>

                        <span className="text-sm text-gray-500">
                          All Categories
                        </span>

                      </div>

                      <span className="text-gray-400">
                        ⌄
                      </span>

                    </button>


                    {/* Search Button */}
                    <button
                      className="px-7 py-3 rounded-xl bg-[#DFC5FE] text-[#4C1D95] font-semibold hover:bg-[#C9A7F5] transition-all shadow-sm hover:shadow-md"
                    >
                      Search
                    </button>

                  </div>

                </div>

              </div>


              {/* Trust Points */}
              <div className="flex flex-wrap gap-x-7 gap-y-3 mt-6 text-sm text-gray-600">

                <span className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">
                    ✓
                  </span>
                  Verified Hospitals
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">
                    ✓
                  </span>
                  Expert Doctors
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">
                    ✓
                  </span>
                  Affordable Treatment
                </span>

              </div>

            </div>

          </div>


          {/* FLOATING STATS */}
          <div className="relative z-20 -mt-10 pb-14">

            <Stats />

          </div>

        </div>

      </section>


      {/* WHY CHOOSE INDIA */}
      <WhyChooseIndia />
    <PopularTreatments />
    <HowItWorks />
    <CTASection />

      {/* More sections will come here */}
      
    </main>
  );
}