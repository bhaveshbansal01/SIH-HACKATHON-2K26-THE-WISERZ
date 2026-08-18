import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <main>

      <Navbar />

      <section className="grid grid-cols-2 min-h-screen bg-blue-50">

        <div className="px-12 py-24">

          <p className="bg-green-100 text-green-700 inline-block px-4 py-2 rounded-full">
            Trusted Healthcare • World-Class Treatment
          </p>


          <h1 className="text-6xl font-bold text-slate-900 mt-8">
            Your Journey to Better
            <span className="text-blue-600"> Health </span>
            Starts in India
          </h1>


          <p className="text-lg text-gray-600 mt-6">
            Find world-class hospitals, expert doctors and affordable
            treatments in India. We make your medical journey simple,
            transparent and secure.
          </p>


          <div className="mt-8 flex gap-4">

            <input
              placeholder="Search Treatments, Hospitals..."
              className="px-5 py-4 rounded-lg border w-80"
            />

            <button className="bg-blue-600 text-white px-8 rounded-lg">
              Search
            </button>

          </div>

        </div>


        <div className="relative">

          <img
            src="/images/taj-mahal.jpg"
            alt="Taj Mahal"
            className="w-full h-full object-cover"
          />

        </div>


      </section>
      <Stats />


    </main>
  );
}