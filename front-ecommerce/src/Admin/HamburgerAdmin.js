import React, { Component } from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import $ from 'jquery';

const Menu = () => (
    <section>
        <div className="menu col-12">
            <h1>
                <Link to="">
                    EDITER MON PROFIL
                </Link>
            </h1>
            
            <h1>
                <Link to="">
                    GESTION DU SITE
                </Link>
            </h1>

            <h1> 
                <Link to="">
                    DECONNEXION
                </Link>
            </h1>
        </div>

        <div className='background'>
        </div>
    </section>

)

class HamburgerAdmin extends Component {
    componentDidMount() {
        $('.burger').click(function (e) {
            $('.background').slideToggle();
            $('.menu').slideToggle();
        })

        $('button').on('click', function () {
            $(this).toggleClass('is-active');
        });
    }

    render() {
        return (
            <section className="d-lg-none d-md-none">
                <button className="burger menu-toggle"></button>
                <Menu />
            </section>
        )
    }
}


export default HamburgerAdmin;