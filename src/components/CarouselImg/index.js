import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';

const slider_1 = "/img/slider_1.png";
const slider_2 = "/img/slider_2.png";
const slider_3 = "/img/slider_3.png";

const CarouselImg = () => {
  return (
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000} // Adjust speed of slide transition
      >
        {/* Slide 1 */}
        <div className="carousel-slide">
          <img src={slider_1} alt="Fresh Organic Fruits" />
          <div className="carousel-overlay">
            <h2 className="carousel-title">Purely natural,truly indian farm fresh goodness for every meal
            </h2>
            <button className="carousel-btn">Buy Now</button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-slide">
          <img src={slider_2} alt="Pure Organic Honey" />
          <div className="carousel-overlay">
            <h2 className="carousel-title">Purely natural,truly indian farm fresh goodness for every meal
            </h2>
            <button className="carousel-btn">Buy Now</button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-slide">
          <img src={slider_3} alt="Fresh Vegetables" />
          <div className="carousel-overlay">
            <h2 className="carousel-title">Purely natural,truly indian farm fresh goodness for every meal
            </h2>
            <button className="carousel-btn">Buy Now</button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselImg;
