import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiRequest.get("/admin/posts");
        setPosts(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete property: ${title}?`)) {
      try {
        // ব্যাকেন্ডে পোস্ট ডিলিটের এপিআই কল (নিশ্চিত হোন এপিআই তৈরি আছে)
        await apiRequest.delete(`/admin/post/${id}`);
        setPosts(posts.filter((post) => post.id !== id));
        alert("Property deleted successfully!");
      } catch (err) {
        alert("Failed to delete property!");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 font-medium">
          <Link to="/admin" className="p-3 hover:bg-gray-800 rounded">Dashboard</Link>
          <Link to="/admin/users" className="p-3 hover:bg-gray-800 rounded">Manage Users</Link>
          <Link to="/admin/posts" className="p-3 bg-gray-800 rounded">Manage Posts</Link>
          <Link to="/admin/messages" className="p-3 hover:bg-gray-800 rounded">User Messages</Link>
          <Link to="/" className="p-3 text-red-400 hover:bg-gray-800 rounded mt-10">Back to Website</Link>
        </nav>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Property Listings</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <p className="p-10 text-center text-gray-500">Loading properties...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200 uppercase text-xs font-bold text-gray-600">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400">No properties found.</td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="p-4 font-semibold text-blue-600">
                        <Link to={`/${post.id}`} target="_blank">{post.title}</Link>
                      </td>
                      <td className="p-4 text-green-600 font-bold">৳ {post.price}</td>
                      <td className="p-4 text-gray-500">{post.city}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase">{post.type}</span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleDelete(post.id, post.title)}
                          className="text-red-500 hover:text-red-700 font-bold transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;