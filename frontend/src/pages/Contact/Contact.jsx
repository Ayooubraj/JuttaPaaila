import React from 'react';
import './Contact.css';
import contactImage from '../../assets/images/map.png'; // Adjust the path as necessary

const Contact = () => {
    return (
        <div className="contact-page">
            {/* Contact Form */}
            <form className="contact-form">
                <h2>Contact Us</h2>
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Query" rows="4" required></textarea>
                <button type="submit">Send</button>
            </form>
            {/* Image Section */}
            <div className="contact-image">
                <img src={contactImage} alt="Contact" />
            </div>
            {/* Contact Information Section */}
            <section className="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Address:</strong> Kathmandu, Nepal</p>
                <p><strong>Email:</strong> <a href="mailto:Maali@gmail.com">Maali@gmail.com</a></p>
                <p><strong>Contact Numbers:</strong> 1234567890, 1234567890</p>
            </section>
        </div>
    );
};

export default Contact;
