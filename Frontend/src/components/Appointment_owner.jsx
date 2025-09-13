import React, { useEffect, useState } from 'react';
import api from '../api';
import './Css/Appointment_owner.css';

export default function Appointment_owner() {
  const ownerId = localStorage.getItem('ownerId'); // nếu login thì có
  const [owner, setOwner] = useState(null);

  const [notice, setNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    // Owner info (bắt buộc theo middleware)
    ownerName: '',
    contactNumber: '',
    email: '',

    // Pet info
    petName: '',
    petAge: '',
    petSpecies: 'Dog',
    petGender: 'Male', // chỉ Male/Female

    // Appointment
    appointmentDate: '', // type="date"
    status: 'pending',   // chỉ pending
    reason: '',
    note: '',
  });

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  // Nếu có ownerId -> fetch và prefill vào state (để payload vẫn có đủ field bắt buộc)
useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;

  (async () => {
    try {
      const res = await api.get('/auth/me');
      const u = res.data?.data;
      if (!u) return;

      // lưu lại để các trang khác dùng
      localStorage.setItem('ownerId', u.id || u._id || '');

      setOwner(u);
      setForm((s) => ({
        ...s,
        ownerName: u.name || '',
        contactNumber: u.phone || u.contactNumber || '',
        email: u.email || ''
      }));
    } catch (e) {
      console.error('❌ /auth/me failed', e.response?.data || e.message);
    }
  })();
}, []);


 async function onSubmit(e) {
  e.preventDefault();
  setSubmitting(true);
  setNotice(null);

  let requestBody = null; // <- khai báo trước để tránh “before initialization”

  try {
    // build body đúng backend
    requestBody = {
      ownerName: form.ownerName,
      contactNumber: form.contactNumber,
      email: form.email,
      petName: form.petName,
      petAge: form.petAge || undefined,
      petSpecies: form.petSpecies,
      petGender: form.petGender,        // Male | Female
      appointmentDate: form.appointmentDate, // yyyy-mm-dd từ input type="date"
      status: 'pending',                // cố định theo middleware
      reason: form.reason || '',
      note: form.note || ''
    };

    await api.post('/appointments_owner', requestBody);

    setNotice({ type: 'success', message: 'Booked successfully!' });

    // reset form (nếu đã login thì giữ lại info owner để hiển thị)
    setForm({
      ownerName: owner?.name || '',
      contactNumber: owner?.contactNumber || owner?.phone || '',
      email: owner?.email || '',
      petName: '',
      petAge: '',
      petSpecies: 'Dog',
      petGender: 'Male',
      appointmentDate: '',
      status: 'pending',
      reason: '',
      note: ''
    });
  } catch (err) {
    console.error('❌ Error submitting appointment:', err.response?.data || err.message);
    setNotice({
      type: 'error',
      message:
        err.response?.data?.message ||
        (Array.isArray(err.response?.data?.errors) ? err.response.data.errors.join(', ') : err.message)
    });
  } finally {
    setSubmitting(false);
  }
}
  return (
    <div className="appt-card">
      <h2>Book an appointment</h2>
      <form className="appt-grid" onSubmit={onSubmit}>

        {/* Owner info */}
        {ownerId ? (
          <>
            <div className="field">
              <label>Owner Name<span className="req">*</span></label>
              <input value={form.ownerName} disabled />
            </div>
            <div className="field">
              <label>Contact Number<span className="req">*</span></label>
              <input value={form.contactNumber} disabled />
            </div>
            <div className="field col">
              <label>Email<span className="req">*</span></label>
              <input type="email" value={form.email} disabled />
            </div>
          </>
        ) : (
          <>
            <div className="field">
              <label>Owner Name<span className="req">*</span></label>
              <input name="ownerName" placeholder="Your name" value={form.ownerName} onChange={onChange} required />
            </div>
            <div className="field">
              <label>Contact Number<span className="req">*</span></label>
              <input name="contactNumber" placeholder="+8490..." value={form.contactNumber} onChange={onChange} required />
            </div>
            <div className="field col">
              <label>Email<span className="req">*</span></label>
              <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
            </div>
          </>
        )}

        {/* Pet info */}
        <div className="field">
          <label>Pet Name<span className="req">*</span></label>
          <input name="petName" placeholder="Pet name" value={form.petName} onChange={onChange} required />
        </div>

        <div className="field">
          <label>Pet Age</label>
          <input name="petAge" type="text" min="0" max="100" placeholder="0-100" value={form.petAge} onChange={onChange} />
        </div>

        <div className="field">
          <label>Pet Species</label>
          <select name="petSpecies" value={form.petSpecies} onChange={onChange}>
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
            <option>Rabbit</option>
            <option>Hamster</option>
            <option>Fish</option>
            <option>Other</option>
          </select>
        </div>

        <div className="field">
          <label>Pet Gender</label>
          <select name="petGender" value={form.petGender} onChange={onChange}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Appointment */}
        <div className="field">
          <label>Date<span className="req">*</span></label>
          <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={onChange} required />
        </div>

        <div className="field">
          <label>Reason</label>
          <input name="reason" placeholder="Vaccination / Checkup ..." value={form.reason} onChange={onChange} />
        </div>

        <div className="field col">
          <label>Additional Note</label>
          <textarea style={{ resize: 'none', height: '10px' }} name="note" rows="4" value={form.note} onChange={onChange} />
        </div>

        {notice && <div className={`notice ${notice.type}`}>{notice.message}</div>}

        <div className="actions col-2">
          <button type="submit" disabled={submitting}>{submitting ? 'Booking…' : 'Book Now'}</button>
        </div>
      </form>
    </div>
  );
}
