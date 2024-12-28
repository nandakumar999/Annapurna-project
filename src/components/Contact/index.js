import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './index.css';


const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [selectedOption, setSelectedOption] = useState("address"); 
  const [isSubmitted, setIsSubmitted] = useState(false);


    
  useEffect(() => {
      document.title = "Contact - Annapurna Farms";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({ ...contactFormData, [name]: value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setIsSubmitted(true);
      return;
    }


    const payload = {
      name: contactFormData.name,
      email: contactFormData.email,
      phoneNumber: contactFormData.phone,
      address: contactFormData.address,
      message: contactFormData.message,
    };

    try {
      const response = await fetch("http://localhost:8080/user/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.code === 200) {
        toast.success(data.result);
 
        setContactFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
        setSelectedOption("address");
        setIsSubmitted(false);
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
  <form onSubmit={handleContactSubmit} className="contact-contant-warpper">
      <div className="contact-contant-warpper-main">
        <div className="contact-contant-warpper-left1">
          <div className="contact-hello-warppe1">Hello, Let's get in touch</div>
          <div className="contact-group">
            <input
                className="contact-name-input"
                type="text"
                name="name"
                value={contactFormData.name}
                onChange={handleChange}
                required
              />
              <span className="contact-highlight"></span>
              <span className="contact-bar"></span>
              <label className="contact-label">Name</label>
          </div>
          <div className="contact-group">
            <input
                className="contact-name-input"
                type="email"
                name="email"
                value={contactFormData.email}
                onChange={handleChange}
                required
              />
            <span className="contact-highlight"></span>
            <span className="contact-bar"></span>
            <label className="contact-label">Email address</label>
          </div>
          <div className="contact-group">
            <input
                className="contact-name-input"
                type="tel"
                name="phone"
                value={contactFormData.phone}
                onChange={handleChange}
                required
              />
            <span className="contact-highlight"></span>
            <span className="contact-bar"></span>
            <label className="contact-label">Phone Number</label>
          </div>
          <div className="contact-group">
            <input
                className="contact-name-input"
                type="text"
                name="address"
                value={contactFormData.address}
                onChange={handleChange}
                required
              />
            <span className="contact-highlight"></span>
            <span className="contact-bar"></span>
            <label className="contact-label">Address</label>
          </div>
          <div className="contact-group">
            <input
                className="contact-name-input"
                type="text"
                name="message"
                value={contactFormData.message}
                onChange={handleChange}
                required
              />
            <span className="contact-highlight"></span>
            <span className="contact-bar"></span>
            <label className="contact-label">Write Your Message</label>
          </div>
          <div>
            <button type="submit" className="contact-connet-btn-pri1">Connect</button>
          </div>
        </div>

        <div className="contact-contant-warpper-left2">
          <div className="contact-Hear-lable">
            We'd Love to<br />Hear <span className="contact-Hear-lable1">From you</span>
          </div>
          <div className="contact-annapurnafarms-email">Info@Annapurnafarms.com</div>
          <div className="contact-communication-lable">Preferred method of communication</div>
          <div className="contact-Address-lable">
            <span className="contact-address-radio-warpper">
              <input
                type="radio"
                className="contact-address-radio"
                name="contactMethod"
                onChange={() => setSelectedOption("address")}
                checked={selectedOption === "address"}
              />
              Address
            </span>
            <span className="contact-address-radio-warpper">
              <input
                type="radio"
                className="contact-address-radio"
                name="contactMethod"
                onChange={() => setSelectedOption("email")}
              />
              Email
            </span>
            <span className="contact-address-radio-warpper">
              <input
                type="radio"
                className="contact-address-radio"
                name="contactMethod"
                onChange={() => setSelectedOption("phone")}
              />
              Phone
            </span>
          </div>

          {/* Display error message if form is submitted without selecting an option */}
          {isSubmitted && !selectedOption && (
            <div className="error-message">Please select a communication method.</div>
          )}

          {/* Display dynamic content based on selected option */}
          {selectedOption === "address" && (
            <div className="contact-address-lable-address">
              Vijayawada, Ramavarappadu, Andhra Pradesh
            </div>
          )}
          {selectedOption === "email" && (
            <div className="contact-address-lable-address">Info@Annapurnafarms.com</div>
          )}
          {selectedOption === "phone" && (
            <div className="contact-address-lable-address">+91 9154 99 8094</div>
          )}
        </div>

        <div className="contact-Hear-img"></div>
      </div>
    </form>
  );
};

export default Contact;