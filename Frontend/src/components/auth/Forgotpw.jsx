import "../Css/Auth_forgotpw.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [shake, setShake] = useState(false);

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  const bounce = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address 🐾");
      bounce();
      return;
    }

    // Mock success (sau này gắn API)
    setSuccess("If this email exists, we have sent you a reset link!");
  };

  return (
    <div className="fp-wrap">
      <div className="fp-card">
        <div className="fp-head">
          <div className="fp-icon" aria-hidden>🐾</div>
          <h1 className="fp-title">Forgot Password</h1>
          <p className="fp-subtitle">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form
          className={`fp-form${shake ? " fp-shake" : ""}`}
          onSubmit={onSubmit}
          noValidate
        >
          <label htmlFor="fp-email" className="fp-label">Email</label>
          <input
            id="fp-email"
            type="email"
            className={`fp-input${!email || validateEmail(email) ? "" : " fp-input--invalid"}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
          />

          {error && <div className="fp-msg fp-error">{error}</div>}
          {success && <div className="fp-msg fp-success">{success}</div>}

          <div className="fp-actions">
            <button type="submit">Send Reset Link</button>
          </div>

          <div className="fp-links">
            <Link to="/auth/login" className="fp-link">Back to Login</Link>
          </div>
        </form>
      </div>

      <div className="btn_home">
        <Link to="/" className="btn-home-link login-mode">GO BACK HOME</Link>
      </div>
    </div>
  );
}
