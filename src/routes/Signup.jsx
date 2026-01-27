import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
     <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url("/homepage.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute top-10 left-15">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src="/logo.jpg"
            alt="Shohoz Rent"
            className="h-14 w-14 transform group-hover:scale-105 transition duration-300"
          />
          <div>
            <h1 className="text-2xl font-light text-gray-100 leading-none">
              Shohoz
            </h1>
            <p className="text-2xl font-light text-gray-100 leading-none">
              Rent
            </p>
          </div>
        </Link>
      </div>

      <div className="max-w-sm w-full bg-white/20 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-white/30">
        <div className="bg-gray-800 backdrop-blur-md p-4 text-center border-b border-white/20">
          <h2 className="text-xl font-bold text-white">Sign Up</h2>
        </div>

        <div className="p-6 bg-transparent">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-white mb-1 drop-shadow">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-gray-800 placeholder-white/70 focus:ring-1 focus:ring-white focus:border-white outline-none transition duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1 drop-shadow">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-gray-800 placeholder-white/70 focus:ring-1 focus:ring-white focus:border-white outline-none transition duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1 drop-shadow">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-gray-800 placeholder-white/70 focus:ring-1 focus:ring-white focus:border-white outline-none transition duration-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 backdrop-blur-md text-white py-2 px-4 rounded-lg font-semibold border border-white/40 hover:bg-white/40 hover:border-white/60 focus:ring-1 focus:ring-white focus:ring-offset-1 transition duration-200 text-sm"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-white/90 drop-shadow text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white font-semibold hover:text-blue-200 transition duration-200 drop-shadow text-sm"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-gray-800 backdrop-blur-md px-6 py-3 border-t border-white/20">
          <p className="text-center text-white/90 text-xs drop-shadow">
            Your trusted platform for house rentals
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;