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
      {/* ml-30 সরিয়ে mx-auto এবং px-6 ব্যবহার করা হয়েছে যাতে স্ক্রিনের মাঝখানে থাকে */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between py-6 px-6">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 shrink-0">
          <img
            src="/logo.jpg"
            alt="Shohoz Rent Logo"
            className="h-14 w-14 object-contain rounded-md"
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

        {/* Right Section: Navigation + User Actions */}
        <div className="flex items-center space-x-8 md:space-x-12">
          
          {/* Navigation Links - Hidden on very small screens for better UI */}
          <nav className="hidden sm:flex items-center space-x-8 font-semibold">
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

          {/* User Profile / Auth Buttons */}
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-lg font-semibold hidden lg:inline">
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
              <div className="flex items-center space-x-6">
                <Link
                  to="/login"
                  className="text-white font-bold hover:text-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-200 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-white transition whitespace-nowrap"
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