// src/pages/homeService/HomeServicePage.jsx
import React from 'react';
import './About.css';
import logo from '../../assets/images/logo2.png'; // Adjust the path as necessary

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={require('../../assets/images/hero_bgimg.png')}
          alt="Hero"
          className="hero__image"
        />
        <img
          src={require('../../assets/images/juttapaaila.png')}
          alt="Hero Overlay"
          className="hero__overlay-image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Step into Style with Our Shoes</h1>
            <p className="hero__description">
              Discover the perfect pair for every occasion!
            </p>
          </div>
        </div>
      </section>

      {/* About Description */}
      <section className="about-description">
        <h2>About Our Shoe Shop</h2>
        <p>
          {/* <img src={logo} alt="Shoe Shop Logo" className="about-logo" /> */}
          At <strong>Our Shoe Shop</strong>, we believe that every step counts. Our mission is to provide you with the latest trends in footwear, ensuring you look stylish and feel comfortable. Whether you're looking for casual sneakers, elegant heels, or rugged boots, we have something for everyone.
        </p>
        <h3>What We Offer</h3>
        <ul>
          <li>
            <strong>Wide Range of Styles:</strong> From athletic shoes to formal wear, explore our extensive collection tailored to your needs.
          </li>
          <li>
            <strong>Quality Assurance:</strong> We source our shoes from trusted brands, ensuring durability and comfort.
          </li>
          <li>
            <strong>Expert Guidance:</strong> Our team is here to help you find the perfect fit and style for any occasion.
          </li>
        </ul>
        <h3>Why Choose Us?</h3>
        <p>
          We pride ourselves on offering <strong>affordable prices, exceptional quality, and outstanding customer service</strong>. With our easy online shopping experience, you can browse and purchase your favorite shoes from the comfort of your home.
        </p>
        <p>
          Join our community of shoe lovers today and step up your footwear game! 👟
        </p>
      </section>
    </div>
  );
};

export default About;
