import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/HealthRecord.css'; // Thêm import CSS custom

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

  return (
    <div className="container mt-4 HealthRecord">
      <h1 className="text-center mb-4 health-title">Health Records Management</h1> {/* Thêm class */}
      
      {/* Form for creating/updating records */}
      <div className="card mb-4 health-form-card"> {/* Thêm class, bỏ inline style */}
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="card-title health-card-title">{editingId ? 'Edit' : 'Add'} Health Record</h2>
          </div>
          {error && <div className="alert alert-danger health-alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label health-label">
                  <i className="fas fa-paw me-1"></i>Pet ID {/* Thêm icon */}
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
                  <i className="fas fa-user-md me-1"></i>Vet ID {/* Thêm icon */}
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
                  <i className="fas fa-calendar-alt me-1"></i>Visit Date {/* Thêm icon */}
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
                  <i className="fas fa-notes-medical me-1"></i>Diagnosis {/* Thêm icon */}
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
                  <i className="fas fa-pills me-1"></i>Treatment {/* Thêm icon */}
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
            <div className="d-flex justify-content-center gap-2">
              <button 
                type="submit" 
                className="btn health-button health-button-add" 
              >
                {editingId ? 'Update' : 'Add'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary health-button health-button-cancel" 
                  onClick={() => {
                    setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* List of records */}
      <div className="card health-table-card"> {/* Thêm class */}
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="card-title health-card-title">Health Records List</h2>
          </div>
          {records.length === 0 ? (
            <div className="text-center py-5 health-empty-state"> {/* Thêm class */}
              <i className="fas fa-file-medical fa-3x mb-3 text-muted opacity-75"></i>
              <p className="text-muted mb-0">No records found. Add your first health record!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0 health-table"> {/* Thêm table-hover và class */}
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
                    <tr key={record._id} className="health-table-row"> {/* Thêm class */}
                      <td className="align-middle">
                        <i className="fas fa-paw me-1 text-info"></i>{record.pet_id?.name || record.pet_name || '-'} {/* Thêm icon */}
                      </td>
                      <td className="align-middle">
                        <i className="fas fa-user-md me-1 text-success"></i>{record.vet_id?.name || record.vet_name || '-'} {/* Thêm icon */}
                      </td>
                      <td className="align-middle">
                        {record.visit_date ? new Date(record.visit_date).toLocaleDateString('en-US') : '-'}
                      </td>
                      <td className="align-middle">
                        <span className="health-text-truncate" title={record.diagnosis}>{record.diagnosis || '-'}</span> {/* Thêm truncate */}
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
                          <i className="fas fa-edit me-1"></i>Edit {/* Thêm icon */}
                        </button>
                        <button
                          className="btn btn-danger btn-sm health-action-btn"
                          style={{ borderRadius: '8px' }}
                          onClick={() => handleDelete(record._id)}
                        >
                          <i className="fas fa-trash me-1"></i>Delete {/* Thêm icon */}
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
    </div>
  );
};

export default HealthRecord;