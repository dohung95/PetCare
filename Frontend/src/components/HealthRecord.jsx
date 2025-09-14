import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/HealthRecord.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const HealthRecord = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [displayedRecords, setDisplayedRecords] = useState([]); // New state for search-filtered records
  const [formData, setFormData] = useState({
    visit_date: '',
    diagnosis: '',
    treatment: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ownerId, setOwnerId] = useState('');

  // Get ownerId from localStorage and scroll to top
  useEffect(() => {
    const storedOwnerId = localStorage.getItem('ownerId');
    setOwnerId(storedOwnerId || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fetch health records based on ownerId
  useEffect(() => {
    if (ownerId) {
      fetchHealthRecords();
    }
  }, [ownerId]);

  // Filter records based on vet_id matching ownerId
  useEffect(() => {
    if (ownerId && records.length > 0) {
      const matchedRecords = records.filter(record => record.vet_id === ownerId);
      setFilteredRecords(matchedRecords);
    } else {
      setFilteredRecords([]);
    }
  }, [records, ownerId]);

  // Filter records based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setDisplayedRecords(filteredRecords);
    } else {
      const lowerQuery = searchQuery.toLowerCase().trim();
      const searchedRecords = filteredRecords.filter(record => {
        const petName = record.pet_id?.name || record.pet_name || '';
        return (
          petName.toLowerCase().includes(lowerQuery) ||
          (record.diagnosis || '').toLowerCase().includes(lowerQuery) ||
          (record.treatment || '').toLowerCase().includes(lowerQuery)
        );
      });
      setDisplayedRecords(searchedRecords);
    }
  }, [filteredRecords, searchQuery]);

  const fetchHealthRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health-records', {
        params: { ownerId }
      });
      console.log('Fetch response:', response.data);
      if (response.data.success) {
        setRecords(response.data.data);
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error('Fetch error:', err.response ? err.response.data : err.message);
      setError('Unable to load health records');
    }
  };

  // Handle input change in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle form submission for updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        response = await axios.put(`http://localhost:5000/api/health-records/${editingId}`, formData);
        console.log('Submit response:', response.data);
        if (response.data.success) {
          fetchHealthRecords();
          setFormData({ visit_date: '', diagnosis: '', treatment: '' });
          setEditingId(null);
          setShowModal(false);
          setError(null);
        } else {
          setError(response.data.message);
        }
      }
    } catch (err) {
      console.error('Submit error:', err.response ? err.response.data : err.message);
      setError('Operation failed');
    }
  };

  // Handle edit button
  const handleEdit = (record) => {
    setFormData({
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
    setFormData({ visit_date: '', diagnosis: '', treatment: '' });
    setEditingId(null);
    setError(null);
  };

  return (
    <div className="container mt-4 HealthRecord" style={{ backgroundColor: '#f8f9fab2', padding: '2%', borderRadius: '10px' }}>
      <h1 className="text-center mb-4 health-title">Health Record</h1>

      {/* Search Input */}
      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control health-input"
            placeholder="Search by Pet Name, Diagnosis, or Treatment"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              className="btn btn-outline-secondary health-button"
              type="button"
              onClick={handleClearSearch}
            >
              <i className="fas fa-times"></i> Clear
            </button>
          )}
        </div>
      </div>

      {/* Record List */}
      <div className="card health-table-card">
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="card-title health-card-title">Health Record List</h2>
          </div>
          {error && <div className="alert alert-danger health-alert">{error}</div>}
          {displayedRecords.length === 0 ? (
            <div className="text-center py-5 health-empty-state">
              <i className="fas fa-file-medical fa-3x mb-3 text-muted opacity-75"></i>
              <p className="text-muted mb-0">
                {searchQuery ? 'No health records match your search.' : 'No matching health records found.'}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0 health-table">
                <thead className="table-light">
                  <tr>
                    <th>Pet Name</th>
                    <th>Visit Date</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRecords.map((record) => (
                    <tr key={record._id} className="health-table-row">
                      <td className="align-middle">
                        <i className="fas fa-paw me-1 text-info"></i>{record.pet_id?.name || record.pet_name || '-'}
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

      {/* Modal for edit form */}
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