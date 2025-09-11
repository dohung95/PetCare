import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Logo + slogan */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">🐾 Petcare</h4>
            <p>
              Healthy Pets, Happy Families.
              Trusted veterinary services & pet products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/service" className="text-light 
              text-decoration-none">Service</Link></li>
              <li><Link to="/about" className="text-light 
              text-decoration-none">About Us</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link to="/job" className="text-light 
              text-decoration-none">Job</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <p>📍 21Bis Hau Giang, Phường Tân Sơn Nhất, HCMC</p>
            <p>📞 0987782201 - 02838803888</p>
            <p>✉️ aptechfpt@fpt.edu.vn</p>
            <p>🌐 https://aptech.fpt.edu.vn/</p>
            {/* Social Media Icons */}
            <p className="socials">
              <a href="https://www.facebook.com/aptech.fpt" target="_blank" rel="noreferrer">Facebook</a>
              <span> · </span>
              <a href="https://instagram.com/petcare.vn" target="_blank" rel="noreferrer">Instagram</a>
              <span> · </span>
              <a href="https://www.youtube.com/@laptrinhfptaptech" target="_blank" rel="noreferrer">YouTube</a>
            </p>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-light me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-light">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
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
