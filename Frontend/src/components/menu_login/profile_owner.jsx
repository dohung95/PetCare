import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Image } from 'react-bootstrap';
import api from '../../api';
import '../Css/menu_login_css/profile_owner.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // formData mở rộng
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setError('No token found. Please log in.'); return; }

    (async () => {
      try {
        // Bạn có thể đổi sang /api/user/profile nếu backend đã có route này
        const res = await api.get('/auth/me');
        const u = res.data?.data || {};

        const normalized = {
          id: u.id || u._id || '',
          name: u.name || '',
          phone: u.phone || u.contactNumber || '',
          email: u.email || '',
          address: u.address || '',
          role: u.role || '',
          avatarUrl: u.avatarUrl || u.avatar || '',
          emergencyPhone: u.emergencyPhone || '',
          createdAt: u.createdAt || '',
          updatedAt: u.updatedAt || '',
          lastLogin: u.lastLogin || ''
        };

        setUser(normalized);
        setFormData({
          name: normalized.name,
          phone: normalized.phone,
          address: normalized.address,
          email: normalized.email,
          gender: normalized.gender,
          avatarUrl: normalized.avatarUrl,
          emergencyPhone: normalized.emergencyPhone
        });

        // đồng bộ localStorage (nếu bạn thích dùng lại)
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

  const handleEdit = () => { setEditMode(true); setError(''); setSuccess(''); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!user?.id) { setError('User id not found.'); return; }
    setError(''); setSuccess('');

    // chỉ gửi các trường có trong formData (backend không có sẽ bỏ qua/ignore)
    const payload = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      ...(formData.gender ? { gender: formData.gender } : {}),
      ...(formData.avatarUrl ? { avatarUrl: formData.avatarUrl } : {}),
      ...(formData.emergencyPhone ? { emergencyPhone: formData.emergencyPhone } : {})
    };

    try {
      let response;
      try {
        response = await api.put(`/owners/${user.id}`, payload);
      } catch {
        response = await api.put('/owners', payload);
      }

      const updated = response.data?.data || {};
      const normalized = {
        ...user,
        name: updated.name ?? formData.name,
        phone: updated.phone || updated.contactNumber || formData.phone,
        email: updated.email ?? formData.email,
        address: updated.address ?? formData.address,
        gender: updated.gender ?? formData.gender,
        avatarUrl: updated.avatarUrl || updated.avatar || formData.avatarUrl,
        emergencyPhone: updated.emergencyPhone ?? formData.emergencyPhone,
        updatedAt: updated.updatedAt || new Date().toISOString()
      };

      setUser(normalized);
      setFormData({
        name: normalized.name,
        phone: normalized.phone,
        address: normalized.address,
        email: normalized.email,
        gender: normalized.gender,
        avatarUrl: normalized.avatarUrl,
        emergencyPhone: normalized.emergencyPhone
      });

      setEditMode(false);
      setSuccess('Profile updated successfully');

      // update localStorage
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
        emergencyPhone: user.emergencyPhone || ''
      });
    }
    setError(''); setSuccess('');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Avatar + Basic info */}
          <Card className="user-profile profile-card">
            <Card.Header as="h3" className="user-profile card-header text-center" style={{ color: 'white' }}>
              User Profile
            </Card.Header>

            <Card.Body className="user-profile card-body">
              <div className="user-profile d-flex align-items-center mb-3">
                {(formData.avatarUrl || user.avatarUrl) ? (

                  <Image
                    src={formData.avatarUrl || user.avatarUrl}
                    roundedCircle width={72} height={72} className="me-3"
                    alt="avatar"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : (
                  <div className="user-profile rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: 72, height: 72, fontWeight: 700 }}>
                    {(user.name || 'U').slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{user.name}</div>
                  <div className="user-profile text-muted">{user.email}</div>

                </div>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form className="user-profile profile-form-grid">
                <Form.Group controlId="formName" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Name</Form.Label>
                  <Form.Control
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} disabled={!editMode}
                    required minLength={2} className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Email</Form.Label>
                  <Form.Control
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} disabled={!editMode || user.role === 'admin'}
                    required className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Phone</Form.Label>
                  <Form.Control
                    type="text" name="phone" value={formData.phone}
                    onChange={handleChange} disabled={!editMode}
                    required pattern="^\\+?\\d{8,15}$" className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formAddress" className="user-profile mb-3">
                  <Form.Label className="user-profile form-label">Address</Form.Label>
                  <Form.Control
                    as="textarea" name="address" value={formData.address}
                    onChange={handleChange} disabled={!editMode}
                    required className="user-profile form-control"
                  />
                </Form.Group>

                <Form.Group controlId="formRole" className="user-profile mb-3 span-2">
                  <Form.Label className="user-profile form-label">Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.role || ''}
                    disabled
                    className="user-profile form-control"
                  />
                </Form.Group>


                <div className="text-center">
                  {editMode ? (
                    <>
                      <Button variant="success" onClick={handleSave} className="me-2">Save</Button>
                      <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => { setEditMode(true); setError(''); setSuccess(''); }}
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