import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Css/ProductsList.css";

axios.defaults.baseURL = "http://localhost:5000";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        console.log("Products:", res.data); // Debug dữ liệu API
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Xác định tab active
  const isDogActive = location.pathname === "/service/productlist" || location.pathname === "/service/productlist/dog";
  const isCatActive = location.pathname === "/service/productlist/cat";

  return (
    <div className="product-list-container">
      <div className="product-nav">
        <Link
          to="/service/productlist/dog"
          className={`nav-link ${isDogActive ? "active" : ""}`}
        >
          Dog Product
        </Link>
        <Link
          to="/service/productlist/cat"
          className={`nav-link ${isCatActive ? "active" : ""}`}
        >
          Cat Product
        </Link>
      </div>
      <Outlet context={products} />
    </div>
  );
};

export default ProductList;