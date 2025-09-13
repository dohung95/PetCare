import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormAdop = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    province: "",
    district: "",
    postalCode: "",  
    country: "Vietnam",
    email: "",
    phone: "",
    airport: "",
    household: "",
    responsibility: "",
    otherPets: "",
    petDescription: "",
    property: "",
    job: "",
    about: "",
    petPreference: "",
    updates: "email",
    gift: false,
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  // fetch danh sách tỉnh/thành
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("Error fetching provinces:", err));
  }, []);

  // load quận/huyện khi chọn tỉnh
  const handleProvinceChange = (e) => {
    const selectedProvinceCode = e.target.value;
    setForm({ ...form, province: selectedProvinceCode, district: "" });

    if (selectedProvinceCode) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts || []))
        .catch((err) => console.error("Error fetching districts:", err));
    } else {
      setDistricts([]);
    }
  };

  // thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const oldRequests = JSON.parse(localStorage.getItem("adoptionRequests") || "[]");

    const newRequest = {
      id: Date.now(),
      adopter: form.firstName + " " + form.lastName,
      email: form.email,
      phone: form.phone,
      province: form.province,
      district: form.district,
      petPreference: form.petPreference,
      status: "Pending",
    };

    const updated = [newRequest, ...oldRequests];
    localStorage.setItem("adoptionRequests", JSON.stringify(updated));

    alert("✅ Your adoption enquiry has been submitted!");

    // reset form
    setForm({
      firstName: "",
      lastName: "",
      address1: "",
      province: "",
      district: "",
      postalCode: "",
      country: "Vietnam",
      email: "",
      phone: "",
      airport: "",
      household: "",
      responsibility: "",
      otherPets: "",
      petDescription: "",
      property: "",
      job: "",
      about: "",
      petPreference: "",
      updates: "email",
      gift: false,
    });

    // điều hướng sang trang thankyou
    navigate("/thankyou");
  };

  return (
    <div className="container my-5">
      <h3 className="fw-bold mb-4">Adoption Enquiry Form</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label">First Name*</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Last Name*</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="col-12">
          <label className="form-label">Address line</label>
          <input
            type="text"
            className="form-control"
            name="address1"
            value={form.address1}
            onChange={handleChange}
          />
        </div>

        {/* Province + District */}
        <div className="col-md-6">
          <label className="form-label">Province / City*</label>
          <select
            className="form-select"
            name="province"
            value={form.province}
            onChange={handleProvinceChange}
            required
          >
            <option value="">-- Select Province/City --</option>
            {provinces.map((prov) => (
              <option key={prov.code} value={prov.code}>
                {prov.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">District*</label>
          <select
            className="form-select"
            name="district"
            value={form.district}
            onChange={handleChange}
            required
            disabled={!districts.length}
          >
            <option value="">-- Select District --</option>
            {districts.map((dist) => (
              <option key={dist.code} value={dist.name}>
                {dist.name}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="col-md-6">
          <label className="form-label">Country</label>
          <input type="text" className="form-control" value="Vietnam" disabled />
        </div>

        {/* Email + Phone */}
        <div className="col-md-6">
          <label className="form-label">Email*</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone*</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Extra questions (các input còn lại giữ nguyên như code bạn đã viết) */}

        {/* Submit */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-warning px-5 fw-bold">
            ENQUIRY
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAdop;
