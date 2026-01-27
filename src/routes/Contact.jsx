import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await axios.post(
        "http://localhost:8800/api/messages",
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        setStatus({ type: "success", msg: "Message sent! We will contact you soon." });
        setFormData({ fullName: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
      setStatus({ 
        type: "error", 
        msg: err.response?.data?.message || "Failed to send message. Try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col"
      style={{ backgroundImage: "url('/homepage.jpg')" }}
    >
      <Navbar />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-10 pt-28 pb-12">
        
        <div className="max-w-5xl w-full bg-black/50 backdrop-blur-xl rounded-[40px] overflow-hidden border border-white/10 shadow-2xl grid grid-cols-1 md:grid-cols-2">
          
          <div className="p-10 md:p-14 bg-white/5 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in <span className="text-yellow-500">Touch</span></h1>
            <p className="text-gray-300 text-base md:text-lg mb-10 leading-relaxed">
              Have suggestions or questions about listing your house? 
              Our team is here to help you 24/7.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-5 text-white">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📍</div>
                <div>
                  <p className="font-bold text-sm text-yellow-500 uppercase tracking-widest">Location</p>
                  <p className="text-base text-gray-200">Sector-7, Uttara, Dhaka</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 text-white">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">📞</div>
                <div>
                  <p className="font-bold text-sm text-yellow-500 uppercase tracking-widest">Phone</p>
                  <p className="text-base text-gray-200">+880 1234 567 890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5 text-white">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner">✉️</div>
                <div>
                  <p className="font-bold text-sm text-yellow-500 uppercase tracking-widest">Email</p>
                  <p className="text-base text-gray-200">support@shohozrent.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 md:p-14 flex flex-col justify-center bg-white/5">
            <form onSubmit={handleSubmit} className="space-y-5">
              {status.msg && (
                <div className={`p-4 rounded-xl text-sm font-bold text-center ${status.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
                  {status.msg}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-gray-300 text-xs uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input 
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInput}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-gray-300 text-xs uppercase tracking-[0.2em] ml-1">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInput}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-gray-300 text-xs uppercase tracking-[0.2em] ml-1">Your Message</label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleInput}
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none focus:ring-2 focus:ring-yellow-500/50 focus:bg-white/20 resize-none transition-all"
                  placeholder="Tell us what you need..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-xl mt-4 ${isLoading ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-400 text-black"}`}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;