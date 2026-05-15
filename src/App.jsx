import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./routes/Homepage";
import Login from "./routes/login";
import Signup from "./routes/Signup";
import AddHouse from "./routes/AddHouse";
import ListPage from "./routes/ListPage";
import Profile from "./routes/Profile";
import SinglePage from "./routes/Singlepage";
import UpdateProfile from "./routes/UpdateProfile";
import About from "./routes/About";
import Contact from "./routes/Contact";

// নতুন অ্যাডমিন পেজগুলো (নিচে এই ফাইলগুলোর কোড দিচ্ছি)
import AdminDashboard from "./routes/Admin/AdminDashboard";
import AdminUsers from "./routes/Admin/AdminUsers";
import AdminPosts from "./routes/Admin/AdminPosts";
import AdminMessages from "./routes/Admin/AdminMessages";

// অ্যাডমিন প্রোটেকশন চেক করার জন্য একটি ফাংশন
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "ADMIN" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/:id" element={<SinglePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/addhouse" element={<AddHouse />} />
        <Route path="/edit/:id" element={<AddHouse />} />

        {/* অ্যাডমিন প্যানেল রাউটস (সুরক্ষিত) */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/posts" element={<AdminRoute><AdminPosts /></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;