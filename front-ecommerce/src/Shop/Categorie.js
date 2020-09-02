import React from 'react'
import '../assets/CSS/Style.css';
import axios from 'axios';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';
import { BrowserRouter as  Link } from "react-router-dom";

class Categorie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategorie:[],
            isLoading: false,
            loading:true,
            found:"",
        };
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        axios.get('/allCategorie').then(response => {
            if(response.data=='not found'){
                this.setState({
                    found:'false',
                })
            }
            else{
                this.setState({ 
                    listCategorie: response.data.categories,                
                })
            }
        })
    }


    render(){
        if(this.state.found=="false"){
            return(
                
                <div>categories not found :(</div>
            )
        }
        if (this.state.listCategorie==""){
            return(
                //component chargement categories ici
                <div>chargement...</div>
            )
        } 
        else{
            return(
                <section>
                <Toolbar/>
                <section className="showCategories">
                    <div className="banniere">
                        <p className="title">LIVRAISON OFFERTE DÈS 80€ D'ACHAT</p>
                    </div>

                    <div className="container categories">
                        {this.state.listCategorie.map(categorie => {
                            return (
                    
                                <a href={"LaCategorie/"+categorie.id} className="categorie col-lg-3 col-md-3 col-sm-3 col-xs-3" style={{ backgroundImage: `url("${categorie.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="categorieText">
                                    {categorie.name}
                                    </div>
                                </a>
                                
                            )
                        })}
                    </div>
                </section>
                <Footer/>
            </section>
            )
        }
    }
}

export default Categorie;