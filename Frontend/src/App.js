import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/service" element={<h1>Service Page</h1>} />
          <Route path="/service/store" element={
            <div>
              <h1>Store Page</h1>
              <ul>
                <li><a href="/service/dog-products">Dog Products</a></li>
                <li><a href="/service/cat-products">Cat Products</a></li>
              </ul>
            </div>
          } />
          <Route path="/service/dog-products" element={<h1>Dog Products Page</h1>} />
          <Route path="/service/cat-products" element={<h1>Cat Products Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/job" element={<h1>Job Page</h1>} />
          <Route path="/login" element={<h1>Login Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
