import React from 'react';

function About() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">About Us</h2>
      <p className="lead text-center">
        Welcome to <strong>Petcare Veterinary Hospital & Pet Shop</strong>.
      </p>
      <p>
        We are a dedicated team of veterinarians, pet lovers, and staff who care
        deeply about the health and happiness of your pets.
      </p>
      <ul>
        <li>Professional veterinary services (check-ups, surgeries, vaccinations).</li>
        <li>Safe and comfortable adoption programs.</li>
        <li>High-quality products for pets: food, toys, and accessories.</li>
      </ul>
      <p className="fw-bold text-center">
        Our mission: <em>“Healthy Pets, Happy Families.”</em>
      </p>
    </div>
  );
}

export default About;