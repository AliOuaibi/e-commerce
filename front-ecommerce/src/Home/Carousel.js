import React from 'react';
import '../assets/CSS/Style.css';
import Slider from 'infinite-react-carousel';

const Carousel = () => (
    <Slider dots>
        <div className="Slide slide1"></div>
        <div className="Slide slide2"></div>
        <div className="Slide slide3"></div>
        <div className="Slide slide4"></div>
    </Slider>
);

export default Carousel;