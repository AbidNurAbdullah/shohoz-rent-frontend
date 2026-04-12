import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest"; // apiRequest ইমপোর্ট করা হয়েছে

function SinglePage({ backgroundImage = "/homepage.jpg" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // apiRequest ব্যবহার করে লাইভ ব্যাকএন্ড থেকে ডাটা আনা
        const res = await apiRequest.get("/posts/" + id);
        setPost(res.data);
        setIsSaved(res.data.isSaved); 
      } catch (err) {
        console.log("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // সেভ বাটন হ্যান্ডলার
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      await apiRequest.post("/users/save", { postId: post.id });
      setIsSaved((prev) => !prev);
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  // ইমেজ ইউআরএল হ্যান্ডলার ফাংশন
  const getImageUrl = (url) => {
    if (!url) return "/apartment2.jpg";
    if (url.startsWith("http")) return url; // Cloudinary URL
    return `https://shohoz-rent-backend.onrender.com${url}`; // Local/Old Path
  };

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-500"></div>
      <p className="ml-4">Loading Property Details...</p>
    </div>
  );

  if (!post) return <div className="text-white p-20 text-center">Post not found!</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundAttachment: "fixed" }}
    >
      <Navbar />
      
      {/* মেইন গ্লাস কন্টেইনার */}
      <main className="pt-32 pb-10 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10 shadow-2xl border border-white/20">
          
          {/* LEFT SIDE - ইমেজ এবং ডেসক্রিপশন (৬০% জায়গা) */}
          <div className="md:flex-[3] flex flex-col gap-8">
            
            {/* ১ বড় + ৩ ছোট ইমেজ গ্যালারি */}
            <section className="flex gap-2 h-[300px] md:h-[420px]">
              <div className="flex-[3]">
                <img
                  src={getImageUrl(post.images[0])}
                  alt="Main"
                  className="rounded-xl object-cover w-full h-full shadow-lg"
                />
              </div>
              <div className="flex-[1] flex flex-col gap-2 overflow-y-auto">
                {post.images.slice(1, 4).map((img, index) => (
                  <img 
                    key={index} 
                    src={getImageUrl(img)} 
                    className="rounded-xl object-cover h-1/3 w-full shadow-md" 
                    alt="property" 
                  />
                ))}
                {post.images.length <= 1 && (
                    <div className="bg-black/20 rounded-xl h-full flex items-center justify-center text-white/50 text-[10px]">No more images</div>
                )}
              </div>
            </section>

            {/* টাইটেল, প্রাইস এবং এজেন্ট ইনফো */}
            <section className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
                <div className="flex items-center gap-2 text-gray-800 text-sm">
                  <img src="/pin.png" alt="" className="w-4 h-4" />
                  <span>{post.address}, {post.city}</span>
                </div>
                <p className="bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded shadow-sm w-max mt-1">
                  {post.price} Tk.
                </p>
              </div>
              
              {/* এজেন্ট বক্স */}
              <div className="bg-yellow-100/80 p-4 rounded-xl flex flex-col items-center gap-2 min-w-[120px] shadow-md border border-yellow-200">
                <img 
                  src={post.user?.avatar ? getImageUrl(post.user.avatar) : "/default.png"} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white" 
                  alt="Agent" 
                />
                <p className="font-bold text-sm text-gray-800">{post.user?.username}</p>
              </div>
            </section>

            {/* ডেসক্রিপশন */}
            <section className="text-gray-900 leading-relaxed flex flex-col gap-4 text-justify bg-white/20 p-4 rounded-xl">
              <p>{post.postDetail?.desc}</p>
            </section>
          </div>

          {/* RIGHT SIDE - সাইডবার (৪০% জায়গা) */}
          <div className="md:flex-[2] flex flex-col gap-8">
            
            {/* General */}
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl text-gray-900">General</h2>
              <div className="bg-white/50 rounded-xl p-5 space-y-4 shadow-sm border border-white/30">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🛠️</span>
                  <div>
                    <p className="font-bold text-sm">Utilities</p>
                    <p className="text-xs text-gray-700">{post.postDetail?.utilities || "Renter is responsible"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🐾</span>
                  <div>
                    <p className="font-bold text-sm">Pet Policy</p>
                    <p className="text-xs text-gray-700">{post.postDetail?.pet || "Not Allowed"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-bold text-sm">Income Policy</p>
                    <p className="text-xs text-gray-700">{post.postDetail?.income || "Stable income required"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Room Sizes */}
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl text-gray-900">Room Sizes</h2>
              <div className="flex gap-2 flex-wrap">
                <div className="bg-white/60 p-2 px-3 rounded-lg flex items-center gap-2 text-xs font-semibold shadow-sm border border-white/40">
                   <span>📏</span> {post.postDetail?.size || 0} sqm
                </div>
                <div className="bg-white/60 p-2 px-3 rounded-lg flex items-center gap-2 text-xs font-semibold shadow-sm border border-white/40">
                   <span>🛏️</span> {post.bedroom} bed
                </div>
                <div className="bg-white/60 p-2 px-3 rounded-lg flex items-center gap-2 text-xs font-semibold shadow-sm border border-white/40">
                   <span>🛁</span> {post.bathroom} bathroom
                </div>
              </div>
            </div>

            {/* Nearby Places */}
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl text-gray-900">Nearby Places</h2>
              <div className="bg-white/50 rounded-xl p-5 flex justify-between shadow-sm border border-white/30">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">🏫</span>
                  <p className="font-bold text-[11px]">School</p>
                  <p className="text-[10px] text-gray-700">{post.postDetail?.school}m away</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">🚌</span>
                  <p className="font-bold text-[11px]">Bus Stop</p>
                  <p className="text-[10px] text-gray-700">{post.postDetail?.bus}m away</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">🍽️</span>
                  <p className="font-bold text-[11px]">Restaurant</p>
                  <p className="text-[10px] text-gray-700">{post.postDetail?.restaurant}m away</p>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-xl text-gray-900">Location</h2>
              <div className="h-52 w-full rounded-xl overflow-hidden border-2 border-white/50 shadow-lg">
                 <iframe
                    title="Map"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(post.longitude)-0.01}%2C${parseFloat(post.latitude)-0.01}%2C${parseFloat(post.longitude)+0.01}%2C${parseFloat(post.latitude)+0.01}&layer=mapnik&marker=${post.latitude}%2C${post.longitude}`}
                    className="w-full h-full border-none"
                  ></iframe>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => setShowContact(true)}
                className="flex-1 bg-white/80 border-2 border-yellow-500 py-3 rounded-xl text-sm font-bold hover:bg-yellow-500 hover:text-white transition-all shadow-md"
              >
                Contact Info
              </button>
              
              <button 
                onClick={handleSave}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all shadow-md border-2
                  ${isSaved 
                    ? "bg-yellow-500 border-yellow-500 text-white" 
                    : "bg-white/80 border-yellow-500 text-black hover:bg-yellow-500 hover:text-white"
                  }`}
              >
                {isSaved ? "Place Saved ✅" : "Save Place"}
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* --- CONTACT POP-UP (MODAL) --- */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-white/20 relative animate-in fade-in zoom-in duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowContact(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full border-4 border-yellow-400 overflow-hidden shadow-lg">
                <img 
                   src={post.user?.avatar ? getImageUrl(post.user.avatar) : "/default.png"} 
                   className="w-full h-full object-cover" 
                   alt="owner" 
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Owner Information</h3>
              
              <div className="w-full space-y-4 mt-2 text-left">
                <div className="bg-white/50 p-3 rounded-xl flex items-center gap-3 shadow-sm border border-black/5">
                  <span className="text-lg">👤</span>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Full Name</p>
                    <p className="text-sm font-semibold text-gray-800">{post.user?.username}</p>
                  </div>
                </div>

                <div className="bg-white/50 p-3 rounded-xl flex items-center gap-3 shadow-sm border border-black/5">
                  <span className="text-lg">📧</span>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Email Address</p>
                    <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{post.user?.email}</p>
                  </div>
                </div>

                <div className="bg-white/50 p-3 rounded-xl flex items-center gap-3 shadow-sm border border-black/5">
                  <span className="text-lg">📞</span>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Phone Number</p>
                    <p className="text-sm font-semibold text-gray-800">
                      {post.user?.phone || "No phone added"}
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowContact(false)}
                className="mt-4 w-full bg-gray-900 text-white py-2 rounded-xl text-sm font-bold hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SinglePage;