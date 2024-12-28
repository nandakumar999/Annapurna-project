import React, { useState,useEffect } from "react";
import "./index.css";

// const about_carousel_1 = "/img/about-carousel-1.jpg";
const about_img = "/img/about_image.jpg";
const client_1 = "/img/clients-1.png";
const client_2 = "/img/clients-5.png";
const client_3 = "/img/clients-7.png";
const client_4 = "/img/clients-10.jpeg";
const client_5 = "/img/clients-8.png";
const client_6= "/img/clients-9.png";
const client_7= "/img/clients-11.jpeg";
const client_8= "/img/clients-2.png";


const AboutUs = () => {
  const slides = [
    {
      image: "/img/about-carousel-1.jpg",
      alt: "About Carousel Image 1",
      title: "Discover the Beauty of Organic Living",
      subtitle : "Powder",
      description: "At Annapurna Farms, we bring you the freshest and purest organic produce.",
    },
    {
      image: "/img/about-carousel-2.jpg",
      alt: "About Carousel Image 2",
      title: "Sustainability at Its Best",
      subtitle : "Masala",
      description: "Our regenerative farming practices ensure healthy soil and biodiversity.",
    },
    {
      image: "/img/about-carousel-3.jpg",
      alt: "About Carousel Image 3",
      title: "Pure, Fresh, and Natural",
      subtitle : "Pickles",
      description: "Taste the difference with our organic ingredients straight from the farm.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };


  useEffect(() => {
    document.title = "About us - Annapurna Farms";
  }, []);

  return (
      <div class="about-section">
      {/* <!-- Full-width image --> */}
      {/* <div class="full-width-image">
      <img src={about_carousel_1} alt="About Us" className=""/>
      </div> */}
      <div className="about-section-containers">
        <div
          className="about-section-carousel-image"
          style={{ backgroundImage: 'url(/img/about-bg-i.jpg)' }}
        >
          <div className="about-section-carousel-content">
            <h1 className="about-section-carousel-heading">
              PURELY NATURAL, TRULY <br />
              INDIAN – FARM-FRESH GOODNESS <br />
              FOR EVERY MEAL
            </h1>
          </div>
        </div>
      </div>
      {/* About Content Section */}
      <div className="content-section">
        <div className="content-image">
          <img src={about_img} alt="About" className="about_img" />
        </div>
        <div className="content-text-about">
          <span className="name">— Our Mission</span>
          <h2 className="content-heading">Who we are ?</h2>
          <p className="content-text-para">
            Annapurna Organic, we believe in the power of nature and the purity of organic farming. Our journey
            began with a simple vision: to provide healthy, fresh, and natural produce while supporting sustainable
            farming practices. As a family-owned business, we are passionate about bringing you the best of nature's
            bounty, grown without harmful chemicals or synthetic pesticides.
          </p>
          <button className="read_more_button">Read More</button>
        </div>
      </div>

      {/* Numbers Section */}
      <div className="about-grid-container">
        <div className="about-grid-item-start">
          <span>— We in numbers</span>
          <h2 className="about-numbers-heading">
            Teams were able to drive adoption and awareness marketing computer development html roi feedback team
            website or turn the ship deep dive but touch base.
          </h2>
        </div>

        <div className="about-grid-item-one">
          <h2 className="about-grid-item-heading">924</h2>
          <p className="about-grid-item-para">SATISFACTION CLIENTS</p>
        </div>

        <div className="about-grid-item-two">
          <h2 className="about-grid-item-heading">35</h2>
          <p className="about-grid-item-para">AWARDS RECEIVED</p>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="portfolio-container">
        <div className="portfolio-container-first">
          <p className="portfolio-container-para">
            Annapurna Farms, we implement regenerative farming techniques such as crop rotation, companion planting,
            and minimal tillage. By avoiding harmful pesticides and utilizing organic fertilizers, we not only maintain
            soil health but also enhance biodiversity on our land.
          </p>
        </div>
        <div className="Our-portfolio-container-one">
          <span>— Our portfolio</span>
          <h2 className="our-protfolio-heading2">
            Taste the Authentic Difference: Pure, Fresh, and Natural Ingredients, Straight from the Farm
          </h2>
        </div>
      </div>

      <div className="portfolio-carousel-container">
        <div className="portfolio-carousel">
          <button className="slider-arrow slider-arrow-left" onClick={handlePrev}>
            ←
          </button>

          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].alt}
            className="portfolio-carousel-image"
          />

          <div className="carousel-overlay_00">
            <p className="carousel-subheading_99">{slides[currentIndex].subtitle}</p>
            <h2 className="carousel-heading_99">{slides[currentIndex].title}</h2>
            <p className="carousel-description_99">{slides[currentIndex].description}</p>
          </div>

          <button className="slider-arrow slider-arrow-right" onClick={handleNext}>
            →
          </button>
        </div>
      </div>


      {/* Clients Section */}
      <div className="our-clients-container">
        <div className="Inner-our-clients-container">
          <h2 className="clients-heading">Our Clients</h2>
        </div>
        <div className="clients-worked">
          <span>— We Worked with</span>
          <p className="clients-worked">
            Get six alpha pups in here for a focus group staff big picture engagement, and critical mass, for we've got
            to manage that low back strategy hanging fruit.
          </p>
        </div>
      </div>

      <div className="clients-gallery">
        {[client_1, client_2, client_3, client_4, client_8 , client_6, client_7, client_5, ].map((client, index) => (
          <div className="client-image-container" key={index}>
            <img src={client} alt={`Client ${index + 1}`} className="client-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;