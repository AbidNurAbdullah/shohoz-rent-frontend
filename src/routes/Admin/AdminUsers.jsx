import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ডাটাবেস থেকে ইউজার লিস্ট নিয়ে আসা
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiRequest.get("/admin/users");
        setUsers(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ইউজার ডিলিট করার ফাংশন
  const handleDelete = async (id, username) => {
    if (window.confirm(`Are you sure you want to delete user: ${username}?`)) {
      try {
        await apiRequest.delete(`/admin/user/${id}`);
        // ডিলিট হওয়ার পর লিস্ট থেকে ওই ইউজারকে সরিয়ে ফেলা
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted successfully!");
      } catch (err) {
        alert("Failed to delete user!");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 font-medium">
          <Link to="/admin" className="p-3 hover:bg-gray-800 rounded">Dashboard</Link>
          <Link to="/admin/users" className="p-3 bg-gray-800 rounded">Manage Users</Link>
          <Link to="/admin/posts" className="p-3 hover:bg-gray-800 rounded">Manage Posts</Link>
          <Link to="/admin/messages" className="p-3 hover:bg-gray-800 rounded">User Messages</Link>
          <Link to="/" className="p-3 text-red-400 hover:bg-gray-800 rounded mt-10">Back to Website</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <p className="p-10 text-center text-gray-500">Loading users...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-200 uppercase text-xs font-bold text-gray-600">
                <tr>
                  <th className="p-4">Avatar</th>
                  <th className="p-4">Username</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-400">No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <img 
                          src={user.avatar || "/default.png"} 
                          alt="" 
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      </td>
                      <td className="p-4 font-semibold">{user.username}</td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {/* অ্যাডমিন নিজেকে নিজে ডিলিট করতে পারবে না - এই লজিকটি চাইলে দিতে পারেন */}
                        <button 
                          onClick={() => handleDelete(user.id, user.username)}
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

export default AdminUsers;