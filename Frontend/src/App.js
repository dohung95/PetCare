import "./components/Css/App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login";
import HealthRecord from "./components/HealthRecord";
import About from "./components/about";
import Contact from "./components/contact";
import VeterinarianRegistration from "./components/Veterinarian_Registration";
import Forgotpw from "./components/auth/Forgotpw";
import AppointmentManagement from "./components/AppointmentManagement";
import LPO from "./components/LPO";
import ProfileOwner from "./components/menu_login/profile_owner.jsx";
import Footer from "./components/Footer.jsx";

import AdoptionPage from "./components/AdoptionPage.jsx";
import PetDetail from "./components/adop/PetDetail";
import FormAdop from "./components/adop/Fromadop";
import ThankYou from "./components/adop/ThankYou";
import Dashboard from "./components/Admin/Dashboard.jsx";
import AdopPets from "./components/Admin/AdopPets";
import AdopRequest from "./components/Admin/AdopRequest.jsx";
import Overview from "./components/Admin/Overview";
import Appointment_owner from "./components/Appointment_owner.jsx";
import ResetPassword from "./components/auth/ResetPassword";

function Layout() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/forgot_password" ||
    location.pathname.startsWith("/reset-password");

  // Trang cần offset (không phải Home/Adoption)
  const isHome = location.pathname === "/";
  const isAdoption = location.pathname.toLowerCase().startsWith("/adoption");
  const needsOffset = !(isHome || isAdoption);

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <div className="layout">
        <main className={`page-content ${needsOffset ? "with-offset" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
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

            <Route path="/Appointment_owner" element={<Appointment_owner />} />
            <Route path="/Veterinarian_Registration" element={<VeterinarianRegistration />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* User */}
            <Route path="/adoption" element={<AdoptionPage />} />
            <Route path="/shelter-pets/:id" element={<PetDetail />} />
            <Route path="/formadop" element={<FormAdop />} />
            <Route path="/thankyou" element={<ThankYou />} />

            {/* Admin */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Overview" element={<Overview />} />
            <Route path="/AdopPets" element={<AdopPets />} />
            <Route path="/AdopRequest" element={<AdopRequest />} />

            {/* Job */}
            <Route path="/job" element={<VeterinarianRegistration />} />
            <Route path="/job/HealthRecord" element={<HealthRecord />} />
            <Route path="/job/AppointmentManagement" element={<AppointmentManagement />} />
            <Route path="/job/LPO" element={<LPO />} />

            {/* Auth */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forgot_password" element={<Forgotpw />} />
            <Route path="/auth/forgot-password" element={<Forgotpw />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* Profile */}
            <Route path="/profile_owner" element={<ProfileOwner />} />
          </Routes>
        </main>
      </div>

      {!hideNavbar && <Footer />}
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
