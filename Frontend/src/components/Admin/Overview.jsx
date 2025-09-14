import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";

const Overview = () => {
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

export default Overview;
