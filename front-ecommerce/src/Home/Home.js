import React from 'react'
import '../assets/CSS/Style.css';
import Carousel from './Carousel';
import Data from './Data';
import HomeSelection from './HomeSelection';
import NewProducts from './NewProducts';
import Associations from './Associations';
import Footer from '../NavElements/Footer';
import { BrowserRouter as Link } from "react-router-dom";
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            listProduct: [],
            loading: true,
            found: "",
        };
    }




    render(){
        return (
            <section>

                <section className="Accueil">
                    <div className="homePage col-lg-7 col-md-6 col-sm-10 col-xs-10">
                        <div className="intro col-xs-12">

                            <h1 className="logo d-xs-none d-sm-none">hii<span className="dot d-xs-none d-sm-none">.</span></h1>
                            
                            <p className="text col-lg-10 col-md-10">
                                <h1>
                                    rendre le monde <span id="wd-meilleur">meilleur </span><br></br>
                                     grace a ton shopping
                                </h1>
                                Notre ambition ? Participer à la construction du monde de demain : un monde plus juste, plus solidaire.
                                <br/><span className="dot" style={{fontWeight: 'bold'}}>E N S E M B L E.</span><br/>
                               Aider n'a jamais été si collaboratif ! 

                            </p>

                            <div className="button"><a href="/Shop">SHOPPER</a></div>
                        </div>
                    </div>

                    <div className="Carousel col-lg-5 col-md-6 d-sm-none d-xs-none">
                        <Carousel/>
                    </div>
                    
                </section>

                {/* <Data/> */}

                <HomeSelection/>

                <NewProducts/>

                <Associations/>

                <Footer/>
            </section>
        )
    }
        
    
}

export default Home;