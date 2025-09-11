import React, { useEffect, useState } from "react";

const Adoptions = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // mock data
    setRequests([
      { id: 101, adopter: "Alice", pet: "Tin", status: "Pending" },
      { id: 102, adopter: "Bob", pet: "Milo", status: "Approved" },
    ]);
  }, []);

  return (
    <div>
      <h3 className="fw-bold mb-3">📑 Adoption Requests</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Adopter</th>
            <th>Pet</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.adopter}</td>
              <td>{req.pet}</td>
              <td>{req.status}</td>
              <td>
                <button className="btn btn-success btn-sm me-2">Approve</button>
                <button className="btn btn-danger btn-sm">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adoptions;
