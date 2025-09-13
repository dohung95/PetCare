import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';
import './Css/AppointmentManagement.css'; // Import CSS custom

const API_BASE_URL = 'http://localhost:5000/api';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Format date and time
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Fetch appointments with populated pet_id and owner_id
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/appointments`);
      if (response.data.success) {
        setAppointments(response.data.data);
        setFilteredAppointments(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filter appointments by pet name, owner name, status, or date
  useEffect(() => {
    const filtered = appointments.filter(appointment =>
      (appointment.pet_id?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.owner_id?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(appointment.appointment_time).toLocaleDateString('en-GB').includes(searchTerm)
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  // Memoized table rows
  const tableRows = useMemo(() =>
    filteredAppointments.map((appointment) => (
      <tr key={appointment._id}>
        <td className="px-3 py-2">{appointment.pet_id?.name || 'N/A'}</td>
        <td className="px-3 py-2">{appointment.owner_id?.name || 'N/A'}</td>
        <td className="px-3 py-2">{formatDateTime(appointment.appointment_time)}</td>
        <td className="px-3 py-2">
          <span className={`badge ${appointment.status === 'pending' ? 'bg-warning text-dark' :
            appointment.status === 'confirmed' ? 'bg-success' :
              appointment.status === 'cancelled' ? 'bg-danger' :
                'bg-primary'
            }`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </td>
        <td className="px-3 py-2">{formatDateTime(appointment.createdAt)}</td>
        <td className="px-3 py-2">
          <button
            onClick={() => handleEdit(appointment)}
            className="btn btn-link text-primary p-0 me-2"
            aria-label={`Edit appointment for ${appointment.pet_id?.name || 'N/A'}`}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(appointment._id)}
            className="btn btn-link text-danger p-0"
            aria-label={`Delete appointment for ${appointment.pet_id?.name || 'N/A'}`}
          >
            Delete
          </button>
        </td>
      </tr>
    )), [filteredAppointments]
  );

  const handleSubmit = async (data) => {
    try {
      setFormLoading(true);
      let response;
      if (editingId) {
        response = await axios.put(`${API_BASE_URL}/appointments/${editingId}`, data);
        setMessage({ text: 'Updated successfully!', type: 'success' });
      } else {
        response = await axios.post(`${API_BASE_URL}/appointments`, data);
        setMessage({ text: 'Created successfully!', type: 'success' });
      }
      setShowModal(false);
      setEditingId(null);
      fetchAppointments();
    } catch (err) {
      setMessage({ text: err.response?.data?.message || 'Error saving data', type: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`${API_BASE_URL}/appointments/${id}`);
        setMessage({ text: 'Deleted successfully!', type: 'success' });
        fetchAppointments();
      } catch (err) {
        setMessage({ text: err.response?.data?.message || 'Error deleting data', type: 'error' });
      }
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment._id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="container py-4 AppointmentManagement">
      <div style={{ backgroundColor: '#f8f9fab2', padding: '2%', borderRadius: '10px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Appointment Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
            aria-label="Add new appointment"
          >
            Add New
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Pet Name, Owner Name, status, or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Messages */}
        {message.text && (
          <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show mb-4`} role="alert">
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ text: '', type: '' })}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Loading spinner */}
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">Pet Name</th>
                  <th scope="col">Owner Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length > 0 ? tableRows : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      {searchTerm ? 'No results found' : 'No appointments available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4" role="alert">{error}</div>
        )}

        {/* Modal */}
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" aria-hidden={!showModal}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? 'Edit Appointment' : 'Add New Appointment'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <AppointmentForm
                  initialData={editingId ? {
                    pet_id: appointments.find(a => a._id === editingId)?.pet_id?._id || '',
                    owner_id: appointments.find(a => a._id === editingId)?.owner_id?._id || '',
                    vet_id: appointments.find(a => a._id === editingId)?.vet_id?._id || '',
                    appointment_time: appointments.find(a => a._id === editingId)?.appointment_time
                      ? new Date(appointments.find(a => a._id === editingId).appointment_time).toISOString().slice(0, 16)
                      : '',
                    status: appointments.find(a => a._id === editingId)?.status || 'pending'
                  } : {}}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isEditing={!!editingId}
                  loading={formLoading}
                />
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
    </div>
  );
};

export default AppointmentManagement;