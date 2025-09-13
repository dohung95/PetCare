import React, { useEffect } from "react";

// Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
// Function to scroll to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Home = () => {
   useEffect(() => {
    scrollToTop();
  }, []); 
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
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)", // dark overlay
          }}
        ></div>

        {/* content */}
        <div className="container position-relative">
          <h2
            className="heading-hero-banner aos-init aos-animate fw-bold mb-3 animate__animated animate__fadeInDown"
            data-aos="fade-up"
            data-aos-easing="ease"
            data-aos-delay="150"
            style={{ fontFamily: "'Nunito', sans-serif", fontSize: "50px" }}
          >
            Care for your friend <br />
            We provide the best care <br />
          </h2>

          <button
            data-tf-slider="$0lfcbhV"
            data-tf-position="right"
            data-tf-opacity="100"
            className="px-4 py-2 fw-semibold animate__animated animate__fadeInUp text-white"
            data-tf-iframe-props="title=Give your pet the best care"
            data-tf-transitive-search-params
            data-tf-medium="snippet"
            data-tf-loaded="true"
            style={{
              fontSize: "1rem",
              borderRadius: "6px",
              backgroundColor: "#75010A", // burgundy red
              border: "none",
            }}
          >
            Appointment
          </button>
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
              <p>
                Your pets deserve the very best care. That is our commitment and promise to every pet owner.
              </p>
            </div>

            <div className="col-md-3">
              <img src="/imgs/care2.jpg" alt="Advanced medical technology" className="img-fluid rounded mb-3" />
              <h5 className="fw-bold">Advanced and Modern Medical Technology</h5>
              <p>
                We invest in modern facilities to ensure fast and accurate diagnostics for your beloved pets.
              </p>
            </div>

            <div className="col-md-3">
              <img src="/imgs/care3.jpg" alt="Trusted experts" className="img-fluid rounded mb-3" />
              <h5 className="fw-bold">Trusted Experts You Can Rely On</h5>
              <p>
                Just like humans, pets' health depends on dedicated doctors. Our team always ensures the highest standards of care.
              </p>
            </div>

            <div className="col-md-3">
              <img src="/imgs/care4.jpg" alt="Customer care" className="img-fluid rounded mb-3" />
              <h5 className="fw-bold">Customer Care</h5>
              <p>
                We support you to make your experience with your pets as comfortable and enjoyable as possible.
              </p>
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

      {/* TESTIMONIAL SECTION */}
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

          {/* Swiper Carousel */}
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="/imgs/testi1.jpg"
                alt="Customer 1"
                className="rounded-3 shadow"
                style={{ width: "100%", height: "320px", objectFit: "cover" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/imgs/testi2.jpg"
                alt="Customer 2"
                className="rounded-3 shadow"
                style={{ width: "100%", height: "320px", objectFit: "cover" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/imgs/testi3.jpg"
                alt="Customer 3"
                className="rounded-3 shadow"
                style={{ width: "100%", height: "320px", objectFit: "cover" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/imgs/testi4.jpg"
                alt="Customer 4"
                className="rounded-3 shadow"
                style={{ width: "100%", height: "320px", objectFit: "cover" }}
              />
            </SwiperSlide>
          </Swiper>

          {/* Testimonial text */}
          <p
            className="fst-italic mt-4"
            style={{ maxWidth: "700px", margin: "0 auto", fontSize: "16px", color: "#444" }}
          >
            “Transporting our dog internationally was challenging, but ADI handled everything smoothly
            and gave us peace of mind throughout the process. We truly trust ADI!”
          </p>
          <p className="fw-bold mt-2">Eric & Haku</p>
        </div>
      </section>
       {/* FOOTER VIDEO SECTION */}
        <section className="position-relative" style={{ height: "300px", overflow: "hidden" }}>
          {/* Video background */}
          <video
            className="w-100 h-100"
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: "cover" }}
          >
            <source src="/videos/footer-banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          ></div>

          {/* Text content */}
          <div
            className="position-absolute top-50 start-50 translate-middle text-center text-white"
            style={{ zIndex: 2 }}
          >
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
