import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pets/${pet.id}`);
  };

  return (
    <motion.div
      className="card shadow-sm h-100"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        borderRadius: "12px",
        overflow: "hidden",
        fontSize: "0.9rem",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
    >
      {/* Image */}
      <img
        src={pet.image}
        className="card-img-top"
        alt={`Photo of ${pet.name}`}
        style={{ height: "150px", objectFit: "cover" }}
      />

      {/* Card body */}
      <div className="card-body p-2">
        <h6 className="card-title fw-bold text-center mb-2">{pet.name}</h6>
        <hr className="my-2" />
        <p className="mb-1">
          <strong>Gender:</strong> {pet.gender === "male" ? "Male" : "Female"}
        </p>
        <p className="mb-1">
          <strong>Age:</strong>{" "}
          {pet.ageCategory === "puppy"
            ? "Under 1 year"
            : pet.ageCategory === "young"
            ? "1 - 3 years"
            : "Over 3 years"}
        </p>
        <p className="mb-0">
          <strong>Neutered:</strong>{" "}
          {pet.neutered === "yes" ? "Yes" : "No"}
        </p>
      </div>
    </motion.div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    ageCategory: PropTypes.string.isRequired,
    neutered: PropTypes.string.isRequired,
  }).isRequired,
};

export default PetCard;
