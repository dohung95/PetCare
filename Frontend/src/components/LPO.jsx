import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/LPO.css';

// Create Form Component
const CreateLPOForm = ({ setSuccess, setError, setLpos, lpos, setShowModal, resetForm }) => {
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    symptoms: '',
    past_treatments: '',
  });
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [ownerLoading, setOwnerLoading] = useState(false);
  const [petsLoading, setPetsLoading] = useState(false);
  const [labResultFiles, setLabResultFiles] = useState([]);

  const handlePhoneNumberChange = async (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setError('');
    setOwners([]);
    setPets([]);
    setSelectedPet(null);

    if (value.trim() === '') {
      return;
    }

    try {
      setOwnerLoading(true);
      const response = await axios.get(`http://localhost:5000/api/owners_check?phone=${encodeURIComponent(value)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        const ownerData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        const filteredOwners = ownerData.filter(owner => owner.phone === value);
        setOwners(filteredOwners);
        if (filteredOwners.length > 0) {
          const ownerId = filteredOwners[0]._id;
          await fetchPets(ownerId);
        } else {
          setPets([]);
          setSelectedPet(null);
          setError('No owner found with this phone number');
        }
      } else {
        setError(response.data.message || 'Failed to fetch owners');
      }
    } catch (err) {
      setError(`Error fetching owners: ${err.response?.data?.message || err.message}`);
      setOwners([]);
      setPets([]);
      setSelectedPet(null);
    } finally {
      setOwnerLoading(false);
    }
  };

  const fetchPets = async (ownerId) => {
    try {
      setPetsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/pets?owner_id=${ownerId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        const petData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        const filteredPets = petData.filter(pet => pet.owner_id === ownerId);
        setPets(filteredPets);
        setSelectedPet(null);
      } else {
        setError(response.data.message || 'Failed to fetch pets');
      }
    } catch (err) {
      setError(`Error fetching pets: ${err.response?.data?.message || err.message}`);
      setPets([]);
    } finally {
      setPetsLoading(false);
    }
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet._id === selectedPet?._id ? null : pet);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleFileChange = (e) => {
    setLabResultFiles(e.target.files);
    setError('');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!selectedPet || !formData.diagnosis || !formData.prescription || !formData.symptoms) {
      setError('Please select a pet and fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const submissionData = new FormData();
      submissionData.append('pet_id', selectedPet._id);
      submissionData.append('diagnosis', formData.diagnosis);
      submissionData.append('prescription', formData.prescription);
      submissionData.append('symptoms', formData.symptoms);
      submissionData.append('past_treatments', formData.past_treatments || '');
      for (let i = 0; i < labResultFiles.length; i++) {
        submissionData.append('lab_results', labResultFiles[i]);
      }

      const response = await axios.post('http://localhost:5000/api/lpos', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setSuccess('LPO created successfully');
        setLpos([...lpos, response.data.data]);
        resetForm();
        setShowModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-medium text-dark lpo-label">
            <i className="fas fa-phone me-1"></i>Phone Number <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="form-control lpo-input"
            placeholder="Enter phone number"
            required
          />
          {ownerLoading && <div className="text-muted small mt-1">Searching...</div>}
          {owners.length === 0 && phoneNumber.trim() !== '' && !ownerLoading && (
            <div className="text-danger small mt-1">No owner found with this phone number.</div>
          )}
          {owners.length > 0 && (
            <div className="mt-2">
              <p>Found Owners:</p>
              <ul className="list-group">
                {owners.map((owner) => (
                  <li key={owner._id} className="list-group-item">
                    {owner.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
        {pets.length > 0 && (
          <div className="col-12 mb-3">
            <label className="form-label fw-medium text-dark lpo-label">
              <i className="fas fa-paw me-1"></i>Select Pet <span className="text-danger">*</span>
            </label>
            {petsLoading ? (
              <div className="text-muted">Loading pets...</div>
            ) : (
              <div className="pet-list">
                {pets.map((pet) => (
                  <div key={pet._id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="selectedPet"
                      id={`pet-${pet._id}`}
                      checked={selectedPet?._id === pet._id}
                      onChange={() => handlePetSelect(pet)}
                    />
                    <label className="form-check-label" htmlFor={`pet-${pet._id}`}>
                      {pet.name} ({pet.species || 'Unknown'})
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
          <input
            type="file"
            name="lab_results"
            multiple
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            className="form-control lpo-input"
          />
        </div>
      </div>
      <div className="d-flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={loading || !selectedPet}
          className="btn btn-info lpo-button"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Processing...
            </>
          ) : (
            'Create'
          )}
        </button>
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="btn btn-secondary lpo-button-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// Update Form Component
const UpdateLPOForm = ({ setSuccess, setError, setLpos, lpos, editingId, setShowModal, resetForm, initialData }) => {
  const [formData, setFormData] = useState({
    diagnosis: initialData.diagnosis || '',
    prescription: initialData.prescription || '',
    symptoms: initialData.symptoms || '',
    past_treatments: initialData.past_treatments || '',
    lab_results: initialData.lab_results || [],
  });
  const [loading, setLoading] = useState(false);
  const [labResultFiles, setLabResultFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleFileChange = (e) => {
    setLabResultFiles(e.target.files);
    setError('');
  };

  const handleDeleteImage = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/lpos/${editingId}/lab_results/${index}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        setFormData({
          ...formData,
          lab_results: formData.lab_results.filter((_, i) => i !== index),
        });
        setSuccess('Image deleted successfully');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting image');
    }
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!initialData.pet_id?._id || !formData.diagnosis || !formData.prescription || !formData.symptoms) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const submissionData = new FormData();
      submissionData.append('pet_id', initialData.pet_id._id);
      submissionData.append('diagnosis', formData.diagnosis);
      submissionData.append('prescription', formData.prescription);
      submissionData.append('symptoms', formData.symptoms);
      submissionData.append('past_treatments', formData.past_treatments || '');
      for (let i = 0; i < labResultFiles.length; i++) {
        submissionData.append('lab_results', labResultFiles[i]);
      }

      const response = await axios.put(`http://localhost:5000/api/lpos/${editingId}`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setSuccess('LPO updated successfully');
        setLpos(lpos.map(lpo => lpo._id === editingId ? response.data.data : lpo));
        resetForm();
        setShowModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-medium text-dark lpo-label">
              <i className="fas fa-paw me-1"></i>Pet Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={initialData.pet_id?.name || 'N/A'}
              className="form-control lpo-input"
              readOnly
              disabled
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
            <input
              type="file"
              name="lab_results"
              multiple
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              className="form-control lpo-input"
            />
            {formData.lab_results.length > 0 && (
              <div className="mt-2">
                <p>Existing Images:</p>
                {formData.lab_results.map((url, index) => (
                  <div key={index} className="d-inline-block me-2 position-relative">
                    <img
                      src={`http://localhost:5000${url.startsWith('/') ? url : '/' + url}`}
                      alt={`Lab result ${index}`}
                      style={{ maxWidth: '100px', cursor: 'pointer' }}
                      onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                      onClick={() => handleImageClick(`http://localhost:5000${url.startsWith('/') ? url : '/' + url}`)}
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              'Update'
            )}
          </button>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn btn-secondary lpo-button-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
      {selectedImage && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Image</h5>
                <button type="button" className="btn-close" onClick={handleCloseImageModal} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedImage} alt="Enlarged lab result" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedImage && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

// Main LPO Component
const LPO = () => {
  const [lpos, setLpos] = useState([]);
  const [filteredLpos, setFilteredLpos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchLPOs();
  }, []);

  const fetchLPOs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/lpos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        setLpos(response.data.data);
        setFilteredLpos(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load LPO list');
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Please log in again');
        localStorage.removeItem('token');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredLpos(lpos);
    } else {
      const filtered = lpos.filter((lpo) =>
        lpo.pet_id?.name?.toLowerCase().includes(query)
      );
      setFilteredLpos(filtered);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setIsEditMode(false);
    setEditData({});
    setError('');
    setSuccess('');
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
    setIsEditMode(false);
  };

  const handleEdit = (lpo) => {
    setEditData({
      pet_id: lpo.pet_id || {},
      pet_name: lpo.pet_id?.name || 'N/A',
      diagnosis: lpo.diagnosis || '',
      prescription: lpo.prescription || '',
      symptoms: lpo.symptoms || '',
      past_treatments: lpo.past_treatments || '',
      lab_results: lpo.lab_results || [],
    });
    setEditingId(lpo._id);
    setError('');
    setSuccess('');
    setShowModal(true);
    setIsEditMode(true);
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container-fluid py-4 LPO">
      <div className="lpo-container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <h1 className="h2 mb-4 lpo-title">Log Processing and Observation</h1>
            <div className="d-flex align-items-center gap-3">
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control lpo-input"
                  placeholder="Search by pet name..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <button
                type="button"
                className="btn btn-info lpo-button"
                onClick={openCreateModal}
              >
                <i className="fas fa-plus me-1"></i> Create New
              </button>
            </div>
          </div>
        </div>

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

        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="lpoModalLabel" aria-hidden={!showModal}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content lpo-modal">
              <div className="modal-header lpo-header">
                <h5 className="modal-title" id="lpoModalLabel">
                  {isEditMode ? 'Update' : 'Create New'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {isEditMode ? (
                  <UpdateLPOForm
                    setSuccess={setSuccess}
                    setError={setError}
                    setLpos={setLpos}
                    lpos={lpos}
                    editingId={editingId}
                    setShowModal={setShowModal}
                    resetForm={resetForm}
                    initialData={editData}
                  />
                ) : (
                  <CreateLPOForm
                    setSuccess={setSuccess}
                    setError={setError}
                    setLpos={setLpos}
                    lpos={lpos}
                    setShowModal={setShowModal}
                    resetForm={resetForm}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}

        <div className="row">
          <div className="col-12">
            <div className="card lpo-card">
              <div className="card-header lpo-header-list">
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="card-title mb-0 h5">LPO List</h2>
                  {loading && (
                    <div className="spinner-border spinner-border-sm text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-body p-0">
                {filteredLpos.length === 0 && !loading ? (
                  <div className="text-center py-5 lpo-empty-state">
                    <div className="text-muted">
                      <i className="fas fa-file-medical fa-3x mb-3 text-info"></i>
                      <p className="mb-0">{searchQuery ? 'No pets match your search.' : 'No LPOs yet. Create your first LPO!'}</p>
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
                          <th scope="col">Lab Results</th>
                          <th scope="col">Created Date</th>
                          <th scope="col" className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLpos.map((lpo) => (
                          <tr key={lpo._id} className="lpo-table-row">
                            <td className="align-middle">
                              <i className="fas fa-paw me-1 text-info"></i>{lpo.pet_id?.name || 'N/A'}
                            </td>
                            <td className="align-middle">
                              <span className="lpo-text-truncate" title={lpo.diagnosis}>
                                {lpo.diagnosis}
                              </span>
                            </td>
                            <td className="align-middle">
                              <span className="lpo-text-truncate" title={lpo.symptoms}>
                                {lpo.symptoms}
                              </span>
                            </td>
                            <td className="align-middle">
                              <span className="lpo-text-truncate" title={lpo.prescription}>
                                {lpo.prescription}
                              </span>
                            </td>
                            <td className="align-middle">
                              {lpo.lab_results && lpo.lab_results.length > 0 ? (
                                lpo.lab_results.map((url, index) => (
                                  <img
                                    key={index}
                                    src={`http://localhost:5000${url.startsWith('/') ? url : '/' + url}`}
                                    alt={`Lab result ${index}`}
                                    style={{ maxWidth: '50px', marginRight: '5px', cursor: 'pointer' }}
                                    onError={(e) => (e.target.src = '/placeholder-image.jpg')}
                                    onClick={() => handleImageClick(`http://localhost:5000${url.startsWith('/') ? url : '/' + url}`)}
                                  />
                                ))
                              ) : (
                                'None'
                              )}
                            </td>
                            <td className="align-middle">
                              <small className="text-muted">
                                {new Date(lpo.createdAt).toLocaleDateString('en-US')}
                              </small>
                            </td>
                            <td className="align-middle text-center">
                              <button
                                type="button"
                                onClick={() => handleEdit(lpo)}
                                className="btn btn-info lpo-action-btn px-3 py-2"
                                title="Edit LPO"
                              >
                                <i className="fas fa-edit me-1"></i> Edit
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
        </div>
      </div>
      {selectedImage && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Image</h5>
                <button type="button" className="btn-close" onClick={handleCloseImageModal} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedImage} alt="Enlarged lab result" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedImage && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default LPO;