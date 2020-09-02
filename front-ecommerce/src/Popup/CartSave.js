import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import $ from 'jquery';
import axios from 'axios';

let nbrProduct = 0;
let total = 0;
let listProduct;

if (localStorage.getItem("Cart") === "" || localStorage.getItem("Cart") === null) {
    localStorage.removeItem('Cart');
}
else {
    nbrProduct = localStorage.getItem("Cart").split(' ').length
    listProduct = localStorage.getItem("Cart").split(' ')
}
let cartContents = [];
let totalDiv = [];
let result;



const dataArticle = async () => {
    await axios.get('/allArticle').then(response => {
        if (response.data == "not found") {
            this.setState({
                found: "false",
            })
        }
        else {
            result = response.data.articles;
            console.log(result)
            if(result!==undefined){
                //Article()
            }
        }
    })
}
dataArticle();


function Article() {

    if (nbrProduct !== 0) {
        
        let countProduct ={};    
        listProduct.forEach(function(i) {
            countProduct[i] = (countProduct[i]||0) + 1;
        });
 
        let productInfo=[]
        for (var prop in countProduct) {
            productInfo.push(prop);
        }
        //console.log(result.find(article => article.id == '1'));

        for (let i = 0; i <productInfo.length; i++) {
            let details = productInfo[i].split('-');
            let idProduct = details[0];
            let sizeProduct = details[1];
            let priceProduct = details[2];
            let quantityProduct = countProduct[productInfo[i]];

            total +=priceProduct * quantityProduct;
            if(i==productInfo.length-1){
                totalDiv.push(<h2>TOTAL : {total}€</h2>);
            }


            cartContents.push(
                <div className="article col-12" key={i}>

                    <div className="details_article col-12">
                        <div className="img_article col-3"></div>
                        <div className="name_assos">
                            <Link to={"/Article/" + idProduct}><h3>Article #{idProduct}</h3></Link>
                            <p className='assos'>Association</p>
                            <p className='assos'>Pays d'origine</p>
                            <p className='assos'>Taille : {sizeProduct}</p>
                            <p className='assos'>x{quantityProduct}</p>
                        </div>

                        <div className="details_article2 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <select name='size' defaultValue={sizeProduct} onChange={(e) => changeSize(productInfo[i], e)}>
                                <option value='XS'>XS</option>
                                <option value='S'>S</option>
                                <option value='M'>M</option>
                                <option value='L'>L</option>
                                <option value='XL'>XL</option>
                                <option value='XXL'>XXL</option>
                            </select>

                            <select name='quantity' defaultValue={quantityProduct} onChange={(e) => changeQuantity(productInfo[i], e)}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>

                            <p className='price'><span className="price_product_cart">{priceProduct * quantityProduct}</span> €</p>
                            <i className="fas fa-trash-alt" onClick={() => trash(productInfo[i])}></i>
                        </div>
                    </div>
                </div>
            )
        }
    }

    else {
        cartContents.push(
            <h1>votre panier est vide</h1>
        )
    }


    //CHECKER LES OCCURENCES ET SUPPRIMER LES DOUBLONS
    // function occurence(array) {
    //     var result = [];
    //     if (array instanceof Array) {
    //         array.forEach(function (v, i) {
    //             if (!result[v]) { 
    //                 result[v] = [i]; 
    //             } else { 
    //                 result[v].push(i); 
    //             }
    //         });
    //     }
    //     // console.log(result[1], "<---------- LE RESULTAT")
    //     return result;
    // };

    function changeSize(productRef, e){
        let newSize =e.target.value;
        console.log(productRef);

        alert(productRef);
        let details = productRef.split('-');
        details[1] = newSize;
        details = details.join('-');

        let newProductRef = details;


        listProduct = localStorage.getItem("Cart").split(' ')

        for (let i= 0; i <= listProduct.length; i++) {
            if (listProduct[i] === productRef) {
                listProduct[i] = newProductRef;
            }
        }
        listProduct = listProduct.join(' ')
        listProduct = listProduct.replace(/^[\s]/, "");
        listProduct = listProduct.replace(/[\s]$/, "");
        listProduct = listProduct.replace(/[\s]{2,}/g, " ");
        listProduct = listProduct.trim();
        localStorage.setItem('Cart', listProduct);
        window.location.reload();
    }

    function changeQuantity(productRef, e){
        let newQuantity =e.target.value;

        listProduct = localStorage.getItem("Cart").split(' ')
        for (let i= 0; i <= listProduct.length; i++) {
            if (listProduct[i] === productRef) {
                listProduct[i] = "";
            }
        }

      
        let updateCart = "";
        for (let i=0; i < newQuantity; i++) {
            updateCart += productRef + " " 
        }

        listProduct = listProduct.join(' ');
        listProduct = listProduct+" "+ updateCart;
        listProduct = listProduct.replace(/^[\s]/, "");
        listProduct = listProduct.replace(/[\s]$/, "");
        listProduct = listProduct.replace(/[\s]{2,}/g, " ");
        listProduct = listProduct.trim();
        localStorage.setItem('Cart', listProduct);
        window.location.reload();
    }

    function trash(productRef) {
        listProduct = localStorage.getItem("Cart").split(' ')

        for (let i= 0; i <= listProduct.length; i++) {
            if (listProduct[i] === productRef) {
                listProduct[i] = "";
            }
        }

        listProduct = listProduct.join(' ')
        listProduct = listProduct.replace(/^[\s]/, "");
        listProduct = listProduct.replace(/[\s]$/, "");
        listProduct = listProduct.replace(/[\s]{2,}/g, " ");
        listProduct = listProduct.trim();
        localStorage.setItem('Cart', listProduct);
        window.location.reload();

    }
    return cartContents;

}



    //Article()
class Cart extends Component {

    render(){

        return(

            <section className="Cart col-lg-7 col-md-7 col-sm-7">
                {/* <i className="fas fa-shopping-cart"></i> */}
                <div className="title col-12">
                    <h1>panier<span className="dot">.</span></h1>
                    <h3 id="nbrProductCart">{nbrProduct} article(s)</h3>
                </div>
                <div className="cartContents">
                    <Article />
                </div>


                <div className="cart_bottom col-12">
                    <div className="don_select col-lg-5 col-md-5 col-sm-5 col-xs-5">
                        <div>
                            <p className="don">Don supplémentaire</p>
                            <p className="facultatif">(facultatif)</p>
                        </div>

                        <select name='don' defaultValue={'0'} >
                            <option value='0' >0 €</option>
                            <option value='1'>1 €</option>
                            <option value='2'>2 €</option>
                            <option value='3'>3 €</option>
                            <option value='4'>4 €</option>
                            <option value='5'>5 €</option>
                            <option value='10'>10 €</option>
                            <option value='15'>15 €</option>
                            <option value='20'>20 €</option>
                        </select>
                    </div>
                    <div className="total">
                        {totalDiv}
                        <div className='order_button' id='to_pay'>COMMANDER</div>
                    </div>
                </div>


            </section>

        )
        
    }



}
export default Cart