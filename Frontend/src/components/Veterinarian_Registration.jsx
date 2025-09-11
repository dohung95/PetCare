import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const VeterinarianRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    experience: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) 
      newErrors.email = 'Invalid email format';
    if (!formData.phone.match(/^\+?\d{10,12}$/)) 
      newErrors.phone = 'Invalid phone number (10-12 digits)';
    if (formData.experience && isNaN(formData.experience)) 
      newErrors.experience = 'Experience must be a number';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/vets/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        specialization: formData.specialization,
        experience: formData.experience ? parseInt(formData.experience) : 0
      });

      setShowSuccessModal(true);
    } catch (error) {
      setErrors({ 
        submit: error.response?.data?.error || error.message || 'Registration failed' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body p-3">
              <h4 className="card-title text-center mb-3 fs-5">Veterinarian Registration</h4>

              {errors.submit && (
                <div className="alert alert-danger alert-dismissible mb-2">
                  {errors.submit}
                  <button type="button" className="btn-close" onClick={() => setErrors({})}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="name" className="form-label fs-6">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="email" className="form-label fs-6">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control form-control-sm ${errors.email ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="phone" className="form-label fs-6">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control form-control-sm ${errors.phone ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="address" className="form-label fs-6">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    rows="2"
                  />
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="specialization" className="form-label fs-6">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="experience" className="form-label fs-6">Years of Experience</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`form-control form-control-sm ${errors.experience ? 'is-invalid' : ''}`}
                    min="0"
                  />
                  {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-sm w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Register'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vet registration successful! Please check your registered email! Click "Close" to return to the home page.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VeterinarianRegistration;