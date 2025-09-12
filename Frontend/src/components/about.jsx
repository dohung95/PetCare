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
    <div className="about_page bg-gray-100 py-10">
      <div className="container mx-auto px-4">

        {/* about content */}
        <div className="about-grid mb-8">
          <div className="about-col">
            <h3 className="text-2xl font-semibold mb-4">About Us</h3>
            <p className="lead text-center text-xl mb-6">

              <strong>PetCare - Where the Love for Pets Flourishes!</strong>
            </p>
            <p className="text-lg mb-4">
              Are you looking for a trustworthy place to entrust your "four-legged friend"? Welcome to PetCare, a comprehensive pet care website with a mission to provide the best for the special members of your family. We are proud to be a one-stop destination that meets all your pet's needs, from veterinary care and pet supplies to protection services.
            </p>
            <p className="text-lg mb-4">
              Our story began five years ago when our founder, a passionate pet lover, noticed the lack of reliable pet care services in the community. Inspired by her own rescued dog, she built PetCare to offer top-notch veterinary care, premium pet products, and a safe haven for pets—turning a personal mission into a thriving business.
            </p>
          </div>

          <div className="about-col">
            <p className="text-lg mb-4">

              At PetCare's professional veterinary service, our team of experienced and dedicated doctors is always ready to examine, treat, and fully vaccinate your pets, ensuring they stay healthy. Meet our team: Dr. Jane Doe, our lead veterinarian with over 10 years of experience specializing in canine health; Dr. Mark Lee, an expert in feline care with 8 years in the field; and our support staff, trained in animal behavior and welfare, ensuring every pet receives personalized attention.
            </p>
            <p className="text-lg mb-4">
              We also offer animal protection services with a safe, clean living environment, helping your pets feel comfortable and loved while you are away. Our facility holds a certification from the National Pet Care Association for maintaining the highest standards of hygiene and care, and we were recently awarded the "Best Pet Protection Service 2024" by Pet Lovers Magazine.
            </p>
            <p className="text-lg mb-4">
              What's more, PetCare's online store is a shopping paradise with thousands of high-quality products. From nutritious food and fun toys to fashionable clothes and accessories, everything is carefully selected from reputable brands. Let PetCare accompany you on your journey of caring for and loving your pets, making every day of their lives happier and more complete.

            </p>
          </div>
        </div>

        {/* story */}
        <div className='about-col about-story mb-8'>
          <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
          <p className="text-lg mb-4">
            Our journey at PetCare began five years ago with a heartfelt story. It all started when our founder, Hoai Thu, rescued a stray cat named Bong from the streets. Malnourished and abandoned, Bong's recovery inspired Thu to dedicate her life to helping pets in need. With her love for animals and a vision to create a safe haven, she founded PetCare in 2020. What began as a small clinic has grown into a comprehensive pet care hub, offering veterinary services, protection facilities, and a thriving online store. Every step of the way, Bong's wagging tail reminds us of our mission: to turn every pet’s life into a story of love and happiness. At PetCare, we don’t just care for pets—we build families.
          </p>
        </div>

        {/* Meet Our Team */}
        <div className="team-section mb-8">
          <h3 className="text-2xl font-semibold mb-4">Meet Our Team</h3>
          <div className="team-grid">
            {/* Hàng 1 */}
            <div className="team-card">
              <img
                src="./imgs/avarta/dat.jpg"
                alt="Lê Quốc Đạt"
              />
              <h4>Lê Quốc Đạt</h4>
              <p>Admin – 3 years exp.</p>
              <p className="rating">★★★★★ (5.0)</p>
              <p className="italic">"Ensuring smooth operations."</p>
            </div>

            <div className="team-card">
              <img
                src="./imgs/avarta/hung.jpg"
                alt="Đỗ Thanh HÙng"
              />
              <h4>Đỗ Thanh Hùng</h4>
              <p>Admin – 2 years exp.</p>
              <p className="rating">★★★★ (4.7)</p>
              <p className="italic">"Organizing care with dedication."</p>
            </div>

            <div className="team-card">
              <img
                src=""
                alt="Phù Vĩnh Huy"
              />
              <h4>Phù Vĩnh Huy</h4>
              <p>Shellter – 5 years exp.</p>
              <p className="rating">★★★★ (4.9)</p>
              <p className="italic">"Creating a safe haven for pets."</p>
            </div>

            {/* Hàng 2 */}
            <div className="team-card">
              <img
                src=""
                alt="Lê Nguyễn Gia Huy"
              />
              <h4>Lê NguyễnGia Huy</h4>
              <p>Shellter – 4 years exp.</p>
              <p className="rating">★★★★ (4.6)</p>
              <p className="italic">"Love and care in every shelter."</p>
            </div>

            <div className="team-card">
              <img
                src=""
                alt="Nguyễn Minh Nhân"
              />
              <h4>Nguyễn Minh Nhân</h4>
              <p>Veterinarian – 6 years exp.</p>
              <p className="rating">★★★★★ (5.0)</p>
              <p className="italic">"Healing pets with gentle hands."</p>
            </div>

            <div className="team-card">
              <img
                src=""
                alt="Vũ Thị Hoài Thu"
              />
              <h4>Vũ Thị Hoài Thu</h4>
              <p>Veterinarian – 7 years exp.</p>
              <p className="rating">★★★★ (4.8)</p>
              <p className="italic">"Dedicated to animal wellness."</p>
            </div>
          </div>
        </div>

        {/* Core Values & Why Choose Us */}
        <div className='about-core-why-section'>
          {/* Core Values */}
          <div className="about-col">
            <h3 className="text-2xl font-semibold mb-4">Our Core Values</h3>
            <div className="core-values-section">
              <div className="values-list space-y-3">
                <p><strong>Compassion</strong>: We treat every pet with love and empathy, understanding their unique needs and emotions.</p>
                <p><strong>Trust</strong>: We build lasting relationships with pet owners through honesty, reliability, and exceptional care.</p>
                <p><strong>Quality</strong>: We provide top-tier veterinary services, products, and protection facilities, sourced from trusted brands and experts.</p>
                <p><strong>Community</strong>: We believe in fostering a supportive network of pet lovers, sharing knowledge and creating a better world for animals.</p>
              </div>
              <p className="values-conclusion mt-4">
                These values drive us to go above and beyond, making PetCare a place where pets thrive and families grow stronger.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="about-col">
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <div className="why-choose-us-section">
              <div className="choose-us-list space-y-3">
                <p><strong>Expert Care</strong>: Our team of highly skilled veterinarians and protectors brings years of experience to ensure your pet’s health and happiness.</p>
                <p><strong>Comprehensive Services</strong>: From veterinary treatments and protection facilities to a wide range of premium pet products, we cover all your pet’s needs under one roof.</p>
                <p><strong>Personalized Attention</strong>: We tailor our services to meet the unique needs of every pet and owner, ensuring a customized care experience.</p>
                <p><strong>Convenience</strong>: Our online store and easy appointment booking make pet care accessible anytime, anywhere.</p>
                <p><strong>Proven Results</strong>: With certifications and glowing customer reviews, we deliver consistent excellence in pet care.</p>
              </div>
              <p className="choose-us-conclusion mt-4">
                Choose PetCare and experience the difference of a dedicated team committed to your pet’s well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Testimonials</h3>
          <div className="testimonials-section">
            <div className="testimonials-list">

              <p>"PetCare saved my dog’s life with their expert care! Dr. Jane was amazing and so compassionate." - Sarah K.</p>
              <p>"The online store has the best selection of pet toys. My cat loves them!" - John D.</p>
              <p>"I left my puppy at their protection service, and he came back happier than ever. Highly recommend!" - Emily N.</p>
              <p>"The staff treated my rabbit with such care during his check-up. Five stars!" - Mark L.</p>
              <p>"Booking an appointment was so easy, and the veterinary service was top-notch. Thank you, PetCare!" - Linh T.</p>
              <p>"The quality of the pet food from their store is unmatched. My dog’s health has improved a lot!" - Tom W.</p>
              <p>"Their protection facility is clean and safe. I felt at ease while I was away." - Anna P.</p>
              <p>"Dr. Mark Lee’s expertise with my cat’s illness was incredible. I’m so grateful!" - David H.</p>
              <p>"The personalized attention my parrot received was beyond expectations. Great team!" - Sophie R.</p>

              <p>"PetCare’s customer service is excellent. They helped me choose the perfect accessories!" - James B.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;