import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/HealthRecord.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const HealthRecord = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [formData, setFormData] = useState({
    pet_id: '',
    vet_id: '',
    visit_date: '',
    diagnosis: '',
    treatment: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Assume logged-in user's ID is available
  const loggedInUserId = localStorage.getItem('userId'); // Replace with your auth mechanism (Redux, Context, etc.)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch health records filtered by vet_id
  useEffect(() => {
    if (loggedInUserId) {
      fetchHealthRecords();
    } else {
      setError('Please log in to view health records');
    }
  }, [loggedInUserId]);

  const fetchHealthRecords = async () => {
    try {
      // Fetch records with vet_id filter
      const response = await axios.get(`http://localhost:5000/api/health-records?vet_id=${loggedInUserId}`);
      console.log('Fetch response:', response.data);
      if (response.data.success) {
        setRecords(response.data.data);
        setFilteredRecords(response.data.data);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err.response ? err.response.data : err.message);
      setError('Failed to fetch health records');
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = records.filter(record => 
      (record.pet_id?.name?.toLowerCase() || '').includes(term) ||
      (record.vet_id?.name?.toLowerCase() || '').includes(term) ||
      (record.diagnosis?.toLowerCase() || '').includes(term)
    );
    setFilteredRecords(filtered);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/health-records/${editingId}`, formData);
      console.log('Submit response:', response.data);
      if (response.data.success) {
        fetchHealthRecords();
        setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
        setEditingId(null);
        setShowModal(false);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Submit error:', err.response ? err.response.data : err.message);
      setError('Update failed');
    }
  };

  // Handle edit button click
  const handleEdit = (record) => {
    setFormData({
      pet_id: record.pet_id._id || record.pet_id,
      vet_id: record.vet_id._id || record.vet_id,
      visit_date: record.visit_date ? record.visit_date.split('T')[0] : '',
      diagnosis: record.diagnosis || '',
      treatment: record.treatment || ''
    });
    setEditingId(record._id);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="container mt-4 HealthRecord" style={{ backgroundColor: '#f8f9fab2', padding: '2%', borderRadius: '10px' }}>
      <h1 className="text-center mb-4 health-title">Health Records Management</h1>

      {/* Search input */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control health-input"
            placeholder="Search by pet name, veterinarian name, or diagnosis"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* List of records */}
      <div className="card health-table-card">
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="card-title health-card-title">Health Records List</h2>
          </div>
          {error && <div className="alert alert-danger health-alert">{error}</div>}
          {filteredRecords.length === 0 ? (
            <div className="text-center py-5 health-empty-state">
              <i className="fas fa-file-medical fa-3x mb-3 text-muted opacity-75"></i>
              <p className="text-muted mb-0">No records found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0 health-table">
                <thead className="table-light">
                  <tr>
                    <th>Pet Name</th>
                    <th>Veterinarian Name</th>
                    <th>Visit Date</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record._id} className="health-table-row">
                      <td className="align-middle">
                        <i className="fas fa-paw me-1 text-info"></i>{record.pet_id?.name || record.pet_name || '-'}
                      </td>
                      <td className="align-middle">
                        <i className="fas fa-user-md me-1 text-success"></i>{record.vet_id?.name || record.vet_name || '-'}
                      </td>
                      <td className="align-middle">
                        {record.visit_date ? new Date(record.visit_date).toLocaleDateString('en-US') : '-'}
                      </td>
                      <td className="align-middle">
                        <span className="health-text-truncate" title={record.diagnosis}>{record.diagnosis || '-'}</span>
                      </td>
                      <td className="align-middle">
                        <span className="health-text-truncate" title={record.treatment}>{record.treatment || '-'}</span>
                      </td>
                      <td className="align-middle text-center">
                        <button
                          className="btn btn-warning btn-sm health-action-btn"
                          style={{ borderRadius: '8px' }}
                          onClick={() => handleEdit(record)}
                        >
                          <i className="fas fa-edit me-1"></i>Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for form */}
      <Modal show={showModal} onHide={handleCloseModal} centered className="health-modal">
        <Modal.Header closeButton>
          <Modal.Title className="health-modal-title">Edit Health Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger health-alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label health-label">
                  <i className="fas fa-paw me-1"></i>Pet ID
                </label>
                <input
                  type="text"
                  name="pet_id"
                  value={formData.pet_id}
                  onChange={handleInputChange}
                  className="form-control health-input"
                  placeholder="Enter Pet ID"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label health-label">
                  <i className="fas fa-user-md me-1"></i>Vet ID
                </label>
                <input
                  type="text"
                  name="vet_id"
                  value={formData.vet_id}
                  onChange={handleInputChange}
                  className="form-control health-input"
                  placeholder="Enter Vet ID"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label health-label">
                  <i className="fas fa-calendar-alt me-1"></i>Visit Date
                </label>
                <input
                  type="date"
                  name="visit_date"
                  value={formData.visit_date}
                  onChange={handleInputChange}
                  className="form-control health-input"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label health-label">
                  <i className="fas fa-notes-medical me-1"></i>Diagnosis
                </label>
                <input
                  type="text"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  className="form-control health-input"
                  placeholder="Enter Diagnosis"
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label health-label">
                  <i className="fas fa-pills me-1"></i>Treatment
                </label>
                <input
                  type="text"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleInputChange}
                  className="form-control health-input health-treatment-input"
                  placeholder="Enter Treatment"
                />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                className="health-button health-button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                className="health-button health-button-add"
              >
                Update
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HealthRecord;