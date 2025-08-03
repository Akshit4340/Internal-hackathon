import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F3EF] px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-[#1B3C53] mb-6 text-center">
          Create an Account
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-[#456882] mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-[#D2C1B6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#456882]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-[#456882] mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-[#D2C1B6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#456882]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[#456882] mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-[#D2C1B6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#456882]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B3C53] text-white py-2 rounded-md hover:bg-[#456882] transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#456882]">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
