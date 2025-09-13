import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button, Form, Collapse } from "react-bootstrap";
import api from "../../api";
import { useParams } from 'react-router-dom';
// Sidebar (unchanged)
const Sidebar = () => (
  <div className="bg-dark text-white vh-100 p-3">
    <h4 className="mb-4">
      <Link to="/Dashboard" className="nav-link text-white">
        🐾 Admin
      </Link>
    </h4>
    <ul className="nav flex-column gap-2">
      <li>
        <Link to="/overview" className="nav-link text-white fw-bold">
          📊 Overview
        </Link>
      </li>
      <li>
        <Link to="/adopPets" className="nav-link text-white">
          🐶 Manage Pets
        </Link>
      </li>
      <li>
        <Link to="/adopRequest" className="nav-link text-white">
          📑 Adoption Requests
        </Link>
      </li>
      <li>
        <Link to="/adminproductlist" className="nav-link text-white">Manage Product</Link>
      </li>
    </ul>
  </div>
);

// StatsCard (unchanged)
const StatsCard = ({ title, value, variant }) => (
  <div className={`card text-white bg-${variant} shadow p-3 text-center mb-3`}>
    <h5>{title}</h5>
    <p className="fs-3 fw-bold">{value}</p>
  </div>
);

// CareLogForm (unchanged)
const CareLogForm = ({ petId, onAdd }) => {
  const [form, setForm] = useState({ type: "feeding", details: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.details.trim()) return;
    onAdd(petId, { ...form, time: new Date().toISOString() });

    setForm({ type: "feeding", details: "" });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-2">
      <Row className="g-2">
        <Col md={3}>
          <Form.Select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="feeding">Feeding</option>
            <option value="grooming">Grooming</option>
            <option value="vaccination">Vaccination</option>
            <option value="checkup">Medical Check-up</option>
            <option value="dental">Dental Care</option>
          </Form.Select>
        </Col>
        <Col md={7}>
          <Form.Control
            type="text"
            placeholder="Details..."
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
          />
        </Col>
        <Col md={2}>
          <Button type="submit" className="w-100" variant="success">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

// CareLogTable (unchanged)
const CareLogTable = ({ petId, logs, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ type: "feeding", details: "" });

  const startEdit = (index, log) => {
    setEditingIndex(index);
    setEditForm({ type: log.type, details: log.details });
  };

  const handleSave = async () => {
    try {
      const logId = logs[editingIndex]._id;
      const updatedLog = { ...editForm, time: new Date() };

      const res = await api.put(`/shelter-pets/${petId}/logs/${logId}`, updatedLog);
      onUpdate(petId, editingIndex, res.data);
      setEditingIndex(null);
      setEditForm({ type: "feeding", details: "" });
    } catch (err) {
      console.error("Lỗi cập nhật log:", err);
    }
  };


  return (
    <Table size="sm" bordered hover>
      <thead className="table-light">
        <tr>
          <th>Type</th>
          <th>Details</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, i) => (
          <tr key={log._id || i}>
            <td>
              {editingIndex === i ? (
                <Form.Select
                  value={editForm.type}
                  onChange={(e) =>
                    setEditForm({ ...editForm, type: e.target.value })
                  }
                >
                  <option value="feeding">Feeding</option>
                  <option value="grooming">Grooming</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="checkup">Medical Check-up</option>
                  <option value="dental">Dental Care</option>
                </Form.Select>
              ) : (
                log.type
              )}
            </td>
            <td>
              {editingIndex === i ? (
                <Form.Control
                  value={editForm.details}
                  onChange={(e) =>
                    setEditForm({ ...editForm, details: e.target.value })
                  }
                />
              ) : (
                log.details
              )}
            </td>
            <td>{new Date(log.time).toLocaleString()}</td>
            <td>
              {editingIndex === i ? (
                <Button size="sm" variant="success" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => startEdit(i, log)}
                >
                  Update
                </Button>
              )}
            </td>
          </tr>
        ))}
        {logs.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center text-muted">
              No logs yet
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

// Main Dashboard
const Dashboard = () => {

  const [pets, setPets] = useState([]);
  const [careLogs, setCareLogs] = useState({});
  const [openPet, setOpenPet] = useState(null);

  // Fetch pets từ backend
  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const res = await api.get("/shelter-pets");
      setPets(res.data);
    } catch (err) {
      console.error("Lỗi load pets:", err);
    }
  };

  const fetchCareLogs = async (petId) => {
    try {
      const res = await api.get(`/shelter-pets/${petId}/logs`);
      setCareLogs((prev) => ({ ...prev, [petId]: res.data }));
    } catch (err) {
      console.error("Lỗi load logs:", err);
    }
  };

  const handleAddLog = async (petId, newLog) => {
  if (!petId || !newLog) {
    console.warn("Thiếu petId hoặc newLog");
    return;
  }

  // Tạo một đối tượng mới chỉ với các trường cần thiết
  const sanitizedLog = {
    type: newLog.type,
    details: newLog.details,
    time: newLog.time,
  };

  try {
    // Đặt console.log tại đây để kiểm tra đối tượng đã được làm sạch
    console.log("Sending sanitized log:", sanitizedLog);

    const res = await api.post(`/shelter-pets/${petId}/logs`, sanitizedLog);

    setCareLogs((prevLogs) => ({
      ...prevLogs,
      [petId]: [...(prevLogs[petId] || []), res.data],
    }));
  } catch (err) {
    console.error("Lỗi thêm log:", err);
  }
};


  const handleUpdateLog = (petId, index, updatedLog) => {
    setCareLogs({
      ...careLogs,
      [petId]: careLogs[petId].map((log, i) =>
        i === index ? updatedLog : log
      ),
    });
  };

  const handleToggleStatus = async (petId, current) => {
    try {
      const res = await api.put(`/shelter-pets/${petId}`, {
        available: !current,
      });
      setPets((prev) => prev.map((p) => (p._id === petId ? res.data : p)));
    } catch (err) {
      console.error("Lỗi toggle status:", err);
    }
  };

  const handleUpdateHealth = async (petId, newHealth) => {
    try {
      const res = await api.put(`/shelter-pets/${petId}`, {
        healthStatus: newHealth,
      });
      setPets((prev) => prev.map((p) => (p._id === petId ? res.data : p)));
    } catch (err) {
      console.error("Lỗi update health:", err);
    }
  };

  return (
    <Row className="g-0">
      <Col md={2}>
        <Sidebar />
      </Col>
      <Col md={10} className="p-4">
        <h2 className="mb-4">📊 Shelter Dashboard</h2>
        <Row>
          <Col md={4}>
            <StatsCard title="Total Pets" value={pets.length} variant="primary" />
          </Col>
          <Col md={4}>
            <StatsCard
              title="Available"
              value={pets.filter((p) => p.available).length}
              variant="success"
            />
          </Col>
          <Col md={4}>
            <StatsCard
              title="Total Care Logs"
              value={Object.values(careLogs).reduce(
                (acc, logs) => acc + logs.length,
                0
              )}
              variant="warning"
            />
          </Col>
        </Row>
        <h3 className="mt-4">🐶 Adoptable Pets & Care Status</h3>
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Age</th>
              <th>Health</th>
              <th>Status</th>
              <th>Care Logs</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <React.Fragment key={pet._id}>
                <tr>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.age}</td>
                  <td>{pet.healthStatus}</td>
                  <td>
                    <Button
                      variant={pet.available ? "success" : "secondary"}
                      size="sm"
                      onClick={() => handleToggleStatus(pet._id, pet.available)}
                    >
                      {pet.available ? "Available" : "Adopted"}
                    </Button>
                  </td>
                  <td>
                    {/* ✅ Logic tối ưu tại đây */}
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => {
                        const isOpen = openPet === pet._id;
                        setOpenPet(isOpen ? null : pet._id);

                        // ✅ Logic đã sửa: chỉ gọi API nếu dữ liệu logs cho pet này chưa tồn tại
                        if (!isOpen && !careLogs.hasOwnProperty(pet._id)) {
                          fetchCareLogs(pet._id);
                        }
                      }}
                    >
                      {openPet === pet._id ? "Hide" : "View / Update"}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="p-0">
                    {/* ✅ Collapse không thay đổi */}
                    <Collapse in={openPet === pet._id}>
                      <div className="p-3 bg-light">
                        <h6>📝 Care Logs for {pet.name}</h6>
                        <CareLogForm petId={pet._id} onAdd={handleAddLog} />
                        <CareLogTable
                          petId={pet._id}
                          logs={careLogs[pet._id] || []}
                          onUpdate={handleUpdateLog}
                        />
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default Dashboard;