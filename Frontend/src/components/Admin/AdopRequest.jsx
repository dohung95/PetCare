import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Sidebar from "./Sidebar"; // 👉 import Sidebar

const AdopRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adoptionRequests") || "[]");
    setRequests(saved);
  }, []);

  const updateStatus = (id, status) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status } : r
    );
    setRequests(updated);
    localStorage.setItem("adoptionRequests", JSON.stringify(updated));

    const adopter = updated.find((r) => r.id === id);

    sendEmail(adopter, status);

    if (status === "Approved") {
      pushToNotion(adopter);
    }
  };

  const sendEmail = (adopter, status) => {
    const templateParams = {
      to_name: adopter.adopter,
      adopter_email: adopter.email,
      message:
        status === "Approved"
          ? "Congratulations! Your adoption request has been approved."
          : "Sorry, your adoption request has been rejected.",
    };

    emailjs
      .send(
        "service_l36hjvl",
        "template_u6k8yz1",
        templateParams,
        "jixo_fTbYkLcH3zhf"
      )
      .then(
        () => alert(`📧 Email sent to ${adopter.email}`),
        (err) => console.error("Email error:", err)
      );
  };

  const pushToNotion = (data) => {
    console.log("Push to Notion:", data);
    alert("📤 Adoption info pushed to Notion!");
  };

  return (
    <div className="d-flex">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung Adoption Requests bên phải */}
      <div className="container my-5 flex-grow-1">
        <h3 className="fw-bold mb-3">📑 Adoption Requests</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Adopter</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Province</th>
              <th>Pet Preference</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.adopter}</td>
                <td>{req.email}</td>
                <td>{req.phone}</td>
                <td>{req.province}</td>
                <td>{req.petPreference}</td>
                <td>{req.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => updateStatus(req.id, "Approved")}
                    disabled={req.status !== "Pending"}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(req.id, "Rejected")}
                    disabled={req.status !== "Pending"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No adoption requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdopRequest;
