import React from "react";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 



function Contact() {
  return (
    <div>
      <Navbar /> 
      <section className="contact">
        <div className="contact-container">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-address">Tibacare, 678 Mabea Street, Nairobi, Kenya</p>
          <p className="contact-phone">Phone: +254 700 000 000</p>
          <p className="contact-email">Email: info@tibacare.com</p>
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
      <Footer /> {/* Include the Footer here */}
    </div>
  );
}

export default Contact;

