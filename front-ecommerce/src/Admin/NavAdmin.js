import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import HamburgerAdmin from './HamburgerAdmin';


const NavAdmin = () => (
    <Router>
        <nav className="Navbar col-lg-10 col-sm-10 col-xs-10">

            <HamburgerAdmin/>
            <p className="Logo navbar-brand col-md-2 col-sm-5 col-xs-5">
                <Link to="/">
                    hii<span className="dot">.</span>
                </Link>
            </p>

                <ul className="col-lg-10 col-md-10 col-sm-6 col-xs-3 d-sm-none">
                    <li className="sign_button">
                        <Link to="">
                            EDITER MON PROFIL
                        </Link>
                    </li>

                    <li className="log_button">
                        <Link to="">
                            GESTION DU SITE
                        </Link>
                    </li>

                    <li>
                        <a href={"/LogOut"}>
                            DECONNEXION
                        </a>
                    </li>

                </ul>



        </nav>
    </Router>


)
export default NavAdmin;