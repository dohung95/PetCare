import React from "react";
import { Link } from "react-router-dom";

const AdopDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white vh-100 p-3">
          <h4 className="mb-4">🐾 Shelter Admin</h4>
          <ul className="nav flex-column gap-2">
            <li>
              <Link to="/AdopDashboard" className="nav-link text-white">
                📊 Overview
              </Link>
            </li>
            <li>
              <Link to="/AdopDashboard/pets" className="nav-link text-white">
                🐶 Manage Pets
              </Link>
            </li>
            <li>
              <Link to="/AdopDashboard/adoptions" className="nav-link text-white">
                📑 Adoption Requests
              </Link>
            </li>
          </ul>
        </div>

        {/* Main content */}
        <div className="col-md-9 col-lg-10 p-4">
          <h3 className="fw-bold">📊 Overview</h3>
          <p>Chào mừng bạn đến với trang Dashboard Shelter.</p>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card shadow p-3 text-center">
                <h5>Total Pets</h5>
                <p className="fs-3 fw-bold">12</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow p-3 text-center">
                <h5>Adoption Interests</h5>
                <p className="fs-3 fw-bold">30</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow p-3 text-center">
                <h5>Pending Requests</h5>
                <p className="fs-3 fw-bold">5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopDashboard;
