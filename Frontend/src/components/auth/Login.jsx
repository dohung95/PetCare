import axios from "axios";
import { useState } from "react";
import "../Css/Auth_login.css";
import { Link } from "react-router-dom";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const navigate = useNavigate();

  // ========== SIGN IN state ==========
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginShake, setLoginShake] = useState(false);

  // ========== SIGN UP state ==========
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupShake, setSignupShake] = useState(false);

  // Helpers
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const isValidPhone = (v) => /^\d{9,12}$/.test(v.trim());
  const isValidPassword = (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(v.trim());

  const shake = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 500);
  };

  // Validate sign in
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginShake(false); // Đặt lại hiệu ứng shake

    if (!isValidEmail(loginEmail)) {
      setLoginError("Please enter a valid email 🐾");
      shake(setLoginShake);
      return;
    }

    try {
      const res = await api.post("/auth/signin", {
        email: loginEmail,
        password: loginPassword,
      });

      const { token, data } = res.data;
    
      localStorage.setItem('token', token);
      localStorage.setItem('ownerId', data.id); 
      localStorage.setItem('ownerName', data.name || '');
      localStorage.setItem('ownerPhone', data.phone || '');
      localStorage.setItem('ownerEmail', data.email || '');
      localStorage.setItem('ownerRole', data.role || '');
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        console.log('Token saved:', res.data.token); // Debug
        // Chuyển hướng đến trang profile thay vì trang chủ
        window.location.href = "/";
      } else {
        setLoginError(res.data.message || "Login failed");
        shake(setLoginShake);
      }

    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed");
      shake(setLoginShake);
      console.error('Login error:', err); // Debug
    }
  };

  // Validate Sign Up
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (!signupName || signupName.trim().length < 3) {
      setSignupError("Full name must be at least 3 characters 🐾");
      shake(setSignupShake);
      return;
    }
    if (!isValidEmail(signupEmail)) {
      setSignupError("Please enter a valid email address 🐱");
      shake(setSignupShake);
      return;
    }
    if (!isValidPassword(signupPassword)) {
      setSignupError(
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character 🐶"
      );
      shake(setSignupShake);
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match 🐶");
      shake(setSignupShake);
      return;
    }
    if (!isValidPhone(signupPhone)) {
      setSignupError("Phone number must be 9–12 digits 🐶");
      shake(setSignupShake);
      return;
    }
    if (!signupAddress || signupAddress.trim().length < 10) {
      setSignupError("Address must be at least 10 characters 🐾");
      shake(setSignupShake);
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
        address: signupAddress,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.data.role);
      alert("Register successful!");
      setIsRightPanelActive(false); // tự động chuyển về form login
    } catch (err) {
      setSignupError(err.response?.data?.message || "Register failed");
      shake(setSignupShake);
    }
  };

  return (
    <div className="body_login">
      <div
        id="container"
        className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      >
        {/* ================= Sign Up ================= */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup} className={signupShake ? "form-shake" : ""} noValidate>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className={!signupName || signupName.length >= 3 ? "" : "is-invalid"}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className={!signupEmail || isValidEmail(signupEmail) ? "" : "is-invalid"}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className={!signupPassword || isValidPassword(signupPassword) ? "" : "is-invalid"}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              className={signupPassword === signupConfirmPassword ? "" : "is-invalid"}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
              className={!signupPhone || isValidPhone(signupPhone) ? "" : "is-invalid"}
              required
            />
            <textarea
              placeholder="Address"
              rows={3}
              style={{
                width: "100%",
                resize: "vertical",
                background: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                borderRadius: 6,
                fontFamily: "inherit",
                height: 50,
              }}
              value={signupAddress}
              onChange={(e) => setSignupAddress(e.target.value)}
              className={!signupAddress || signupAddress.length >= 10 ? "" : "is-invalid"}
              required
            />
            {signupError && <div className="form-error">{signupError}</div>}
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* ================= Sign In ================= */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} className={loginShake ? "form-shake" : ""} noValidate>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className={!loginEmail || isValidEmail(loginEmail) ? "" : "is-invalid"}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={!loginPassword || loginPassword.length >= 6 ? "" : "is-invalid"}
              required
            />
            {loginError && <div className="form-error">{loginError}</div>}
            <Link to="/auth/forgot_password">Forgot your password?</Link>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* ================= Overlay ================= */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setIsRightPanelActive(false)}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setIsRightPanelActive(true)}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back home */}
      <div className="btn_home" style={{ textAlign: "center", marginTop: "40px" }}>
        <button>
          <Link to="/" style={{ color: "rgba(255, 255, 255, 1)" }}>GO BACK HOME</Link>
        </button>
      </div>
    </div>
  );
}
