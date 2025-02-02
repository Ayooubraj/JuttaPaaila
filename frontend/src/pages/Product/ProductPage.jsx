import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterPanel from '../../components/Filter/FilterPanel';
import './ProductPage.css';
import shoe1 from '../../assets/images/shoe_img.jpg'; // Sneakers
import loafer from '../../assets/images/loafers.jpg'; // Loafers
import running_shoe from '../../assets/images/running_shoe.jpg'; // Running Shoes

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Sample products data for shoes
  const sections = [
    { 
      title: "Sneakers", 
      products: [
        { id: 1, name: "Stylish Sneakers", image: shoe1, price: 59.99 },
        { id: 2, name: "Cool Sneakers", image: shoe1, price: 69.99 },
        { id: 3, name: "Trendy Sneakers", image: shoe1, price: 79.99 },
        { id: 4, name: "Sporty Sneakers", image: shoe1, price: 89.99 },
        { id: 5, name: "Classic Sneakers", image: shoe1, price: 99.99 },
        { id: 6, name: "Casual Sneakers", image: shoe1, price: 49.99 }
      ] 
    },
    { 
      title: "Loafers", 
      products: [
        { id: 7, name: "Classic Loafers", image: loafer, price: 49.99 },
        { id: 8, name: "Elegant Loafers", image: loafer, price: 59.99 },
        { id: 9, name: "Casual Loafers", image: loafer, price: 39.99 },
        { id: 10, name: "Formal Loafers", image: loafer, price: 69.99 },
        { id: 11, name: "Comfort Loafers", image: loafer, price: 79.99 },
        { id: 12, name: "Stylish Loafers", image: loafer, price: 89.99 }
      ] 
    },
    { 
      title: "Running Shoes", 
      products: [
        { id: 13, name: "Sporty Running Shoes", image: running_shoe, price: 69.99 },
        { id: 14, name: "Lightweight Running Shoes", image: running_shoe, price: 79.99 },
        { id: 15, name: "Durable Running Shoes", image: running_shoe, price: 89.99 },
        { id: 16, name: "High-Performance Running Shoes", image: running_shoe, price: 99.99 },
        { id: 17, name: "Trail Running Shoes", image: running_shoe, price: 89.99 },
        { id: 18, name: "Cushioned Running Shoes", image: running_shoe, price: 79.99 }
      ] 
    },
  ];

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
    console.log('Added to cart:', product);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(`.product-section${hash}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="productpage">
      {/* Hero Section */}
      <section className="hero">
        <img
          src={require('../../assets/images/shoe_img.jpg')} // Updated hero image
          alt="Hero"
          className="hero__image"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Find Your Perfect Pair</h1>
            <h2 className="hero__description">Explore our exclusive shoe collection!</h2>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Filter Panel */}
        <div >
          <FilterPanel />
        </div>

        {/* Product Sections */}
        <div className="products-section">
          {sections.map(section => (
            <div key={section.title} className={`product-section ${section.title.replace(/\s+/g, '-').toLowerCase()}`}>
              <h2>{section.title}</h2>
              <div className="product-cards-container">
                {section.products.map(product => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;




//previous working code for product page
// import React, { useEffect, useRef, useState } from 'react';
// import ProductCard from '../../components/ProductCard/ProductCard';
// import FilterPanel from '../../components/Filter/FilterPanel';
// import './ProductPage.css';

// const ProductPage = () => {
//   const [cartItems, setCartItems] = useState([]); // State for cart items

//   // Sample products data
//   const products = [
//     { id: 1, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
//     { id: 2, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
//     { id: 3, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
//     { id: 4, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
//     { id: 5, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },
//     { id: 6, name: "Indoor Plant", category: "Indoor", rating: 4.5, image: require('../../assets/images/plant1.jpg') },


//     { id: 7, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
//     { id: 8, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
//     { id: 9, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
//     { id: 10, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
//     { id: 11, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },
//     { id: 12, name: "Outdoor Plant", category: "Outdoor", rating: 4.0, image: require('../../assets/images/outdoor_img.jpg') },

//     { id: 13, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
//     { id: 14, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
//     { id: 15, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
//     { id: 16, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
//     { id: 17, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },
//     { id: 18, name: "Garden Tools", category: "Tools", rating: 4.8, image: require('../../assets/images/tool_img.png') },

//     { id: 19, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
//     { id: 20, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
//     { id: 21, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
//     { id: 22, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
//     { id: 23, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
//     { id: 24, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },
//     { id: 25, name: "Pots", category: "Pots", rating: 4.2, image: require('../../assets/images/pot_img.jpeg') },


//     { id: 26, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
//     { id: 27, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
//     { id: 28, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
//     { id: 29, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },
//     { id: 30, name: "Fertilizers", category: "Fertilizers", rating: 4.6, image: require('../../assets/images/seed_img.png') },

//     // Add more products as needed
//   ];

//   const sections = [
//     { title: "Indoor Plants", products: products.filter(p => p.category === "Indoor") },
//     { title: "Outdoor Plants", products: products.filter(p => p.category === "Outdoor") },
//     { title: "Tools and Equipments", products: products.filter(p => p.category === "Tools") },
//     { title: "Pots and Supplies", products: products.filter(p => p.category === "Pots") },
//     { title: "Seeds and Fertilizers", products: products.filter(p => p.category === "Fertilizers") },
//   ];

//   const addToCart = (product) => {
//     setCartItems(prevItems => [...prevItems, product]);
//     console.log('Added to cart:', product);
//   };

//   useEffect(() => {
//     const hash = window.location.hash;
//     if (hash) {
//       const section = document.querySelector(`.product-section${hash}`);
//       if (section) {
//         section.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, []);

//   return (
//     <div className="productpage">
//       {/* Hero Section */}
//       <section className="hero">
//         <img
//           src={require('../../assets/images/hero_bgimg.png')}
//           alt="Hero"
//           className="hero__image"
//         />
//         <img
//           src={require('../../assets/images/hero_img1.png')}
//           alt="Hero Overlay"
//           className="hero__overlay-image"
//         />
//         <div className="hero__overlay">
//           <div className="hero__content">
//             <h1 className="hero__title">Welcome to Maali</h1>
//             <h2 className="hero__description">Find the Perfect Plants for Your Garden!</h2>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Filter Panel */}
//         <div className="filter-container">
//           <FilterPanel />
//         </div>

//         {/* Product Sections */}
//         <div className="products-section">
//           {sections.map(section => (
//             <div key={section.title} className={`product-section ${section.title.replace(/\s+/g, '-').toLowerCase()}`} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
//               <h2>{section.title}</h2>
//               <div className="product-cards-container">
//                 <button className="scroll-button left" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(-200, 0)}>❮</button>
//                 <div className="product-cards-wrapper">
//                   {section.products.map(product => (
//                     <ProductCard key={product.id} product={product} addToCart={addToCart} />
//                   ))}
//                 </div>
//                 <button className="scroll-button right" onClick={() => document.querySelector(`.${section.title.replace(/\s+/g, '-').toLowerCase()} .product-cards-wrapper`).scrollBy(200, 0)}>❯</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
