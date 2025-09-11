import React from "react";
import { Link } from "react-router-dom"; 

// phải thêm được tình trạng sức khỏe của chó 
// mock pet data
const samplePet = {
  id: 6,
  name: "Foggy",
  gender: "Female",
  size: "Medium",
  age: "6 years and 9 months",
  image: "https://i.imgur.com/DnQ2cyl.jpg",
  personality: ["Calm", "Friendly", "Gentle"],
  compatibility: [
    { label: "I may be able to live with other dogs", icon: "/icons/dog.png" },
    { label: "I may be able to live with cats", icon: "/icons/cat.png" },
    { label: "I may be able to live with young children", icon: "/icons/child.png" }
  ],
  story: `Hello! I’m Foggy, a calm, friendly and gentle girl looking for a home.
My story is a shocking one... Foggy has been through a lot and now she deserves love and care.`
};

// adoption process steps
const adoptionSteps = [
  {
    step: 1,
    title: "Initial enquiry",
    description:
      "Submit an adoption enquiry, answering some initial questions about your family, lifestyle and ideal companion.",
    icon: "📋"
  },
  {
    step: 2,
    title: "Interview",
    description:
      "Join a video call with one of our adoption coordinators to help find your perfect match. Discuss the dog's medical history, behavioural needs and more.",
    icon: "💬"
  },
  {
    step: 3,
    title: "Home Assessment",
    description:
      "Complete a home visit – either in person or virtually – with one of our staff or volunteers to ensure you have everything in place to welcome a rescue dog.",
    icon: "🏠"
  },
  {
    step: 4,
    title: "Adoption agreement",
    description:
      "Sign the adoption agreement, confirming your commitment to the care of your chosen dog.",
    icon: "📝"
  },
  {
    step: 5,
    title: "Travel arrangements",
    description:
      "Let our logistics team arrange your dog’s journey to you. Collect your new best friend from a pre-arranged location and enjoy a lifetime of happiness together!",
    icon: "🚐"
  }
];

const PetDetailTest = () => {
  const pet = samplePet;

  return (
    <div className="container my-5">
      {/* Pet Info */}
      <div className="row align-items-start g-4">
        <div className="col-md-5">
          <div className="card shadow rounded-4">
            <img src={pet.image} alt={pet.name} className="card-img-top rounded-top-4" />
          </div>
        </div>

        <div className="col-md-7">
          <h3 className="fw-bold text-warning">Hi, I’m {pet.name}</h3>
          <div className="d-flex flex-wrap gap-3 my-3">
            <span><b>Gender:</b> {pet.gender}</span>
            <span><b>Size:</b> {pet.size}</span>
            <span><b>Age:</b> {pet.age}</span>
          </div>

          <div className="mb-3">
            {pet.personality.map((trait, idx) => (
              <span
                key={idx}
                className="badge bg-warning text-dark rounded-pill px-3 py-2 me-2"
              >
                {trait}
              </span>
            ))}
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
      <div className="text-center my-5">
        <h4 className="fw-bold text-uppercase">
          It’s clear I’m meant to be with you!
        </h4>
        <p className="mt-3 text-muted" style={{ maxWidth: "700px", margin: "0 auto" }}>
          {pet.story}
        </p>
      </div>

      {/* Adopt Button */}
<div className="text-center mb-5">
  <Link
    to="/formadop"
    className="btn btn-warning btn-lg px-5 rounded-pill fw-bold"
  >
    Adopt Me
  </Link>
</div>

      {/* Adoption Process */}
      <div className="adoption-process my-5">
        <h3 className="fw-bold text-center mb-4 text-uppercase">
          The Adoption Process
        </h3>
        <p className="text-center text-muted mb-5" style={{ maxWidth: "700px", margin: "0 auto" }}>
          Adopting from Sol Dog Foundation is one of the most effective ways to support our work. 
          Each adoption creates the space we need to help another animal in need. 
          It is also incredibly rewarding to give an animal the chance to experience the love and security they so desperately deserve.
        </p>

        <div className="timeline">
          {adoptionSteps.map((step) => (
            <div key={step.step} className="d-flex align-items-start mb-4">
              {/* circle number */}
              <div
                className="rounded-circle bg-warning text-white fw-bold d-flex align-items-center justify-content-center me-3"
                style={{ width: 40, height: 40 }}
              >
                {step.step}
              </div>
              {/* text */}
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
          {/* <button className="btn btn-warning btn-lg px-5 rounded-pill fw-bold">
            
          </button> */}
          <Link
    to="/formadop"
    className="btn btn-warning btn-lg px-5 rounded-pill fw-bold"
  >
    Adoption Enquiry
  </Link>
        </div>
      </div>
    </div>
  );
};

export default PetDetailTest;
