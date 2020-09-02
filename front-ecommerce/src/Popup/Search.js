import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';

let logged = false;

class Recherche extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            filtred: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let test = e.target.value;
        let finalData = [];
        this.props.filterdata();
        if (e.target.value !== "") {
            this.props.articles.find(item => {
                if (item.name.includes(test) || item.description.includes(test)) {
                    finalData.push(item)
                    this.props.filterdata(finalData);
                }
            })
        }
    }

    render() {
        return (
            <div class="input-group md-form form-sm form-2 pl-0 col-12" id="search_bar">
                <input class="form-control my-0 py-1 red-border" type="text" onChange={this.handleChange} placeholder="Rechercher..." aria-label="Search"></input>
                <div class="input-group-append">
                    <span class="input-group-text red lighten-3" id="basic-text1"><i class="fas fa-search text-grey"
                        aria-hidden="true"></i></span>
                </div>
            </div>
        )
    }
}

class Categorie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            filtred: [],
            listCategorie: [],
            isLoading: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        axios.get('/allCategorie').then(response => {

            // const listAsso = response.data.categorie
            // console.log(listAsso,'test');
            this.setState({
                listCategorie: response.data.categories,
            })
        })
    }

    handleChange(e) {
        let test = e.target.value;
        let finalData = [];
        this.props.filterdata();
        if (e.target.value !== "") {
            this.props.articles.find(item => {
                if (item.categorie.includes(test)) {
                    finalData.push(item)
                    this.props.filterdata(finalData);
                    // console.log(item,'teeeest');
                }
            })
        }
    }

    render() {
        return (
            <select className="custom-select type_products" id="type_products" defaultValue={'null'} value={this.state.categorie}
                onChange={this.handleChange}>
                <option value='null'>categorie</option>
                {this.state.listCategorie.map(categorie => {
                    return (
                        <option value={categorie.id}>{categorie.name}</option>
                    )
                })}
            </select>
        )
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            filtre: [],
            columns: [],
            listAssociations: [],
            listContinents: [],
            listCountrie: [],

            isLoading: false,
            categorie: "",
            size: "",
            category: "",
            color: "",
            pays: ""
        };
        this.filterdata = this.filterdata.bind(this);
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        axios.get('/allArticle').then(articles => {
            //  console.log(articles.data.articles,'apiiiii');

            this.setState({
                articles: articles.data.articles,
                isLoading: false,
            })
        })

        axios.get('/allAsso').then(response => {

            this.setState({
                listAssociations: response.data.association,
            })
        })

        axios.get('/allContinent').then(response => {

            this.setState({
                listContinents: response.data.continent,
            })
        })

        axios.get('/allPays').then(response => {

            this.setState({
                listCountrie: response.data.countrie,
            })
        })

        axios.get('/allCategorie').then(response => {

            // const listAsso = response.data.categorie
            // console.log(listAsso,'test');
            this.setState({
                listCategorie: response.data.categories,
            })
        })
    }

    filterdata(data) {
        // console.log(data, 'datatest');
        this.setState({
            filtre: data
        })
    }

    // handleSubmitForm = async (event) => {

    //     try {
    //         axios.post('/Recherche', { formSearch: this.state })
    //             .then((response) => {
    //                 console.log(response.data);
    //                 if (response.data == "echec") {
    //                     alert('Aucun article correspondant')
    //                 }
    //                 if (response.data == "succes") {
    //                     console.log('article(s) trouvé(s)')
    //                 }

    //             }, (error) => {
    //                 console.log(error);
    //             });

    //     } catch (error) {
    //         console.log(error)
    //     }

    //     event.preventDefault();
    // }

    render() {
        const { articles, filtre } = this.state
        Object.size = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        
        //console.log(filtre,'filtre');
        // console.log(articles,'articles');
        if (Object.size(filtre) === 0) {
            return (
                <section className="search col-lg-7 col-md-7 col-sm-7">
                    {/* <i className="fas fa-shopping-cart"></i> */}
                    <div className="col-12">
                        <h1>recherches<span className="dot">.</span></h1>
                    </div>
                    <form method="post">
                        <Recherche filterdata={this.filterdata} articles={articles} />
                        <div>
                            <h4>FILTRER LES PRODUITS</h4>
                        </div>
                        <div className="search_products">

                            <div className="input-group type_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="type_products">Type de produits</label>
                                </div>
                                <Categorie filterdata={this.filterdata} articles={articles} />
                            </div>


                            <div className="input-group size_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="size_products">Tailles</label>
                                </div>

                                <select className="custom-select type_products" id="size_products" name="size" defaultValue={'null'} value={this.state.size}
                                    onChange={this.handleChange}>
                                    <option>Tout</option>
                                    <option value='xs'>XS</option>
                                    <option value='s'>S</option>
                                    <option value='m'>M</option>
                                    <option value='l'>L</option>
                                    <option value='xl'>XL</option>
                                </select>
                            </div>

                            <div className="input-group color_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="color_products">Couleurs</label>
                                </div>

                                <select className="custom-select type_products" id="color_products" name="color" defaultValue={'null'} value={this.state.color}
                                    onChange={this.handleChange}>
                                    <option>Tout</option>
                                    <option value='white'>Blanc</option>
                                    <option value='black'>Noir</option>
                                    <option value='beige'>Beige</option>
                                    <option value='blue'>Bleu</option>
                                    <option value='orange'>Orange</option>
                                    <option value='purple'>Violet</option>
                                    <option value='green'>Vert</option>
                                    <option value='yellow'>Jaune</option>
                                    <option value='gold'>Or</option>
                                    <option value='silver'>Argent</option>
                                    <option value='pink'>Rose</option>
                                    <option value='brown'>Marron</option>
                                    <option value='grey'>Gris</option>
                                    <option value='red'>Rouge</option>
                                </select>
                            </div>

                            <div className="input-group price_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-8">
                                    <label class="input-group-text" for="price_products">Prix</label>
                                </div>
                                <input type="range" class="form-control-range" id="formControlRange" min="7" max="45"></input>
                            </div>
                        </div>

                        <div>
                            <h4>FILTRER LES ASSOCIATIONS</h4>
                        </div>
                        <div className="search_bottom">
                            <div className="input-group action_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="action_select">Domaine d'intervention</label>
                                </div>

                                <select className="custom-select type_products" id="action_select" name="action" defaultValue={'null'} value={this.state.category}
                                    onChange={this.handleChange}>
                                    <option value='tout'>Tout</option>
                                    <option value='0' >Education</option>
                                    <option value='1'>Sante</option>
                                    <option value='2'>Accès à l'eau</option>
                                    <option value='3'>Faim</option>
                                </select>
                            </div>

                            <div className="input-group pays_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="pays_select">Pays</label>
                                </div>

                                <select className="form-control btn btn-secondary dropdown-toggle" value={this.state.countrie} name='pays_asso' id="pays_select" defaultValue={'null'}
                                    onChange={this.handleChange}>
                                    <option value='null'>pays</option>
                                    {this.state.listCountrie.map(countries => {
                                        return (
                                            <option value={countries.id}>{countries.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="search_submit_btn">

                            <button className="button" type="submit" onClick={this.handleSubmitForm}>FILTRER</button>
                        </div>
                    </form>


                </section>
            )
        }

        if (Object.size(filtre) !== 0) {
            return (
                <section className="search col-lg-7 col-md-7 col-sm-7">
                    {/* <i className="fas fa-shopping-cart"></i> */}
                    <div className="col-12">
                        <h1>recherches<span className="dot">.</span></h1>
                    </div>
                    <form method="post">
                        <Recherche filterdata={this.filterdata} articles={articles} />
                        {
                            filtre.map(article => {
                                return (
                                    <section>
                                        <div className="photo_article" style={{display: "flex", height: "100px", paddingTop: "10px", borderTop: "0.2px solid beige"}}>
                                        <div className="categorieText col-10" style={{alignSelf: "center"}}>
                                            <a href={"/article/" + article.id}>{article.name}</a>
                                        </div>
                                        <div className="categoriePic col-2" style={{ height: "80px", backgroundImage: `url("${article.photo1}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                                        </div>

                                        </div>
                                    </section>
                                )
                            })}
                        <div>
                            <h4>FILTRER LES PRODUITS</h4>
                        </div>
                        <div className="search_products">

                            <div className="input-group type_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="type_products">Type de produits</label>
                                </div>
                                <select className="custom-select type_products" id="type_products" defaultValue={'null'} value={this.state.categories}
                                    onChange={this.handleChange}>
                                    <option value='null'>categorie</option>
                                    {this.state.listCategorie.map(categorie => {
                                        return (
                                            <option value={categorie.id}>{categorie.name}</option>
                                        )
                                    })}
                                </select>
                            </div>


                            <div className="input-group size_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="size_products">Tailles</label>
                                </div>

                                <select className="custom-select type_products" id="color_products" name="color" defaultValue={'null'} value={this.state.color}
                                    onChange={this.handleChange}>
                                    <option>Tout</option>
                                    <option value='white'>Blanc</option>
                                    <option value='black'>Noir</option>
                                    <option value='beige'>Beige</option>
                                    <option value='blue'>Bleu</option>
                                    <option value='orange'>Orange</option>
                                    <option value='purple'>Violet</option>
                                    <option value='green'>Vert</option>
                                    <option value='yellow'>Jaune</option>
                                    <option value='gold'>Or</option>
                                    <option value='silver'>Argent</option>
                                    <option value='pink'>Rose</option>
                                    <option value='brown'>Marron</option>
                                    <option value='grey'>Gris</option>
                                    <option value='red'>Rouge</option>
                                </select>
                            </div>

                            <div className="input-group color_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="color_products">Couleurs</label>
                                </div>

                                <select className="custom-select type_products" id="color_products" name="color" defaultValue={'null'} value={this.state.color}
                                    onChange={this.handleChange}>
                                    <option value='tout'>Tout</option>
                                    <option value='1'>Blanc</option>
                                    <option value='2'>Noir</option>
                                    <option value='3'>Beige</option>
                                    <option value='4'>Bleu</option>
                                    <option value='5'>Pêche</option>
                                    <option value='6'>Motifs</option>
                                </select>
                            </div>

                            <div className="input-group price_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-8">
                                    <label class="input-group-text" for="price_products">Prix</label>
                                </div>
                                <input type="range" class="form-control-range" id="formControlRange" min="7" max="45"></input>
                            </div>
                        </div>

                        <div>
                            <h4>FILTRER LES ASSOCIATIONS</h4>
                        </div>
                        <div className="search_bottom">
                            <div className="input-group action_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="action_select">Domaine d'intervention</label>
                                </div>

                                <select className="custom-select type_products" id="action_select" name="action" defaultValue={'null'} value={this.state.category}
                                    onChange={this.handleChange}>
                                    <option value='tout' >Tout</option>
                                    <option value='0' >Education</option>
                                    <option value='1'>Sante</option>
                                    <option value='2'>Accès à l'eau</option>
                                    <option value='3'>Faim</option>
                                </select>
                            </div>

                            <div className="input-group pays_select col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <div className="input-group-prepend col-9">
                                    <label class="input-group-text" for="pays_select">Pays</label>
                                </div>

                                <select className="form-control btn btn-secondary dropdown-toggle" value={this.state.countrie} name='pays_asso' id="pays_select" defaultValue={'null'}
                                    onChange={this.handleChange}>
                                    <option value='null'>pays</option>
                                    {this.state.listCountrie.map(countries => {
                                        return (
                                            <option value={countries.id}>{countries.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="search_submit_btn">

                            <button className="button" type="submit" onClick={this.handleSubmitForm}>FILTRER</button>
                        </div>
                    </form>


                </section>
            )
        }
    }

}

export default Search