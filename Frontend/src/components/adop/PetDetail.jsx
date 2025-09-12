import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const adoptionSteps = [
  { step: 1, title: "Initial enquiry", description: "Submit an adoption enquiry, answering some initial questions about your family, lifestyle and ideal companion.", icon: "📋" },
  { step: 2, title: "Interview", description: "Join a video call with one of our adoption coordinators to help find your perfect match.", icon: "💬" },
  { step: 3, title: "Home Assessment", description: "Complete a home visit – either in person or virtually – to ensure you have everything in place to welcome a rescue dog.", icon: "🏠" },
  { step: 4, title: "Adoption agreement", description: "Sign the adoption agreement, confirming your commitment.", icon: "📝" },
  { step: 5, title: "Travel arrangements", description: "Let our logistics team arrange your dog’s journey to you.", icon: "🚐" },
];

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchPet = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/shelter-pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error("Error fetching pet detail:", err);
        setError("Không tìm thấy thú cưng.");
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <p className="text-center mt-5">⏳ Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!pet) return <p className="text-center text-muted mt-5">Không có dữ liệu.</p>;

  // ✅ Nếu image trong DB là "imgs/care1.jpg" thì thêm "/" phía trước
  const getImageUrl = (img) => (img?.startsWith("http") ? img : `/${img}`);

  return (
    <div className="pet-detail">
      {/* Banner */}
      <div
        className="pet-banner"
        style={{
          width: "100%",
          height: "350px",
          backgroundImage: `url(${getImageUrl(pet.banner || pet.image)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      ></div>

      {/* Card block */}
      <div className="container">
        <div className="card shadow-lg p-4" style={{ marginTop: "-120px", borderRadius: "16px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
          <div className="row g-4 align-items-center">
            {/* Pet images carousel */}
            <div className="col-md-5">
              <div id="petCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {(pet.images?.length ? pet.images : [pet.image]).map((img, idx) => (
                    <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                      <img src={getImageUrl(img)} alt={`${pet.name} ${idx + 1}`} className="d-block w-100 rounded" style={{ objectFit: "cover", height: "300px" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pet info */}
            <div className="col-md-7">
              <h3 className="fw-bold text-warning mb-3">Hi, I’m {pet.name}</h3>
              <div className="d-flex flex-wrap gap-3 mb-3">
                <span><b>Gender:</b> {pet.gender === true ? "Male" : pet.gender === false ? "Female" : pet.gender}</span>
                <span><b>Size:</b> {pet.size || "Unknown"}</span>
                <span><b>Age:</b> {pet.ageCategory || pet.age}</span>
                <span><b>Health:</b> {pet.health || "Not specified"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story */}
      {pet.story && (
        <div className="container my-5 text-center">
          <h3 className="fw-bold text-uppercase mb-3">{pet.name}’s Story</h3>
          <p className="text-muted" style={{ maxWidth: "800px", margin: "0 auto" }}>{pet.story}</p>
          <div className="mt-4">
            <Link to="/formadop" className="btn btn-warning btn-lg px-5 rounded-pill fw-bold" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Adopt Me
            </Link>
          </div>
        </div>
      )}

      {/* Adoption Process */}
      <div className="adoption-process my-5 container">
        <h3 className="fw-bold text-center mb-4 text-uppercase">The Adoption Process</h3>
        <div className="timeline">
          {adoptionSteps.map((step) => (
            <div key={step.step} className="d-flex align-items-start mb-4">
              <div className="rounded-circle bg-warning text-white fw-bold d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                {step.step}
              </div>
              <div>
                <h6 className="fw-bold">{step.title} <span className="ms-2">{step.icon}</span></h6>
                <p className="text-muted mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
