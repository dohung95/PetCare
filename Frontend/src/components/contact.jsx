import React from 'react';

function Contact() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <p className="text-center">
        Have questions or need support? We are here for you.
      </p>

      <div className="mb-4">
        <p>📍 Address: 123 Petcare Street, Ho Chi Minh City, Vietnam</p>
        <p>📞 Phone: +84 123 456 789</p>
        <p>✉️ Email: support@petcare.com</p>
      </div>

      <form>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input type="text" className="form-control" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label className="form-label">Your Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="4" placeholder="Write your message"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}
export default Contact;