import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PetCard from "./adop/PetCard";

const AdoptionPage = () => {
  const navigate = useNavigate();

  // dữ liệu pet mẫu
  const initialPets = [
    {
      id: 1,
      name: "Tin",
      type: "dog",
      gender: "male",
      ageCategory: "puppy",
      neutered: "no",
      color: "white",
      image: "https://i.imgur.com/DnQ2cyl.jpg",
    },
    {
      id: 2,
      name: "Milo",
      type: "cat",
      gender: "female",
      ageCategory: "adult",
      neutered: "yes",
      color: "brown",
      image: "https://i.imgur.com/2ND5AqJ.jpg",
    },
    {
      id: 3,
      name: "Rio",
      type: "other",
      gender: "male",
      ageCategory: "young",
      neutered: "no",
      color: "black",
      image: "https://i.imgur.com/fB8Yl7U.jpg",
    },
  ];

  // state bộ lọc
  const [filters, setFilters] = useState({
    type: "all",
    gender: "all",
    age: "all",
    neutered: "all",
    color: "all",
    name: "",
  });
  const [filteredPets, setFilteredPets] = useState(initialPets);

  // mapping type sang nhãn
  const petTypes = [
    { key: "all", label: "All" },
    { key: "dog", label: "Dog" },
    { key: "cat", label: "Cat" },
    { key: "other", label: "Other" },
  ];

  // cập nhật list khi filters thay đổi
  useEffect(() => {
    let result = [...initialPets];
    if (filters.type !== "all") result = result.filter((p) => p.type === filters.type);
    if (filters.gender !== "all") result = result.filter((p) => p.gender === filters.gender);
    if (filters.age !== "all") result = result.filter((p) => p.ageCategory === filters.age);
    if (filters.neutered !== "all") result = result.filter((p) => p.neutered === filters.neutered);
    if (filters.color !== "all") result = result.filter((p) => p.color === filters.color);
    if (filters.name.trim() !== "")
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    setFilteredPets(result);
  }, [filters]);

  // handler
  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleTypeClick = (type) => setFilters({ ...filters, type });

  return (
    <div className="adoption-page">
      {/* Banner animate */}
      <motion.img
        src="/imgs/adop.jpg"
        alt="Pet"
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          width: "100%",
          minHeight: "150px",
          maxHeight: "250px",
          objectFit: "cover",
        }}
      />

      {/* Section */}
      <motion.div
        className="container py-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">
           ADOPT A PET
          <div style={{ fontSize: "1.2rem", color: "#3ec6e0" }}>
            <img
              src="/imgs/pet_foot.jpg"
              alt="Pet foot"
              style={{ width: 30, height: 30 }}
            />
          </div>
        </h2>

        {/* Buttons chọn loại */}
        <motion.div
          className="d-flex justify-content-center gap-3 mb-4 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {petTypes.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`btn rounded-pill px-4 fw-bold ${
                filters.type === item.key ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={() => handleTypeClick(item.key)}
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Danh sách thú cưng */}
        <motion.div
          className="row g-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet, index) => (
                <motion.div
                  className="col-md-3 col-sm-6"
                  key={pet.id}
                  onClick={() => navigate(`/pets/${pet.id}`)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ cursor: "pointer" }}
                >
                  <PetCard pet={pet} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                className="text-center text-muted"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                NOT FOUND!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdoptionPage;
