import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/VeterinarianRegistration.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
  const [showFormModal, setShowFormModal] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.match(/^\+?\d{10,12}$/))
      newErrors.phone = 'Invalid phone number (10-12 digits)';
    if (formData.experience && isNaN(formData.experience))
      newErrors.experience = 'Experience must be a number';
    if (!isTermsAccepted) newErrors.terms = 'You must accept the Terms and Conditions';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleTermsChange = (e) => {
    setIsTermsAccepted(e.target.checked);
    setErrors({ ...errors, terms: '' });
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

      setShowFormModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || error.message || 'Registration failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      specialization: '',
      experience: ''
    });
    setErrors({});
    setIsTermsAccepted(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  return (
    <Container className="mt-4 Veterinarian_Registration">
      <Card className="vet-card p-4">
        <Card.Body>
          <Row className="mb-4">
            <Col>
              <h1 className="text-center">Job Page - Veterinarian Registration</h1>
              <p className="text-center"><i>Join our team to provide high quality pet care!</i></p>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Card.Text style={{ fontSize: '1.5rem', color: '#555' }}>
                PetCare is looking for veterinarians who are passionate about caring for pets. The PetCare web app provides a platform for you to manage your appointments, record treatments, and support pet owners. This is your chance to contribute to the pet-loving community and grow your career.
              </Card.Text>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Card.Text style={{ fontSize: '1.5rem', color: '#555' }}>
                <b>Benefits of joining</b><br />
                Work in a professional environment, supporting the pet-loving community. Opportunities to develop skills and participate in additional training courses. Support modern management tools through the PetCare application.
              </Card.Text>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Card.Text style={{ fontSize: '1.5rem', color: '#555' }}>
                <b>Job Requirements</b><br />
                <ul className="list-unstyled">
                  <li><i className="bi bi-check-circle"></i> Access and manage pet health records of scheduled clients.</li>
                  <li><i className="bi bi-check-circle"></i> Record detailed diagnoses, prescriptions, and treatment plans after each visit.</li>
                  <li><i className="bi bi-check-circle"></i> Manage appointments, confirm or adjust appointment times.</li>
                  <li><i className="bi bi-check-circle"></i> Ensure information is updated accurately and promptly on the system.</li>
                </ul>
              </Card.Text>
            </Col>
          </Row>

          <Row className="mb-4 justify-content-center">
            <Col md={6} lg={5} className="text-center">
              <Button
                variant="success"
                className="vet-button"
                onClick={() => setShowFormModal(true)}
              >
                <i className="bi bi-person-plus me-1"></i> Register as Veterinarian
              </Button>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card.Text>
                <b>Contact Information</b><br />
                <i>If you need further information, please contact us via email or phone number provided in the "Contact" section on the home page. We will respond within 48 hours.</i>
              </Card.Text>
            </Col>
          </Row>

          {/* Form Modal */}
          <Modal show={showFormModal} onHide={handleCloseFormModal} centered className="vet-modal">
            <Modal.Header closeButton className="bg-success text-white">
              <Modal.Title>Veterinarian Registration</Modal.Title>
            </Modal.Header>
            <Modal.Body className="vet-modal-body">
              {errors.submit && (
                <div className="alert alert-danger alert-dismissible mb-3 vet-alert">
                  {errors.submit}
                  <button type="button" className="btn-close" onClick={() => setErrors({})}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 vet-form-group">
                  <label htmlFor="name" className="form-label fs-6 vet-label">
                    <i className="bi bi-person me-1"></i>Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control form-control-sm vet-input ${errors.name ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group mb-3 vet-form-group">
                  <label htmlFor="email" className="form-label fs-6 vet-label">
                    <i className="bi bi-envelope me-1"></i>Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control form-control-sm vet-input ${errors.email ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group mb-3 vet-form-group">
                  <label htmlFor="phone" className="form-label fs-6 vet-label">
                    <i className="bi bi-telephone me-1"></i>Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control form-control-sm vet-input ${errors.phone ? 'is-invalid' : ''}`}
                    required
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                <div className="form-group mb-3 vet-form-group">
                  <label htmlFor="address" className="form-label fs-6 vet-label">
                    <i className="bi bi-geo-alt me-1"></i>Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control form-control-sm vet-input vet-textarea"
                    rows="2"
                  />
                </div>

                <div className="form-group mb-3 vet-form-group">
                  <label htmlFor="specialization" className="form-label fs-6 vet-label">
                    <i className="bi bi-award me-1"></i>Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="form-control form-control-sm vet-input"
                  />
                </div>

                <div className="form-group mb-3 vet-form-group">
                  <label htmlFor="experience" className="form-label fs-6 vet-label">
                    <i className="bi bi-calendar-check me-1"></i>Years of Experience
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`form-control form-control-sm vet-input ${errors.experience ? 'is-invalid' : ''}`}
                    min="0"
                  />
                  {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                </div>

                <div className="form-group mb-4 vet-form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={isTermsAccepted}
                      onChange={handleTermsChange}
                      className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
                    />
                    <label htmlFor="terms" className="form-check-label vet-label">
                      Terms and Conditions<br />
                      By submitting your application, you agree to PetCare's terms of use and allow us to store your personal information to process your application. Please read carefully before submitting.
                    </label>
                    {errors.terms && <div className="invalid-feedback">{errors.terms}</div>}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="success"
                    className="vet-button"
                    disabled={isSubmitting || !isTermsAccepted}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      'Register'
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    className="vet-button"
                    onClick={handleCloseFormModal}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          {/* Success Modal */}
          <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered className="vet-modal">
            <Modal.Header closeButton className="bg-success text-white">
              <Modal.Title>Registration Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body className="vet-modal-body">
              <i className="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
              Vet registration successful! Please check your registered email! Click "Close" to return to the home page.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleCloseSuccessModal} className="vet-button">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VeterinarianRegistration;