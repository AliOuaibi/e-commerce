import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';
import sha1 from 'sha1';

let uriPicture1;

class AddAsso extends Component{
    
    constructor(props) {
        super(props);
     
        this.state = {
            userId: localStorage.getItem("userId"),
            surname: localStorage.getItem("userSurname"),
            name: localStorage.getItem("userName"),
            email:localStorage.getItem("userEmail"),
            adress:localStorage.getItem("userAdress"),
            old_password:"",
            new_password:"",
            confirm_password:""
        };   
    }

    componentDidMount(){

        // APERCU DES IMG
        //main picture
        $('#picAsso').on('change', function() {
                
            var file = this.files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                $('.main_picture_asso').css('background-image', 'url("' + reader.result + '")');
                $('.main_picture_asso').css('background-size', 'cover');
        
                // var fakePath = $('#picAsso').val();
                // var fileName = fakePath.substr(12);      
            }
            reader.readAsDataURL(file);


            // get uri
            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    uriPicture1 = reader.result;
            
                };
                reader.onerror = function (error) {
                  console.log('Error: ', error);
                };
            }
            getBase64(file)
            
        });
    }

  

    handleSubmitForm = async (event) => {
        console.log([this.state.userId, this.state.name, this.state.surname, this.state.lastname, this.state.email, this.state.adress ]);
        try {
            axios.post('/editProfile/'+this.state.userId, 
                {formEditProfile :{
                    name: this.state.name,
                    surname: this.state.surname, 
                    email: this.state.email, 
                    adress: this.state.adress,
                }
            })
            .then((response) => {
                console.log(response)
                if (response.data == "succes"){
                    alert("Vos informations ont bien été éditées");

                    localStorage.setItem('userSurname', this.state.surname);
                    localStorage.setItem('userName', this.state.name);
                    localStorage.setItem('userEmail', this.state.email);
                    localStorage.setItem('userAdress', this.state.adress);
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la modification de vos informations");
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

    handleSubmitFormPassword = async (event) => {
        
        try {
            this.state.name = this.state.titleAsso;
            this.state.description = this.state.descriptionAsso;

            if(this.state.new_password !== this.state.confirm_password){
                alert('Le nouveau mot de passe et la confirmation doivent être identiques');
            }
            else{
                axios.post('/editPassword/'+this.state.userId, 
                {
                    formEditPassword :{
                        password :this.state.new_password
                    }
                })
                .then((response) => {
                    console.log(response)
                    if (response.data == "succes"){
                        alert("Votre mot de passe a bien été éditées");
                        localStorage.setItem('userPassword', this.state.new_password);
                        window.location.reload();
                    }
                    else{
                        alert("Une erreur s'est produite lors de la modification de votre mot de passe");
                    }
                
                }, (error) => {
                    console.log(error);
                });
            }
            console.log([this.state.old_password, this.state.new_password, this.state.confirm_password]);
            
        } catch (error) {                                                                                               
            console.log(error.message)
        }

        event.preventDefault();
    }

    handleChangePassword = async (event)  =>{
        var value = event.target.value;
        var name = event.target.name;
        
        this.setState({
            [name]: value,
            
        });
    }


    render(){
        return(
                
            <section id="profile">
                éditer mes infos

                <form enctype="multipart/form-data">

                    <section className="form1">
                        <h1>informations personnelles<span className="dot">.</span></h1>
                        <div className="infos_pic">
                            <div className="infos col-7">
                                <div className="nom_prenom">
                                    <div className="col-5">
                                        <label forhtmlFor="surname">PRÉNOM</label><br/>
                                        <input type="text" name="surname" required='required' value={this.state.surname} onChange={event => this.handleChange(event)}/>
                                    </div>

                                   
                                    <div className="col-5">
                                        <label forhtmlFor="lastname">NOM</label><br/>
                                        <input type="text" name="name" required='required' value={this.state.name} onChange={event => this.handleChange(event)}/>
                                    </div>
                                </div>



                                <label forhtmlFor="email">EMAIL</label><br/>
                                <input type="text" name="email" required='required' value={this.state.email} onChange={event => this.handleChange(event)}/>
                                

                                <br/>

                                <label forhtmlFor="adress">ADRESSE</label><br/>
                                <input type="text" name="adress" required='required' value={this.state.adress} onChange={event => this.handleChange(event)}/>
                                
                            </div>

                            <div className="section_profile_pic col-4">
                                <div className="profile_pic">

                                </div>
                            </div>
                        </div>

            
                        <div className="input_button">
                            <input type='button' value="MODIFIER" onClick={this.handleSubmitForm}/>
                        </div>
                    </section>
                </form>


                <form enctype="multipart/form-data">

                    <section className="form2">
                        <h1>mot de passe<span className="dot">.</span></h1>
                        <div className="password3">
                            <div className="col-3">
                                <label forhtmlFor="old_password">
                                    MOT DE PASSE ACTUEL : 
                                    <input type="password" name="old_password" required='required' value={this.state.old_password} onChange={event => this.handleChangePassword(event)}/>
                                </label>
                            </div>

                            <br/>
                            
                            <div className="col-3">
                                <label forhtmlFor="new_password" className="col-3">
                                    NOUVEAU MOT DE PASSE : 
                                    <input type="password" name="new_password" required='required' value={this.state.new_password} onChange={event => this.handleChangePassword(event)}/>
                                </label>
                            </div>

                            <br/>

                            <div className="col-3">

                                <label forhtmlFor="confirm_password" className="col-3">
                                    CONFIRMATION : 
                                    <input type="password" name="confirm_password" required='required' value={this.state.confirm_password} onChange={event => this.handleChangePassword(event)}/>
                                </label>
                            </div>
                        
                        </div>
            
                        <div className="input_button">
                            <input type='button' value="MODIFIER" onClick={this.handleSubmitFormPassword}/>
                        </div>
                    </section>
                </form>
            </section>
        )
    }
}

export default AddAsso;