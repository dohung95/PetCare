import React, { useState, useEffect } from 'react';

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

  // Validate form inputs
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
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="pet_id" className="form-label">
            Pet ID <span className="text-danger">*</span>
          </label>
          <input
            id="pet_id"
            name="pet_id"
            type="text"
            value={formData.pet_id}
            onChange={handleChange}
            className={`form-control ${errors.pet_id ? 'is-invalid' : ''}`}
            placeholder="Enter pet ID"
            aria-required="true"
          />
          {errors.pet_id && <div className="invalid-feedback">{errors.pet_id}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="owner_id" className="form-label">
            Owner ID <span className="text-danger">*</span>
          </label>
          <input
            id="owner_id"
            name="owner_id"
            type="text"
            value={formData.owner_id}
            onChange={handleChange}
            className={`form-control ${errors.owner_id ? 'is-invalid' : ''}`}
            placeholder="Enter owner ID"
            aria-required="true"
          />
          {errors.owner_id && <div className="invalid-feedback">{errors.owner_id}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="vet_id" className="form-label">Vet ID</label>
          <input
            id="vet_id"
            name="vet_id"
            type="text"
            value={formData.vet_id}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter vet ID (optional)"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="appointment_time" className="form-label">
            Appointment Time <span className="text-danger">*</span>
          </label>
          <input
            id="appointment_time"
            name="appointment_time"
            type="datetime-local"
            value={formData.appointment_time}
            onChange={handleChange}
            className={`form-control ${errors.appointment_time ? 'is-invalid' : ''}`}
            aria-required="true"
          />
          {errors.appointment_time && <div className="invalid-feedback">{errors.appointment_time}</div>}
        </div>

        <div className="col-12">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : isEditing ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;