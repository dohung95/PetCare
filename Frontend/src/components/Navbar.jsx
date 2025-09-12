import React from "react";
import { Link } from "react-router-dom";
import "./Css/Navbar.css";

const Navbar = () => {
<<<<<<< Updated upstream
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
=======
  const [serviceOpen, setServiceOpen] = useState(false);
  const [jobOpen, setJobOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  // Load token and user info
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
        setUser(null);
        setRole(null);
      }
    })();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
    setAccountOpen(false);
    navigate("/");
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Last name or email for user display
  const LastName =
    user?.name?.split(" ")?.pop() ||
    user?.fullName?.split(" ")?.pop() ||
    user?.email;

  // Check if user is veterinarian
  const isVet = user?.role === "vet";

  return (
    <nav className={`navbar fixed-top ${scrolled ? "navbar-scrolled" : "navbar-top"}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/imgs/logo-petcare.png" alt="Logo" className="logo-image" />
        </Link>

        {/* Menu */}
        <div className="menu d-flex align-items-center">
          {/* Admin menu */}
          {role === "admin" ? (
            <>
              <Link to="/AdopDashboard" className="nav-link menu-item">Dashboard</Link>
              <Link to="/Overview" className="nav-link menu-item">Overview</Link>
              <Link to="/adminproductlist" className="nav-link menu-item">Manage Store</Link>
              <Link to="/adopPets" className="nav-link menu-item">Manage Pets</Link>
              <Link to="/adopAdoptions" className="nav-link menu-item">Manage Adoptions</Link>
              <button type="button" className="nav-link btn-link menu-item" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {/* User menu */}
              <Link to="/" className="nav-link menu-item">Home</Link>

              {/* Service dropdown */}
              <div
                className="menu-item dropdown"
                onMouseEnter={() => setServiceOpen(true)}
                onMouseLeave={() => setServiceOpen(false)}
              >
                <span className="nav-link">Service</span>
                {serviceOpen && (
                  <div className="dropdown-menu show-anim">
                    <Link to="/service/store" className="dropdown-item">Store</Link>
                  </div>
                )}
              </div>

              <Link to="/about" className="nav-link menu-item">About</Link>
              <Link to="/contact" className="nav-link menu-item">Contact</Link>
              <Link to="/adoptionPage" className="nav-link menu-item">Adoption</Link>

              {/* Job dropdown */}
              <div
                className="menu-item dropdown"
                onMouseEnter={() => setJobOpen(true)}
                onMouseLeave={() => setJobOpen(false)}
              >
                <span className="nav-link">Job</span>
                {jobOpen && (
                  <div className="dropdown-menu show-anim">
                    <Link to="/job/Veterinarian_Registration" className="dropdown-item">
                      Veterinarian Registration
                    </Link>
                    <Link to="/job/HealthRecord" className="dropdown-item">Health Record</Link>
                    <Link to="/job/AppointmentManagement" className="dropdown-item">
                      Appointment Management
                    </Link>
                    <Link to="/job/LPO" className="dropdown-item">Log Processing & Observation</Link>
                  </div>
                )}
              </div>

              {/* Account / Login */}
              {!user ? (
                <Link to="/auth/login" className="nav-link menu-item">Login</Link>
              ) : (
                <div
                  className="menu-item dropdown user-menu"
                  onMouseEnter={() => setAccountOpen(true)}
                  onMouseLeave={() => setAccountOpen(false)}
                >
                  <span className="nav-link user-name">{LastName}</span>
                  {accountOpen && (
                    <div className="dropdown-menu show-anim">
                      <Link to="/account/profile" className="dropdown-item">Profile</Link>
                      {isVet ? (
                        <>
                          <Link to="/job/HealthRecord" className="dropdown-item">Health Record</Link>
                          <Link to="/job/AppointmentManagement" className="dropdown-item">Appointment Management</Link>
                          <Link to="/job/LPO" className="dropdown-item">Log Processing & Observation</Link>
                        </>
                      ) : (
                        <>
                          <Link to="/account/pets" className="dropdown-item">My Pets</Link>
                          <Link to="/account/family" className="dropdown-item">Family</Link>
                          <Link to="/service/store" className="dropdown-item">Shopping</Link>
                        </>
                      )}
                      <button type="button" className="dropdown-item btn-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
>>>>>>> Stashed changes
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
