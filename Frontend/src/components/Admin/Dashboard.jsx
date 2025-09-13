import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button, Form, Collapse } from "react-bootstrap";

// Mock API (thay bằng gọi từ backend sau này)
const getPets = async () => {
  return Promise.resolve({
    data: [
      { _id: 1, name: "Tin", type: "Dog", age: "2 years", healthStatus: "Vaccinated", available: true },
      { _id: 2, name: "Milo", type: "Cat", age: "1 year", healthStatus: "Healthy", available: true },
    ],
  });
};

// Sidebar
const Sidebar = () => (
  <div className="bg-dark text-white vh-100 p-3">
    <h4 className="mb-4">
       <Link to="/Dashboard"className="nav-link text-white">🐾 Admin</Link></h4>
    <ul className="nav flex-column gap-2">
      <li>
        <Link to="/overview" className="nav-link text-white fw-bold">📊 Overview</Link>
      </li>
      <li>
        <Link to="/adopPets" className="nav-link text-white">🐶 Manage Pets</Link>
      </li>
      <li>
        <Link to="/adopRequest" className="nav-link text-white">📑 Adoption Requests</Link>
      </li>
    </ul>
  </div>
);

// StatsCard
const StatsCard = ({ title, value, variant }) => (
  <div className={`card text-white bg-${variant} shadow p-3 text-center mb-3`}>
    <h5>{title}</h5>
    <p className="fs-3 fw-bold">{value}</p>
  </div>
);

// CareLogForm (gắn với từng pet để Add mới)
const CareLogForm = ({ petId, onAdd }) => {
  const [form, setForm] = useState({ type: "feeding", details: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.details.trim()) return;
    onAdd(petId, { ...form, time: new Date() });
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
            <option value="medical">Medical</option>
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

// CareLogTable (có chức năng Update)
const CareLogTable = ({ logs, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({ type: "feeding", details: "" });

  const startEdit = (index, log) => {
    setEditingIndex(index);
    setEditForm({ type: log.type, details: log.details });
  };

  const handleSave = () => {
    onUpdate(editingIndex, { ...editForm, time: new Date() });
    setEditingIndex(null);
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
          <tr key={i}>
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
                  <option value="medical">Medical</option>
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
  const [careLogs, setCareLogs] = useState({}); // { petId: [logs] }
  const [openPet, setOpenPet] = useState(null);

  useEffect(() => {
    getPets().then((res) => {
      setPets(res.data);
      // khởi tạo logs rỗng cho từng pet
      const initLogs = {};
      res.data.forEach((p) => (initLogs[p._id] = []));
      setCareLogs(initLogs);
    });
  }, []);

  const handleAddLog = (petId, log) => {
    setCareLogs({
      ...careLogs,
      [petId]: [...(careLogs[petId] || []), log],
    });
  };

  const handleUpdateLog = (petId, index, updatedLog) => {
    setCareLogs({
      ...careLogs,
      [petId]: careLogs[petId].map((log, i) =>
        i === index ? updatedLog : log
      ),
    });
  };

  return (
    <Row className="g-0">
      {/* Sidebar */}
      <Col md={2}>
        <Sidebar />
      </Col>

      {/* Content */}
      <Col md={10} className="p-4">
        <h2 className="mb-4">📊 Shelter Dashboard</h2>

        {/* Stats */}
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

        {/* Adoptable Pets + Care Logs */}
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
                  <td>{pet.available ? "Available" : "Adopted"}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() =>
                        setOpenPet(openPet === pet._id ? null : pet._id)
                      }
                    >
                      {openPet === pet._id ? "Hide" : "View / Update"}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="p-0">
                    <Collapse in={openPet === pet._id}>
                      <div className="p-3 bg-light">
                        <h6>📝 Care Logs for {pet.name}</h6>
                        {/* Form thêm log mới */}
                        <CareLogForm petId={pet._id} onAdd={handleAddLog} />
                        {/* Bảng logs + update */}
                        <CareLogTable
                          logs={careLogs[pet._id] || []}
                          onUpdate={(index, updatedLog) =>
                            handleUpdateLog(pet._id, index, updatedLog)
                          }
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
