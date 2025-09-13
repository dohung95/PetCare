import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import "./Css/Navbar.css";

const Navbar = () => {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // Load token and user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    setRole(r);

    if (!token) {
      setUser(null);
      return;
    }

    (async () => {
      try {
        const res = await api.get("/auth/me");
        const u = res.data?.user || res.data?.data || null;
        setUser(u);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        console.log("No valid token");
        setUser(null);
        setRole(null);
      }
    })();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("ownerName");
    localStorage.removeItem("ownerPhone");
    localStorage.removeItem("ownerEmail");
    localStorage.removeItem("ownerRole");

    setUser(null);
    setRole(null);
    setAccountOpen(false);
    navigate("/");
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine last name or fallback to email
  const LastName =
    user?.name?.split(" ")?.pop() ||
    user?.fullName?.split(" ")?.pop() ||
    user?.email ||
    "User";

  // Check if user is a vet
  const isVet = user?.role === "vet";

  return (
    <nav
      className={`navbar fixed-top ${scrolled ? "navbar-scrolled" : "navbar-top"
        }`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/imgs/logo-petcare.png" alt="Logo" className="logo-image" />
        </Link>

        <div className="col-md-6">
          {/* Menu */}
          <div className="menu d-flex align-items-center">
            <div className="menu-item">
              <Link to="/" className="nav-link">Home</Link>
            </div>
            {/* Service dropdown */}
            <div
              className="menu-item dropdown"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <span className="nav-link">Service</span>
              {serviceOpen && (
                <div className="dropdown-menu">
                  <Link to="/service/productlist" className="dropdown-item">Store</Link>
                  <Link to="/Appointment_owner" className="dropdown-item">Appointment</Link>
                </div>
              )}
            </div>

            <div className="menu-item">
              <Link to="/about" className="nav-link">About</Link>
            </div>
            <div className="menu-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
            <div className="menu-item">
              <Link to="/Adoption" className="nav-link">Adoption</Link>
            </div>
            <div>
              <Link to="/job" className="nav-link">Job</Link>
            </div>

            {/* User login/account */}
            {!user ? (
              <div className="menu-item">
                <Link to="/auth/login" className="nav-link">Login</Link>
              </div>
            ) : (
              <div
                className="menu-item dropdown user-menu"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <span className="nav-link user-name">{LastName}</span>
                {accountOpen && (
                  <div className="dropdown-menu">
                    <Link to="/account/profile" className="dropdown-item">Profile</Link>
                    {role === "admin" && (
                      <>
                        <Link to="/Dashboard" className="dropdown-item">Dashboard</Link>
                        <Link to="/Overview" className="dropdown-item">Overview</Link>
                        <Link to="/AdopPets" className="dropdown-item">AdopPets</Link>
                        <Link to="/AdopRequest" className="dropdown-item">AdopRequest</Link>
                        <Link to="/adminproductlist" className="dropdown-item">Products</Link>
                      </>
                    )}

                    {isVet ? (
                      <>
                        <Link to="/job/HealthRecord" className="dropdown-item">Health Record</Link>
                        <Link to="/job/AppointmentManagement" className="dropdown-item">Appointment Management</Link>
                        <Link to="/job/LPO" className="dropdown-item">Log processing and observation</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/account/mypets" className="dropdown-item">My Pets</Link>
                        <Link to="/account/family" className="dropdown-item">Family</Link>
                        <Link to="/service/productlist" className="dropdown-item">Shopping</Link>
                      </>
                    )}
                    <button type="button" className="dropdown-item btn-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;