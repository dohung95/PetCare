import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

// Sidebar component
const Sidebar = () => (
  <div className="bg-dark text-white vh-100 p-3">
    <h4 className="mb-4">
      <Link to="/Dashboard" className="text-white text-decoration-none">
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
    </ul>
  </div>
);

const AdopOverview = () => {
  const [stats, setStats] = useState({ pets: 0, adoptions: 0, pending: 0 });

  useEffect(() => {
    // mock data, sau này thay bằng API
    setStats({ pets: 12, adoptions: 30, pending: 5 });
  }, []);

  return (
    <div className="container-fluid">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={2}>
          <Sidebar />
        </Col>

        {/* Main content */}
        <Col md={10} className="p-4">
          <h3 className="fw-bold mb-4">📊 Dashboard Overview</h3>
          <Row className="g-3">
            <Col md={4}>
              <div className="card shadow p-3 text-center">
                <h5>Total Pets</h5>
                <p className="fs-3 fw-bold">{stats.pets}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="card shadow p-3 text-center">
                <h5>Adoption Interests</h5>
                <p className="fs-3 fw-bold">{stats.adoptions}</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="card shadow p-3 text-center">
                <h5>Pending Requests</h5>
                <p className="fs-3 fw-bold">{stats.pending}</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AdopOverview;
