import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
//import { BrowserRouter, Route, Link } from "react-browser-router";
//import '../assets/CSS/Style.css';

let nbrProduct='0';
if(localStorage.getItem("Cart") !== null){
    nbrProduct = localStorage.getItem("Cart").split(' ').length;
}


const Toolbar = () => (

    <Router>
       <section className="Toolbar col-xs-2">
            <div className="bloc1">
                <div className="search_button">
                    <i className="fas fa-search"></i>
                </div>
            </div>
            <div className="bloc2">
                <div className="wish_button">
                    <i className="fas fa-heart"></i>
                </div>
                
                <div className="cart_button">
                    <div className="nbr_article">{nbrProduct}</div>
                    <i className="fas fa-shopping-cart"></i>
                </div>

                
            </div>

            <div className="popup-bg"></div>
       </section>
    </Router>

 
)

export default Toolbar;