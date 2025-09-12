import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/HealthRecord.css'; // Thêm import CSS custom
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const HealthRecord = () => {
  const [records, setRecords] = useState([]);
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

  // Fetch all health records
  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const fetchHealthRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health-records');
      console.log('Fetch response:', response.data);
      if (response.data.success) {
        setRecords(response.data.data);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err.response ? err.response.data : err.message);
      setError('Failed to fetch health records');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        // Update existing record
        response = await axios.put(`http://localhost:5000/api/health-records/${editingId}`, formData);
      } else {
        // Create new record
        response = await axios.post('http://localhost:5000/api/health-records', formData);
      }
      console.log('Submit response:', response.data);
      if (response.data.success) {
        fetchHealthRecords(); // Refresh the list
        setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
        setEditingId(null);
        setShowModal(false);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Submit error:', err.response ? err.response.data : err.message);
      setError('Operation failed');
    }
  };

  // Handle edit button click
  const handleEdit = (record) => {
    setFormData({
      pet_id: record.pet_id._id || record.pet_id, // Use ObjectId for form submission
      vet_id: record.vet_id._id || record.vet_id, // Use ObjectId for form submission
      visit_date: record.visit_date ? record.visit_date.split('T')[0] : '',
      diagnosis: record.diagnosis || '',
      treatment: record.treatment || ''
    });
    setEditingId(record._id);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/health-records/${id}`);
        console.log('Delete response:', response.data);
        if (response.data.success) {
          fetchHealthRecords(); // Refresh the list
          setError(null);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Delete error:', err.response ? err.response.data : err.message);
        setError('Failed to delete record');
      }
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
    setEditingId(null);
    setError(null);
  };

  // Handle add new record button
  const handleAddNew = () => {
    setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="container mt-4 HealthRecord" style={{ backgroundColor: '#f8f9fab2', padding: '2%', borderRadius: '10px' }}>
      <h1 className="text-center mb-4 health-title">Health Records Management</h1>

      {/* Button to open modal for adding new record */}
      <div className="text-center mb-4">
        <Button 
          variant="success" 
          className="health-button health-button-add" 
          onClick={handleAddNew}
        >
          <i className="fas fa-plus me-1"></i>Add New Record
        </Button>
      </div>

      {/* List of records */}
      <div className="card health-table-card">
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="card-title health-card-title">Health Records List</h2>
          </div>
          {error && <div className="alert alert-danger health-alert">{error}</div>}
          {records.length === 0 ? (
            <div className="text-center py-5 health-empty-state">
              <i className="fas fa-file-medical fa-3x mb-3 text-muted opacity-75"></i>
              <p className="text-muted mb-0">No records found. Add your first health record!</p>
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
                  {records.map((record) => (
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
                          className="btn btn-warning btn-sm me-2 health-action-btn"
                          style={{ borderRadius: '8px' }}
                          onClick={() => handleEdit(record)}
                        >
                          <i className="fas fa-edit me-1"></i>Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm health-action-btn"
                          style={{ borderRadius: '8px' }}
                          onClick={() => handleDelete(record._id)}
                        >
                          <i className="fas fa-trash me-1"></i>Delete
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
          <Modal.Title className="health-modal-title">{editingId ? 'Edit' : 'Add'} Health Record</Modal.Title>
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
                {editingId ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HealthRecord;