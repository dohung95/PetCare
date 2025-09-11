import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../api";

import "./Css/Navbar.css";

const Navbar = () => {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);

  /* === USER === */
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  /* === LOAD TOKEN FROM (/api/auth/me) === */
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        console.log("No valid token");
        setUser(null);
      }
    })();
  }, []);

  /* === LOGOUT === */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAccountOpen(false);
    navigate("/"); // tuỳ bạn chuyển về đâu
  };

  const LastName = user?.name?.split(" ")?.pop() || user?.fullName?.split(" ")?.pop() || user?.email;


  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          <div className="col-md-6">
            <Link to="/">
              <img src="/imgs/logo-petcare.png" alt="Logo" className="logo-image" />
            </Link>
          </div>
          <div className="col-md-6">
            <div className="menu">
              <div className="menu-item">
                <Link to="/" className="nav-link">Home</Link>
              </div>
              <div
                className="menu-item dropdown"
                onMouseEnter={() => setServiceOpen(true)}
                onMouseLeave={() => setServiceOpen(false)}
              >
                <span className="nav-link">Service</span>
                {serviceOpen && (
                  <div className="dropdown-menu">
                    <Link to="/service/store" className="dropdown-item">Store</Link>
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
                <Link to="/adoption" className="nav-link">Adoption</Link>
              </div>
              <div

                className="menu-item dropdown"
                onMouseEnter={() => setJobOpen(true)}
                onMouseLeave={() => setJobOpen(false)}
              >
                <span className="nav-link">Job</span>
                {jobOpen && (
                  <div className="dropdown-menu">
                    <Link to="/job/Veterinarian_Registration" className="dropdown-item">
                      Veterinarian Registration
                    </Link>
                    <Link to="/job/HealthRecord" className="dropdown-item">
                      Health Record
                    </Link>
                    <Link to="/job/AppointmentManagement" className="dropdown-item">
                      Appointment Management
                    </Link>
                    <Link to="/job/LPO" className="dropdown-item">
                      Log processing and observation
                    </Link>
                  </div>
                )}
              </div>
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
                      <Link to="/account/pets" className="dropdown-item">My Pets</Link>
                      <Link to="/account/family" className="dropdown-item">Family</Link>
                      <Link to="/account/health-records" className="dropdown-item">My Pets Health</Link>
                      <Link to="/service/store" className="dropdown-item">Shopping</Link>
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
      </div>
    </nav>
  );
};

export default Navbar;