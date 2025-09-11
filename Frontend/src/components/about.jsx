import React from 'react';
import "./Css/About.css";

function About() {
  return (
    <div className="about_page">
      <div className="container">
        <h2 className="text-center mb-4">About Us</h2>
        <p className="lead text-center">
          <strong>
            PetCare - Where the Love for Pets Flourishes!
          </strong>
        </p>
        <p>
          Are you looking for a trustworthy place to entrust your "four-legged friend"? Welcome to PetCare, a comprehensive pet care website with a mission to provide the best for the special members of your family. We are proud to be a one-stop destination that meets all your pet's needs, from health care to providing daily essentials.
        </p>
        <p>
          At PetCare's professional veterinary service, our team of experienced and dedicated doctors is always ready to examine, treat, and fully vaccinate your pets, ensuring they stay healthy. We also offer animal protection services with a safe, clean living environment, helping your pets feel comfortable and loved while you are away.
        </p>
        <p>
          What's more, PetCare's online store is a shopping paradise with thousands of high-quality products. From nutritious food and fun toys to fashionable clothes and accessories, everything is carefully selected from reputable brands. Let PetCare accompany you on your journey of caring for and loving your pets, making every day of their lives happier and more complete.
        </p>
        <p className="fw-bold text-center">
          Our mission: <em>“Healthy Pets, Happy Families.”</em>
        </p>
      </div>
    </div>
  );
}

export default About;