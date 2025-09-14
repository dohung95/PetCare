import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import "./Css/Navbar.css";

export default function Navbar() {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Thiết bị touch (không hover)
  const isTouch = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }, []);

  // Home/Adoption => cho phép trong suốt khi top
  const isHome = location.pathname === "/";
  const isAdoption = location.pathname.toLowerCase().startsWith("/adoption") || location.pathname.toLowerCase().startsWith("/pets");
  const enableTransparent = isHome || isAdoption;

  // Load current user and role
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
        ["token", "role", "ownerId", "ownerName", "ownerPhone", "ownerEmail", "ownerRole"].forEach(k =>
          localStorage.removeItem(k)
        );
        setUser(null);
        setRole(null);
      }
    })();
  }, []);

  // Logout
  const handleLogout = () => {
    ["token", "role", "ownerId", "ownerName", "ownerPhone", "ownerEmail", "ownerRole"].forEach(k =>
      localStorage.removeItem(k)
    );
    setUser(null);
    setRole(null);
    setAccountOpen(false);
    navigate("/");
  };

  // Scroll effect: chỉ Home/Adoption trong suốt ở top
  useEffect(() => {
    if (!enableTransparent) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [enableTransparent]);

  // Tự đo chiều cao navbar => --nav-h
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    if (document.fonts?.ready) document.fonts.ready.then(setVar).catch(() => { });
    el.querySelectorAll("img").forEach(img => {
      if (!img.complete) img.addEventListener("load", setVar, { once: true });
    });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  const LastName =
    user?.name?.split(" ")?.pop() ||
    user?.fullName?.split(" ")?.pop() ||
    user?.email;

  // set role
  const isVet = user?.role === "vet";
  const isAdmin = user?.role === "admin";

  const navClass = `navbar fixed-top ${enableTransparent ? (scrolled ? "navbar-scrolled" : "navbar-top") : "navbar-scrolled"
    }`;

  // Mobile: toggle bằng click; Desktop: dùng hover
  const onServiceTriggerClick = e => {
    if (!isTouch) return;
    e.preventDefault();
    setServiceOpen(v => !v);
    setJobOpen(false);
    setAccountOpen(false);
  };
  const onJobTriggerClick = e => {
    if (!isTouch) return;
    e.preventDefault();
    setJobOpen(v => !v);
    setServiceOpen(false);
    setAccountOpen(false);
  };
  const onAccountTriggerClick = e => {
    if (!isTouch) return;
    e.preventDefault();
    setAccountOpen(v => !v);
    setServiceOpen(false);
    setJobOpen(false);
  };

  return (
    <nav ref={navRef} className={navClass}>
      <div className="container-fluid d-flex justify-content-between align-items-center nav-inner">
        {/* Logo */}
        <Link to="/" className="logo-wrap">
          <img src="/imgs/logo-petcare.png" alt="Logo" className="logo-image" />
        </Link>

        {/* Menu */}
        <div className="menu d-flex align-items-center">
          <div className="menu-item">
            <Link to="/" className="nav-link">Home</Link>
          </div>

          {/* Service Dropdown */}
          <div
            className={`menu-item dropdown ${serviceOpen ? "show" : ""}`}
            {...(!isTouch && {
              onMouseEnter: () => setServiceOpen(true),
              onMouseLeave: () => setServiceOpen(false),
            })}
          >
            <button
              type="button"
              className="nav-link btn-reset"
              onClick={onServiceTriggerClick}
              aria-haspopup="true"
              aria-expanded={serviceOpen}
            >
              Service
            </button>
            <div className="dropdown-menu">
              <Link to="/service/store" className="dropdown-item">Store</Link>
              <Link to="/Appointment_owner" className="dropdown-item">Appointment</Link>
            </div>
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
          <div>
            <Link to="/job" className="nav-link">Job</Link>
          </div>

          {/* User/Login */}
          {!user ? (
            <div className="menu-item">
              <Link to="/auth/login" className="nav-link">Login</Link>
            </div>
          ) : (
            <div
              className={`menu-item dropdown user-menu ${accountOpen ? "show" : ""}`}
              {...(!isTouch && {
                onMouseEnter: () => setAccountOpen(true),
                onMouseLeave: () => setAccountOpen(false),
              })}
            >
              <button
                type="button"
                className="nav-link user-name btn-reset"
                onClick={onAccountTriggerClick}
                aria-haspopup="true"
                aria-expanded={accountOpen}
              >
                {LastName}
              </button>
              <div className="dropdown-menu">
                <Link to="/profile_owner" className="dropdown-item">Profile</Link>
                <Link to="/mypets" className="dropdown-item">My Pets</Link>
                <Link to="/service/store" className="dropdown-item">Shopping</Link>

                {(isVet || isAdmin) && (
                  <>
                    {isVet && (
                      <>
                        <Link to="/job/HealthRecord" className="dropdown-item">Health Record</Link>
                        <Link to="/job/AppointmentManagement" className="dropdown-item">
                          Appointment Management
                        </Link>
                        <Link to="/job/LPO" className="dropdown-item">Log Processing & Observation</Link>
                      </>
                    )}
                    {isAdmin && (
                      <>
                        <Link to="/Dashboard" className="dropdown-item">Admin Dashboard</Link>
                      </>
                    )}
                  </>
                )}
                <button type="button" className="dropdown-item btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animal animation (bỏ comment để bật) */}
      <div className="animals">
        <div className="animal" style={{ animationDelay: "0s" }}>🐶</div>
        <div className="animal" style={{ animationDelay: "1s" }}>🐱</div>
        <div className="animal" style={{ animationDelay: "2s" }}>🐰</div>
        <div className="animal" style={{ animationDelay: "3s" }}>🐻</div>
        <div className="animal" style={{ animationDelay: "4s" }}>🐼</div>
        <div className="animal" style={{ animationDelay: "5s" }}>🦁</div>
        <div className="animal" style={{ animationDelay: "6s" }}>🐯</div>
        <div className="animal" style={{ animationDelay: "7s" }}>🐵</div>
        <div className="animal" style={{ animationDelay: "8s" }}>🦊</div>
        <div className="animal" style={{ animationDelay: "9s" }}>🐸</div>
        <div className="animal" style={{ animationDelay: "10s" }}>🐔</div>
        <div className="animal" style={{ animationDelay: "11s" }}>🐧</div>
        <div className="animal" style={{ animationDelay: "12s" }}>🐦</div>
        <div className="animal" style={{ animationDelay: "13s" }}>🐤</div>
        <div className="animal" style={{ animationDelay: "14s" }}>🐴</div>
        <div className="animal" style={{ animationDelay: "15s" }}>🦄</div>
        <div className="animal" style={{ animationDelay: "16s" }}>🐮</div>
        <div className="animal" style={{ animationDelay: "17s" }}>🐷</div>
        <div className="animal" style={{ animationDelay: "18s" }}>🐟</div>
        <div className="animal" style={{ animationDelay: "19s" }}>🦉</div>
      </div>
    </nav>
  );
}
