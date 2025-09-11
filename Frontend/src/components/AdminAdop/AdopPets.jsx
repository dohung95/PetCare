import React, { useEffect, useState } from "react";


const AdopPets = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // mock data
    setPets([
      { id: 1, name: "Tin", type: "Dog", age: "2 years", health: "Vaccinated" },
      { id: 2, name: "Milo", type: "Cat", age: "1 year", health: "Healthy" },
    ]);
  }, []);

  return (
    <div>
      <h3 className="fw-bold mb-3">🐶 Manage Pets</h3>
      <button className="btn btn-success mb-3">+ Add New Pet</button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Age</th>
            <th>Health</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>{pet.age}</td>
              <td>{pet.health}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdopPets;
