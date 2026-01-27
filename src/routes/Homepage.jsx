import React from "react";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchbar";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/homepage.jpg')",
      }}
    >
    
      <Navbar />

      <section className="flex flex-col justify-center items-center text-center text-white h-screen relative z-10">
      

        <div className="relative z-10 px-6">
          <p className="text-lg mb-2">The Best Way To</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Find Your Dream Home</h1>

          <SearchBar />
        </div>
      </section>
    </div>
  );
};

export default Home;
