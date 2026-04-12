import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiRequest from "../lib/apiRequest"; // axios এর বদলে apiRequest ইমপোর্ট করা হয়েছে
import Filter from "../components/Filter";
import Card from "../components/Card";
import Map from "../components/Map";
import Navbar from "../components/navbar";

function ListPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // লাইভ ব্যাকএন্ডের জন্য apiRequest ব্যবহার করা হয়েছে
        const res = await apiRequest.get("/posts" + location.search);
        setPosts(res.data);
      } catch (err) {
        console.log("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/homepage.jpg')", backgroundAttachment: "fixed" }}
    >
      <Navbar />

      <div className="pt-24 flex h-full px-10 gap-6">
      
        <div className="flex-[3] h-full">
          <div className="h-[calc(100vh-100px)] flex flex-col gap-6 overflow-y-scroll pb-12 custom-scrollbar">
            <div className="bg-white/5 backdrop-blur-md p-6 flex flex-col gap-6 mt-6 rounded-xl border border-white/20">
              <Filter />
              
              {isLoading ? (
                <p className="text-white text-center py-10">Searching properties...</p>
              ) : posts.length > 0 ? (
                posts.map((post) => <Card key={post.id} item={post} />)
              ) : (
                <p className="text-white italic text-center py-10">No properties found.</p>
              )}
            </div>
          </div>
        </div>

      
        <div className="flex-[2] hidden md:block">
          <div className="pt-8 pb-10 h-full">
            <Map items={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;