import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LPO = () => {
  const [lpos, setLpos] = useState([]);
  const [formData, setFormData] = useState({
    pet_id: '',
    diagnosis: '',
    prescription: '',
    symptoms: '',
    past_treatments: '',
    lab_results: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch LPO list when component mounts
  useEffect(() => {
    fetchLPOs();
  }, []);

  const fetchLPOs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/lpos');
      if (response.data.success) {
        setLpos(response.data.data);
      }
    } catch (err) {
      setError('Cannot load LPO list');
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  // Handle form submission (create or update LPO)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pet_id || !formData.diagnosis || !formData.prescription || !formData.symptoms) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      if (editingId) {
        // Update LPO
        const response = await axios.put(`/api/lpos/${editingId}`, formData);
        if (response.data.success) {
          setSuccess('LPO updated successfully');
          setLpos(lpos.map(lpo => lpo._id === editingId ? response.data.data : lpo));
          resetForm();
        }
      } else {
        // Create new LPO
        const response = await axios.post('/api/lpos', formData);
        if (response.data.success) {
          setSuccess('LPO created successfully');
          setLpos([...lpos, response.data.data]);
          resetForm();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle LPO deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this LPO?')) {
      try {
        const response = await axios.delete(`/api/lpos/${id}`);
        if (response.data.success) {
          setSuccess('LPO deleted successfully');
          setLpos(lpos.filter(lpo => lpo._id !== id));
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Cannot delete LPO');
      }
    }
  };

  // Handle LPO editing
  const handleEdit = (lpo) => {
    setFormData({
      pet_id: lpo.pet_id?._id || lpo.pet_id || '',
      diagnosis: lpo.diagnosis || '',
      prescription: lpo.prescription || '',
      symptoms: lpo.symptoms || '',
      past_treatments: lpo.past_treatments || '',
      lab_results: lpo.lab_results || ''
    });
    setEditingId(lpo._id);
    setError('');
    setSuccess('');
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      pet_id: '',
      diagnosis: '',
      prescription: '',
      symptoms: '',
      past_treatments: '',
      lab_results: ''
    });
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <h1 className="h2 mb-4 text-dark">LPO Management</h1>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {success}
              <button type="button" className="btn-close" onClick={() => setSuccess('')} aria-label="Close"></button>
            </div>
          </div>
        </div>
      )}

      {/* Form to create/update LPO */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0 h5">
                {editingId ? 'Update LPO' : 'Create New LPO'}
              </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium text-dark">
                      Pet ID <span className="text-danger">*</span>
                    </label>
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium text-dark">
                      Diagnosis <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter diagnosis"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium text-dark">
                      Prescription <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="prescription"
                      value={formData.prescription}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter prescription"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium text-dark">
                      Symptoms <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter symptoms"
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label fw-medium text-dark">
                      Past Treatments
                    </label>
                    <textarea
                      name="past_treatments"
                      value={formData.past_treatments}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-control"
                      placeholder="Enter previous treatment information (optional)"
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <label className="form-label fw-medium text-dark">
                      Lab Results
                    </label>
                    <textarea
                      name="lab_results"
                      value={formData.lab_results}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-control"
                      placeholder="Enter lab results (optional)"
                    />
                  </div>
                </div>
                
                <div className="d-flex flex-wrap gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      editingId ? 'Update' : 'Create'
                    )}
                  </button>
                  {(editingId || formData.diagnosis) && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* LPO List */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title mb-0 h5 text-dark">LPO List</h2>
                {loading && (
                  <div className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="card-body p-0">
              {lpos.length === 0 && !loading ? (
                <div className="text-center py-5">
                  <div className="text-muted">
                    <i className="fas fa-inbox fa-3x mb-3 opacity-75"></i>
                    <p className="mb-0">No LPOs yet. Create your first LPO!</p>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Pet</th>
                        <th scope="col">Diagnosis</th>
                        <th scope="col">Symptoms</th>
                        <th scope="col">Prescription</th>
                        <th scope="col">Created Date</th>
                        <th scope="col" className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lpos.map((lpo) => (
                        <tr key={lpo._id}>
                          <td>
                            <div className="fw-medium text-dark">
                              {lpo.pet_id?._id || lpo.pet_id || 'N/A'}
                            </div>
                            {lpo.pet_id?.name && (
                              <small className="text-muted">{lpo.pet_id.name}</small>
                            )}
                          </td>
                          <td className="align-middle">
                            <span className="text-dark" style={{ maxWidth: '200px', display: 'inline-block' }} title={lpo.diagnosis}>
                              {lpo.diagnosis}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span className="text-dark" style={{ maxWidth: '200px', display: 'inline-block' }} title={lpo.symptoms}>
                              {lpo.symptoms}
                            </span>
                          </td>
                          <td className="align-middle">
                            <span className="text-dark" style={{ maxWidth: '200px', display: 'inline-block' }} title={lpo.prescription}>
                              {lpo.prescription}
                            </span>
                          </td>
                          <td className="align-middle">
                            <small className="text-muted">
                              {new Date(lpo.createdAt).toLocaleDateString('en-US')}
                            </small>
                          </td>
                          <td className="align-middle text-center">
                            <div className="btn-group btn-group-sm" role="group">
                              <button
                                type="button"
                                onClick={() => handleEdit(lpo)}
                                className="btn btn-outline-primary"
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(lpo._id)}
                                className="btn btn-outline-danger"
                                title="Delete"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
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
      </div>
    </div>
  );
};

export default LPO;