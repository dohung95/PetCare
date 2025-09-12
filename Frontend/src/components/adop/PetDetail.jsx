import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const samplePet = {
  id: 6,
  name: "Panipuri",
  gender: "Female",
  size: "Medium",
  age: "5 years and 8 months",
  health: "Vaccinated, healthy",
  images: [
    "https://i.imgur.com/DnQ2cyl.jpg",
    "https://i.imgur.com/nc2gFfv.jpg",
    "https://i.imgur.com/fB8Yl7U.jpg",
  ],
  banner: "https://i.imgur.com/nc2gFfv.jpg",
  personality: ["Affectionate", "Curious", "Friendly", "Independent"],
  compatibility: [
    { label: "live with other dogs", icon: "/icons/dog.png" },
    { label: "live with cats", icon: "/icons/cat.png" },
    { label: "live with young children", icon: "/icons/child.png" },
  ],
  story: `Hi! I’m Panipuri, a cautious and independent yet friendly and affectionate girl looking for a home.

My story is one of pure neglect. Myself and 27 other dogs were rescued from an illegal shelter that had reportedly
been built to house up to 500 stray dogs. Local residents didn’t want us around in the compound and after years
of feeding us scraps, they locked us inside without food or fresh water. We were left in filthy, cramped kennels 
with no exercise and had to spend weeks in Soi Dog’s isolation unit recovering.

I’ve endured a lot to be here today, but I’m determined to keep moving forward.  
Will you reward me for all my bravery? Once you get to know me, you’ll fall head over heels!`,
};

const adoptionSteps = [
  {
    step: 1,
    title: "Initial enquiry",
    description:
      "Submit an adoption enquiry, answering some initial questions about your family, lifestyle and ideal companion.",
    icon: "📋",
  },
  {
    step: 2,
    title: "Interview",
    description:
      "Join a video call with one of our adoption coordinators to help find your perfect match. Discuss the dog's medical history, behavioural needs and more.",
    icon: "💬",
  },
  {
    step: 3,
    title: "Home Assessment",
    description:
      "Complete a home visit – either in person or virtually – with one of our staff or volunteers to ensure you have everything in place to welcome a rescue dog.",
    icon: "🏠",
  },
  {
    step: 4,
    title: "Adoption agreement",
    description:
      "Sign the adoption agreement, confirming your commitment to the care of your chosen dog.",
    icon: "📝",
  },
  {
    step: 5,
    title: "Travel arrangements",
    description:
      "Let our logistics team arrange your dog’s journey to you. Collect your new best friend from a pre-arranged location and enjoy a lifetime of happiness together!",
    icon: "🚐",
  },
];

const PetDetail = () => {
  const pet = samplePet;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="pet-detail">
      {/* Banner */}
      <div
        className="pet-banner"
        style={{
          width: "100%",
          height: "350px",
          backgroundImage: `url(${pet.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      ></div>

      {/* Card block */}
      <div className="container">
        <div
          className="card shadow-lg p-4"
          style={{
            marginTop: "-120px",
            borderRadius: "16px",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="row g-4 align-items-center">
            {/* Pet images carousel */}
            <div className="col-md-5">
              <div
                id="petCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {pet.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`carousel-item ${idx === 0 ? "active" : ""}`}
                    >
                      <img
                        src={img}
                        alt={`${pet.name} ${idx + 1}`}
                        className="d-block w-100 rounded"
                        style={{ objectFit: "cover", height: "300px" }}
                      />
                    </div>
                  ))}
                </div>
                {/* Nút điều hướng */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#petCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#petCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            {/* Pet info */}
            <div className="col-md-7">
              <h3 className="fw-bold text-warning mb-3">Hi, I’m {pet.name}</h3>
              <div className="d-flex flex-wrap gap-3 mb-3">
                <span>
                  <b>Gender:</b> {pet.gender}
                </span>
                <span>
                  <b>Size:</b> {pet.size}
                </span>
                <span>
                  <b>Age:</b> {pet.age}
                </span>
                <span>
                  <b>Health:</b> {pet.health}
                </span>
              </div>
              <div>
                <b>Personality:</b>
                <div className="mt-2">
                  {pet.personality.map((trait, i) => (
                    <span
                      key={i}
                      className="badge bg-warning text-dark me-2 mb-2 px-3 py-2 rounded-pill"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compatibility */}
      <div className="d-flex justify-content-center gap-4 my-5 flex-wrap">
        {pet.compatibility.map((item, idx) => (
          <div key={idx} className="text-center">
            <img
              src={item.icon}
              alt={item.label}
              style={{ width: 60, height: 60 }}
              className="mb-2"
            />
            <p className="small text-success">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="container my-5 text-center">
        <h3 className="fw-bold text-uppercase mb-3">{pet.name}’s Story</h3>
        <p
          className="text-muted"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {pet.story}
        </p>
        <div className="mt-4">
          <Link
            to="/formadop"
            className="btn btn-warning btn-lg px-5 rounded-pill fw-bold"
          >
            Adopt Me
          </Link>
        </div>
      </div>

      {/* Adoption Process */}
      <div className="adoption-process my-5 container">
        <h3 className="fw-bold text-center mb-4 text-uppercase">
          The Adoption Process
        </h3>
        <p
          className="text-center text-muted mb-5"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          Adopting from Soi Dog Foundation is one of the most effective ways to
          support our work. Each adoption creates the space we need to help
          another animal in need. It is also incredibly rewarding to give an
          animal the chance to experience the love and security they so
          desperately deserve.
        </p>

        <div className="timeline">
          {adoptionSteps.map((step) => (
            <div key={step.step} className="d-flex align-items-start mb-4">
              <div
                className="rounded-circle bg-warning text-white fw-bold d-flex align-items-center justify-content-center me-3"
                style={{ width: 40, height: 40 }}
              >
                {step.step}
              </div>
              <div>
                <h6 className="fw-bold">
                  {step.title} <span className="ms-2">{step.icon}</span>
                </h6>
                <p className="text-muted mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
  <Link
    to="/formadop"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="btn btn-warning btn-lg px-5 rounded-pill fw-bold"
  >
    Adoption Enquiry
  </Link>
</div>
      </div>
    </div>
  );
};

export default PetDetail;
