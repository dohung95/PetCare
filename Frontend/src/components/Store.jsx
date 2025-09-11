// StorePage.jsx
import React, { useState } from "react";
import "./Css/Store.css";

const StorePage = () => {
  const [activeTab, setActiveTab] = useState("dog");

  return (
    <div className="store-container">
      <h1>Store Page</h1>

      {/* Tabs */}
      <div className="store-tabs">
        <button
          onClick={() => setActiveTab("dog")}
          className={`tab-btn ${activeTab === "dog" ? "active" : ""}`}
        >
          🐶 Dog Products
        </button>
        <button
          onClick={() => setActiveTab("cat")}
          className={`tab-btn ${activeTab === "cat" ? "active" : ""}`}
        >
          🐱 Cat Products
        </button>
      </div>

      {/* Nội dung */}
      <div className="store-content">
        {activeTab === "dog" && <h2>🐶 Dog Products Page</h2>}
        {activeTab === "cat" && <h2>🐱 Cat Products Page</h2>}
      </div>
    </div>
  );
};

export default StorePage;
