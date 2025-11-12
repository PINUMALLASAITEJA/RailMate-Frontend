import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import MyJourneys from "./pages/MyJourneys";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./styles/Global.css";

// List of routes that DO NOT require authentication
const PUBLIC_ROUTES = ["/login", "/register", "/"];

// ✅ Wrapper for handling redirect logic on page load
const ProtectedApp = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL path

  useEffect(() => {
    const token = sessionStorage.getItem("token"); // Changed to sessionStorage for consistency
    const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);

    // If no user token is found AND the user is NOT on a public page, redirect to login.
    if (!token && !isPublicRoute) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/myjourneys" element={<MyJourneys />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Add a catch-all route for missing pages if needed */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ProtectedApp />
    </Router>
  );
};

export default App;
