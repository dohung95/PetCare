import React, { useState, useEffect } from 'react';
import './Css/AppointmentForm.css'; // Import custom CSS

const AppointmentForm = ({ 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  isEditing = false,
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    pet_id: '',
    owner_id: '',
    vet_id: '',
    appointment_time: '',
    status: 'pending',
    ...initialData
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      pet_id: '',
      owner_id: '',
      vet_id: '',
      appointment_time: '',
      status: 'pending',
      ...initialData
    });
    setErrors({});
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pet_id) newErrors.pet_id = 'Pet ID is required';
    if (!formData.owner_id) newErrors.owner_id = 'Owner ID is required';
    if (!formData.appointment_time) newErrors.appointment_time = 'Appointment time is required';
    else if (new Date(formData.appointment_time) < new Date()) newErrors.appointment_time = 'Appointment time must be in the future';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className='AppointmentForm'>
      <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-row " >
        <div className="form-group">
          <label htmlFor="pet_id" className="form-label">
            <i className="fas fa-paw"></i> Pet ID <span className="required">*</span>
          </label>
          <input
            id="pet_id"
            name="pet_id"
            type="text"
            value={formData.pet_id}
            onChange={handleChange}
            className={`form-control ${errors.pet_id ? 'is-invalid' : ''}`}
            placeholder="Enter Pet ID"
          />
          {errors.pet_id && <div className="error-message">{errors.pet_id}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="owner_id" className="form-label">
            <i className="fas fa-user"></i> Owner ID <span className="required">*</span>
          </label>
          <input
            id="owner_id"
            name="owner_id"
            type="text"
            value={formData.owner_id}
            onChange={handleChange}
            className={`form-control ${errors.owner_id ? 'is-invalid' : ''}`}
            placeholder="Enter Owner ID"
          />
          {errors.owner_id && <div className="error-message">{errors.owner_id}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="vet_id" className="form-label">
            <i className="fas fa-user-md"></i> Vet ID
          </label>
          <input
            id="vet_id"
            name="vet_id"
            type="text"
            value={formData.vet_id}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Vet ID (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointment_time" className="form-label">
            <i className="fas fa-calendar-alt"></i> Visit Time <span className="required">*</span>
          </label>
          <input
            id="appointment_time"
            name="appointment_time"
            type="datetime-local"
            value={formData.appointment_time}
            onChange={handleChange}
            className={`form-control ${errors.appointment_time ? 'is-invalid' : ''}`}
          />
          {errors.appointment_time && <div className="error-message">{errors.appointment_time}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            <i className="fas fa-info-circle"></i> Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-control"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="btn btn-cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-submit"
        >
          {loading ? (
            <>
              <span className="spinner" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : isEditing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
    </div>
  );
};

export default AppointmentForm;