import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Css/AdminProductsList.css";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "dog",
    price: 0,
    description: "",
    stock_quantity: 0,
    image: null
  });
  const token = localStorage.getItem("token"); // admin token

  const fetchProducts = () => {
    axios.get("/admin/products", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };


const handleCreate = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("category", form.category);
  formData.append("price", Number(form.price));
  formData.append("description", form.description);
  formData.append("stock_quantity", Number(form.stock_quantity));
  if (form.image) formData.append("image", form.image);

  axios.post("/admin/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  })
    .then(() => {
      fetchProducts();
      setForm({ name: "", category: "dog", price: 0, description: "", stock_quantity: 0, image: null });
    })
    .catch(err => console.error("Create error:", err.response?.data || err.message));
};

  const handleDelete = (id) => {
    axios.delete(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => fetchProducts())
      .catch(err => console.error(err));
  };

  return (
    <div className="admin-product-list">
      <h2>Admin Product List</h2>
      <form onSubmit={handleCreate}>    
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input type="number" name="stock_quantity" placeholder="Stock" value={form.stock_quantity} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Create</button>
      </form>

      {/* Danh sách sản phẩm */}
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <h3>{p.name}</h3>
            {p.image && (
              <img src={`http://localhost:5000${p.image}`} alt={p.name} width="100" />
            )}
            <p>{p.description}</p>
            <p>{p.price} đ - Quantity: {p.stock_quantity} piece</p>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductList;
