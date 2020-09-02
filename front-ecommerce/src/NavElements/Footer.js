import React from 'react';
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


const Footer = () => (
    <section className="Footer col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <footer>
            <div className="foot1 col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <div className="Logo">hii<span>.</span></div>
                <p>Taslima - Cheffe de projet / Développeuse back end</p>
                <p>Ali - fonction / Développeur back end</p>
                <p>Chaima - fonction / Développeuse back end</p>
                <p>Daisy - Webmarketeur / Développeuse front end</p>
                <p>Koumba - Webdesigner / Développeuse front end</p>
                
            </div>

            <div className="foot2 col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <ul class="col-sm-12 col-xs-12">
                    <li>ASSOCIATIONS</li>
                    <li>FAIRE UN DON</li>
                    <a href={"/Apropos"}><li>À PROPOS</li></a>
                    <li>CONTACTS</li>
                </ul>
                <div className="newsletter col-xs-12 col-sm-2 col-md-12 col-lg-12">
                    <h3>newsletter<span>.</span></h3>
                    <input type="text" />
                    <input type="submit" value="S'INSCRIRE" />
                </div>
                <section className="SocialFooter col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <i class="fab fa-instagram"></i>
                    <i class="fab fa-facebook-square"></i>
                    <i class="fab fa-twitter-square"></i>
                    <i class="fab fa-youtube"></i>
                </section>
            </div>
        </footer>
        <h5>© 2020 hii.</h5>
    </section>
)

export default Footer