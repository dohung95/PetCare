import React, { useState } from "react";

const PetManagement = () => {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    medicalHistory: ""
  });

  // Xử lý nhập liệu
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm thú cưng
  const handleAddPet = () => {
    if (!form.name || !form.species) {
      alert("Name and Species are required!");
      return;
    }
    setPets([...pets, { ...form, id: Date.now() }]);
    setForm({ name: "", species: "", breed: "", age: "", medicalHistory: "" });
  };

  // Xóa thú cưng
  const handleDeletePet = (id) => {
    setPets(pets.filter((pet) => pet.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🐾 Pet Management</h2>

      {/* Form nhập thú cưng */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="species"
          placeholder="Species (Dog, Cat...)"
          value={form.species}
          onChange={handleChange}
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="medicalHistory"
          placeholder="Medical History"
          value={form.medicalHistory}
          onChange={handleChange}
        />
        <button onClick={handleAddPet}>Add Pet</button>
      </div>

      {/* Danh sách thú cưng */}
      <ul>
        {pets.map((pet) => (
          <li key={pet.id} style={{ marginBottom: "10px" }}>
            <b>{pet.name}</b> ({pet.species}) - {pet.breed}, {pet.age} years
            <br />
            Medical History: {pet.medicalHistory || "None"}
            <br />
            <button onClick={() => handleDeletePet(pet.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PetManagement;
