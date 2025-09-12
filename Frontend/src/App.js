import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Job from "./components/Job";
import Login from "./components/Login";
import Service from "./components/service";
import About from "./components/about";
import Contact from "./components/contact";
<<<<<<< Updated upstream
=======
import VeterinarianRegistration from "./components/Veterinarian_Registration";
import AppointmentManagement from "./components/AppointmentManagement";
import LPO from "./components/LPO";
import Forgotpw from "./components/auth/Forgotpw";
import AdopDashboard from "./components/Admin/Dashboard.jsx";
import ProductList from "./components/ProductList";
import AdminProductList from "./components/AdminProductList";
import DogProducts from "./components/DogProducts";
import CatProducts from "./components/CatProducts";
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
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/service" element={<h1>Service Page</h1>} />
<<<<<<< Updated upstream
          <Route path="/service/store" element={
            <div>
              <h1>Store Page</h1>
              <ul>
                <li><a href="/service/dog-products">Dog Products</a></li>
                <li><a href="/service/cat-products">Cat Products</a></li>
              </ul>
            </div>
          } />
          <Route path="/service/dog-products" element={<h1>Dog Products Page</h1>} />
          <Route path="/service/cat-products" element={<h1>Cat Products Page</h1>} />    
          <Route path="/" element={<Home/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/job" element={<Job/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
=======
          <Route path="/service/Veterinarian_Registration" element={<VeterinarianRegistration />} />
          <Route path="/service/productlist" element={<ProductList />}>
            <Route path="dog" element={<DogProducts />} />
            <Route path="cat" element={<CatProducts />} />
          </Route>
          <Route path="/Veterinarian_Registration" element={<VeterinarianRegistration />} />
          <Route path="/service/dog-products" element={<h1>Dog Products Page</h1>} />
          <Route path="/service/cat-products" element={<h1>Cat Products Page</h1>} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* =========ADMIN=========== */}
          <Route path="/adminproductlist" element={<AdminProductList />} />
          {/* =============NGƯỜI BẢO HỘ USER============= */}
          <Route path="/adoption" element={<AdoptionPage />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/formadop" element={<FormAdop />} />
          <Route path="/thankyou" element={<ThankYou />} />
          {/* =========ADMIN NGƯỜI BẢO HỘ =========== */}
          <Route path="/AdopDashboard" element={<AdopDashboard />} />
          <Route path="/Overview" element={<Overview />} />

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
>>>>>>> Stashed changes
