import React from "react";
import PropTypes from "prop-types";


const PetCard = ({ pet }) => {
  // ✅ Hàm lấy URL đúng
  const getImageUrl = (img) => (img?.startsWith("http") ? img : `/${img}`);

  return (
    <div className="card shadow-sm h-150" style={{ cursor: "pointer", borderRadius: "12px", overflow: "hidden", fontSize: "0.9rem" }}>
      <img
        src={getImageUrl(pet.image)}
        className="card-img-top"
        alt={`Photo of ${pet.name}`}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body p-2">
        <h6 className="card-title fw-bold text-center mb-2">{pet.name}</h6>
        <hr className="my-2" />
        <p className="mb-1"><strong>Gender:</strong> {pet.gender === true ? "Male" : pet.gender === false ? "Female" : pet.gender}</p>
        <p className="mb-1">
          <strong>Age:</strong>{" "}
          {pet.ageCategory === "puppy"
            ? "Under 1 year"
            : pet.ageCategory === "young"
            ? "1 - 3 years"
            : "Over 3 years"}
        </p>
        <p className="mb-0"><strong>Neutered:</strong> {pet.neutered ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default PetCard;
