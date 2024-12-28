import React, { useState, useRef } from 'react';
import './index.css';

const HomePageAbout = () => {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);

  const handleToggle = () => {
    setShowMore(!showMore);

    // Scroll to top of additional content
    if (!showMore) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  return (
    <div className="about-us-section">
      <div className="about-us-content">
        {/* Left Image Section */}
        <div className="about-us-image">
          <img src="../img/Annapurnafarm_aboutus.jpg" alt="About Us" />
        </div>

        {/* Right Content Section */}
        <div className="about-us-text">
          <p>
            We are dedicated to providing high-quality products and services to our customers,
            constantly innovating to meet your needs and exceed expectations.
          </p>
          <p>
            Our vision is to create a positive impact on the world by delivering solutions
            that enhance our clients' lives, helping them achieve their goals.
          </p>
          <p>
            Our team consists of skilled professionals who are passionate about technology
            and customer satisfaction, striving to bring the best to every project.
          </p>

          {/* Additional content with toggle */}
          {showMore && (
            <div className="additional-content" ref={contentRef}>
              <p>
                We believe in continuous growth, always staying updated with industry trends
                to provide you with cutting-edge solutions. Your success is our priority.
              </p>
              <p>
                Our commitment to sustainability drives us to develop products that are both
                innovative and eco-friendly. We take pride in our work and in making a
                difference.
              </p>
            </div>
          )}
          
          <span onClick={handleToggle} className="read-more-text">
            {showMore ? 'Read Less' : 'Read More'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePageAbout;
