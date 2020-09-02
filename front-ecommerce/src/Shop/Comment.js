import React, { Component } from 'react'
import Footer from '../NavElements/Footer';
import axios from 'axios';
import $ from 'jquery';

let splitURL = window.location.href.split('/');
let productId = splitURL[4];
let zoomPic;



class Comments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listComments: [],
            comment: [],
            Commentdescription: "",
            CommentUser: "",
            listOk: [],
            article: productId,
            commentaire: "",
            user: localStorage.userSurname,

        };
    }


    componentDidMount() {

        this.dataComments();

    }

    dataComments = async () => {
        await axios.get('/allComment/' + productId).then(response => {
            // console.log(response.data.comments, "LA RESPOOOOONSE")
            this.setState({
                listComments: response.data.comments,
            })

            for (let i = 0; i < this.state.listComments.length; i++) {
                // this.setState({ 
                //     // comment: response.data.comments,
                // })
                // console.log(this.state.listComments[0].article, "NUMERO DARTICLE ? ")
                // console.log(this.state.listComments[i], "LAAAAAAAAAA");

                // console.log(this.state.listComments[i].commentaire, "DESCRIPTION");

                if (this.state.listComments[i].article == this.state.productId) {
                    this.setState({
                        Commentdescription: this.state.listComments[i].commentaire,
                        CommentUser: this.state.listComments[i].idUser,
                    })
                    break;
                }
            }
            // console.log(this.state.comment, "COMMENTTTTTTTTS")
            // console.log(this.state.listComments, "LIST COMMENNNNNNNTS")
            // console.log(this.state.Commentdescription, "----------COMMENTAIREEEEEE")
            // console.log(this.state.CommentUser, "----------UTILISATEUR")

            this.setState({
                listOk: this.state.listComments,
            })

        })
    }

    handleSubmitForm = async (event) => {
        try { 
         
            axios.post('/addComment', {
                formComment:{
                    article: this.state.article,
                    commentaire:this.state.commentaire,
                    id_user: localStorage.getItem("userId"),
                }
              
            })
            .then((response) => {
                console.log(response)
                if (response.data=="succes"){
                    alert('SUCCES')
                    this.setState({
                        commentaire: this.state.newcomment,
                    }
                    )
                    console.log(this.state, "ETAT DES STATES")

                    alert("Merci pour votre commentaire");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la création de votre commentaire");
                }
            
            }, (error) => {
                console.log(error);
            });
        } catch (error) {                                                                                               
            console.log(error)
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
                return (
                    <section>
                            <section className="comments">
                                <div className=" container showComments">
                                    <h1>Commentaires.</h1>
                                    {/* {console.log(this.state.listOk, "LISTOK")} */}
                                    {this.state.listOk.map(comm => {

                                        return (
                                            <section className="commentaire ">
                                                <div className="user">{this.state.user}</div>
                                                <div className="comm">{comm.commentaire}</div>

                                            </section>

                                        )

                                    })}

                                    <div className="leavecomment">
                                        <form method="post">
                                            <h4>Laisser un commentaire.</h4>
                                            <div className="text">

                                                <input type="text" name="commentaire" value={this.state.commentaire} onChange={event => this.handleChange(event)}/>
                                            </div>
                                            <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12" id="search_submit_btn">

                                                <button className="button" type="submit" onClick={this.handleSubmitForm}>Envoyer</button>
                                            </div>
                                        </form>


                                    </div>
                                </div>
                            </section>
                        <Footer />
                    </section>
                )
            }
    }

export default Comments;