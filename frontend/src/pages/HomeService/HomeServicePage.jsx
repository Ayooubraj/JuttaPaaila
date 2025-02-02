// src/pages/homeService/HomeServicePage.jsx
import React from 'react';
import './HomeServicePage.css';

const HomeServicePage = () => {
  return (
    <div className="homeservice-page">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={require('../../assets/images/hero_bgimg.png')}
          alt="Hero"
          className="hero__image"
        />
        <img
          src={require('../../assets/images/hero_img2.png')}
          alt="Hero Overlay"
          className="hero__overlay-image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Home Services</h1>
            <p className="hero__description">
              Professional gardening services at your doorstep
            </p>
            <button className="hero__button">Book Now</button>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="packages">
        <h2 className="packages__title">Our Packages</h2>
        <div className="packages__container">
          <div className="package-card">
            <h3 className="package-card__title">Basic Package</h3>
            <div className="package-card__content">
              <p className="package-card__price">Rs.1999</p>
              <ul className="package-card__features">
                <li>Weekly Garden Maintenance</li>
                <li>Basic Plant Care</li>
                <li>Lawn Mowing</li>
                <li>Weeding</li>
              </ul>
              <button className="package-card__button">Select Plan</button>
            </div>
          </div>

          <div className="package-card">
            <h3 className="package-card__title">Standard Package</h3>
            <div className="package-card__content">
              <p className="package-card__price">Rs.2999</p>
              <ul className="package-card__features">
                <li>All Basic Package Features</li>
                <li>Fertilization</li>
                <li>Pest Control</li>
                <li>Seasonal Planting</li>
              </ul>
              <button className="package-card__button">Select Plan</button>
            </div>
          </div>

          <div className="package-card">
            <h3 className="package-card__title">Premium Package</h3>
            <div className="package-card__content">
              <p className="package-card__price">Rs.3999</p>
              <ul className="package-card__features">
                <li>All Standard Package Features</li>
                <li>Landscape Design</li>
                <li>Garden Renovation</li>
                <li>24/7 Support</li>
              </ul>
              <button className="package-card__button">Select Plan</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeServicePage;
