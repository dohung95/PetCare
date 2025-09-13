// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "../Css/ResetPassword.css";

export default function ResetPassword() {
  const { token } = useParams();                 // lấy token từ URL /reset-password/:token
  const navigate = useNavigate();

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // quy định tối thiểu (bạn có thể thay đổi cho phù hợp backend)
  const validPw = (v) => /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(v);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!validPw(pw)) {
      setMsg({ type: "error", text: "Password must be at least 6 chars, include letters & numbers." });
      return;
    }
    if (pw !== pw2) {
      setMsg({ type: "error", text: "Password confirmation does not match." });
      return;
    }

    try {
      setSubmitting(true);
      // gọi backend: POST /api/v1/auth/reset-password/:token
      const res = await api.post(`/auth/reset-password/${token}`, { password });

      setMsg({ type: "success", text: res.data?.message || "Password reset successful!" });

      // điều hướng về trang login sau 1.5s
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (err) {
      setMsg({
        type: "error",
        text: err.response?.data?.message || "Token invalid or expired. Please request a new reset link.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rp-wrap">
      <div className="rp-card">
        <div className="rp-head">
          <div className="rp-icon" aria-hidden>🔒</div>
          <h1 className="rp-title">Reset Password</h1>
          <p className="rp-subtitle">Create a new password for your account.</p>
        </div>

        {msg.text && (
          <div className={`rp-msg ${msg.type === "success" ? "is-success" : "is-error"}`}>
            {msg.text}
          </div>
        )}

        <form className="rp-form" onSubmit={onSubmit} noValidate>
          <label className="rp-label">New Password</label>
          <div className="rp-input-group">
            <input
              type={showPw ? "text" : "password"}
              className="rp-input"
              placeholder="Enter new password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
            <button
              type="button"
              className="rp-eye"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          </div>
          <p className="rp-hint">Min 6 chars, include letters & numbers.</p>

          <label className="rp-label">Confirm Password</label>
          <input
            type={showPw ? "text" : "password"}
            className="rp-input"
            placeholder="Re-enter new password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            required
          />

          <div className="rp-actions">
            <button type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Password"}
            </button>
          </div>

          <div className="rp-links">
            <Link to="/auth/login" className="rp-link">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
