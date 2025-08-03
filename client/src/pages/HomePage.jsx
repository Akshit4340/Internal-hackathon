import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F3EF] text-[#1B3C53]">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 bg-[#1B3C53] text-white shadow">
        <h1 className="text-2xl font-bold">EventSphere</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="/" className="hover:text-[#D2C1B6]">
            Home
          </a>
          <a href="/events" className="hover:text-[#D2C1B6]">
            Events
          </a>
          <a href="/login" className="hover:text-[#D2C1B6]">
            Login
          </a>
          <a href="/register" className="hover:text-[#D2C1B6]">
            Register
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row items-center justify-between p-10 bg-[#456882] text-white">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Discover, Join & Host Events
          </h2>
          <p className="text-lg mb-6">
            Your one-stop platform to engage in amazing community events, meet
            people, and grow together.
          </p>
          <a
            href="/events"
            className="bg-white text-[#1B3C53] font-semibold py-2 px-4 rounded hover:bg-[#D2C1B6]"
          >
            Explore Events
          </a>
        </div>
        <img
          src="/hero-image.svg"
          alt="Hero"
          className="w-64 md:w-96 mt-10 md:mt-0"
        />
      </header>

      {/* Events Section */}
      <section className="p-8 flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-6">Featured Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Placeholder Cards */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-2">Sample Event {i}</h4>
              <p className="text-sm text-gray-700 mb-2">
                Event details go here...
              </p>
              <button className="mt-auto bg-[#1B3C53] text-white px-3 py-1 rounded hover:bg-[#456882]">
                View
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 px-4 text-center bg-[#1B3C53] text-white">
        © 2025 EventSphere | Built with ❤️
      </footer>
    </div>
  );
};

export default HomePage;
