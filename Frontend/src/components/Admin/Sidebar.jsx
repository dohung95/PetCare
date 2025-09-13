import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="bg-dark text-white vh-100 p-3">
      <h4 className="mb-4">
        <Link to="/Dashboard" className="text-white text-decoration-none">
          🐾 Admin
        </Link>
      </h4>
      <ul className="nav flex-column gap-2">
        {/* Shellter */}
        <li>
          <Link to="/overview" className="nav-link text-white fw-bold">
            📊 Overview
          </Link>
        </li>
        <li>
          <Link to="/adopPets" className="nav-link text-white">
            🐶 Manage Pets
          </Link>
        </li>
        <li>
          <Link to="/adopRequest" className="nav-link text-white">
            📑 Adoption Requests
          </Link>
        </li>

        {/* admin */}
        <li>
          <Link to="/VetManager_list" className="nav-link text-white">
            📑 Veterinarian Profile Manager
          </Link>
        </li>
        <li>
          <Link to="/ManageStore" className="nav-link text-white">
            📑 Manage Store
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
