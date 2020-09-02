import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

let nbrProduct = 0;
let listProduct;;
let total = 0;




let cartContents = [];
function Recap() {

    for (let i = 0; i < nbrProduct; i++) {

        let details = listProduct[i].split('-');
        let idProduct = details[0];
        let sizeProduct = details[1];
        let quantityProduct = details[2];

        cartContents.push(
            <div className="article col-12" key={i}>

                <div className="details_article col-12">

                    <div className="img_article col-6"></div>

                    <div className="col-6 article_infos">
                        <a href={"/Test2/" + idProduct}><h3 className="title">Article #{idProduct}</h3></a>

                        <p className='assos'>{sizeProduct} x {quantityProduct}</p>
                        <br />
                        <p className='assos'>Association</p>
                        <p className='assos'>Pays d'origine</p>
                        <p className='price'>10.00 €</p>
                    </div>

                </div>

            </div>
        )

    }

    return (
        cartContents
    )
}

class Payment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardName: localStorage.getItem("cardName"),
            cardNumber: localStorage.getItem("cardNumber"),
            monthExp: localStorage.getItem("monthExp"),
            yearExp: localStorage.getItem("yearExp"),
            cvv: "",
            articles: localStorage.getItem("Cart"),
            id_user: localStorage.getItem("userId"),
            status: "WAITING",
            total: localStorage.getItem("total"),
            carrier:"1",
            cartContents: [],
            totalDiv: [],
            allArticle: [],
            
        };
    }
    componentDidMount() {

        if (localStorage.getItem("Cart") === "" || localStorage.getItem("Cart") === null) {
            localStorage.removeItem('Cart');
        }
        else {
            nbrProduct = localStorage.getItem("Cart").split(' ').length
            listProduct = localStorage.getItem("Cart").split(' ')
        }

       this.dataArticle();
    }

    dataArticle = async () => {
        await axios.get('/allArticle').then(response => {
            this.setState({      
                allArticle:response.data.articles
            })
            //console.log(this.state.allArticle)
                
        })
    }

    article = () => {
        let cartContents = [];

        if (nbrProduct !== 0) {
            
            let countProduct ={};    
            listProduct.forEach(function(i) {
                countProduct[i] = (countProduct[i]||0) + 1;
            });
           

            let productInfo=Object.keys(countProduct)

            let result = this.state.allArticle;

            for (let i = 0; i <productInfo.length; i++) {
                let details = productInfo[i].split('-');
                let idProduct = details[0];
                let sizeProduct = details[1];
                let priceProduct = details[2];
                let quantityProduct = countProduct[productInfo[i]];

                total +=priceProduct * quantityProduct;
                if(i == productInfo.length-1){
                    this.state.price= total
                }
                
                let productDetails;
                for(let y=0; y<result.length; y++){
                
                    if(result[y]['id'] == idProduct){
                        productDetails = result[y];
                    }
                }
                cartContents.push(

                    <div className="article col-12" key={i}>

                        <div className="details_article col-12">
                            <div className="img_article col-6" style={{ backgroundImage: `url("${productDetails['photo1']}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                            <div className="col-6 article_infos">
                                <Link to={"/Article/" + idProduct}><p>{productDetails['name']}</p></Link>
                                <p className="assos"> 
                                    Taille : {sizeProduct}<br/>
                                    {priceProduct}€ X {quantityProduct}<br/>
                                    <span className="price_product_cart">{priceProduct * quantityProduct}</span> €
                                </p>
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

        return cartContents;

    }

    handleSubmitForm = async (event) => {
        try {
            axios.post('/payment', { formPayment: {
                status : this.state.status,
                id_user : this.state.id_user, 
                articles : this.state.articles, 
                total : localStorage.getItem("total"),
                carrier : this.state.carrier, 
            }})
            .then((response) => {
                // console.log(response, "statut : 0")
                    // alert('YAS')
                    if (response.data === "echec") {
                        alert('erreur');
                    }
                    else {
                        // alert('ok !');
                        // console.log(document.querySelector('.checkbox').checked, "CHECK CA ")
                        if (document.querySelector('.checkbox').checked == true) {
                            localStorage.setItem('cardName', this.state.cardName);
                            localStorage.setItem('cardNumber', this.state.cardNumber);
                            localStorage.setItem('monthExp', this.state.monthExp);
                            localStorage.setItem('yearExp', this.state.yearExp);
                            alert('Vos données ont bien été enregistrées')
                            localStorage.removeItem('Cart');
                            window.location.href = "/Profile/Orders";
                        }
                        else {
                            alert('Données bancaires non sauvegardées, commande validée !')
                            localStorage.setItem('cardName', "");
                            localStorage.setItem('cardNumber', "");
                            localStorage.setItem('monthExp', "");
                            localStorage.setItem('yearExp', "");
                            localStorage.removeItem('Cart');
                            window.location.href = "/Profile/Orders";
                        }

                    }

                }, (error) => {
                    console.log(error);
                });

        } catch (error) {
            console.log(error)
        }

        event.preventDefault();
    }



    handleChange(event) {
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value,
        });
    }

    render() {

        return (
    
                <div className="Payment col-lg-7 col-md-7 col-sm-7">
                    <section className="Carriers">
                        <div className="carrier col-2">
                        <div className="pic" style={{ backgroundImage: `url("https://apps.oxatis.com/Files/112496/Apps-2016/Apps-Colissimo.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                            <h3>Colissimo</h3>
                            <h1>2 - 3 jours</h1>
                            <h2>3.50 €</h2>
                        </div>

                        <div className="carrier col-2">
                            <div className="pic" style={{ backgroundImage: `url("https://cdn1.oxatis.com/Files/112496/Img/23/Apps-FeDex-no-border.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                            <h3>FedeX</h3>
                            <h1>2 - 3 jours</h1>
                            <h2>2.50 €</h2>
                        </div>

                        <div className="carrier col-2">
                        <div className="pic" style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMxC7FKbTrgp0LBbpMhv7PmGIsWlWZdfgwsQ&usqp=CAU")`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                            <h3>DHL</h3>
                            <h1>2 - 3 jours</h1>
                            <h2>3.00 €</h2>
                        </div>

                        <div className="carrier col-2">
                            <div className="pic" style={{ backgroundImage: `url("https://rischette.lu/532-1338-large/gls-transport-parcel-shop.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                            <h3>GLS</h3>
                            <h1>2 - 3 jours</h1>
                            <h2>2.50 €</h2>
                        </div>
                    </section>

                    <section className="recap_payment">

                        <div className="col-5">

                            <section className="recap_section">
                                
                                {nbrProduct>0 && this.article()}
                            </section>
                            <h2>TOTAL : {localStorage.getItem('total')}€</h2>
                        </div>

                        <section className="col-7">

                            <form className="paymentForm col-12">
                                <h1>paiement<span className='dot'>.</span></h1>
                                <div className="card_pics col-8">
                                </div>
                                <input type="text" name="cartvalue" style={{display:"none", backgroundColor:"black"}} value={localStorage.Cart}/>
                <input type="text" name="uservalue" style={{display:"none", backgroundColor:"black"}} value={localStorage.userId}/>
                                <label htmlFor='cardName'>TIULAIRE DE LA CARTE</label><br />
                                <input type='text' className="col-12" name='cardName' required='required' value={this.state.cardName} onChange={event => this.handleChange(event)} /><br />
                                <label htmlFor="cartvalue"></label>
                                
                                <label htmlFor='cardNumber'>NUMEROS DE LA CARTE</label><br />
                                <input type='text' className="col-12" name='cardNumber' required='required' value={this.state.cardNumber} onChange={event => this.handleChange(event)} /><br />

                                <section className="exp_cvv">
                                    <div>
                                        <label htmlFor='experation'>DATE D'EXPIRATION</label><br />
                                        <div className="experation_date">
                                            <input type='text' className="col-2" name='monthExp' required='required' value={this.state.monthExp} onChange={event => this.handleChange(event)} />/
                                            <input type='text' className="col-2" name='yearExp' required='required' value={this.state.yearExp} onChange={event => this.handleChange(event)} />
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor='cvv'>CVV</label><br />
                                        <input type='text' className="col-6" name='cvv' required='required' value={this.state.cvv} onChange={event => this.handleChange(event)} />
                                    </div>
                                </section>

                                <label htmlFor='save'>ENREGISTRER MA CARTE
                                    <input className="checkbox" type='checkbox' name='save' defaultChecked='true' onChange={event => this.handleChange(event)} />
                                </label><br />
                                <div className="submit_div">
                                    <input type='submit' value="PAYER" onClick={this.handleSubmitForm} />
                                </div>
                                
                            </form>

                        </section>
                    </section>

                </div>
     


        )

    }
}

export default Payment  