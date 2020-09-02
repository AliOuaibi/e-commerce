import React, { Component } from 'react'
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';
import AssoLoading from './AssoLoading';
import axios from 'axios';
import $ from 'jquery';

let splitURL = window.location.href.split('/');
let AssoId = splitURL[4];
// console.log('/findAsso/'+AssoId)



class Associationss extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataAsso: [],
            found: "",
            // listOk: [],
            // loading: true, 
        };
    }


    componentDidMount() {

        // console.log('/findAsso/'+AssoId)

        const dataAsso = async () => {
            await axios.get('/findAsso/' + AssoId).then(response => {
                // console.log(response.data, " RESPOOOONSE");
                if (response.data == "not found") {
                    this.setState({
                        found: "false",
                    })
                    console.log(this.state.found, "FOUUUUUUUUND")

                }
                else {
                    console.log(response.data, "NEW RESPOOOOONSE")
                    this.setState({
                        dataAsso: response.data
                    },
                        // function () {
                        //     console.log(this.state.dataAsso, "STATE DATAASSOO")
                        // }
                    );
                    console.log(this.state.dataAsso, "FINAL DATA ASSO");

                }

            })
        }
        dataAsso();
        console.log(this.state.dataAsso, "ET LA");

    }


    render() {
        if (this.state.found == "false") {
            return (
                <section className="showArticle">
                    <h1>Asso not found :'(</h1>
                    <a href={"/Shop"}>Go to shop</a>
                </section>


            )
        }

        else {
            console.log(this.state.dataAsso)
            return (
                <section className="showAsso">

                    <div className="container association">



                        <div className="col-lg-12 col-sm-12 infos">
                            <div className="infos_main">
                                <div className="title">

                                    <p id="name">{this.state.dataAsso.name}</p>
                                    {/* recuperer nom pays/asso grace aux id this.state.dataAsso.association this.state.dataAsso.countrie */}
                                    <p id="asso">{this.state.dataAsso.domaine}</p>
                                </div>

                            </div>
                            <div className="asso_description">
                                <p>{this.state.dataAsso.description}</p>

                            </div>

                        </div>

                    </div>
                    <Footer />
                </section >
            )
        }
    }




}


export default Associationss;