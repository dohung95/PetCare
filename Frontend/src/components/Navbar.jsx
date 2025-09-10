import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Css/Navbar.css";

const Navbar = () => {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);

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
                  </div>
                )}
              </div>
              <div className="menu-item">
                <Link to="/auth/login" className="nav-link">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;