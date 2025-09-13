import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';
import './Css/AppointmentManagement.css';

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

  // Get ownerId from localStorage
  const ownerId = localStorage.getItem('ownerId');

  // Format date and time for display
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleString('en-GB', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Fetch appointments from API
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/appointments`, {
        timeout: 5000
      });
      
      if (response.data.success && Array.isArray(response.data.data)) {
        // Filter appointments where vet_id matches ownerId
        const matchedAppointments = response.data.data.filter(appointment => 
          appointment.vet_id === ownerId
        );
        setAppointments(matchedAppointments);
        setFilteredAppointments(matchedAppointments);
      } else {
        setError(response.data.message || 'No appointments found');
        setAppointments([]);
        setFilteredAppointments([]);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.response?.data?.message || 'Failed to connect to the server');
      setAppointments([]);
      setFilteredAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and scroll to top
  useEffect(() => {
    if (!ownerId) {
      window.location.href = '/auth/login'; // Redirect to login if not authenticated
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchAppointments();
    }
  }, []);

  // Filter appointments based on search term
  useEffect(() => {
    const filtered = appointments.filter(appointment =>
      (appointment.pet_id?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.owner_id?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (appointment.status || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatDateTime(appointment.appointment_time).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  // Memoize table rows for performance
  const tableRows = useMemo(() =>
    filteredAppointments.map((appointment) => (
      <tr key={appointment._id}>
        <td className="px-3 py-2">{appointment.pet_id?.name || 'N/A'}</td>
        <td className="px-3 py-2">{appointment.owner_id?.name || 'N/A'}</td>
        <td className="px-3 py-2">{formatDateTime(appointment.appointment_time)}</td>
        <td className="px-3 py-2">
          <span className={`badge ${appointment.status === 'pending' ? 'bg-warning text-dark' :
            appointment.status === 'confirmed' ? 'bg-success' :
            appointment.status === 'cancelled' ? 'bg-danger' : 'bg-primary'
          }`}>
            {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 'N/A'}
          </span>
        </td>
        <td className="px-3 py-2">{formatDateTime(appointment.createdAt)}</td>
        <td className="px-3 py-2">
          <button
            onClick={() => handleEdit(appointment)}
            className="btn btn-link text-primary p-0"
            aria-label={`Edit appointment for ${appointment.pet_id?.name || 'N/A'}`}
          >
            Edit
          </button>
        </td>
      </tr>
    )), [filteredAppointments]
  );

  // Handle form submission for editing
  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/appointments/${editingId}`, data);
      setMessage({ text: 'Updated successfully!', type: 'success' });
      setShowModal(false);
      setEditingId(null);
      await fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment:', err);
      setMessage({ text: err.response?.data?.message || 'Error saving data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (appointment) => {
    setEditingId(appointment._id);
    setShowModal(true);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="container py-4 AppointmentManagement">
      <div style={{ backgroundColor: '#f8f9fab2', padding: '2%', borderRadius: '10px' }}>
        <h1 className="h3 mb-4">Appointment Management</h1>

        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Pet Name, Owner Name, Status, or Date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Message Alert */}
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

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Appointments Table */}
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
                      {searchTerm ? 'No results found' : 'No appointments available for this vet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
            <button
              type="button"
              className="btn btn-link text-primary ms-3"
              onClick={fetchAppointments}
            >
              Retry
            </button>
          </div>
        )}

        {/* Edit Modal */}
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" aria-hidden={!showModal}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Appointment</h5>
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
                    vet_id: appointments.find(a => a._id === editingId)?.vet_id || '',
                    appointment_time: appointments.find(a => a._id === editingId)?.appointment_time
                      ? new Date(appointments.find(a => a._id === editingId).appointment_time).toISOString().slice(0, 16)
                      : '',
                    status: appointments.find(a => a._id === editingId)?.status || 'pending'
                  } : {}}
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isEditing={!!editingId}
                  loading={loading}
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