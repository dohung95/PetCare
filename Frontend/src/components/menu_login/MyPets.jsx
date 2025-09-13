import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/MyPets.css";

axios.defaults.baseURL = "http://localhost:5000";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    medical_history: "",
    image: null,
    photos: [],
  });
  const [healthRecordData, setHealthRecordData] = useState({
    date: "",
    type: "",
    description: "",
    notes: "",
  });
  const [documentData, setDocumentData] = useState({
    name: "",
    document: null,
  });
  const [insuranceData, setInsuranceData] = useState({
    policy_number: "",
    provider: "",
    documents: [],
  });
  const navigate = useNavigate();

  const ownerId = localStorage.getItem("owner_id") || "66ef9a4f7a56e6f8301b23aa";

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/pets", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPets(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thú cưng:", error);
        if (error.response?.status === 401) {
          alert("Vui lòng đăng nhập để xem danh sách thú cưng.");
          navigate("/login");
        }
      }
    };
    fetchPets();
  }, [navigate]);

  const handleInputChange = (e, setData) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleAddPet = async (e) => {
  e.preventDefault();
  const ownerId = localStorage.getItem("ownerId") || localStorage.getItem("owner_id");
  if (!ownerId) {
    alert("Không tìm thấy ownerId, vui lòng đăng nhập lại!");
    navigate("/login");
    return;
  }

  const data = new FormData();
  data.append("owner_id", ownerId); // Gửi owner_id trong payload
  data.append("name", formData.name);
  data.append("species", formData.species);
  data.append("breed", formData.breed);
  data.append("age", formData.age);
  data.append("medical_history", formData.medical_history);

  try {
    const token = localStorage.getItem("token");
    console.log("Sending data:", { ownerId, token, formData }); // Debug
    const response = await axios.post("/api/pets", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Thêm thú cưng thành công:", response.data);
    setPets([...pets, response.data]);
    setShowAddModal(false);
    setFormData({ name: "", species: "", breed: "", age: "", medical_history: "" });
    alert("Thêm thú cưng thành công!");
  } catch (error) {
    console.error("Lỗi khi thêm thú cưng:", error.response?.data || error.message);
    if (error.response?.status === 403) {
      console.log("Lỗi 403 chi tiết:", error.response.data);
      alert("Bạn không có quyền thêm thú cưng. Vui lòng kiểm tra vai trò hoặc token!");
    } else {
      alert(`Lỗi khi thêm thú cưng: ${error.response?.data?.message || error.message}`);
    }
  }
};

  const handleEditClick = (pet) => {
    setSelectedPet(pet);
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      medical_history: pet.medical_history || "",
      image: null,
      photos: [],
    });
    setShowEditModal(true);
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("owner_id", ownerId);
    data.append("name", formData.name);
    data.append("species", formData.species);
    data.append("breed", formData.breed);
    data.append("age", formData.age);
    data.append("medical_history", formData.medical_history);
    if (formData.image) {
      data.append("image", formData.image);
    } else {
      data.append("image", selectedPet.image);
    }
    formData.photos.forEach((photo) => data.append("photos", photo));
    if (!formData.photos.length) {
      selectedPet.photos.forEach((photo) => data.append("photos", photo));
    }

    try {
      const response = await axios.put(`/api/pets/${selectedPet._id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPets(pets.map((pet) => (pet._id === selectedPet._id ? response.data : pet)));
      setShowEditModal(false);
      setSelectedPet(null);
      setFormData({ name: "", species: "", breed: "", age: "", medical_history: "", image: null, photos: [] });
      alert("Cập nhật thú cưng thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thú cưng:", error);
      alert(`Lỗi khi cập nhật thú cưng: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeletePet = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa thú cưng này?")) return;
    try {
      await axios.delete(`/api/pets/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPets(pets.filter((pet) => pet._id !== id));
      alert("Xóa thú cưng thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa thú cưng:", error);
      alert(`Lỗi khi xóa thú cưng: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleViewDetails = (pet) => {
    setSelectedPet(pet);
    setShowDetailModal(true);
    setActiveTab("basic");
  };

  const handleAddHealthRecord = async (e) => {
    e.preventDefault();
    const data = { ...healthRecordData, owner_id: ownerId };
    try {
      const response = await axios.post(`/api/pets/${selectedPet._id}/health-records`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPets(pets.map((pet) => (pet._id === selectedPet._id ? response.data : pet)));
      setHealthRecordData({ date: "", type: "", description: "", notes: "" });
      alert("Thêm hồ sơ sức khỏe thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm hồ sơ sức khỏe:", error);
      alert(`Lỗi khi thêm hồ sơ sức khỏe: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("owner_id", ownerId);
    data.append("name", documentData.name);
    if (documentData.document) {
      data.append("document", documentData.document);
    }

    try {
      const response = await axios.post(`/api/pets/${selectedPet._id}/documents`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPets(pets.map((pet) => (pet._id === selectedPet._id ? response.data : pet)));
      setDocumentData({ name: "", document: null });
      alert("Thêm tài liệu thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm tài liệu:", error);
      alert(`Lỗi khi thêm tài liệu: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleAddInsurance = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("owner_id", ownerId);
    data.append("policy_number", insuranceData.policy_number);
    data.append("provider", insuranceData.provider);
    insuranceData.documents.forEach((doc) => data.append("documents", doc));

    try {
      const response = await axios.post(`/api/pets/${selectedPet._id}/insurance`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setPets(pets.map((pet) => (pet._id === selectedPet._id ? response.data : pet)));
      setInsuranceData({ policy_number: "", provider: "", documents: [] });
      alert("Thêm thông tin bảo hiểm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm bảo hiểm:", error);
      alert(`Lỗi khi thêm bảo hiểm: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="my-pets-container">
      <h2>Quản lý thú cưng</h2>
      <button
        onClick={() => setShowAddModal(true)}
        style={{ padding: "10px 20px", marginBottom: "20px", background: "#2b6cb0", color: "#fff" }}
      >
        Thêm thú cưng mới
      </button>

      {pets.length > 0 ? (
        <div className="pet-grid">
          {pets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <img
                src={`http://localhost:5000${pet.image}`}
                alt={pet.name}
                onError={(e) => (e.target.src = "/imgs/placeholder.webp")}
              />
              <h3>{pet.name}</h3>
              <p><b>Loài:</b> {pet.species}</p>
              <p><b>Giống:</b> {pet.breed}</p>
              <p><b>Tuổi:</b> {pet.age}</p>
              <div className="pet-actions">
                <button onClick={() => handleViewDetails(pet)}>Xem chi tiết</button>
                <button onClick={() => handleEditClick(pet)}>Chỉnh sửa</button>
                <button onClick={() => handleDeletePet(pet._id)} style={{ background: "red" }}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Không tìm thấy thú cưng. Hãy thêm thú cưng mới!</p>
      )}

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Thêm thú cưng mới</h3>
            <form onSubmit={handleAddPet}>
              <div className="form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, setFormData)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Loài:</label>
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={(e) => handleInputChange(e, setFormData)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Giống:</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </div>
              <div className="form-group">
                <label>Tuổi:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange(e, setFormData)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Tiền sử bệnh:</label>
                <textarea
                  name="medical_history"
                  value={formData.medical_history}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </div>
              <div className="form-group">
                <label>Ảnh đại diện:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </div>
              <div className="form-group">
                <label>Thư viện ảnh:</label>
                <input
                  type="file"
                  name="photos"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={(e) => setFormData((prev) => ({ ...prev, photos: Array.from(e.target.files) }))}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Hủy</button>
                <button type="submit" style={{ background: "green", color: "#fff" }}>Thêm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && selectedPet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chỉnh sửa thú cưng</h3>
            <form onSubmit={handleUpdatePet}>
              <div className="form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, setFormData)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Loài:</label>
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={(e) => handleInputChange(e, setFormData)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Giống:</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </div>
              <div className="form-group">
                <label>Tuổi:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange(e, setFormData)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Tiền sử bệnh:</label>
                <textarea
                  name="medical_history"
                  value={formData.medical_history}
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
              </div>
              <div className="form-group">
                <label>Ảnh đại diện:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => handleInputChange(e, setFormData)}
                />
                {selectedPet.image && (
                  <p>Ảnh hiện tại: <img src={`http://localhost:5000${selectedPet.image}`} alt="Current" width="50" /></p>
                )}
              </div>
              <div className="form-group">
                <label>Thư viện ảnh:</label>
                <input
                  type="file"
                  name="photos"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={(e) => setFormData((prev) => ({ ...prev, photos: Array.from(e.target.files) }))}
                />
                {selectedPet.photos?.length > 0 && (
                  <div>
                    <p>Ảnh hiện tại:</p>
                    {selectedPet.photos.map((photo, index) => (
                      <img key={index} src={`http://localhost:5000${photo}`} alt="Pet" width="50" />
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>Hủy</button>
                <button type="submit" style={{ background: "green", color: "#fff" }}>Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && selectedPet && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chi tiết thú cưng: {selectedPet.name}</h3>
            <div className="tab-nav">
              <button
                className={`tab-link ${activeTab === "basic" ? "active" : ""}`}
                onClick={() => setActiveTab("basic")}
              >
                Thông tin cơ bản
              </button>
              <button
                className={`tab-link ${activeTab === "medical" ? "active" : ""}`}
                onClick={() => setActiveTab("medical")}
              >
                Tiền sử bệnh
              </button>
              <button
                className={`tab-link ${activeTab === "health" ? "active" : ""}`}
                onClick={() => setActiveTab("health")}
              >
                Hồ sơ sức khỏe
              </button>
              <button
                className={`tab-link ${activeTab === "photos" ? "active" : ""}`}
                onClick={() => setActiveTab("photos")}
              >
                Thư viện ảnh
              </button>
              <button
                className={`tab-link ${activeTab === "documents" ? "active" : ""}`}
                onClick={() => setActiveTab("documents")}
              >
                Tài liệu
              </button>
              <button
                className={`tab-link ${activeTab === "insurance" ? "active" : ""}`}
                onClick={() => setActiveTab("insurance")}
              >
                Bảo hiểm
              </button>
            </div>

            {activeTab === "basic" && (
              <div className="tab-content">
                <p><b>Tên:</b> {selectedPet.name}</p>
                <p><b>Loài:</b> {selectedPet.species}</p>
                <p><b>Giống:</b> {selectedPet.breed}</p>
                <p><b>Tuổi:</b> {selectedPet.age}</p>
                <p><b>Ảnh đại diện:</b></p>
                <img src={`http://localhost:5000${selectedPet.image}`} alt={selectedPet.name} width="100" />
              </div>
            )}

            {activeTab === "medical" && (
              <div className="tab-content">
                <p><b>Tiền sử bệnh:</b> {selectedPet.medical_history || "Không có thông tin"}</p>
              </div>
            )}

            {activeTab === "health" && (
              <div className="tab-content">
                <h4>Thêm hồ sơ sức khỏe</h4>
                <form onSubmit={handleAddHealthRecord}>
                  <div className="form-group">
                    <label>Ngày:</label>
                    <input
                      type="date"
                      name="date"
                      value={healthRecordData.date}
                      onChange={(e) => handleInputChange(e, setHealthRecordData)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Loại:</label>
                    <select
                      name="type"
                      value={healthRecordData.type}
                      onChange={(e) => handleInputChange(e, setHealthRecordData)}
                      required
                    >
                      <option value="">Chọn loại</option>
                      <option value="vaccination">Tiêm chủng</option>
                      <option value="treatment">Điều trị</option>
                      <option value="allergy">Dị ứng</option>
                      <option value="illness">Bệnh tật</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Mô tả:</label>
                    <input
                      type="text"
                      name="description"
                      value={healthRecordData.description}
                      onChange={(e) => handleInputChange(e, setHealthRecordData)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Ghi chú:</label>
                    <textarea
                      name="notes"
                      value={healthRecordData.notes}
                      onChange={(e) => handleInputChange(e, setHealthRecordData)}
                    />
                  </div>
                  <button type="submit" style={{ background: "green", color: "#fff" }}>Thêm</button>
                </form>
                <h4>Dòng thời gian sức khỏe</h4>
                {selectedPet.health_records?.length > 0 ? (
                  <div className="timeline">
                    {selectedPet.health_records.map((record, index) => (
                      <div key={index} className="timeline-item">
                        <p><b>Ngày:</b> {new Date(record.date).toLocaleDateString()}</p>
                        <p><b>Loại:</b> {record.type}</p>
                        <p><b>Mô tả:</b> {record.description}</p>
                        <p><b>Ghi chú:</b> {record.notes || "Không có"}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Chưa có hồ sơ sức khỏe.</p>
                )}
              </div>
            )}

            {activeTab === "photos" && (
              <div className="tab-content">
                {selectedPet.photos?.length > 0 ? (
                  <div className="photo-gallery">
                    {selectedPet.photos.map((photo, index) => (
                      <img key={index} src={`http://localhost:5000${photo}`} alt="Pet" width="100" />
                    ))}
                  </div>
                ) : (
                  <p>Chưa có ảnh trong thư viện.</p>
                )}
              </div>
            )}

            {activeTab === "documents" && (
              <div className="tab-content">
                <h4>Thêm tài liệu</h4>
                <form onSubmit={handleAddDocument}>
                  <div className="form-group">
                    <label>Tên tài liệu:</label>
                    <input
                      type="text"
                      name="name"
                      value={documentData.name}
                      onChange={(e) => handleInputChange(e, setDocumentData)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>File tài liệu:</label>
                    <input
                      type="file"
                      name="document"
                      accept="image/jpeg,image/jpg,image/png,application/pdf,image/webp"
                      onChange={(e) => handleInputChange(e, setDocumentData)}
                      required
                    />
                  </div>
                  <button type="submit" style={{ background: "green", color: "#fff" }}>Thêm</button>
                </form>
                {selectedPet.documents?.length > 0 ? (
                  <div>
                    <h4>Tài liệu hiện có</h4>
                    {selectedPet.documents.map((doc, index) => (
                      <div key={index}>
                        <p><b>Tên:</b> {doc.name}</p>
                        <a href={`http://localhost:5000${doc.path}`} target="_blank" rel="noopener noreferrer">
                          Xem tài liệu
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Chưa có tài liệu.</p>
                )}
              </div>
            )}

            {activeTab === "insurance" && (
              <div className="tab-content">
                <h4>Thêm thông tin bảo hiểm</h4>
                <form onSubmit={handleAddInsurance}>
                  <div className="form-group">
                    <label>Số hợp đồng bảo hiểm:</label>
                    <input
                      type="text"
                      name="policy_number"
                      value={insuranceData.policy_number}
                      onChange={(e) => handleInputChange(e, setInsuranceData)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nhà cung cấp:</label>
                    <input
                      type="text"
                      name="provider"
                      value={insuranceData.provider}
                      onChange={(e) => handleInputChange(e, setInsuranceData)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tài liệu bảo hiểm:</label>
                    <input
                      type="file"
                      name="documents"
                      accept="image/jpeg,image/jpg,image/png,application/pdf,image/webp"
                      multiple
                      onChange={(e) => setInsuranceData((prev) => ({ ...prev, documents: Array.from(e.target.files) }))}
                    />
                  </div>
                  <button type="submit" style={{ background: "green", color: "#fff" }}>Thêm</button>
                </form>
                {selectedPet.insurance?.policy_number ? (
                  <div>
                    <h4>Thông tin bảo hiểm hiện có</h4>
                    <p><b>Số hợp đồng:</b> {selectedPet.insurance.policy_number}</p>
                    <p><b>Nhà cung cấp:</b> {selectedPet.insurance.provider}</p>
                    {selectedPet.insurance.documents?.length > 0 && (
                      <div>
                        <h5>Tài liệu bảo hiểm</h5>
                        {selectedPet.insurance.documents.map((doc, index) => (
                          <div key={index}>
                            <p><b>Tên:</b> {doc.name}</p>
                            <a href={`http://localhost:5000${doc.path}`} target="_blank" rel="noopener noreferrer">
                              Xem tài liệu
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <p>Chưa có thông tin bảo hiểm.</p>
                )}
              </div>
            )}

            <div className="modal-actions">
              <button onClick={() => setShowDetailModal(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPets;