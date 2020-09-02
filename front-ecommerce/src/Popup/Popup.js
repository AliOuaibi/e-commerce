import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Cart from './Cart.js';
import Wish from './Wishlist';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Payment from './Payment';
import $ from 'jquery';
import Search from './Search.js';
import Don from './Don.js';

class Popup extends Component{
    componentDidMount(){

        $('.cart_button').click(function(){
            $('.popup-bg').fadeIn(500);
            $('.popup').css('display', 'flex');

            $('.Cart').css('display', 'block');
            $('.sign_up').css('display', 'none');
            $('.log_in').css('display', 'none');
            $('.Wish').css('display', 'none');
            $('.search').css('display', 'none');
            $('.Don').css('display', 'none');


        });

        $('.wish_button').click(function(){
            $('.popup-bg').fadeIn(500);
            $('.popup').css('display', 'flex');

            $('.Wish').css('display', 'block');
            $('.sign_up').css('display', 'none');
            $('.log_in').css('display', 'none');
            $('.Cart').css('display', 'none');
            $('.search').css('display', 'none');
            $('.Don').css('display', 'none');


        });

        $('.sign_button').click(function(){
            $('.popup-bg').fadeIn(500);
            $('.popup').css('display', 'flex');

            $('.sign_up').css('display', 'flex');
            //$('.sign_up').css('position', 'fixed');
            $('.log_in').css('display', 'none');
            $('.Cart').css('display', 'none');
            $('.Wish').css('display', 'none');
            $('.search').css('display', 'none');
            $('.Don').css('display', 'none');


        });

        $('.log_button').click(function(){
            $('.popup-bg').fadeIn(500);
            $('.popup').css('display', 'flex');

            $('.log_in').css('display', 'block');
            $('.sign_up').css('display', 'none');
            $('.Cart').css('display', 'none');
            $('.Wish').css('display', 'none');
            $('.search').css('display', 'none');
            $('.Don').css('display', 'none');


        });

        $('.search_button').click(function(){
            // alert('search')
            $('.popup-bg').fadeIn(500);
            $('.popup').css('display', 'flex');

            $('.log_in').css('display', 'none');
            $('.sign_up').css('display', 'none');
            $('.Cart').css('display', 'none');
            $('.Wish').css('display', 'none');
            $('.search').css('display', 'block');
            $('.Don').css('display', 'none');

            
        });

        $('.don_button').click(function(){
            $('.popup-bg').fadeIn(500);
            $('.popup').css('display', 'flex');

            $('.log_in').css('display', 'none');
            $('.sign_up').css('display', 'none');
            $('.Cart').css('display', 'none');
            $('.Wish').css('display', 'none');
            $('.search').css('display', 'none');
            $('.Don').css('display', 'block');


            
        });

        $('#to_pay').click(function(){
            $('.Cart').fadeOut(500);
            $('.Payment').fadeIn(500);
            $('.Payment').css('display', 'block');
        });

        $('.popup-bg').click(function(){
            $('.popup-bg').fadeOut(500);
            $('.sign_up').css('display', 'none');
            $('.log_in').css('display', 'none');
            $('.Cart').css('display', 'none');
            $('.Wish').css('display', 'none');
            $('.Payment').css('display', 'none');
            $('.search').css('display', 'none');
            $('.Don').css('display', 'none');
        });
        
    }
    render(){
        return(
            <section>
                <Cart/>
                <Wish/>
                <Payment/>
                <LogIn/>
                <SignUp/>
                <Search/>
                <Don/>
                <section className="popup-bg"></section>
            </section>
        )

    }
}

export default Popup