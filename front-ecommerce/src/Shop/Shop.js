import React from 'react'
import '../assets/CSS/Style.css';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';
import ShopLoading from './ShopLoading';
import { BrowserRouter as Link } from "react-router-dom";
import axios from 'axios';


class Shop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            listProduct: [],
            listCountry: [],
            listOk: [],
            loading: true,
            found: "",
        };
    }


    componentDidMount() {

        
        this.dataArticle();


    }

    dataArticle = async () => {
        await axios.get('/allArticle').then(response => {
            if (response.data == "not found") {
                this.setState({
                    found: "false",
                })
            }
            else {
                this.setState({
                    listProduct: response.data.articles,
                })
                //console.log(this.state.listProduct)
                this.getAssoName()
                this.getPaysName()
            }
        })
    }
    getAssoName = async () => {
        await axios.get('/allAsso').then(response => {

            this.setState({ 
                listAssociations: response.data.association,                
            })
           
            for(let i=0; i<this.state.listAssociations.length; i++){

                for(let y=0; y<this.state.listProduct.length; y++){
                    if(this.state.listAssociations[i].id == this.state.listProduct[y].association){   
                        this.state.listProduct[y].associationName = this.state.listAssociations[i].name
                    }
                }
            }

            this.setState({ 
                listOk: this.state.listProduct,                
            })

        })
    }

    getPaysName = async () => {
        await axios.get('/allPays').then(response => {

            this.setState({ 
                listCountrie: response.data.countrie,                
            })

            for(let i=0; i<this.state.listCountrie.length; i++){

                for(let y=0; y<this.state.listProduct.length; y++){
                    if(this.state.listCountrie[i].id == this.state.listProduct[y].countrie){
                      
                        this.state.listProduct[y].countryName = this.state.listCountrie[i].name
                          
                    }
                }
            }

            this.setState({ 
                listOk: this.state.listProduct,                
            })
        })
    }


    render() {
        if (this.state.found == "false") {
            return (

                <div>products not found :(</div>
            )
        }
        if (this.state.listOk == "") {
            return (
                <ShopLoading />
            )
        }

        else {

            return (
                <section>
                    <Toolbar />
                    <section className="showArticles">
                        <div className="banniere" style={{ backgroundImage: `url("https://www.muralswallpaper.com/app/uploads/Peach-paint-brush-strokes-wallpaper-mural-Swatch.jpg")`}}>
                            <p className="title" >LIVRAISON OFFERTE DÈS 80€ D'ACHAT</p>
                        </div>

                        <div className="container articles">
                    
                            {this.state.listOk.map(product => {

                                return (
                                    <section className="article col-lg-2 col-md-3 col-sm-3 col-xs-3">
                                        <div className="photo_article" style={{ backgroundImage: `url("${product.photo1}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        
                                        <div className="info col-12">
                                            <a href={"/Article/"+product.id}>

                                                <div>
                                                    <div className="name">{product.name}</div>
                                                    <div className="association">{product.associationName}</div>
                                                    <div className="country">{product.countryName}</div>
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

export default Shop;