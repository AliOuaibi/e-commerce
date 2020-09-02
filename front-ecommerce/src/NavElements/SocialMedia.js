import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
//import { BrowserRouter, Route, Link } from "react-browser-router";
//import '../assets/CSS/Style.css';

const SocialMedia = () => (
    <Router>
       <section className="Socialbar d-sm-none d-xs-none">
            <i class="fab fa-instagram"></i>
            <i class="fab fa-facebook-square"></i>
            <i class="fab fa-twitter-square"></i>
            <i class="fab fa-youtube"></i>
       </section>
    </Router>

 
)

export default SocialMedia;