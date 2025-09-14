import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Css/MyPets.css";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState("add");
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    medicalHistory: "",
    vaccinations: [],
    allergies: [],
    treatments: [],
    gallery: [],
    documents: [],
    insurance: { provider: "", policyNumber: "", claims: [] },
    avatar: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  const [newAllergy, setNewAllergy] = useState("");
  const [newVacDate, setNewVacDate] = useState("");
  const [newVacDesc, setNewVacDesc] = useState("");
  const [newTreatDate, setNewTreatDate] = useState("");
  const [newTreatDesc, setNewTreatDesc] = useState("");
  const [newClaim, setNewClaim] = useState("");

  const [galleryFile, setGalleryFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // ===== API =====
  const fetchPets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/mypets");
      setPets(res.data);
    } catch (err) {
      console.error("Error fetching pets:", err);
      alert("Failed to fetch pets!");
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // ===== Helpers =====
  const resetForm = () => {
    setForm({
      name: "",
      species: "",
      breed: "",
      age: "",
      medicalHistory: "",
      vaccinations: [],
      allergies: [],
      treatments: [],
      gallery: [],
      documents: [],
      insurance: { provider: "", policyNumber: "", claims: [] },
      avatar: "",
    });
    setEditingId(null);
    setNewAllergy("");
    setNewVacDate("");
    setNewVacDesc("");
    setNewTreatDate("");
    setNewTreatDesc("");
    setNewClaim("");
    setGalleryFile(null);
    setDocumentFile(null);
    setAvatarFile(null);
  };

  // ===== Basic change =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "provider" || name === "policyNumber") {
      setForm((prev) => ({
        ...prev,
        insurance: { ...prev.insurance, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ===== Allergies =====
  const handleAddAllergy = () => {
    if (!newAllergy.trim()) return;
    setForm((prev) => ({ ...prev, allergies: [...prev.allergies, newAllergy.trim()] }));
    setNewAllergy("");
  };
  const handleRemoveAllergy = (index) => {
    const allergies = [...form.allergies];
    allergies.splice(index, 1);
    setForm((prev) => ({ ...prev, allergies }));
  };

  // ===== Vaccinations =====
  const handleAddVaccination = () => {
    if (!newVacDate || !newVacDesc.trim()) return;
    setForm((prev) => ({
      ...prev,
      vaccinations: [...prev.vaccinations, { date: newVacDate, description: newVacDesc.trim() }],
    }));
    setNewVacDate("");
    setNewVacDesc("");
  };
  const handleRemoveVaccination = (index) => {
    const vaccinations = [...form.vaccinations];
    vaccinations.splice(index, 1);
    setForm((prev) => ({ ...prev, vaccinations }));
  };

  // ===== Treatments =====
  const handleAddTreatment = () => {
    if (!newTreatDate || !newTreatDesc.trim()) return;
    setForm((prev) => ({
      ...prev,
      treatments: [...prev.treatments, { date: newTreatDate, description: newTreatDesc.trim() }],
    }));
    setNewTreatDate("");
    setNewTreatDesc("");
  };
  const handleRemoveTreatment = (index) => {
    const treatments = [...form.treatments];
    treatments.splice(index, 1);
    setForm((prev) => ({ ...prev, treatments }));
  };

  // ===== Claims =====
  const handleAddClaim = () => {
    if (!newClaim.trim()) return;
    setForm((prev) => ({
      ...prev,
      insurance: { ...prev.insurance, claims: [...(prev.insurance.claims || []), newClaim.trim()] },
    }));
    setNewClaim("");
  };
  const handleRemoveClaim = (index) => {
    const claims = [...(form.insurance?.claims || [])];
    claims.splice(index, 1);
    setForm((prev) => ({ ...prev, insurance: { ...prev.insurance, claims } }));
  };

  // ===== Uploads =====
  const handleUploadAvatar = async () => {
    if (!avatarFile) return alert("Please select an avatar image!");
    if (!editingId) return alert("No pet selected for updating avatar!");
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      await axios.post(
        `http://localhost:5000/api/mypets/${editingId}/upload-avatar`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAvatarFile(null);
      fetchPets();
      alert("Avatar uploaded successfully!");
    } catch (err) {
      console.error("Avatar upload error:", err);
      alert(`Failed to upload avatar: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleUploadGallery = async () => {
    if (!galleryFile) return alert("Please select an image for gallery!");
    if (!editingId) return alert("No pet selected for updating gallery!");
    try {
      const formData = new FormData();
      formData.append("image", galleryFile);
      await axios.post(
        `http://localhost:5000/api/mypets/${editingId}/upload-gallery`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setGalleryFile(null);
      fetchPets();
      alert("Gallery image uploaded successfully!");
    } catch (err) {
      console.error("Gallery upload error:", err);
      alert(`Failed to upload gallery image: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleUploadDocument = async () => {
    if (!documentFile) return alert("Please select a document!");
    if (!editingId) return alert("No pet selected for updating documents!");
    try {
      const formData = new FormData();
      formData.append("document", documentFile);
      await axios.post(
        `http://localhost:5000/api/mypets/${editingId}/upload-document`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setDocumentFile(null);
      fetchPets();
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error("Document upload error:", err);
      alert(`Failed to upload document: ${err.response?.data?.message || err.message}`);
    }
  };

  // ===== CRUD =====
  const handleSubmit = async () => {
    if (!form.name || !form.species) {
      alert("Name and Species are required!");
      return;
    }
    try {
      if (mode === "update") {
        await axios.put(`http://localhost:5000/api/mypets/${editingId}`, form);
        alert("Pet updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/mypets", form);
        alert("Pet added successfully!");
      }
      resetForm();
      setShowForm(false);
      fetchPets();
    } catch (err) {
      console.error("Error submitting pet:", err);
      alert(`Failed to ${mode === "update" ? "update" : "add"} pet: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/mypets/${id}`);
      if (selectedPet && selectedPet._id === id) setSelectedPet(null);
      fetchPets();
      alert("Pet deleted successfully!");
    } catch (err) {
      console.error("Error deleting pet:", err);
      alert(`Failed to delete pet: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleAddPet = () => {
    resetForm();
    setMode("add");
    setShowForm(true);
    setSelectedPet(null);
  };

  const handleUpdatePet = (pet) => {
    setForm(pet);
    setEditingId(pet._id);
    setMode("update");
    setShowForm(true);
    setSelectedPet(null);
  };

  const handleDetails = (pet) => {
    setSelectedPet(pet);
    setShowForm(false);
  };

  // ===== UI Blocks =====
  const renderTimeline = (pet) => {
    const timeline = [
      ...pet.vaccinations.map((v) => ({ date: v.date, desc: `Vaccination: ${v.description}` })),
      ...pet.treatments.map((t) => ({ date: t.date, desc: `Treatment: ${t.description}` })),
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
      <ul>
        {timeline.map((item, index) => (
          <li key={index}>
            {new Date(item.date).toLocaleDateString()} - {item.desc}
          </li>
        ))}
      </ul>
    );
  };

  const renderDetails = (pet) => (
  <div className="mypets-detailsContainer">
    <h3>Details for {pet.name}</h3>

    {/* GRID 2 CỘT */}
    <div className="mypets-grid mypets-grid-2">
      <div className="mypets-sectionCard">
        <img
          src={pet.avatar ? `http://localhost:5000/${pet.avatar}` : "/default-avatar.jpg"}
          alt="avatar"
          className="mypets-petAvatar"
          style={{ width: "100px", height: "100px" }}
        />
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Medical History:</strong> {pet.medicalHistory || "None"}</p>
      </div>

      <div className="mypets-sectionCard">
        <h4 className="mypets-sectionTitle">Allergies</h4>
        <ul>
          {pet.allergies.map((a, index) => (
            <li key={index}>{a}</li>
          ))}
        </ul>
        <h4 className="mypets-sectionTitle">Timeline (Vaccinations & Treatments)</h4>
        <ul>
          {[...pet.vaccinations.map(v => ({date:v.date, desc:`Vaccination: ${v.description}`})),
            ...pet.treatments.map(t => ({date:t.date, desc:`Treatment: ${t.description}`}))]
            .sort((a,b)=> new Date(a.date)-new Date(b.date))
            .map((item,i)=>(
              <li key={i}>{new Date(item.date).toLocaleDateString()} - {item.desc}</li>
            ))
          }
        </ul>
      </div>

      <div className="mypets-sectionCard mypets-col-span-2">
        <h4 className="mypets-sectionTitle">Gallery</h4>
        <div>
          {pet.gallery.map((path, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${path}`}
              alt="gallery"
              className="mypets-galleryImage"
            />
          ))}
        </div>
      </div>

      <div className="mypets-sectionCard mypets-col-span-2">
        <h4 className="mypets-sectionTitle">Documents</h4>
        <div>
          {pet.documents.map((path, index) => (
            <a
              key={index}
              href={`http://localhost:5000/${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mypets-documentLink"
            >
              Document {index + 1}
            </a>
          ))}
        </div>
      </div>
    </div>

    <button
      className="mypets-formButton mypets-cancelButton"
      onClick={() => setSelectedPet(null)}
      style={{ marginTop: 12 }}
    >
      Close Details
    </button>
  </div>
);


  const renderForm = () => (
  <div className="mypets-formContainer">
    <h3>{mode === "add" ? "Add Pet" : "Update Pet"}</h3>

    {/* GRID 3 CỘT (desktop) */}
    <div className="mypets-grid mypets-grid-3">
      {/* Basic info */}
      <div>
        <label className="mypets-inputLabel">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="mypets-formInput"
        />
      </div>

      <div>
        <label className="mypets-inputLabel">Species</label>
        <input
          type="text"
          name="species"
          placeholder="Species"
          value={form.species}
          onChange={handleChange}
          className="mypets-formInput"
        />
      </div>

      <div>
        <label className="mypets-inputLabel">Breed</label>
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
          className="mypets-formInput"
        />
      </div>

      <div>
        <label className="mypets-inputLabel">Age</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="mypets-formInput"
        />
      </div>

      {/* Medical history chiếm 2 cột khi >=768px */}
      <div className="mypets-col-span-2">
        <label className="mypets-inputLabel">Medical History</label>
        <input
          type="text"
          name="medicalHistory"
          placeholder="Medical History"
          value={form.medicalHistory}
          onChange={handleChange}
          className="mypets-formInput"
        />
      </div>

      {/* Avatar (chỉ khi update) */}
      {mode === "update" && (
        <div className="mypets-sectionCard mypets-col-span-3">
          <h4 className="mypets-sectionTitle">Avatar</h4>
          {form.avatar && (
            <img
              src={`http://localhost:5000/${form.avatar}`}
              alt="avatar"
              className="mypets-petAvatar"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          <input
            type="file"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="mypets-formInput"
          />
          <button
            className="mypets-formButton mypets-submitButton"
            disabled={!avatarFile}
            onClick={handleUploadAvatar}
          >
            Upload Avatar
          </button>
        </div>
      )}

      {/* Allergies */}
      {mode === "update" && (
        <div className="mypets-sectionCard">
          <h4 className="mypets-sectionTitle">Allergies</h4>
          <ul>
            {form.allergies.map((allergy, index) => (
              <li key={index}>
                {allergy}{" "}
                <button
                  className="mypets-formButton mypets-deleteButton"
                  onClick={() => handleRemoveAllergy(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="New Allergy"
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            className="mypets-formInput"
          />
          <button
            className="mypets-formButton mypets-submitButton"
            onClick={handleAddAllergy}
          >
            Add Allergy
          </button>
        </div>
      )}

      {/* Vaccinations */}
      {mode === "update" && (
        <div className="mypets-sectionCard">
          <h4 className="mypets-sectionTitle">Vaccinations</h4>
          <ul>
            {form.vaccinations.map((vac, index) => (
              <li key={index}>
                {new Date(vac.date).toLocaleDateString()} - {vac.description}{" "}
                <button
                  className="mypets-formButton mypets-deleteButton"
                  onClick={() => handleRemoveVaccination(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mypets-grid mypets-grid-2">
            <input
              type="date"
              value={newVacDate}
              onChange={(e) => setNewVacDate(e.target.value)}
              className="mypets-formInput"
            />
            <input
              type="text"
              placeholder="Vaccination Description"
              value={newVacDesc}
              onChange={(e) => setNewVacDesc(e.target.value)}
              className="mypets-formInput"
            />
          </div>
          <button
            className="mypets-formButton mypets-submitButton"
            onClick={handleAddVaccination}
          >
            Add Vaccination
          </button>
        </div>
      )}

      {/* Treatments */}
      {mode === "update" && (
        <div className="mypets-sectionCard">
          <h4 className="mypets-sectionTitle">Treatments</h4>
          <ul>
            {form.treatments.map((treat, index) => (
              <li key={index}>
                {new Date(treat.date).toLocaleDateString()} - {treat.description}{" "}
                <button
                  className="mypets-formButton mypets-deleteButton"
                  onClick={() => handleRemoveTreatment(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mypets-grid mypets-grid-2">
            <input
              type="date"
              value={newTreatDate}
              onChange={(e) => setNewTreatDate(e.target.value)}
              className="mypets-formInput"
            />
            <input
              type="text"
              placeholder="Treatment Description"
              value={newTreatDesc}
              onChange={(e) => setNewTreatDesc(e.target.value)}
              className="mypets-formInput"
            />
          </div>
          <button
            className="mypets-formButton mypets-submitButton"
            onClick={handleAddTreatment}
          >
            Add Treatment
          </button>
        </div>
      )}

      {/* Insurance (chiếm 2 cột) */}
      {mode === "update" && (
        <div className="mypets-sectionCard mypets-col-span-2">
          <h4 className="mypets-sectionTitle">Insurance</h4>
          <div className="mypets-grid mypets-grid-2">
            <input
              type="text"
              name="provider"
              placeholder="Provider"
              value={form.insurance?.provider || ""}
              onChange={handleChange}
              className="mypets-formInput"
            />
            <input
              type="text"
              name="policyNumber"
              placeholder="Policy Number"
              value={form.insurance?.policyNumber || ""}
              onChange={handleChange}
              className="mypets-formInput"
            />
          </div>
          <ul>
            {form.insurance?.claims?.map((claim, index) => (
              <li key={index}>
                {claim}{" "}
                <button
                  className="mypets-formButton mypets-deleteButton"
                  onClick={() => handleRemoveClaim(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mypets-grid mypets-grid-2">
            <input
              type="text"
              placeholder="New Claim"
              value={newClaim}
              onChange={(e) => setNewClaim(e.target.value)}
              className="mypets-formInput"
            />
            <button
              className="mypets-formButton mypets-submitButton"
              onClick={handleAddClaim}
            >
              Add Claim
            </button>
          </div>
        </div>
      )}

      {/* Gallery + Documents (full width) */}
      {mode === "update" && (
        <div className="mypets-sectionCard mypets-col-span-3">
          <h4 className="mypets-sectionTitle">Gallery</h4>
          <div>
            {form.gallery.map((path, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${path}`}
                alt="gallery"
                className="mypets-galleryImage"
              />
            ))}
          </div>
          <div className="mypets-grid mypets-grid-2">
            <input
              type="file"
              onChange={(e) => setGalleryFile(e.target.files[0])}
              className="mypets-formInput"
            />
            <button
              className="mypets-formButton mypets-submitButton"
              disabled={!galleryFile}
              onClick={handleUploadGallery}
            >
              Upload Image to Gallery
            </button>
          </div>

          <h4 className="mypets-sectionTitle">Documents</h4>
          <div>
            {form.documents.map((path, index) => (
              <a
                key={index}
                href={`http://localhost:5000/${path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mypets-documentLink"
              >
                Document {index + 1}
              </a>
            ))}
          </div>
          <div className="mypets-grid mypets-grid-2">
            <input
              type="file"
              onChange={(e) => setDocumentFile(e.target.files[0])}
              className="mypets-formInput"
            />
            <button
              className="mypets-formButton mypets-submitButton"
              disabled={!documentFile}
              onClick={handleUploadDocument}
            >
              Upload Document
            </button>
          </div>
        </div>
      )}
    </div>

    {/* Actions dưới dạng 2 nút */}
    <div style={{ marginTop: 12 }}>
      <button className="mypets-formButton mypets-submitButton" onClick={handleSubmit}>
        {mode === "update" ? "Update Pet" : "Add Pet"}
      </button>
      <button className="mypets-formButton mypets-cancelButton" onClick={() => setShowForm(false)}>
        Cancel
      </button>
    </div>
  </div>
);

  return (
    <div className="mypets-container">
      <div className="mypets-header">
        <h2>🐾 Pet Management</h2>
        <button className="mypets-addButton" onClick={handleAddPet}>
          Add Pet
        </button>
      </div>

      {showForm && renderForm()}
      {selectedPet && renderDetails(selectedPet)}

      <ul className="mypets-petList">
        {pets.map((pet) => (
          <li key={pet._id} className="mypets-petItem">
            <img
              src={pet.avatar ? `http://localhost:5000/${pet.avatar}` : "/default-avatar.jpg"}
              alt="avatar"
              className="mypets-petAvatar"
            />
            <div className="mypets-petInfo">
              <b>{pet.name}</b> ({pet.species}) - {pet.breed}, {pet.age} years
              <br />
              Medical History: {pet.medicalHistory || "None"}
            </div>
            <div className="mypets-petActions">
              <button
                className="mypets-actionButton mypets-updateButton"
                onClick={() => handleUpdatePet(pet)}
              >
                Update
              </button>
              <button
                className="mypets-actionButton mypets-detailsButton"
                onClick={() => handleDetails(pet)}
              >
                Details
              </button>
              <button
                className="mypets-actionButton mypets-deleteButton"
                onClick={() => handleDeletePet(pet._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPets;
