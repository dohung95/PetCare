import React from "react";
import "./Css/contact.css";

function Contact() {
  return (
    <section className="contact_page">
      <div className="contact-card">
        {/* Cột trái: thông tin */}
        <div className="contact-left">
          <h2 className="title" style={{ textAlign: "center" }}>Contact Us</h2>
          

          <h4 className="section-heading">Our Contact Information</h4>
          <ul className="info-list">
            <li><span className="icon">📍</span> 21Bis Hau Giang, Phường Tân Sơn Nhất, Ho Chi Minh City, Vietnam</li>
            <li><span className="icon">📞</span> 0987782201 &nbsp;–&nbsp; 02838803888</li>
            <li><span className="icon">✉️</span> aptechfpt@fpt.edu.vn</li>
            <li><span className="icon">🌐</span> https://aptech.fpt.edu.vn/</li>
          </ul>

          <h4 className="section-heading">Business Hours</h4>
          <ul className="info-list">
            <li>Monday – Friday: 8:00 AM – 8:00 PM</li>
            <li>Saturday: 8:00 AM – 5:00 PM</li>
            <li>Sunday & Holidays: Closed (Emergency service available by phone)</li>
          </ul>

          <h4 className="section-heading">Follow Us</h4>
          <p className="socials">
            <a href="https://www.facebook.com/aptech.fpt" target="_blank" rel="noreferrer">Facebook</a>
            <span> · </span>
            <a href="https://instagram.com/petcare.vn" target="_blank" rel="noreferrer">Instagram</a>
            <span> · </span>
            <a href="https://www.youtube.com/@laptrinhfptaptech" target="_blank" rel="noreferrer">YouTube</a>
          </p>
        </div>

        {/* Cột phải: bản đồ */}
        <div className="contact-right">
          <h4 className="title align-right" style={{ textAlign: "center" }}>Find Us Here</h4>
          <div className="map-wrap">
            <iframe
              title="PetCare Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.522702661629!2d106.6634225561784!3d10.80783444343408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293ca6cabe9b%3A0xfe7e5f0c4d1672c3!2zMjFCaXMgSOG6rXUgR2lhbmcsIFBoxrDhu51uZyA0LCBUw6JuIELDrG5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
