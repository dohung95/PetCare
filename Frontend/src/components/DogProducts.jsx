import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

const DogProducts = () => {
  const products = useOutletContext();
  const dogProducts = products.filter(p => p.category === "dog");

  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, value)
    }));
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmBuy = async () => {
    if (!selectedProduct) return;

    const quantity = quantities[selectedProduct._id] || 1;
    try {
      const response = await axios.post("http://localhost:5000/orders", {
        owner_id: "66ef9a4f7a56e6f8301b23aa",
        items: [
          {
            product_id: selectedProduct._id,
            quantity: quantity,
            price_each: selectedProduct.price
          }
        ]
      });

      alert("Order placed successfully!");
      setShowModal(false); // đóng modal
    } catch (error) {
      console.error(error);
      alert("Failed to place order!");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {dogProducts.map(product => (
          <div key={product._id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p><b>{product.price} VNĐ</b></p>

            <input
              type="number"
              min="1"
              value={quantities[product._id] || 1}
              onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
              style={{ width: "60px", marginRight: "10px" }}
            />

            <button
              onClick={() => handleBuyClick(product)}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {/* Modal xác nhận */}
      {showModal && selectedProduct && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
            <h3>Confirm Purchase</h3>
            <p><b>Product Name:</b> {selectedProduct.name}</p>
            <p><b>Quantity:</b> {quantities[selectedProduct._id] || 1}</p>
            <p><b>Total Amount:</b> {(selectedProduct.price * (quantities[selectedProduct._id] || 1)).toLocaleString()} VNĐ</p>

            <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "5px 10px" }}>Cancel</button>
              <button onClick={confirmBuy} style={{ padding: "5px 10px", background: "green", color: "#fff" }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogProducts;
