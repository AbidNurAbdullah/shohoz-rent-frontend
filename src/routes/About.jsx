import React from "react";
import Navbar from "../components/navbar";

const About = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/homepage.jpg')" }}
    >
    
      <Navbar />
      
    
      <div className="absolute inset-0 bg-black/20"></div>

    
      <div className="relative z-10 flex items-center justify-center h-full px-6 pt-20">
        
      
        <div className="max-w-4xl w-full bg-black/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl text-center transition-all">
          
          <h2 className="text-yellow-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
            Our Vision
          </h2>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Redefining House Renting
          </h1>
          
          <p className="text-gray-200 text-sm md:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            Welcome to <span className="font-bold text-white">Shohoz Rent</span>. 
            We started with a simple idea: making house hunting in Bangladesh easier, faster, and more transparent. 
            Connect with homeowners directly through a seamless digital experience. 
          </p>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <span className="text-2xl mb-1 block">🏠</span>
              <h3 className="text-white font-bold text-sm">Easy Search</h3>
              <p className="text-gray-400 text-[10px] mt-1">Find homes with just a click.</p>
            </div>
            
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <span className="text-2xl mb-1 block">🤝</span>
              <h3 className="text-white font-bold text-sm">Direct Contact</h3>
              <p className="text-gray-400 text-[10px] mt-1">Talk to owners directly.</p>
            </div>
            
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <span className="text-2xl mb-1 block">🛡️</span>
              <h3 className="text-white font-bold text-sm">Verified Info</h3>
              <p className="text-gray-400 text-[10px] mt-1">Real photos and locations.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;