import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, [location.pathname]);

  return (
    <header className="absolute top-0 left-0 w-full bg-transparent z-50">
      {/* ডিজাইন সেম রাখতে ml-30 এর বদলে px-10 ব্যবহার করা হয়েছে যা কন্টেন্টকে ভেতরে রাখবে */}
      <div className="w-full flex items-center py-6 px-4 md:px-12 lg:px-20">
      
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logo.jpg"
            alt="Shohoz Rent Logo"
            className="h-14 w-14 object-contain"
          />
          <div>
            <h1 className="text-2xl font-light text-gray-100 leading-none">
              Shohoz
            </h1>
            <h1 className="text-2xl font-light text-gray-100 leading-none">
              Rent
            </h1>
          </div>
        </Link>

        <div className="flex-1 flex items-center justify-end">
          <nav className="flex space-x-10 font-semibold">
            <Link
              to="/"
              className="text-gray-100 hover:text-yellow-400 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-100 hover:text-yellow-400 transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-100 hover:text-yellow-400 transition"
            >
              Contact
            </Link>
          </nav>

          {/* এখানে ml-27 এর বদলে gap ব্যবহার করা হয়েছে যাতে ডিজাইন সেম থাকে কিন্তু ওভারফ্লো না হয় */}
          <div className="flex items-center space-x-4 ml-10 md:ml-20 mr-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <span className="text-white text-xl font-semibold hidden md:inline">
                  {currentUser.username}
                </span>
                <Link to="/profile">
                  <img
                    src={
                      currentUser.avatar 
                      ? (currentUser.avatar.startsWith("http") 
                          ? currentUser.avatar 
                          : `https://shohoz-rent-backend.onrender.com${currentUser.avatar}`) 
                      : "/default.png"
                    }
                    alt="Profile"
                    className="h-12 w-12 rounded-full object-cover border-2 border-white hover:scale-105 transition shadow-lg"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white font-bold hover:text-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-200 text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-white transition"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;