import React from "react";
import { Link } from "react-router-dom";
import "./Css/Navbar.css";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MySite</h2>
      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li className="dropdown">
          <span>Service</span>
          <ul className="dropdown-menu">
            <li>
              <Link to="/service/store">Store</Link>
            </li>
          </ul>
        </li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        <li><Link to="/job" style={styles.link}>Job</Link></li>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
  },
  logo: {
    margin: 0,
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Navbar;
