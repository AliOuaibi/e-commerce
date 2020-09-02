import React, { Component } from 'react'
import Footer from '../NavElements/Footer';
import axios from 'axios';
import $ from 'jquery';

let splitURL = window.location.href.split('/');
let AssoId = splitURL[4];
// console.log('/findAsso/'+AssoId)

let arrayAsso=[];

class Associationss extends React.Component {


    state = {
        dataAsso: null,
        found: "",
    };

    
    componentDidMount(){
        
        this.dataAsso();
    }

    dataAsso = async () => {
        await axios.get('/findAsso/'+AssoId).then(response => {
            // console.log(response.data, " RESPOOOONSE");
            if (response.data=="not found"){
                this.setState({ 
                    found: "false",               
                })
                console.log(this.state.found, "FOUUUUUUUUND")
            }
            else{
                console.log(response.data, "NEW RESPOOOOONSE")
                this.setState({
                    dataAsso: response.data
                });
                arrayAsso = this.state.dataAsso;
                console.log(this.state.dataAsso, "LIST ASSOOO")
                console.log(this.state.dataAsso, "FINAL DATA ASSO");
            }

        })
    }
    

    render(){
        if(this.state.found=="false"){
            return(
                <section className="showArticle">
                    <h1>Asso not found :'(</h1>
                    <a href={"/Shop"}>Go to shop</a>
                </section>
                    
             
            )
        }
        
        else{ 

            if (this.state.dataProduct==null){
                return(
                    <div>chargement...</div>
                )
            } 
            else{
            return (
                <section>
    
                    <section className="showArticle">
            
                        <div className="container article">

                        {this.state.dataAsso.name}
                        {console.log(this.state.dataAsso)}
                            <div className="col-lg-6 col-sm-12 infos">
                                <div className="infos_main">
                                    <div className="title">
                                    
                                        <p id="name">{this.state.dataAsso.domaine}</p>
                                        {/* recuperer nom pays/asso grace aux id this.state.dataAsso.association this.state.dataAsso.countrie */}
                                        {/* <p id="asso">association/pays d'origine</p> */}
                                    </div>
                                    
                                </div>
                                <div className="article_description">
                                    {/* <p>{this.state.dataAsso.description}</p> */}
                                    
                                </div>
                                
                            </div>
                        </div>
                    </section>
                    <Footer />
                </section>
            )
            }
        }
            
           
        

    }
}

export default Associationss;