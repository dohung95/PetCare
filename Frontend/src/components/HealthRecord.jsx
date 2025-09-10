import React, { useState, useEffect } from 'react';

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
      const response = await fetch('http://localhost:3000/api/health-records');
      const result = await response.json();
      if (result.success) {
        setRecords(result.data);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
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
        response = await fetch(`http://localhost:3000/api/health-records/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        // Create new record
        response = await fetch('http://localhost:3000/api/health-records', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      const result = await response.json();
      if (result.success) {
        fetchHealthRecords(); // Refresh the list
        setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
        setEditingId(null);
        setError(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Operation failed');
    }
  };

  // Handle edit button click
  const handleEdit = (record) => {
    setFormData({
      pet_id: record.pet_id,
      vet_id: record.vet_id,
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
        const response = await fetch(`http://localhost:3000/api/health-records/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
          fetchHealthRecords(); // Refresh the list
          setError(null);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to delete record');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Health Records Management</h1>
      
      {/* Form for creating/updating records */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{editingId ? 'Edit' : 'Add'} Health Record</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Pet ID</label>
              <input
                type="text"
                name="pet_id"
                value={formData.pet_id}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Pet ID"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Vet ID</label>
              <input
                type="text"
                name="vet_id"
                value={formData.vet_id}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Vet ID"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Visit Date</label>
              <input
                type="date"
                name="visit_date"
                value={formData.visit_date}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Diagnosis</label>
              <input
                type="text"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Diagnosis"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Treatment</label>
              <input
                type="text"
                name="treatment"
                value={formData.treatment}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Treatment"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setFormData({ pet_id: '', vet_id: '', visit_date: '', diagnosis: '', treatment: '' });
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* List of records */}
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Health Records List</h2>
          {records.length === 0 ? (
            <p>No records found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Pet ID</th>
                    <th>Vet ID</th>
                    <th>Visit Date</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record._id}>
                      <td>{record.pet_id}</td>
                      <td>{record.vet_id}</td>
                      <td>{record.visit_date ? new Date(record.visit_date).toLocaleDateString('en-US') : '-'}</td>
                      <td>{record.diagnosis || '-'}</td>
                      <td>{record.treatment || '-'}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(record._id)}
                        >
                          Delete
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