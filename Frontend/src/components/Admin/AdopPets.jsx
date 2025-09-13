import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Sidebar from"./Sidebar"; // import Sidebar

const DEFAULT_IMG = "https://placehold.co/120x80?text=Pet";

const AdopPets = () => {
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add"); // 'add' | 'edit'
  const [form, setForm] = useState({
    id: null,
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    health: "",
    vaccinated: false,
    image: "",
    personalityText: "",
  });

  useEffect(() => {
    // mock data
    setPets([
      {
        id: 1,
        name: "Tin",
        type: "Dog",
        breed: "Shiba",
        age: "2 years",
        health: "Vaccinated, healthy",
        vaccinated: true,
        image: "https://i.imgur.com/DnQ2cyl.jpg",
        personality: ["Friendly", "Playful"],
      },
      {
        id: 2,
        name: "Milo",
        type: "Cat",
        breed: "British Shorthair",
        age: "1 year",
        health: "Healthy",
        vaccinated: false,
        image: "https://i.imgur.com/nc2gFfv.jpg",
        personality: ["Calm", "Gentle"],
      },
    ]);
  }, []);

  const openAdd = () => {
    setMode("add");
    setForm({
      id: null,
      name: "",
      type: "Dog",
      breed: "",
      age: "",
      health: "",
      vaccinated: false,
      image: "",
      personalityText: "",
    });
    setShowForm(true);
  };

  const openEdit = (pet) => {
    setMode("edit");
    setForm({
      id: pet.id,
      name: pet.name,
      type: pet.type,
      breed: pet.breed || "",
      age: pet.age,
      health: pet.health,
      vaccinated: !!pet.vaccinated,
      image: pet.image || "",
      personalityText: (pet.personality || []).join(", "),
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Xóa thú cưng này?")) {
      setPets((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Tên thú cưng là bắt buộc.");
    if (!form.age.trim()) return alert("Tuổi là bắt buộc.");
    if (!form.health.trim()) return alert("Tình trạng sức khỏe là bắt buộc.");

    const personality =
      form.personalityText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || [];

    if (mode === "add") {
      const nextId = pets.length ? Math.max(...pets.map((p) => p.id)) + 1 : 1;
      const newPet = { ...form, id: nextId, personality };
      setPets((prev) => [newPet, ...prev]);
    } else {
      setPets((prev) =>
        prev.map((p) => (p.id === form.id ? { ...form, personality } : p))
      );
    }
    setShowForm(false);
  };

  const closeForm = () => setShowForm(false);

  return (
    <div className="container-fluid">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2}>
          <Sidebar />
        </Col>

        {/* Main content */}
        <Col md={10} className="p-4">
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="fw-bold mb-3">🐶 Manage Pets</h3>
            <button className="btn btn-success" onClick={openAdd}>
              + Add New Pet
            </button>
          </div>

          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-light">
              <tr>
                <th style={{ width: 120 }}>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Health</th>
                <th>Vaccinated</th>
                <th>Personality</th>
                <th style={{ width: 150 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet.id}>
                  <td>
                    <img
                      src={pet.image || DEFAULT_IMG}
                      alt={pet.name}
                      style={{
                        width: 110,
                        height: 74,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  </td>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.age}</td>
                  <td>{pet.health}</td>
                  <td>{pet.vaccinated ? "✅ Yes" : "❌ No"}</td>
                  <td>
                    {(pet.personality || []).map((tag, i) => (
                      <span key={i} className="badge bg-info text-dark me-1">
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => openEdit(pet)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(pet.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {pets.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    Chưa có thú cưng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Col>
      </Row>

      {/* Modal Form */}
      {showForm && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-lg">
              <form className="modal-content" onSubmit={handleSave}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {mode === "add" ? "Add New Pet" : "Edit Pet"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeForm}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Form fields giống code trước */}
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        value={form.type}
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                      >
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Breed</label>
                      <input
                        className="form-control"
                        value={form.breed}
                        onChange={(e) =>
                          setForm({ ...form, breed: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Age</label>
                      <input
                        className="form-control"
                        value={form.age}
                        onChange={(e) =>
                          setForm({ ...form, age: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Vaccinated</label>
                      <select
                        className="form-select"
                        value={form.vaccinated ? "yes" : "no"}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            vaccinated: e.target.value === "yes",
                          })
                        }
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Health Status</label>
                      <input
                        className="form-control"
                        value={form.health}
                        onChange={(e) =>
                          setForm({ ...form, health: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-9">
                      <label className="form-label">Image URL</label>
                      <input
                        className="form-control"
                        value={form.image}
                        onChange={(e) =>
                          setForm({ ...form, image: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                      <img
                        src={form.image || DEFAULT_IMG}
                        alt="preview"
                        className="rounded border"
                        style={{
                          width: "100%",
                          height: 80,
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Personality</label>
                      <input
                        className="form-control"
                        value={form.personalityText}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            personalityText: e.target.value,
                          })
                        }
                      />
                      <div className="form-text">
                        Nhập các tính cách, cách nhau bằng dấu phẩy (,)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {mode === "add" ? "Create" : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default AdopPets;
