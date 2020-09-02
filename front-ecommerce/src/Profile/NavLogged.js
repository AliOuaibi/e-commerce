import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import HamburgerLogged from './HamburgerLogged';


const NavLogged = () => (
    <Router>
        <nav className="Navbar col-lg-10 col-sm-10 col-xs-10">

            <HamburgerLogged/>
            <p className="Logo navbar-brand col-md-1 col-sm-1 col-xs-5">
                <a href={"/"}>
                    hii<span className="dot">.</span>
                </a>
            </p>

                <ul class="col-lg-10 col-md-10 col-sm-10 col-xs-3 d-sm-none">

                    <li>
                        <a href={"/Categorie"}>
                            CATEGORIES
                        </a>
                    </li>

                    <li className="don_button">
                        FAIRE UN DON
                    </li>

                    <li>
                        <a href={"/Associations"}>
                            ASSOCIATIONS
                        </a>
                    </li>

                    <li>
                        <a href={"/LogOut"}>
                            DECONNEXION
                        </a>
                    </li>

                    <li>
                        <a href={'/Profile#profile'}>
                            <div className="profile_nav"></div>
                        </a>
                    </li>

                </ul>



        </nav>
    </Router>


)

export default NavLogged;