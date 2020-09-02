import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';



class Don extends Component {

    constructor(props) {
        super(props);

        this.state = {
          somme: "",
          association: "",
          continent: "",
          countrie: "",
          action: "",
          listAssociations: [],
          listContinents: [],
          listCountrie: [],
          listCategorie: [],
        };

    }

    componentDidMount(){

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

    handleSubmitForm = async (event) => {
        // let somme = this.state.somme;
        try { 
            console.log(this.state)
            let toCart = '0-0-'+ this.state.somme +'-'+this.state.countrie+'-'+this.state.association;
            // let toCart = productId+'-'+this.state.size+'-'+this.state.price+'-'+countryId+'-'+this.state.dataProduct.association;


            if(localStorage.getItem("Cart") !== null){
                let contentsStorage = localStorage.getItem('Cart');
                localStorage.setItem('Cart', contentsStorage+' '+toCart);
            }
            else{
                localStorage.setItem('Cart', toCart);
            }

            // console.log('0-0-0'+this.state.country+'-'+this.state.association);
            alert('Don ajouté au panier avec succès');
            window.location.reload();

            axios.post('/addDon', {formDon : this.state})
            .then((response) => {
                console.log(response)
                if (response.data=="succes"){
                    alert("Le don a bien été ajouté au panier !");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de l'ajout de votre don");
                }
            
            }, (error) => {
                console.log(error);
            });
        } catch (error) {                                                                                               
            console.log(error.message)
        }

        event.preventDefault();
    }

    handleChange = async (event)  =>{
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value,
            
        });
    }

    render() {
        return (
            <div className="Don col-lg-4 col-md-4 col-sm-4">
                <div className="title">
                    <p className="picto">❤</p>
                    <h1>JE FAIS UN DON</h1>
                </div>
                <div className="don-form">
                    <form method="post">
                        <div class="input-group md-form form-sm form-2 pl-0 " id="somme_bar">
                            <div className="input-group-prepend ">
                                <label class="input-group-text">1 . J'indique la somme de mon don</label>
                            </div>
                            <input class="form-control my-0 py-1 red-border" name="somme" type="text" placeholder="Exemple : 10" value={this.state.somme} onChange={event => this.handleChange(event)} required></input>
                            
                            <div class="input-group-append">
                                <span class="input-group-text red lighten-3" id="basic-text1"> €</span>
                            </div>
                        </div>
                        <div className="input-group action_select">
                            <div className="input-group-prepend ">
                                <label class="input-group-text" for="association_select">2 . Je choisis l'association bénéficiaire</label>
                            </div>

                            <select name='association' defaultValue={'null'} value={this.state.association} onChange={event => this.handleChange(event)}>
                                <option value='null'>association</option>
                                {this.state.listAssociations.map(associations => {
                                    return (
                                        <option value={associations.id}>{associations.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="input-group-prepend" id="ou">
                            <label class="input-group-text">OU</label>
                        </div>

                        <div className="input-group action_select ">
                            <div className="input-group-prepend ">
                                <label class="input-group-text" for="action_select">Je choisis le domaine d'intervention bénéficiaire</label>
                            </div>

                            <select className="custom-select type_products" id="action_select" name="action" defaultValue={'0'}>
                                <option value='0' >Education</option>
                                <option value='1'>Sante</option>
                                <option value='2'>Accès à l'eau</option>
                                <option value='3'>Faim</option>
                            </select>
                        </div>

                        <div className="input-group pays_select ">
                            <div className="input-group-prepend ">
                                <label class="input-group-text" for="pays_select">Je choisis le pays bénéficiaire</label>
                            </div>

                            <select name='countrie' defaultValue={'null'} value={this.state.countrie} onChange={event => this.handleChange(event)}>
                                <option value='null'>pays</option>
                                {this.state.listCountrie.map(countries => {
                                    return (
                                        <option value={countries.id}>{countries.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="don_submit_btn">

                            <button className="button" type="submit" onClick={this.handleSubmitForm}>AJOUTER AU PANIER</button>
                        </div>

                    </form>
                </div>


            </div >
        )
    }
}

export default Don;