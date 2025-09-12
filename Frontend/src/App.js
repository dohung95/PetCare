import "./components/Css/App.css";



import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import HealthRecord from "./components/HealthRecord";
import About from "./components/about";
import Contact from "./components/contact";
import VeterinarianRegistration from "./components/Veterinarian_Registration";
<<<<<<< Updated upstream
import Forgotpw from "./components/auth/Forgotpw";
=======
import AppointmentManagement from "./components/AppointmentManagement";
import LPO from "./components/LPO";
import ProfileOwner from "./components/menu_login/profile_owner.jsx";
>>>>>>> Stashed changes

import Footer from "./components/Footer.jsx";

// =================NGƯỜI BẢO HỘ=============
import AdoptionPage from "./components/Adoption";
import PetDetail from "./components/adop/PetDetail";
import FormAdop from "./components/adop/Fromadop";
import ThankYou from "./components/adop/ThankYou";
import AdopDashboard from "./components/AdminAdop/AdopDashboard";
import AdopPets from "./components/AdminAdop/AdopPets";
import Adoptions from "./components/AdminAdop/Adoptions";

import Overview from "./components/AdminAdop/Overview";
import Appointment_owner from "./components/Appointment_owner.jsx";
import ResetPassword from "./components/auth/ResetPassword";
import Forgotpw from "./components/auth/Forgotpw";




function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth/login" || location.pathname === "/auth/forgot_password" || location.pathname.startsWith("/reset-password");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {/* <div style={{ padding: "20px" }}> */}
      <div className="layout" >
        <main className="page-content">
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
            <Route path="/Appointment_owner" element={<Appointment_owner />} />
            <Route path="/Veterinarian_Registration" element={<VeterinarianRegistration />} />
            <Route path="/service/dog-products" element={<h1>Dog Products Page</h1>} />
            <Route path="/service/cat-products" element={<h1>Cat Products Page</h1>} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* =============NGƯỜI BẢO HỘ USER============= */}
            <Route path="/adoption" element={<AdoptionPage />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/formadop" element={<FormAdop />} />
            <Route path="/thankyou" element={<ThankYou />} />
            {/* =========ADMIN NGƯỜI BẢO HỘ =========== */}
            <Route path="/AdopDashboard" element={<AdopDashboard />} />
            <Route path="/Overview" element={<Overview />} />

            <Route path="/adopPets" element={<AdopPets />} />
            <Route path="/adopAdoptions" element={<Adoptions />} />
            {/* </Route> */}

<<<<<<< Updated upstream
          <Route path="/job/Veterinarian_Registration" element={<VeterinarianRegistration />} />
          <Route path="/job/HealthRecord" element={<HealthRecord />} />
          
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot_password" element={<Forgotpw />} />
        </Routes>
=======
            <Route path="/job/Veterinarian_Registration" element={<VeterinarianRegistration />} />
            <Route path="/job/HealthRecord" element={<HealthRecord />} />
            <Route path="/job/AppointmentManagement" element={<AppointmentManagement />} />
            <Route path="/job/LPO" element={<LPO />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forgot_password" element={<Forgotpw />} />

            {/* menu login owner */}
            <Route path="/profile_owner" element={<ProfileOwner />} />

            {/* ROUTE AUTH */}
            <Route path="/auth/forgot-password" element={<Forgotpw />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />



          </Routes>
        </main>
        {!hideNavbar && <Footer />}
>>>>>>> Stashed changes
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
