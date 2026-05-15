import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await apiRequest.get("/admin/messages");
        setMessages(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-8">
        <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 font-medium">
          <Link to="/admin" className="p-3 hover:bg-gray-800 rounded">Dashboard</Link>
          <Link to="/admin/users" className="p-3 hover:bg-gray-800 rounded">Manage Users</Link>
          <Link to="/admin/posts" className="p-3 hover:bg-gray-800 rounded">Manage Posts</Link>
          <Link to="/admin/messages" className="p-3 bg-gray-800 rounded">User Messages</Link>
          <Link to="/" className="p-3 text-red-400 hover:bg-gray-800 rounded mt-10">Back to Website</Link>
        </nav>
      </div>

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">User Inquiries</h1>
        <div className="grid grid-cols-1 gap-6">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : messages.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow text-center text-gray-400">
              No messages found in the inbox.
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{msg.fullName}</h3>
                    <p className="text-sm text-gray-500">{msg.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-gray-700 bg-gray-50 p-4 rounded italic">"{msg.message}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;