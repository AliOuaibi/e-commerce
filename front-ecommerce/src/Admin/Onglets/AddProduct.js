import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';

let uriPicture1, uriPicture2, uriPicture3, uriPicture4;
let colorSelect = "null";
class AddProduct extends Component{
    //ajout pays et categorie
    //renommer les champs comme en bdd
    constructor(props) {
        super(props);
     
        this.state = {
          name: "",
          description: "",
          association: "",
          continent: "",
          countrie: "",
          categorie: "",
          genre:"UNISEXE",
          price: "",
          photo_1:"", 
          photo_2:"",
          photo_3:"",
          photo_4:"",
          color: "null",
          listAssociations: [],
          listContinents: [],
          listCountrie: [],
          listCategorie: [],
        };
        
    }

    componentDidMount(){

        // APERCU DES IMG
        //main picture
        $('#main_pic').on('change', function() {
                
            var file = this.files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                $('.main_picture').css('background-image', 'url("' + reader.result + '")');
                $('.main_picture').css('background-size', 'cover');
        
                var fakePath = $('#main_pic').val();
                var fileName = fakePath.substr(12);      
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


        // picture2
        $('#picture2').on('change', function() {
                
            var file = this.files[0];
            var reader = new FileReader();
          
            reader.onloadend = function() {
                $('.pic2').css('background-image', 'url("' + reader.result + '")');
                $('.pic2').css('background-size', 'cover');
                //$('.pic2').css('border', 'solid');
        
                var fakePath = $('#picture2').val();
                var fileName = fakePath.substr(12);      
            }
            reader.readAsDataURL(file);

            
            // get uri
            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    uriPicture2 = reader.result;
            
                };
                reader.onerror = function (error) {
                  console.log('Error: ', error);
                };
            }
            getBase64(file)
        });

        //picture3
        $('#picture3').on('change', function() {
                
            var file = this.files[0];
            var reader = new FileReader();
          
            reader.onloadend = function() {
                $('.pic3').css('background-image', 'url("' + reader.result + '")');
                $('.pic3').css('background-size', 'cover');
        
                var fakePath = $('#picture3').val();
                var fileName = fakePath.substr(12);      
            }
            reader.readAsDataURL(file);

            
            // get uri
            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    uriPicture3 = reader.result;
            
                };
                reader.onerror = function (error) {
                  console.log('Error: ', error);
                };
            }
            getBase64(file)
        });

        //picture4
        $('#picture4').on('change', function() {
            var file = this.files[0];
            var reader = new FileReader();
          
            reader.onloadend = function() {
                $('.pic4').css('background-image', 'url("' + reader.result + '")');
                $('.pic4').css('background-size', 'cover');
        
                var fakePath = $('#picture4').val();
                var fileName = fakePath.substr(12);      
            }
            reader.readAsDataURL(file);

            
            // get uri
            function getBase64(file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    uriPicture4 = reader.result;
                };
                reader.onerror = function (error) {
                  console.log('Error: ', error);
                };
            }
            getBase64(file)
        });

        // COLOR SELECTOR
        $('.null').css('border', 'solid');
        $('.color').on('click', function() {
            $('.color').css('border', '#8f8f8f 1px solid');
            $(this).css('border', 'solid');
         
            colorSelect = $(this).attr("value");

        });

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

            this.setState({ 
                listCategorie: response.data.categories,                
            })
        })
    }

 
    handleSubmitForm = async (event) => {
        
        try { 
            this.state.photo_1 = uriPicture1;
            this.state.photo_2 = uriPicture2;
            this.state.photo_3 = uriPicture3;
            this.state.photo_4 = uriPicture4;
            this.state.color = colorSelect;
          
            axios.post('/addProduct', {formAddProduct : this.state})
            .then((response) => {
                console.log(response)
                if (response.data=="succes"){
                    alert("L'article a bien été ajouté au catalogue");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la création de l'article");
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


    render(){
        return(
                
            <section id="add_product">
                <p>ajouter un article</p>

                <form enctype="multipart/form-data">
                    <section className="section1 col-5">
                        <div className="main_picture">
                            <label htmlFor="main_pic"><i className="fas fa-camera"></i></label>
                            <input type="file" id="main_pic" required='required' style={{display:'none'}} name="photo_1" value={this.state.picture1} ></input>
                        </div>                                          
                        <div className="selects col-12">

                            <select name='continent' defaultValue={'null'} value={this.state.continent} onChange={event => this.handleChange(event)}>
                                <option value='null'>continent</option>
                                {this.state.listContinents.map(continents => {
                                    return (
                                        <option value={continents.id}>{continents.name}</option>
                                    )
                                })}
                            </select>

                            <br></br>
                            <select name='countrie' defaultValue={'null'} value={this.state.countrie} onChange={event => this.handleChange(event)}>
                                <option value='null'>pays</option>
                                {this.state.listCountrie.map(countries => {
                                    return (
                                        <option value={countries.id}>{countries.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </section>

                    <section className="section2 col-7">
                        <input type="text" name="name" placeholder="Nom de l'article" required='required' value={this.state.name} onChange={event => this.handleChange(event)}>
                        </input>
                        
                        <div className="selects col-12">
                            <select name='categorie' defaultValue={'null'} value={this.state.categorie} onChange={event => this.handleChange(event)}>
                                <option value='null'>categorie</option>
                                {this.state.listCategorie.map(categorie => {
                                    return (
                                        <option value={categorie.id}>{categorie.name}</option>
                                    )
                                })}
                            </select>

                            <select name='association' defaultValue={'null'} value={this.state.association} onChange={event => this.handleChange(event)}>
                                <option value='null'>association</option>
                                {this.state.listAssociations.map(associations => {
                                    return (
                                        <option value={associations.id}>{associations.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="genre_radio">
                            <div>
                                <input type="radio" id="unisexe" name="genre" value="UNISEXE" checked={this.state.genre=== "UNISEXE"} onChange={event => this.handleChange(event)}/>
                                <label for="unisex">unisexe</label>
                            </div>

                            <div>
                                <input type="radio" id="femme" name="genre" value="FEMME" checked={this.state.genre=== "FEMME"} onChange={event => this.handleChange(event)}/>
                                <label for="unisex">femme</label>
                            </div>

                            <div>
                                <input type="radio" id="homme" name="genre" value="HOMME" checked={this.state.genre=== "HOMME"} onChange={event => this.handleChange(event)}/>
                                <label for="unisex">homme</label>
                            </div>
                        </div>

                        <div className="colors">
                                <div className="color null" name="null"><div className="line1"></div></div>
                                <div className="color blanc" value="white"></div>
                                <div className="color jaune" value="yellow"></div>
                                <div className="color beige" value="beige"></div>
                                <div className="color orange" value="orange"></div>
                                <div className="color marron" value="brown"></div>
                                <div className="color rouge" value="red"></div>
                                <div className="color rose" value="pink"></div>
                                <div className="color violet" value="purple"></div>
                                <div className="color bleu" value="blue"></div>
                                <div className="color vert" value="green"></div>
                                <div className="color gris" value="grey"></div>
                                <div className="color or" value="gold"></div>
                                <div className="color argent" value="silver"></div>
                                <div className="color noir" value="black"></div>

                            </div>


                        <p>description de l'article</p>

                        <textarea name="description" required='required' value={this.state.description}onChange={event => this.handleChange(event)}></textarea>

                        <div className="pics">

                            <div className="min_pic pic2 col-3">
                                <label htmlFor="picture2"><i className="fas fa-camera"></i></label>
                                <input type="file" id="picture2" style={{display:'none'}} name="photo_2" value={this.state.picture2} onChange={event => this.handleChange(event)}></input>
                            </div>
                            
                            <div className="min_pic pic3 col-3">
                                <label htmlFor="picture3"><i className="fas fa-camera"></i></label>
                                <input type="file" id="picture3" style={{display:'none'}} name="photo_3" value={this.state.picture3} onChange={event => this.handleChange(event)}></input>
                            </div>

                            <div className="min_pic pic4 col-3">
                                <label htmlFor="picture4"><i className="fas fa-camera"></i></label>
                                <input type="file" id="picture4" style={{display:'none'}} name="photo_4" value={this.state.picture4} onChange={event => this.handleChange(event)}></input>
                            </div>
                        </div>

                        <div className="price_submit">
                            <div><input type="text" name="price" required='required' value={this.state.price} onChange={event => this.handleChange(event)}></input> €</div>
                            <input type='button' value="AJOUTER" onClick={this.handleSubmitForm}/>
                        </div>
                    </section>
                </form>
            </section>
        )
    }
}

export default AddProduct;