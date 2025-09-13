import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Css/Store.css';

const Store = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buyForm, setBuyForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    fetchStoreItems();
  }, []);

  const fetchStoreItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/store');
      setStoreItems(response.data);
      const initialQuantities = {};
      response.data.forEach(item => {
        initialQuantities[item._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching store items:', error);
    }
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const openBuyModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleBuySubmit = async (e) => {
    e.preventDefault();
    const quantity = quantities[selectedItem._id];
    try {
      await axios.post(`http://localhost:5000/api/store/buy/${selectedItem._id}`, { quantity });
      alert('Purchase successful!');
      setShowModal(false);
      setBuyForm({ name: '', phone: '', address: '' });
      fetchStoreItems();
    } catch (error) {
      alert(error.response?.data?.message || 'Error processing purchase');
    }
  };

  const filteredItems = storeItems
    .filter(item => {
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  return (
    <div style={{ width: '100vw' }} className="petstore-container bg-white mt-4 rounded">
      <h1 className="petstore-title">Pet Store</h1>
      <div className="petstore-filter-container">
        <div className="petstore-filter-group">
          <label className="petstore-filter-label">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="petstore-filter-select"
          >
            <option value="all">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div className="petstore-filter-group">
          <label className="petstore-filter-label">Sort by Price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="petstore-filter-select"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        <div className="petstore-filter-group">
          <label className="petstore-filter-label">Search:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="petstore-search-input"
            placeholder="Search by name or category"
          />
        </div>
      </div>
      <div className="petstore-grid">
        {filteredItems.map((item) => (
          <div key={item._id} className="petstore-card">
            <div className="petstore-card-image-container">
              {item.image && (
                <img
                  src={`http://localhost:5000${item.image}`}
                  alt={item.name}
                  className="petstore-card-image"
                />
              )}
            </div>
            <div className="petstore-card-body">
              <h5 className="petstore-card-title">{item.name}</h5>
              <p className="petstore-card-text">Category: {item.category}</p>
              <p className="petstore-card-text">Price: ${item.price}</p>
              <p className="petstore-card-text">Stock: {item.stock}</p>
              <p className="petstore-card-description">{item.description}</p>
              <div className="petstore-quantity-group">
                <button
                  onClick={() => handleQuantityChange(item._id, -1)}
                  className="petstore-quantity-button"
                >
                  -
                </button>
                <span className="petstore-quantity-text">{quantities[item._id] || 1}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, 1)}
                  className="petstore-quantity-button"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => openBuyModal(item)}
                className="petstore-buy-button"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedItem && (
        <div className="petstore-modal-overlay">
          <div className="petstore-modal">
            <div className="petstore-modal-header">
              <h5 className="petstore-modal-title">Purchase {selectedItem.name}</h5>
              <button
                type="button"
                className="petstore-modal-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="petstore-modal-body">
              <form onSubmit={handleBuySubmit}>
                <div className="petstore-modal-form-group">
                  <label className="petstore-modal-label">Your Name</label>
                  <input
                    type="text"
                    value={buyForm.name}
                    onChange={(e) => setBuyForm({ ...buyForm, name: e.target.value })}
                    className="petstore-modal-input"
                    required
                  />
                </div>
                <div className="petstore-modal-form-group">
                  <label className="petstore-modal-label">Phone Number</label>
                  <input
                    type="tel"
                    value={buyForm.phone}
                    onChange={(e) => setBuyForm({ ...buyForm, phone: e.target.value })}
                    className="petstore-modal-input"
                    required
                  />
                </div>
                <div className="petstore-modal-form-group">
                  <label className="petstore-modal-label">Address</label>
                  <input
                    type="text"
                    value={buyForm.address}
                    onChange={(e) => setBuyForm({ ...buyForm, address: e.target.value })}
                    className="petstore-modal-input"
                    required
                  />
                </div>
                <div className="petstore-modal-form-group">
                  <label className="petstore-modal-label">Quantity</label>
                  <input
                    type="text"
                    value={quantities[selectedItem._id]}
                    className="petstore-modal-input-disabled"
                    disabled
                  />
                </div>
                <div className="petstore-modal-form-group">
                  <label className="petstore-modal-total">Total: ${(quantities[selectedItem._id] * selectedItem.price).toFixed(2)}</label>
                </div>
                <button type="submit" className="petstore-modal-button petstore-modal-confirm">
                  Confirm Purchase
                </button>
                <button
                  type="button"
                  className="petstore-modal-button petstore-modal-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;