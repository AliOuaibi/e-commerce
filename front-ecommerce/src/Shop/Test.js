import React from 'react'
import '../assets/CSS/Style.css';
import Nav from '../NavElements/Nav';
import NavLogged from '../Profile/NavLogged';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';
import $ from 'jquery';

//let loggedIn = sessionStorage.getItem('logged');
let loggedIn = false;
const articles = [];


function Article(){
  
    for(let i=0 ; i < 300; i++){

        articles.push(
            <section className="article col-2">
                <h1>Article {i}</h1>
                {/* <Link to="/Article"> 
                    Lien page produit
                </Link> */}

                
                <div>
                    <button onClick={() => addToCart(i)}>add</button>    
                </div>
            </section>
        )
    }
 
    function addToCart(id){

        alert(id)
        if(localStorage.getItem("Cart") !== null){
            let contentsStorage = localStorage.getItem('Cart');
            localStorage.setItem('Cart', contentsStorage+' '+id);
        }
        else{
            localStorage.setItem('Cart', id);
        }
        let nbrProduct = localStorage.getItem("Cart").split(' ').length
        $('.nbr_article').text(nbrProduct)
        $('#nbrProductCart').text(nbrProduct + " article(s)")
    }

    return (
        articles
    )
    

}

const ShowArticles = () => (

    <section className="showArticles">
        <div className="banniere">
            <p className="title">LIVRAISON OFFERTE DÈS 80€ D'ACHAT</p>
        </div>  

        <div className="articles">
            <Article/>
        </div>
    </section>

)

class Shop extends React.Component {
    
    render(){
        if(loggedIn===true){
            return(    
                <section>
                    <NavLogged/>
                    <Toolbar/>
                    <ShowArticles/>
                    <Footer/>
                </section>
            )
        }
        if(loggedIn===false){
            return(
                <section>
                    <Nav/>
                    <Toolbar/>
                    <ShowArticles/>
                    <Footer/>
                </section>
            )
        }

    }
}

export default Shop;