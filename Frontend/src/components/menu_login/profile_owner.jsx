import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Image } from 'react-bootstrap';
import api from '../../api';
import '../Css/menu_login_css/profile_owner.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

<<<<<<< Updated upstream
=======
  // Expanded formData to include all relevant fields
>>>>>>> Stashed changes
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    gender: '',
    avatarUrl: '',
<<<<<<< Updated upstream
    emergencyPhone: ''
=======
    emergencyPhone: '',
    dob: '',
>>>>>>> Stashed changes
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    (async () => {
      try {
        const res = await api.get('/auth/me');
        const u = res.data?.data || res.data?.user || {};

        const normalized = {
          id: u.id || u._id || '',
          name: u.name || '',
          phone: u.phone || u.contactNumber || '',
          email: u.email || '',
          address: u.address || '',
          role: u.role || '',
          gender: u.gender || '',
          avatarUrl: u.avatarUrl || u.avatar || '',
          emergencyPhone: u.emergencyPhone || '',
          gender: u.gender || '',
          dob: u.dob || '',
          createdAt: u.createdAt || '',
          updatedAt: u.updatedAt || '',
          lastLogin: u.lastLogin || '',
        };

        setUser(normalized);
        setFormData({
          name: normalized.name,
          phone: normalized.phone,
          address: normalized.address,
          email: normalized.email,
          gender: normalized.gender,
          avatarUrl: normalized.avatarUrl,
          emergencyPhone: normalized.emergencyPhone,
          dob: normalized.dob,
        });

<<<<<<< Updated upstream
=======
        // Sync localStorage
>>>>>>> Stashed changes
        localStorage.setItem('ownerId', normalized.id);
        localStorage.setItem('ownerName', normalized.name);
        localStorage.setItem('ownerPhone', normalized.phone);
        localStorage.setItem('ownerEmail', normalized.email);
        localStorage.setItem('ownerAddress', normalized.address);
        localStorage.setItem('ownerRole', normalized.role);
      } catch (err) {
        setError('Failed to fetch user profile. Please log in again.');
        console.error('Profile fetch error:', err.response?.data || err.message);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?.id) {
      setError('User ID not found.');
      return;
    }
    setError('');
    setSuccess('');

    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      ...(formData.gender && { gender: formData.gender }),
      ...(formData.avatarUrl && { avatarUrl: formData.avatarUrl }),
      ...(formData.emergencyPhone && { emergencyPhone: formData.emergencyPhone }),
      ...(formData.dob && { dob: formData.dob }),
    };

    try {
      // Nếu backend đã có PUT /api/user/profile: dùng thẳng endpoint đó cho gọn
      // const response = await api.put('/api/user/profile', payload);

      // Giữ cách gọi theo code cũ của bạn:
      let response;
      try {
        response = await api.put(`/owners/${user.id}`, payload);
      } catch {
        response = await api.put('/owners', payload);
      }

      const updated = response.data?.data || response.data?.user || {};
      const normalized = {
        ...user,
        name: updated.name ?? formData.name,
        phone: updated.phone || updated.contactNumber || formData.phone,
        email: updated.email ?? formData.email,
        address: updated.address ?? formData.address,
        gender: updated.gender ?? formData.gender,
        avatarUrl: updated.avatarUrl || updated.avatar || formData.avatarUrl,
        emergencyPhone: updated.emergencyPhone ?? formData.emergencyPhone,
        dob: updated.dob ?? formData.dob,
        updatedAt: updated.updatedAt || new Date().toISOString(),
      };

      setUser(normalized);
      setFormData({
        name: normalized.name,
        phone: normalized.phone,
        address: normalized.address,
        email: normalized.email,
        gender: normalized.gender,
        avatarUrl: normalized.avatarUrl,
        emergencyPhone: normalized.emergencyPhone,
        dob: normalized.dob,
      });

      setEditMode(false);
      setSuccess('Profile updated successfully');

<<<<<<< Updated upstream
=======
      // Update localStorage
>>>>>>> Stashed changes
      localStorage.setItem('ownerName', normalized.name);
      localStorage.setItem('ownerPhone', normalized.phone);
      localStorage.setItem('ownerEmail', normalized.email);
      localStorage.setItem('ownerAddress', normalized.address);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      console.error('Update error:', err.response?.data || err.message);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        address: user.address,
        email: user.email,
        gender: user.gender || '',
        avatarUrl: user.avatarUrl || '',
        emergencyPhone: user.emergencyPhone || '',
        dob: user.dob || '',
      });
    }
    setError('');
    setSuccess('');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container className="user-profile profile-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="user-profile profile-card">
            <Card.Header as="h3" className="user-profile card-header text-center" style={{ color: 'white' }}>
              User Profile
            </Card.Header>

            <Card.Body className="user-profile card-body">
              <div className="user-profile d-flex align-items-center mb-3">
<<<<<<< Updated upstream
                {(formData.avatarUrl || user.avatarUrl) ? (
=======
                {formData.avatarUrl || user.avatarUrl ? (
>>>>>>> Stashed changes
                  <Image
                    src={formData.avatarUrl || user.avatarUrl}
                    roundedCircle
                    width={72}
                    height={72}
                    className="user-profile me-3"
                    alt="avatar"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
<<<<<<< Updated upstream
                  <div className="user-profile rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: 72, height: 72, fontWeight: 700 }}>
=======
                  <div
                    className="user-profile rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: 72, height: 72, fontWeight: 700 }}
                  >
>>>>>>> Stashed changes
                    {(user.name || 'U').slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{user.name}</div>
                  <div className="user-profile text-muted">{user.email}</div>
                </div>
              </div>

<<<<<<< Updated upstream
              {error && <Alert variant="danger" className="user-profile alert">{error}</Alert>}
              {success && <Alert variant="success" className="user-profile alert">{success}</Alert>}
=======
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
>>>>>>> Stashed changes

              <Form className="user-profile profile-form-grid">
                <Form.Group controlId="formName" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                    minLength={2}
                    className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editMode || user.role === 'admin'}
                    required
                    className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                    pattern="^\+?\d{8,15}$"
                    className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formAddress" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                    className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formGender" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="user-profile form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formEmergencyPhone" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Emergency Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    disabled={!editMode}
                    pattern="^\+?\d{8,15}$"
                    className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formDob" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formAvatarUrl" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Avatar URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formRole" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.role || ''}
                    disabled
                    className="user-profile form-control"
                  />
                </Form.Group>

<<<<<<< Updated upstream

                <div className="user-profile text-center">
                  {editMode ? (
                    <>
                      <Button variant="success" onClick={handleSave} className="user-profile btn me-2">Save</Button>
                      <Button variant="secondary" onClick={handleCancel} className="user-profile btn">Cancel</Button>
=======
                <div className="text-center">
                  {editMode ? (
                    <>
                      <Button
                        variant="success"
                        onClick={handleSave}
                        className="user-profile btn me-2"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleCancel}
                        className="user-profile btn"
                      >
                        Cancel
                      </Button>
>>>>>>> Stashed changes
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => {
                        setEditMode(true);
                        setError('');
                        setSuccess('');
                      }}
                      className="user-profile btn"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;