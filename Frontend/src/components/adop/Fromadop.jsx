import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FormAdop = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    alert("Your adoption enquiry has been submitted!");
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

        {/* Postal Code */}
        <div className="col-md-6">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            className="form-control"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
          />
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

        {/* EXTRA QUESTIONS */}
        <div className="col-12">
          <label className="form-label">Nearest International Airports</label>
          <input
            type="text"
            className="form-control"
            name="airport"
            value={form.airport}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Who do you live with in your household?</label>
          <input
            type="text"
            className="form-control"
            name="household"
            value={form.household}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">
            Do all members of the household agree to joint responsibility of adopting a Soi Dog or Cat?
          </label>
          <input
            type="text"
            className="form-control"
            name="responsibility"
            value={form.responsibility}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Do you have any other pets?</label>
          <input
            type="text"
            className="form-control"
            name="otherPets"
            value={form.otherPets}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">If yes, please describe</label>
          <textarea
            className="form-control"
            rows="2"
            name="petDescription"
            value={form.petDescription}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Please describe your property and its location</label>
          <textarea
            className="form-control"
            rows="2"
            name="property"
            value={form.property}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">What is your job and working hours?</label>
          <input
            type="text"
            className="form-control"
            name="job"
            value={form.job}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">
            Feel free to tell us more about yourself and why you are interested in adopting a Soi Dog or Cat
          </label>
          <textarea
            className="form-control"
            rows="4"
            name="about"
            value={form.about}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">
            You have not selected any dogs/cats. Please tell us if there is anything in particular you are looking for in a dog/cat
          </label>
          <textarea
            className="form-control"
            rows="3"
            name="petPreference"
            value={form.petPreference}
            onChange={handleChange}
          />
        </div>

        {/* Updates */}
        <div className="col-12">
          <label className="form-label">
            Receive periodic updates from Petcare Foundation
          </label>
          <select
            className="form-select"
            name="updates"
            value={form.updates}
            onChange={handleChange}
            required
          >
            <option value="email">Please keep me updated by email</option>
            <option value="none">No, thank you</option>
          </select>
          <small className="text-muted">
            Only with your generous support can we end the suffering of dogs and cats in Asia.
          </small>
        </div>

        <div className="col-12 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="gift"
            name="gift"
            checked={form.gift}
            onChange={handleChange}
          />
          <label htmlFor="gift" className="form-check-label">
            Check this box if you would like information on how to leave a gift to Soi Dog in your will.
          </label>
        </div>

        {/* Submit */}
        <div className="col-12 text-center">
          <Link to="/thankyou" className="btn btn-warning px-5 fw-bold">
            ENQUIRY
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormAdop;
