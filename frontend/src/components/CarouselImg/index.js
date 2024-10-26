import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';


const slider_1 = "/img/slider_1.png";
const slider_2 = "/img/slider_2.png";
const slider_3 = "/img/slider_3.png";


const CarouselImg = () => {
  return (
    <div className="carousel-wrapper">
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
          <img src={slider_1} alt="Product 1" />
          <div className="carousel-content">
            <h2>Fresh Organic Fruits</h2>
            <p>Enjoy our wide range of hand-picked organic fruits delivered to your door.</p>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-slide">
          <img src={slider_2} alt="Product 2" />
          <div className="carousel-content">
            <h2>Pure Organic Honey</h2>
            <p>Get the purest organic honey for your health and wellness needs.</p>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-slide">
          <img src={slider_3} alt="Product 3" />
          <div className="carousel-content">
            <h2>Fresh Vegetables</h2>
            <p>We provide fresh and locally sourced vegetables for your daily meals.</p>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselImg;
