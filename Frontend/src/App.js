import "./components/Css/App.css";
import { useEffect } from "react";


import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login";
import HealthRecord from "./components/HealthRecord";
import About from "./components/about";
import Contact from "./components/contact";

// NGƯỜI BẢO HỘ
import VeterinarianRegistration from "./components/Veterinarian_Registration";
import Forgotpw from "./components/auth/Forgotpw";
import AppointmentManagement from "./components/AppointmentManagement";
import LPO from "./components/LPO";
// import ProductList from "./components/ProductList";
// import AdminProductList from "./components/AdminProductList";
import DogProducts from "./components/DogProducts";
import CatProducts from "./components/CatProducts";
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
    location.pathname === "/auth/forgot-password" ||
    location.pathname.startsWith("/reset-password");

  // Trang cần offset (không phải Home/Adoption)
  const isHome = location.pathname === "/";
  const isAdoption = location.pathname.toLowerCase().startsWith("/adoption") || location.pathname.toLowerCase().startsWith("/pets");
  const needsOffset = !(isHome || isAdoption);

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <div className="layout">
        <main className={`page-content ${needsOffset ? "with-offset" : ""}`}>
          <Routes>
            {/* Trang chủ */}
            <Route path="/" element={<Home />} />

            {/* Service & Store */}
            <Route path="/service" element={<h1>Service Page</h1>} /> {/* Thay bằng component thực nếu có */}
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
            <Route path="/service/dog-products" element={<DogProducts />} /> {/* Dùng component thực thay vì h1 */}
            <Route path="/service/cat-products" element={<CatProducts />} /> {/* Dùng component thực thay vì h1 */}
            
            {/* Nested ProductList nếu cần */}
            {/* <Route path="/service/productlist" element={<ProductList />}>
              <Route path="dog" element={<DogProducts />} />
              <Route path="cat" element={<CatProducts />} />
            </Route> */}

            {/* About & Contact */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Adoption/User */}
            <Route path="/adoption" element={<AdoptionPage />} />
            <Route path="/pets/:id" element={<PetDetail />} /> {/* Unified path */}
            <Route path="/formadop" element={<FormAdop />} />
            <Route path="/thankyou" element={<ThankYou />} />

            {/* Admin */}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Overview" element={<Overview />} />
            <Route path="/AdopPets" element={<AdopPets />} />
            <Route path="/AdopRequest" element={<AdopRequest />} />
            {/* <Route path="/adminproductlist" element={<AdminProductList />} /> */}

            {/* Job/Veterinarian */}
            <Route path="/job" element={<VeterinarianRegistration />} />
            <Route path="/job/HealthRecord" element={<HealthRecord />} />
            <Route path="/job/AppointmentManagement" element={<AppointmentManagement />} />
            <Route path="/job/LPO" element={<LPO />} />
            <Route path="/Appointment_owner" element={<Appointment_owner />} />
            <Route path="/Veterinarian_Registration" element={<VeterinarianRegistration />} />

            {/* Profile */}
            <Route path="/profile_owner" element={<ProfileOwner />} />

            {/* Auth */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/forgot_password" element={<Forgotpw />} />
            <Route path="/auth/forgot-password" element={<Forgotpw />} /> {/* Duplicate path cho tương thích */}
            <Route path="/reset-password/:token" element={<ResetPassword />} />
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