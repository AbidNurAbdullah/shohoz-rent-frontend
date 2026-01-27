import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      </Routes>
    </Router>
  );
}

export default App;