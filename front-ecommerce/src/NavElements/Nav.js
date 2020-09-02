import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter} from "react-router-dom";
import Hamburger from './Hamburger';
import Home from '../Home/Home';


const Nav = () => (
    <Router>
        <Switch>
            {/* <Route exact path="/" component={withRouter(Home)}/> */}
            <nav className="Navbar col-lg-10 col-sm-10 col-xs-10">

                <Hamburger/>
                <p className="Logo navbar-brand col-md-2 col-sm-5 col-xs-5">
                    <a href={"/"}>
                        hii<span className="dot">.</span>
                    </a>
                </p>

                <ul className="col-lg-10 col-md-10 col-sm-6 col-xs-3 d-sm-none">
                    <li className="sign_button">
                        INSCRIPTION
                    </li>

                    <li className="log_button">
                        CONNEXION
                    </li>

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
                </ul>
            </nav>
        </Switch>           
    </Router>


)

export default Nav;