import React from 'react'
import '../assets/CSS/Style.css';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';
import { BrowserRouter as  Link } from "react-router-dom";
import axios from 'axios';

const Asso = () => (
    <section className="article col-lg-2 col-md-3 col-sm-3 col-xs-3">
        <div className="photo_article_loading"></div>
        
        <div className="info_loading col-12">
            <div className="col-12">
                <div className="name_loading col-10"></div>
                <div className="association_loading col-6"></div>
            </div>
        </div>
    </section>

)

const AssoLoading = () => (
    <section>
        <Toolbar />
        <section className="showArticles">

            <div className="container articles">
                <Asso/>
                <Asso/>
                <Asso/>
                <Asso/>
                <Asso/>
                <Asso/>
                <Asso/>
                <Asso/>
                <Asso/>
                <Asso/>
            </div>
        </section>
        <Footer />
    </section>
)

export default AssoLoading;