import React from "react";

const adoptionSteps = [
  {
    step: 1,
    title: "Initial enquiry",
    description:
      "Submit an adoption enquiry, answering some initial questions about your family, lifestyle and ideal companion.",
    icon: "/icons/form.png", // icon minh họa
  },
  {
    step: 2,
    title: "Interview",
    description:
      "Join a video call with one of our adoption coordinators to help find your perfect match. Discuss the dog's medical history, behavioural needs and more.",
    icon: "/icons/interview.png",
  },
  {
    step: 3,
    title: "Home Assessment",
    description:
      "Complete a home visit – either in person or virtually – with one of our staff or volunteers to ensure you have everything in place to welcome a rescue dog.",
    icon: "/icons/home.png",
  },
  {
    step: 4,
    title: "Adoption agreement",
    description:
      "Sign the adoption agreement, confirming your commitment to the care of your chosen dog.",
    icon: "/icons/agreement.png",
  },
  {
    step: 5,
    title: "Travel arrangements",
    description:
      "Let our logistics team arrange your dog’s journey to you. Collect your new best friend from a pre-arranged location and enjoy a lifetime of happiness together!",
    icon: "/icons/travel.png",
  },
];

const AdoptionProcess = () => {
  return (
    <div className="container my-5">
      <h3 className="fw-bold text-center mb-4 text-uppercase">
        The Adoption Process
      </h3>

      <div className="timeline position-relative">
        {adoptionSteps.map((step, idx) => (
          <div key={idx} className="row align-items-start mb-5 position-relative">
            {/* Circle + line */}
            <div className="col-1 d-flex flex-column align-items-center">
              <div
                className="rounded-circle bg-warning text-white fw-bold d-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, zIndex: 1 }}
              >
                {step.step}
              </div>
              {idx < adoptionSteps.length - 1 && (
                <div
                  style={{
                    width: "3px",
                    flexGrow: 1,
                    backgroundColor: "#f0ad4e",
                    marginTop: "4px",
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="col-8">
              <h5 className="fw-bold text-warning">{step.title}</h5>
              <p className="text-muted">{step.description}</p>
              <hr />
            </div>

            {/* Icon */}
            <div className="col-3 text-center">
              <img src={step.icon} alt={step.title} style={{ width: "50px" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-warning btn-lg px-5 rounded-pill fw-bold">
          Adoption Enquiry
        </button>
      </div>
    </div>
  );
};

export default AdoptionProcess;
