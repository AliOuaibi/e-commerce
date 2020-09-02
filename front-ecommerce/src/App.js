import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";


// CSS
import './assets/CSS/StyleAdmin.css';
import './assets/CSS/Style.css';
import './assets/CSS/Shop.css'
import './assets/CSS/Profile.css'
import './assets/CSS/Article.css'



// CLIENT
import Home from './Home/Home';
import Nav from './NavElements/Nav';
import './assets/CSS/bootstrap-grid.css';
import './assets/CSS/Style.css';
import Toolbar from './NavElements/Toolbar';
import SocialMedia from './NavElements/SocialMedia';
import Popup from './Popup/Popup';
import Shop from './Shop/Shop';
import Categorie from './Shop/Categorie';
import Categoriie from './Shop/LaCategorie';
import Articless from './Shop/Article';
import Apropos from './Others/Apropos';
import Associationss from './Others/ShowAssociation';
import PageAssociations from './Others/Associations';




// LOGGED CLIENT
import Profile from './Profile/Profile';
import LogOut from './Profile/LogOut';


// ADMIN
import NavAdmin from './Admin/NavAdmin';
import HomeAdmin from './Admin/HomeAdmin';


// TEST
import Test from './Shop/Test';
import Test2 from './Shop/Test2';
import NavLogged from './Profile/NavLogged';
import Footer from './NavElements/Footer';
import Associations from './Home/Associations';
// import Apropos from './Others/Apropos';


function NavOk() {
    if (localStorage.getItem("userId")) {
        return <NavLogged />
    }
    // if (localStorage.getItem("userId") && localStorage.getItem("userRole") == "undefined") {
    //     return <NavLogged />
    // }
    // else if (localStorage.getItem("userId") && localStorage.getItem("userRole") == "ROLE_ADMIN") {
    //     return <NavAdmin />
    // }
    else {
        return <Nav />
    }
}

class App extends Component {


    render() {

        return (
            <Router>

                <NavOk />

                <Route path="/" exact render={
                    () => {
                        return (
                            <div>

                                <Home />
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                            </div>
                        )
                    }
                } />

                <Route path="/Admin" render={
                    () => {
                        return (
                            <div>
                                <HomeAdmin />
                            </div>
                        )
                    }
                } />

                <Route path="/Profile" render={
                    () => {
                        return (
                            <div>
                                <Profile />
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                                <Toolbar />
                            </div>
                        )
                    }
                } />

                <Route path="/Shop" render={
                    () => {
                        return (
                            <div>
                                <Shop />
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                                <Toolbar />
                            </div>
                        )
                    }
                } />

                <Route path="/Categorie" render={
                    () => {
                        return (
                            <div>
                                <Categorie />
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                                <Toolbar />
                            </div>
                        )
                    }
                } />


                <Route path="/Article" render={
                    () => {
                        return (
                            <div>
                                <Articless />
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                            </div>
                        )
                    }
                } />

                <Route path="/Apropos" render={
                    () => {
                        return (
                            <div>
                                <Apropos />
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                            </div>
                        )
                    }
                } />

                <Route path="/Associations" render={
                    () => {
                        return (
                            <div>
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                                <PageAssociations />
                            </div>
                        )
                    }
                } />

                <Route path="/Association" render={
                    () => {
                        return (
                            <div>
                                <Associationss />
                                <SocialMedia />
                                <Toolbar />
                                <Popup />
                            </div>
                        )
                    }
                } />
                <Route path="/LaCategorie" render={
                    () => {
                        return (
                            <div>
                                <Categoriie />
                                <Toolbar />
                                <Popup />
                            </div>
                        )}
                    }
                />


                <Route path="/LogOut" render={
                    () => {
                        return (
                            <div>
                                <LogOut />
                            </div>
                        )
                    }
                } />
                
            </Router>
        );
    }
}

export default App;
