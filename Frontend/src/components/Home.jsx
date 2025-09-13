import React, { useEffect, useState } from "react";
import "./Css/home.css";
import api from "../api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Tạo màu ổn định từ tên (hash → HSL)
function stringToColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return `hsl(${h}, 70%, 45%)`;
}

const Home = ({ minRating = 4, limit = 15 }) => {
  const [items, setItems] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState("");

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingReviews(true);
        setErrorReviews("");
        const res = await api.get(`/feedbacks/public?limit=${limit}&minRating=${minRating}`);

        console.log('FEEDBACK RES:', res.data);

        if (alive) setItems(res.data?.items || []);
      } catch (e) {
        if (alive) setErrorReviews(e.response?.data?.message || "Failed to load reviews");
      } finally {
        if (alive) setLoadingReviews(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [limit, minRating]);

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="min-vh-100 d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: "url('/imgs/hero-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
        <div className="container position-relative">
          <h2
            className="heading-hero-banner fw-bold mb-3"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: "50px" }}
          >
            Care for your friend <br />
            We provide the best care <br />
          </h2>

          <Link
            to="/profile_owner"
            className="px-4 py-2 fw-semibold text-white text-decoration-none text-uppercase"
            style={{
              display: "inline-block",
              fontSize: "1rem",
              borderRadius: "6px",
              backgroundColor: "#75010A",
              border: "none",
            }}
          >
            Appointment now
          </Link>
        </div>
      </section>

      {/* CARE SECTION */}
      <section className="py-5" style={{ backgroundColor: "#FFFDF8" }}>
        <div className="container">
          <h2
            className="text-center fw-bold mb-5"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: "36px", color: "#0D1B2A" }}
          >
            The Best Care for Your Pets
          </h2>

          <div className="row g-4 text-start">
            <div className="col-md-3">
              <img src="/imgs/care1.jpg" alt="Internationally trained doctors" className="img-fluid rounded mb-3" />
              <h5 className="fw-bold">Internationally Trained and Certified Doctors</h5>
              <p>Your pets deserve the very best care. That is our commitment and promise to every pet owner.</p>
            </div>

            <div className="col-md-3">
              <img src="/imgs/care2.jpg" alt="Advanced medical technology" className="img-fluid rounded mb-3" />
              <h5 className="fw-bold">Advanced and Modern Medical Technology</h5>
              <p>We invest in modern facilities to ensure fast and accurate diagnostics for your beloved pets.</p>
            </div>

            <div className="col-md-3">
              <img src="/imgs/care3.jpg" alt="Trusted experts" className="img-fluid rounded mb-3" />
              <h5 className="fw-bold">Trusted Experts You Can Rely On</h5>
              <p>Just like humans, pets' health depends on dedicated doctors. Our team always ensures high standards of care.</p>
            </div>

            <div className="col-md-3">
              <img src="/imgs/care4.jpg" alt="Customer care" className="img-fluid rounded mb-3" />
              <h5 className="fw-bold">Customer Care</h5>
              <p>We support you to make your experience with your pets as comfortable and enjoyable as possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / WHAT WE CARE SECTION */}
      <section className="py-5" style={{ backgroundColor: "#FAF9F6" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* IMAGE */}
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img
                src="/imgs/about-care.jpg"
                alt="Our mission"
                className="img-fluid rounded"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>

            {/* TEXT CONTENT */}
            <div className="col-md-6">
              <h3
                className="fw-bold mb-3"
                style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", color: "#0D1B2A" }}
              >
                What We Care About
              </h3>
              <p>
                With decades of experience in animal care and wildlife conservation in Southeast Asia, our international
                team is deeply committed to the happiness and well-being of animals — from elephants and dogs to cats and
                many other species.
              </p>
              <p>
                We collaborate with conservation groups and organizations to provide the best methods of treatment and
                rehabilitation for rescued and endangered animals. Our mission is to protect wildlife and help them thrive
                in their natural habitats.
              </p>
              <p>
                Every visit to ADI supports our mission and efforts to help more animals receive the love and quality care
                they deserve from dedicated experts and veterinarians.
              </p>

              <button
                className="btn text-white mt-3"
                style={{
                  backgroundColor: "#75010A",
                  borderRadius: "6px",
                  padding: "10px 20px",
                  fontWeight: "600",
                }}
              >
                Our Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL (Hình ảnh) */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h3
            className="fw-bold"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", color: "#0D1B2A" }}
          >
            Don’t Just Take Our Word for It!
          </h3>
          <p className="mb-5" style={{ fontSize: "18px", color: "#555" }}>
            Meet some of our happy customers
          </p>

          <Swiper
            loop
            spaceBetween={24}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {["/imgs/testi1.jpg", "/imgs/testi2.jpg", "/imgs/testi3.jpg", "/imgs/testi4.jpg"].map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={src}
                  alt={`Customer ${idx + 1}`}
                  className="rounded-3 shadow"
                  style={{ width: "100%", height: "320px", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <p
            className="fst-italic mt-4"
            style={{ maxWidth: "700px", margin: "0 auto", fontSize: "16px", color: "#444" }}
          >
            “Transporting our dog internationally was challenging, but ADI handled everything smoothly
            and gave us peace of mind throughout the process. We truly trust ADI!”
          </p>
          <p className="fw-bold mt-2">Eric &amp; Haku</p>
        </div>
      </section>

      {/* REVIEWS (data từ DB) */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h3
            className="fw-bold mb-4"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", color: "#0D1B2A" }}
          >
            Reviews
          </h3>

          {loadingReviews && <p>Loading Reviews…</p>}
          {!loadingReviews && errorReviews && <p className="text-danger">{errorReviews}</p>}
          {!loadingReviews && !errorReviews && items.length === 0 && <p>No reviews yet.</p>}

          {!loadingReviews && !errorReviews && items.length > 0 && (
            <Swiper
              className="reviews-slider"
              loop
              spaceBetween={20}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 }
              }}
              modules={[Pagination, Autoplay]}
            >
              {items.map((t, i) => {
                const name = (t.name || "Anonymous").trim();
                const initials = getInitials(name);
                const color = stringToColor(name);
                const r = clamp(Math.round(Number(t.rating) || 0), 0, 5);

                return (
                  <SwiperSlide key={i}>
                    <div className="review-card">
                      <div className="review-header">
                        <div className="review-avatar" style={{ backgroundColor: color }}>
                          {initials}
                        </div>
                        <div>
                          <div className="review-name">{name}</div>
                          <div className="review-stars" aria-label={`Rating ${r}/5`}>
                            {"★".repeat(r)}
                            {"☆".repeat(5 - r)}
                          </div>
                        </div>
                      </div>
                      <p className="review-message">“{t.message}”</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </section>


      {/* FOOTER VIDEO SECTION */}
      <section className="position-relative" style={{ height: "300px", overflow: "hidden" }}>
        <video className="w-100 h-100" autoPlay loop muted playsInline style={{ objectFit: "cover" }}>
          <source src="/videos/footer-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)" }} />

        <div className="position-absolute top-50 start-50 translate-middle text-center text-white" style={{ zIndex: 2 }}>
          <h2
            className="fw-bold"
            style={{ fontSize: "36px", fontFamily: "'Nunito', sans-serif", lineHeight: "1.5" }}
          >
            We listen to you.
            <br />
            We talk to your pet.
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;
