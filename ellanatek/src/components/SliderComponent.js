import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/SliderComponent.css';
import Home from './Home';
import AdvertiseWithUs from '../services/advertise/Login';
import RideWithUs from './RideWithUs';
import AboutUs from './AboutUs';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Slider {...settings}>
      <div>
        <Home />
      </div>
      <div>
        <AdvertiseWithUs />
      </div>
      <div>
        <RideWithUs />
      </div>
      <div>
        <AboutUs />
      </div>
    </Slider>
  );
}

export default SliderComponent;