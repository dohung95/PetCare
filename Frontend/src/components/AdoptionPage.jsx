import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PetCard from "../components/adop/PetCard";
import axios from "axios";

const AdoptionPage = () => {
  const navigate = useNavigate();
  const [initialPets, setInitialPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: "all",
    gender: "all",
    age: "all",
    neutered: "all",
    color: "all",
    name: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/shelter-pets");
        setInitialPets(response.data);
        setFilteredPets(response.data);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError("Failed to fetch pets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleTypeClick = (type) => setFilters({ ...filters, type });

  const handleSearch = (e) => {
    e.preventDefault();
    let result = [...initialPets];
    if (filters.type !== "all") result = result.filter((p) => p.type === filters.type);
    if (filters.gender !== "all") result = result.filter((p) => p.gender === filters.gender);
    if (filters.age !== "all") result = result.filter((p) => p.ageCategory === filters.age);
    if (filters.neutered !== "all")
      result = result.filter((p) => (filters.neutered === "yes" ? p.neutered : !p.neutered));
    if (filters.color !== "all") result = result.filter((p) => p.color === filters.color);
    if (filters.name.trim() !== "")
      result = result.filter((p) => p.name.toLowerCase().includes(filters.name.toLowerCase()));
    setFilteredPets(result);
  };

  return (
    <div className="adoption-page">
      {/* Banner */}
      <motion.img
        src="/imgs/adop.jpg"
        alt="Pet"
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ width: "100%", minHeight: "150px", maxHeight: "250px", objectFit: "cover" }}
      />

      {/* Bộ lọc */}
      <motion.div
        className="container py-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4 fw-bold text-dark">
          TÌM THÚ CƯNG
          <div style={{ fontSize: "1.2rem", color: "#3ec6e0" }}>
            <img src="/imgs/pet_foot.jpg" alt="Pet foot" style={{ width: 30, height: 30 }} />
          </div>
        </h2>

        {/* Nút chọn loại */}
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          {["all", "dog", "cat", "other"].map((type) => (
            <button
              key={type}
              type="button"
              className={`btn rounded-pill px-4 fw-bold ${
                filters.type === type
                  ? type === "all"
                    ? "btn-primary text-white"
                    : "btn-warning"
                  : "btn-outline-warning"
              }`}
              style={{ minWidth: "90px", border: "none" }}
              onClick={() => handleTypeClick(type)}
            >
              {type === "all" ? "Tất cả" : type === "dog" ? "Chó" : type === "cat" ? "Mèo" : "Khác"}
            </button>
          ))}
        </div>

        {/* Form lọc */}
        <form onSubmit={handleSearch} className="row g-3 mb-5">
          {/* Giới tính */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Giới tính</label>
            <select
              className="form-select border border-danger"
              name="gender"
              value={filters.gender}
              onChange={handleChange}
            >
              <option value="all">Tất cả</option>
              <option value="male">Đực</option>
              <option value="female">Cái</option>
            </select>
          </div>
          {/* Độ tuổi */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Độ tuổi</label>
            <select
              className="form-select border border-danger"
              name="age"
              value={filters.age}
              onChange={handleChange}
            >
              <option value="all">Tất cả</option>
              <option value="puppy">Dưới 1 tuổi</option>
              <option value="young">1-3 tuổi</option>
              <option value="adult">Trên 3 tuổi</option>
            </select>
          </div>
          {/* Triệt sản */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Triệt sản</label>
            <select
              className="form-select border border-danger"
              name="neutered"
              value={filters.neutered}
              onChange={handleChange}
            >
              <option value="all">Tất cả</option>
              <option value="yes">Đã triệt sản</option>
              <option value="no">Chưa triệt sản</option>
            </select>
          </div>
          {/* Màu */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Màu</label>
            <select
              className="form-select border border-danger"
              name="color"
              value={filters.color}
              onChange={handleChange}
            >
              <option value="all">Tất cả</option>
              <option value="white">Trắng</option>
              <option value="black">Đen</option>
              <option value="brown">Nâu</option>
              <option value="mixed">Pha trộn</option>
            </select>
          </div>
          {/* Tên */}
          <div className="col-md-4">
            <label className="form-label fw-bold">Tên</label>
            <input
              type="text"
              className="form-control border border-danger"
              placeholder="Nhập tên thú cưng..."
              name="name"
              value={filters.name}
              onChange={handleChange}
            />
          </div>
          {/* Nút tìm kiếm */}
          <div className="col-md-4 d-flex align-items-end">
            <button type="submit" className="btn btn-danger w-100 rounded-pill fw-bold">
              TÌM KIẾM
            </button>
          </div>
        </form>

        {/* Danh sách thú cưng */}
        <motion.div
          className="row g-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="sync">
            {loading ? (
              <div key="loading" className="text-center text-muted">
                Đang tải dữ liệu...
              </div>
            ) : error ? (
              <div key="error" className="text-center text-danger">
                {error}
              </div>
            ) : filteredPets.length > 0 ? (
              filteredPets.map((pet, index) => (
                <motion.div
                  className="col-md-3 col-sm-6"
                  key={pet._id ?? `${pet.name}-${index}`}
                  onClick={() => navigate(`/shelter-pets/${pet._id}`)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ cursor: "pointer" }}
                >
                  <PetCard pet={pet} />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                Không tìm thấy thú cưng phù hợp.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdoptionPage;
