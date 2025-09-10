import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Job from "./components/Job";
import Login from "./components/auth/Login";
import Service from "./components/service";
import About from "./components/about";
import Contact from "./components/contact";
import VeterinarianRegistration from "./components/Veterinarian_Registration";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {/* <div style={{ padding: "20px" }}> */}
      <div>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/service" element={<h1>Service Page</h1>} />
          <Route path="/service/store" element={
            <div>
              <h1>Store Page</h1>
              <ul>
                <li><a href="/service/dog-products">Dog Products</a></li>
                <li><a href="/service/cat-products">Cat Products</a></li>
              </ul>
            </div>
          } />
          <Route path="/service/Veterinarian_Registration" element={<VeterinarianRegistration/>} />
          <Route path="/service/dog-products" element={<h1>Dog Products Page</h1>} />
          <Route path="/service/cat-products" element={<h1>Cat Products Page</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/job" element={<Job />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
