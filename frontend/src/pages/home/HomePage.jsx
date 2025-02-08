import React from 'react';
import { useNavigate } from 'react-router-dom';
import FilterPanel from '../../components/Filter/FilterPanel';
import './HomePage.css';

import shoeHero from '../../assets/images/shoe_hero2.png';
import shoe1 from '../../assets/images/shoe_img.jpg'; // Sneakers
import loafer from '../../assets/images/loafers.jpg'; // Loafers
import running_shoe from '../../assets/images/running_shoe.jpg'; // Running Shoes
import adImage from '../../assets/images/ad_img.jpg'; // Advertisement image
import boot_img from '../../assets/images/boot_img.jpg'; // Boots

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={shoeHero}
          alt="Hero"
          className="hero__image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Step into Style</h1>
            <h2 className="hero__description">Discover the latest in footwear fashion!</h2>
            <button 
              className="hero__button"
              onClick={() => navigate('/HomeService')}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <div className="filter-container">
          <FilterPanel /> {/* Render the FilterPanel component */}
        </div>

        {/* Content Container (Featured, Browse More, Advertisement) */}
        <div className="content-container">
          {/* Featured Products Section */}
          <div className="featured-section">
            <h2 className="featured-section__title">Featured Shoes</h2>
            <div className="featured-container">
              <div className="featured-scroll">
                <div className="featured-item">
                  <div className="featured-image">
                    <img src={shoe1} alt="Stylish Sneakers" />
                  </div>
                  <p className="featured-label">Stylish Sneakers</p>
                </div>
                <div className="featured-item">
                  <div className="featured-image">
                    <img src={loafer} alt="Classic Loafers" />
                  </div>
                  <p className="featured-label">Classic Loafers</p>
                </div>
                <div className="featured-item">
                  <div className="featured-image">
                    <img src={running_shoe} alt="Sporty Running Shoes" />
                  </div>
                  <p className="featured-label">Sporty Running Shoes</p>
                </div>
                <div className="featured-item">
                  <div className="featured-image">
                    <img src={boot_img} alt="Premium Quality shoes" />
                  </div>
                  <p className="featured-label">Premium Quality shoes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Browse More Section */}
          <section className="browse-more-section">
            <h2 className="browse-more-title">Browse More Shoes</h2>
            <button 
              className="browse-more-button"
              onClick={() => navigate('/product')}
            >
              Explore Our Collection
            </button>
          </section>

          {/* ...Advertisement Section..... */}
          <section className="advertisement-section">
            <img src={adImage} alt="Advertisement" className="advertisement-image" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;