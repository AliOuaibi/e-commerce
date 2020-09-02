import React, { Component } from 'react'
import Footer from '../NavElements/Footer';
import axios from 'axios';
import ArticleLoading from './ArticleLoading';
import $ from 'jquery';
import Comments from './Comment'

let splitURL = window.location.href.split('/');
let productId = splitURL[4];
let zoomPic;



class Articless extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //price:"",
            size: "M",
            quantity: "1",
            country: "id_country",
            association: "id_asso",
            dataProduct: null,
            loading: true,
            found: "",
            listCountrie: [],
            listComments: [],
            comment: [],
            Commentdescription: "",
            CommentUser: "",
            listOk: [],
        };
    }


    componentDidMount() {


        this.dataArticle();
        // this.dataComments();
        //this.getPays();  
        //this.getAsso();

        zoomPic = function (dataURI) {
            let zoom = document.getElementsByClassName('zoomPic')
            $('.zoomPic').css('background-image', 'url(' + dataURI + ')');
        }

    }
    dataArticle = async () => {
        await axios.get('/findArticle/' + productId).then(response => {
            if (response.data == "not found") {
                this.setState({
                    found: "false",
                })
            }
            else {
                this.setState({
                    dataProduct: response.data.article,
                    country: response.data.article.countrie,
                    association: response.data.article.association,
                })
                this.state.price = this.state.dataProduct.price;

                $('.zoomPic').css('background-image', 'url(' + this.state.dataProduct.photo1 + ')')

                this.getPaysName()
            }
        })
    }

    getPaysName = async () => {
        await axios.get('/allPays').then(response => {

            this.setState({
                listCountrie: response.data.countrie,
            })

            for (let i = 0; i < this.state.listCountrie.length; i++) {
                if (this.state.listCountrie[i].id == this.state.country) {

                    this.setState({
                        countryName: this.state.listCountrie[i].name
                    })

                    this.getAssoName()
                }
            }

        })
    }

    getAssoName = async () => {
        await axios.get('/allAsso').then(response => {

            this.setState({
                listAssociations: response.data.association,
            })

            for (let i = 0; i < this.state.listAssociations.length; i++) {
                if (this.state.listAssociations[i].id == this.state.association) {
                    this.setState({
                        assoName: this.state.listAssociations[i].name
                    })
                    break;
                }
            }

        })
    }

    // dataComments = async () => {
    //     await axios.get('/allComment/' + productId).then(response => {
    //         console.log(response.data.comments, "LA RESPOOOOONSE")
    //         console.log(localStorage, "LA");
    //         this.setState({
    //             listComments: response.data.comments,
    //         })

    //         for (let i = 0; i < this.state.listComments.length; i++) {
    //             // this.setState({ 
    //             //     // comment: response.data.comments,
    //             // })
    //             // console.log(this.state.listComments[0].article, "NUMERO DARTICLE ? ")
    //             console.log(this.state.listComments[i], "LAAAAAAAAAA");

    //             console.log(this.state.listComments[i].commentaire, "DESCRIPTION");

    //             if (this.state.listComments[i].article == this.state.productId) {
    //                 this.setState({
    //                     Commentdescription: this.state.listComments[i].commentaire,
    //                     CommentUser: this.state.listComments[i].idUser,
    //                 })
    //                 break;
    //             }
    //         }
    //         // console.log(this.state.comment, "COMMENTTTTTTTTS")
    //         console.log(this.state.listComments, "LIST COMMENNNNNNNTS")
    //         console.log(this.state.Commentdescription, "----------COMMENTAIREEEEEE")
    //         console.log(this.state.CommentUser, "----------UTILISATEUR")

    //         this.setState({
    //             listOk: this.state.listComments,
    //         })

    //     })
    // }

    handleSubmitForm = async (event) => {
        let countryId = this.state.dataProduct.countrie;
        try {
            let toCart = productId + '-' + this.state.size + '-' + this.state.price + '-' + countryId + '-' + this.state.dataProduct.association;

            if (localStorage.getItem("Cart") !== null) {
                let contentsStorage = localStorage.getItem('Cart');
                localStorage.setItem('Cart', contentsStorage + ' ' + toCart);
            }
            else {
                localStorage.setItem('Cart', toCart);
            }

            console.log(productId + '-' + this.state.size + '-' + this.state.quantity + '-' + this.state.country + '-' + this.state.association);
            alert('Article ajouté au panier avec succès');
            window.location.reload();
        } catch (error) {
            console.log(error.message)
        }
        event.preventDefault();
    }

    handleChange = async (event) => {
        var value = event.target.value;
        var name = event.target.name;

        this.setState({
            [name]: value,
        });
    }


    render() {
        if (this.state.found == "false") {
            return (
                <section className="showArticle">
                    <h1>product not found :'(</h1>
                    <a href={"/Shop"}>Go to shop</a>
                </section>


            )
        }

        else {
            if (this.state.dataProduct == null) {
                return (
                    <ArticleLoading />
                )
            }
            else {
                return (
                    <section>

                        <section className="showArticle">

                            <div className="container article">

                                <div className="col-lg-1 col-sm-2 article_images">
                                    <div className="article_min_pic" onClick={() => zoomPic(this.state.dataProduct.photo1)} style={{ backgroundImage: `url("${this.state.dataProduct.photo1}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className="article_min_pic" onClick={() => zoomPic(this.state.dataProduct.photo2)} style={{ backgroundImage: `url("${this.state.dataProduct.photo2}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className="article_min_pic" onClick={() => zoomPic(this.state.dataProduct.photo3)} style={{ backgroundImage: `url("${this.state.dataProduct.photo3}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className="article_min_pic" onClick={() => zoomPic(this.state.dataProduct.photo4)} style={{ backgroundImage: `url("${this.state.dataProduct.photo4}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                </div>
                                <div className="col-lg-5 col-sm-8 show_image" >
                                    <div className="zoomPic" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                </div>
                                <div className="col-lg-6 col-sm-12 infos">
                                    <div className="infos_main">
                                        <div className="title">

                                            <p id="name">{this.state.dataProduct.name}</p>
                                            {/* recuperer nom pays/asso grace aux id this.state.dataProduct.association this.state.dataProduct.countrie */}
                                            <p id="asso">{this.state.assoName} / {this.state.countryName}</p>
                                        </div>

                                        <div className="like">
                                            <input id="toggle-heart" type="checkbox" />
                                            <label for="toggle-heart" aria-label="like">❤</label>
                                        </div>
                                    </div>
                                    <div className="article_description">
                                        <p>{this.state.dataProduct.description}</p>

                                    </div>
                                    <div className="price_selection">
                                        <div className="price">{this.state.dataProduct.price} €</div>
                                        <div className="article_selection">
                                            <form method="post">
                                                <div className="form-group">
                                                    <select className="custom-select type_products" defaultValue={'M'} id="size_products" name="size" required value={this.state.size} onChange={event => this.handleChange(event)}>
                                                        <option value=''>Choisir ma taille</option>
                                                        <option value='XS'>XS</option>
                                                        <option value='S'>S</option>
                                                        <option value='M'>M</option>
                                                        <option value='L'>L</option>
                                                        <option value='XL'>XL</option>
                                                        <option value='XXL'>XXL</option>
                                                    </select>
                                                </div>
                                                <button className="button" type="submit" onClick={this.handleSubmitForm}>AJOUTER AU PANIER</button>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <Comments />
                        </section>
                    </section>
                )
            }

        }

    }
}

export default Articless;