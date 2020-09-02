import React, { Component } from 'react'
import '../assets/CSS/Style.css';
import Nav from '../NavElements/Nav';
import NavLogged from '../Profile/NavLogged';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';
import axios from 'axios';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
//import img1 from "../assets/IMG/Articles/"+this.state.dataProduct.photo1;

const ArticleLoading = () =>(

    <section>


        <section className="showArticle">

            <div className="container article">
                <div className="col-lg-1 col-sm-2 article_images">
                    <div className="img_loading" ></div>
                    <div className="img_loading" ></div>
                    <div className="img_loading" ></div>
                    <div className="img_loading" ></div>
                </div>
                <div className="col-lg-5 col-sm-8 show_image" >
                <div className="img_loading" ></div>
                </div>
                <div className="col-lg-6 col-sm-12 infos">
                    <div className="infos_main">
                        <div className="title col-11">
                    
                            <p className="name_loading col-5"></p>
                            <p className="asso_loading col-4"></p>
                        </div>
                        
                    </div>
                    <div className="article_description">
                        <p className="description_loading col-10"></p>
                        <p className="description_loading col-7"></p>
                        
                    </div>
                    <div className="price_selection">
                        <div className="price_loading col-1"></div>
                        <div className="article_selection">
                            <form method="post">
                                <div className="form-group">
                                    <select className="custom-select type_products" disabled>
                                        <option value=''>Choisir ma taille</option>
                                        <option value='XS'>XS</option>
                                        <option value='S'>S</option>
                                        <option value='M'>M</option>
                                        <option value='L'>L</option>
                                        <option value='XL'>XL</option>
                                        <option value='XXL'>XXL</option>
                                    </select>
                                </div>
                                <button className="button" type="submit" disabled >AJOUTER AU PANIER</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </section>

)

export default ArticleLoading;