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
          src={require('../../assets/images/logo1.png')}
          alt="Hero Overlay"
          className="hero__overlay-image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Welcome to Maali</h1>
            <p className="hero__description">
              Your one-stop e-gardening solution for vibrant green spaces
            </p>
          </div>
        </div>
      </section>

      {/* About Description */}
      <section className="about-description">
        <h2>About Maali</h2>
        <p>
          <img src={logo} alt="Maali Logo" className="about-logo" />
          At <strong>Maali</strong>, we bring nature closer to your home with innovative e-gardening solutions. 
          Whether you’re a seasoned gardener or just starting out, we’re here to make your gardening journey seamless and enjoyable.
        </p>
        <h3>What We Offer</h3>
        <ul>
          <li>
            <strong>Comprehensive Gardening Services:</strong> From planting and landscaping to maintenance, we provide expert solutions tailored to your space and style.
          </li>
          <li>
            <strong>All-in-One Plant Shop:</strong> Explore our wide range of plants, pots, tools, and eco-friendly products designed to meet all your gardening needs.
          </li>
          <li>
            <strong>Expert Guidance:</strong> Access professional tips, tutorials, and advice to nurture your plants and create your dream garden.
          </li>
        </ul>
        <h3>Why Choose Maali?</h3>
        <p>
          We pride ourselves on offering <strong>convenience, sustainability, and expertise</strong>. With Maali, you can personalize your green space, promote eco-friendly practices, and enjoy exceptional support from our passionate team.
        </p>
        <p>
          Start your gardening journey today with Maali and transform your home into a lush, green haven. Let’s grow together! 🌱
        </p>
      </section>
    </div>
  );
};

export default About;
