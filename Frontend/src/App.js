import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login";
import HealthRecord from "./components/HealthRecord";
import About from "./components/about";
import Contact from "./components/contact";
import VeterinarianRegistration from "./components/Veterinarian_Registration";
import AppointmentManagement from "./components/AppointmentManagement";
import LPO from "./components/LPO";
import Forgotpw from "./components/auth/Forgotpw";
import Footer from "./components/Footer.jsx";

// NGƯỜI BẢO HỘ
import AdoptionPage from "./components/AdoptionPage.jsx";
import PetDetail from "./components/adop/PetDetail";
import FormAdop from "./components/adop/Fromadop";
import ThankYou from "./components/adop/ThankYou";
import Dashboard from "./components/Admin/Dashboard.jsx";
import AdopPets from "./components/Admin/AdopPets";
import AdopRequest from "./components/Admin/AdopRequest.jsx";
import Overview from "./components/Admin/Overview"; 

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth/login" || location.pathname === "/auth/forgot_password";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Trang chủ */}
        <Route
          path="/"
          element={
            <>
              <Home />
              
            </>
          }
        />

        {/* Các routes khác */}
        <Route path="/service" element={<h1>Service Page</h1>} />
        <Route
          path="/service/store"
          element={
            <div>
              <h1>Store Page</h1>
              <ul>
                <li><a href="/service/dog-products">Dog Products</a></li>
                <li><a href="/service/cat-products">Cat Products</a></li>
              </ul>
            </div>
          }
        />
        <Route path="/service/dog-products" element={<h1>Dog Products Page</h1>} />
        <Route path="/service/cat-products" element={<h1>Cat Products Page</h1>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* NGƯỜI BẢO HỘ USER */}
        <Route path="/adoptionPage" element={<AdoptionPage />} />
        <Route path="/pets/:id" element={<PetDetail />} />
        <Route path="/formadop" element={<FormAdop />} />
        <Route path="/thankyou" element={<ThankYou />} />

        {/* ADMIN NGƯỜI BẢO HỘ */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Overview" element={<Overview />} />
        <Route path="/AdopPets" element={<AdopPets />} />
        <Route path="/AdopRequest" element={<AdopRequest />} />

        {/* JOB */}
        <Route path="/job" element={<VeterinarianRegistration />} />
        <Route path="/job/HealthRecord" element={<HealthRecord />} />
        <Route path="/job/AppointmentManagement" element={<AppointmentManagement />} />
        <Route path="/job/LPO" element={<LPO />} />

        {/* AUTH */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot_password" element={<Forgotpw />} />
      </Routes>
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}