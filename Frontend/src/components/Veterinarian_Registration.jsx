import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VeterinarianRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    clinicName: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Veterinarian Registration</h2>
              <div className="form-group mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="licenseNumber" className="form-label">License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="clinicName" className="form-label">Clinic Name</label>
                <input
                  type="text"
                  id="clinicName"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary w-100"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeterinarianRegistration;