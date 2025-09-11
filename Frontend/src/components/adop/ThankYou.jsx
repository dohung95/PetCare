import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="container text-center my-5">
      <h3 className="fw-bold text-success">Thank you for your enquiry!</h3>
      <p className="text-muted">
        A member of our Adoptions team will be in touch shortly!
      </p>

      <div className="d-flex justify-content-center gap-2 mt-3">
        <a
          href="https://facebook.com/sharer/sharer.php?u=https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <i className="bi bi-facebook me-2"></i> X
        </a>
        <a
          href="https://twitter.com/intent/tweet?text=I%20just%20submitted%20an%20adoption%20enquiry!%20https://yourwebsite.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-info text-white"
        >
          <i className="bi bi-twitter me-2"></i> Facebook
        </a>
      </div>

      <div className="mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
