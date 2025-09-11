import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import HealthRecord from "./components/HealthRecord";
import About from "./components/about";
import Contact from "./components/contact";
import VeterinarianRegistration from "./components/Veterinarian_Registration";
import Forgotpw from "./components/auth/Forgotpw";
// =================NGƯỜI BẢO HỘ=============
import AdoptionPage from "./components/Adoption";
import PetDetail from "./components/adop/PetDetail";
import FormAdop from "./components/adop/Fromadop";
import ThankYou from "./components/adop/ThankYou";
import AdopDashboard from "./components/AdminAdop/AdopDashboard";
import AdopPets from "./components/AdminAdop/AdopPets";
import Adoptions from "./components/AdminAdop/Adoptions";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth/login" || location.pathname === "/auth/forgot_password";
  
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
          <Route path="/Veterinarian_Registration" element={<VeterinarianRegistration/>} />
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
          <Route index element={<AdopOverview />} />
          <Route path="/adopPets" element={<AdopPets />} />
          <Route path="/adopAdoptions" element={<Adoptions />} />
        {/* </Route> */}

          <Route path="/job/Veterinarian_Registration" element={<VeterinarianRegistration />} />
          <Route path="/job/HealthRecord" element={<HealthRecord />} />
          
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot_password" element={<Forgotpw />} />
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
