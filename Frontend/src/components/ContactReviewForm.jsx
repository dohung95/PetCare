import { useState } from "react";
import api from "../api";
import "./Css/ContactReviewForm.css";

export default function ContactReviewForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "feedback",
    rating: 5,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice({ type: "", text: "" });
    setSubmitting(true);

    try {
      await api.post("/feedbacks", form);
      setNotice({ type: "success", text: "Thanks! Your feedback has been sent 🐾" });
      setForm({ name: "", email: "", phone: "", type: "feedback", rating: 5, message: "" });
    } catch (err) {
      setNotice({
        type: "error",
        text: err.response?.data?.message || "Something went wrong, please try again",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form">
      <h3 className="form-title">Send Us Your Feedback</h3>

      {notice.text && (
        <div className={`form-notice ${notice.type === "success" ? "is-success" : "is-error"}`}>
          {notice.text}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="feedback">Feedback / Suggestions</option>
          <option value="other">Other</option>
        </select>

        {/* Rating stars */}
        <div className="rating-group">
          <label>Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={`star ${n <= form.rating ? "active" : ""}`}
                onClick={() => setForm((prev) => ({ ...prev, rating: n }))}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          name="message"
          rows="4"
          placeholder="Your message..."
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
