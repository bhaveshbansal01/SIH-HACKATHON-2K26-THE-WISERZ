export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b bg-white">

      <h1 className="text-2xl font-bold text-blue-700">
        MediIndia Care
      </h1>

      <div className="flex gap-8 text-gray-700">
        <a href="/home">Home</a>
        <a href="/treatments">Treatments</a>
        <a href="/hospitals">Hospitals</a>
        <a href="/doctors">Doctors</a>
        <a href="/appointments">Appointments</a>
      </div>

      <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
        Login
      </button>

    </nav>
  );
}