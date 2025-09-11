import React from "react";
import { Link } from "react-router-dom";
import "./Css/Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 footer">
      <div className="container_footer">
        <div className="row">
          {/* logo */}
          <div className="col-md-4 mb-4 logo">
            <img src="/imgs/logo-petcare.png" alt="" />
            <img src="/imgs/logo-school.webp" alt="" />
          </div>

          {/* slogan & Quick Links */}
          {/* slogan */}
          <div className="col-md-4 mb-4">
            <div>
              <h4 className="fw-bold">🐾 Petcare</h4>
              <p style={{ width: "90%" }}>
                Healthy Pets, Happy Families.
                Trusted veterinary services & pet products.
              </p>
            </div>
            {/* Quick Links */}
            <div style={{ textAlign: "left" }}>
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
                <li className="nav-item dropdown">
                  <Link to="/service" className="nav-link text-light text-decoration-none">
                    Service
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/service/store" className="dropdown-item">Store</Link></li>
                  </ul>
                </li>
                <li><Link to="/about" className="text-light 
              text-decoration-none">About Us</Link></li>
                <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
                <li><Link to="/adoption" className="text-light text-decoration-none">Adoption</Link></li>
                <li className="nav-item dropdown">
                  <Link to="/job" className="nav-link text-light text-decoration-none">
                    Job
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/job/Veterinarian_Registration" className="dropdown-item">Veterinarian Registration</Link></li>
                    <li><Link to="/job/HealthRecord" className="dropdown-item">Health Record</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <p>📍 21Bis Hau Giang,Tan Son Nhat ward, HCMC</p>
            <p>📞 0987782201 - 02838803888</p>
            <p>✉️ aptechfpt@fpt.edu.vn</p>
            <p>🌐 https://aptech.fpt.edu.vn/</p>
            {/* Social Media Icons */}
            <p className="socials">
              <a href="https://www.facebook.com/aptech.fpt" target="_blank" rel="noreferrer">Facebook</a>
              <span> · </span>
              <a href="https://www.youtube.com/@laptrinhfptaptech" target="_blank" rel="noreferrer">YouTube</a>
            </p>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center">
          <small>© {new Date().getFullYear()} Petcare. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
