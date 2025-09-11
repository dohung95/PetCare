import React, { useEffect, useState } from "react";

const AdopOverview = () => {
  const [stats, setStats] = useState({ pets: 0, adoptions: 0, pending: 0 });

  useEffect(() => {
    // mock data, sau này thay bằng API
    setStats({ pets: 12, adoptions: 30, pending: 5 });
  }, []);

  return (
    <div>
      <h3 className="fw-bold mb-4">📊 Dashboard Overview</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h5>Total Pets</h5>
            <p className="fs-3 fw-bold">{stats.pets}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h5>Adoption Interests</h5>
            <p className="fs-3 fw-bold">{stats.adoptions}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3 text-center">
            <h5>Pending Requests</h5>
            <p className="fs-3 fw-bold">{stats.pending}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopOverview;
