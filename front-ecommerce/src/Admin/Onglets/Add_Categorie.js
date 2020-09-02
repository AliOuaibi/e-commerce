import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';

let uriPicture1;
class AddCategorie extends Component{
    
    constructor(props) {
        super(props);
     
        this.state = {
          titleCategorie: "",
          pictureCategorie:""
        };
        
    }

    componentDidMount(){

        // APERCU DES IMG
        //main picture
        $('#picCategorie').on('change', function() {
                
            var file = this.files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                $('.main_picture_categorie').css('background-image', 'url("' + reader.result + '")');
                $('.main_picture_categorie').css('background-size', 'cover');    
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
        
        try {
            console.log(uriPicture1);
            this.state.photo = uriPicture1;
            this.state.name = this.state.titleCategorie;
            console.log(this.state);
            axios.post('/addCategorie', {formAddCategorie : this.state})
            .then((response) => {
              
                if (response.data.categorie['name']===this.state.name){
                    alert("La categorie "+this.state.name+" a été créée avec succès");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la création de la categorie "+this.state.name+" :(");
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
            
            <section id="add_categorie">
                ajouter une categorie

                

                <form enctype="multipart/form-data">

                    <section className="section2 col-7">
                        <input type="text" name="titleCategorie" placeholder="Nom de la categorie" required='required' value={this.state.titleCategorie} onChange={event => this.handleChange(event)}>
                        </input>
                    </section>

                    <section className="section1">
                        <div className="main_picture_categorie col-7">
                            <label htmlFor="picCategorie"><i className="fas fa-camera"></i></label>
                            <input type="file" id="picCategorie" required='required' style={{display:'none'}} name="picCategorie" value={this.state.pictureCategorie} ></input>
                        </div>
                    </section>

       
                    <div className="price_submit">
                        <input type='button' value="AJOUTER" onClick={this.handleSubmitForm}/>
                    </div>
                  
                  
                </form>
            </section>
        )
    }
}

export default AddCategorie;