import React, { Component } from 'react'
import '../assets/CSS/Style.css';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';
import axios from 'axios';
import $ from 'jquery';

let splitURL = window.location.href.split('/');
let categorieId = splitURL[4];
let zoomPic;

class Categoriie extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            articles: [],
            loading: true,
            found: "",
        };
    }
    
    componentDidMount(){

        const dataArticle = async () => {
            await axios.get('/categorieArticle/'+categorieId).then(response => {
                console.log(response,'aaaaaaaaaaaaaaaaaaaaaa');
                if (response.data=="not found"){
                    this.setState({ 
                        found: "false",               
                    }) 
                }
                else{
                    this.setState({ 
                        articles: response.data.article,             
                    }) 
                    $('.zoomPic').css('background-image', 'url('+this.state.articles.photo1+')')         
                }
            })
        }
        dataArticle();

        zoomPic = function(dataURI){
            // let zoom = document.getElementsByClassName('zoomPic')
            $('.zoomPic').css('background-image', 'url('+dataURI+')');
        }
        
    }

    render() {
        if(this.state.found=="false"){
            return(
                <section>
                    <Toolbar />
                    <section className="showArticles">
                        <div className="banniere" style={{ backgroundImage: `url("https://www.muralswallpaper.com/app/uploads/Peach-paint-brush-strokes-wallpaper-mural-Swatch.jpg")`}}>
                            <p className="title" >LIVRAISON OFFERTE DÈS 80€ D'ACHAT</p>
                        </div>
                        <div className="container articles">
                        
                        <div>Pas d'articles pour cette categorie :(</div>
                        </div> 
                    </section>
                    <Footer />
                </section>
                
                
            )
        }
        if (this.state.listCategorie==""){
            return(
                //component chargement categories ici
                <div>chargement...</div>
            )
        } 
        else{
            return (
                <section>
                    <Toolbar />
                    <section className="showArticles">
                        <div className="banniere" style={{ backgroundImage: `url("https://www.muralswallpaper.com/app/uploads/Peach-paint-brush-strokes-wallpaper-mural-Swatch.jpg")`}}>
                            <p className="title" >LIVRAISON OFFERTE DÈS 80€ D'ACHAT</p>
                        </div>
                        <div className="container articles">
                        {this.state.articles.map(product => {
                                return (
                                    <section className="article col-lg-2 col-md-3 col-sm-3 col-xs-3">
                                        <div className="photo_article" style={{ backgroundImage: `url("${product.photo1}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        
                                        <div className="info col-12">
                                            <a href={"/Article/"+product.id}>

                                                <div>
                                                    <div className="name">{product.name}</div>
                                                    <div className="association">association</div>
                                                </div>
                                            </a>
                                            <div className="price">{product.price} €</div>
                                        </div>
                                    </section>
                            
                                )
                            })}
                        </div> 
                    </section>
                    <Footer />
                </section>
            )
        }
        }

}

export default Categoriie;