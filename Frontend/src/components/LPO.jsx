import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/LPO.css';

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
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
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
          setShowModal(false);
        }
      } else {
        // Create new LPO
        const response = await axios.post('/api/lpos', formData);
        if (response.data.success) {
          setSuccess('LPO created successfully');
          setLpos([...lpos, response.data.data]);
          resetForm();
          setShowModal(false);
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
    setShowModal(true);
  };

  // Reset form and close modal
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

  // Open modal for creating new LPO
  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="container-fluid py-4 LPO">
      <div style={{ backgroundColor: '#f8f9fab2', padding: '2%', borderRadius: '10px' }}>
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h1 className="h2 mb-4 text-dark lpo-title">LPO Management</h1>
            <button
              type="button"
              className="btn btn-info lpo-button"
              onClick={openCreateModal}
            >
              <i className="fas fa-plus me-1"></i> Create New LPO
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-danger alert-dismissible fade show lpo-alert" role="alert">
                {error}
                <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
              </div>
            </div>
          </div>
        )}
        {success && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="alert alert-success alert-dismissible fade show lpo-alert" role="alert">
                {success}
                <button type="button" className="btn-close" onClick={() => setSuccess('')} aria-label="Close"></button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Create/Update LPO */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="lpoModalLabel" aria-hidden={!showModal}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content lpo-modal">
              <div className="modal-header bg-info text-white lpo-header">
                <h5 className="modal-title" id="lpoModalLabel">
                  {editingId ? 'Update LPO' : 'Create New LPO'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium text-dark lpo-label">
                        <i className="fas fa-paw me-1"></i>Pet ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="pet_id"
                        value={formData.pet_id}
                        onChange={handleInputChange}
                        className="form-control lpo-input"
                        placeholder="Enter Pet ID"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium text-dark lpo-label">
                        <i className="fas fa-notes-medical me-1"></i>Diagnosis <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleInputChange}
                        className="form-control lpo-input"
                        placeholder="Enter diagnosis"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium text-dark lpo-label">
                        <i className="fas fa-pills me-1"></i>Prescription <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="prescription"
                        value={formData.prescription}
                        onChange={handleInputChange}
                        className="form-control lpo-input"
                        placeholder="Enter prescription"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-medium text-dark lpo-label">
                        <i className="fas fa-head-side-cough me-1"></i>Symptoms <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        className="form-control lpo-input"
                        placeholder="Enter symptoms"
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label fw-medium text-dark lpo-label">
                        <i className="fas fa-history me-1"></i>Past Treatments
                      </label>
                      <textarea
                        name="past_treatments"
                        value={formData.past_treatments}
                        onChange={handleInputChange}
                        rows={3}
                        className="form-control lpo-textarea"
                        placeholder="Enter previous treatment information (optional)"
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <label className="form-label fw-medium text-dark lpo-label">
                        <i className="fas fa-flask me-1"></i>Lab Results
                      </label>
                      <textarea
                        name="lab_results"
                        value={formData.lab_results}
                        onChange={handleInputChange}
                        rows={3}
                        className="form-control lpo-textarea"
                        placeholder="Enter lab results (optional)"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-info lpo-button"
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
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setShowModal(false);
                      }}
                      className="btn btn-secondary lpo-button-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}

        {/* LPO List */}
        <div className="row">
          <div className="col-12">
            <div className="card lpo-card">
              <div className="card-header bg-light lpo-header-list">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="card-title mb-0 h5 text-dark">LPO List</h2>
                  {loading && (
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-body p-0">
                {lpos.length === 0 && !loading ? (
                  <div className="text-center py-5 lpo-empty-state">
                    <div className="text-muted">
                      <i className="fas fa-file-medical fa-3x mb-3 opacity-75 text-info"></i>
                      <p className="mb-0">No LPOs yet. Create your first LPO!</p>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover table-striped mb-0 lpo-table">
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
                          <tr key={lpo._id} className="lpo-table-row">
                            <td className="align-middle">
                              <i className="fas fa-paw me-1 text-info"></i>{lpo.pet_id.name}
                            </td>
                            <td className="align-middle">
                              <span className="text-dark lpo-text-truncate" title={lpo.diagnosis}>
                                {lpo.diagnosis}
                              </span>
                            </td>
                            <td className="align-middle">
                              <span className="text-dark lpo-text-truncate" title={lpo.symptoms}>
                                {lpo.symptoms}
                              </span>
                            </td>
                            <td className="align-middle">
                              <span className="text-dark lpo-text-truncate" title={lpo.prescription}>
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
                                  className="btn btn-outline-info lpo-action-btn"
                                  title="Edit"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(lpo._id)}
                                  className="btn btn-outline-danger lpo-action-btn"
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
    </div>
  );
};

export default LPO;