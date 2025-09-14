import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";
import { Row, Col } from "react-bootstrap";
import '../Css/Store.css';

const ManageStore = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'dog',
    price: '',
    description: '',
    stock: '',
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/store');
      setStoreItems(response.data);
    } catch (error) {
      console.error('Error fetching store items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('stock', form.stock);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/store/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('http://localhost:5000/api/store', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setForm({ name: '', category: 'dog', price: '', description: '', stock: '', image: null });
      setEditingId(null);
      setShowForm(false);
      fetchStoreItems();
    } catch (error) {
      console.error('Error saving store item:', error);
    }
  };

  const handleEdit = (item) => {
    setForm({ ...item, image: null });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/store/${id}`);
      fetchStoreItems();
    } catch (error) {
      console.error('Error deleting store item:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setForm({ name: '', category: 'dog', price: '', description: '', stock: '', image: null });
    setEditingId(null);
  };

  return (
    <div className="container-fluid p-0">
      <Row className="g-0">
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10} className="p-4">
          <div className="container py-4 bg-light" style={{ borderRadius: '10px' }}>
            <h1 className="display-5 fw-bold text-center mb-4">Manage Store</h1>
            <button
              onClick={toggleForm}
              className="btn btn-success mb-4"
            >
              {showForm ? 'Cancel' : 'Add New Item'}
            </button>

            {showForm && (
              <form onSubmit={handleSubmit} className="card p-4 mb-4">
                <div className="mb-3">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="form-select"
                    style={{ backgroundcolor: 'white' }}
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update' : 'Add'} Item
                </button>
              </form>
            )}

            <h2 className="h4 fw-bold mb-4">Store Items</h2>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {storeItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>{item.stock}</td>
                      <td>
                        {item.image && <img src={`http://localhost:5000${item.image}`} alt="item" className="img-thumbnail" style={{ width: '64px', height: '64px' }} />}
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(item)}
                          className="btn btn-warning btn-sm me-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ManageStore;