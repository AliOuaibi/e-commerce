import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery';

let uriPicture1;
class AddAsso extends Component{
    
    constructor(props) {
        super(props);
     
        this.state = {
          titleAsso: "",
          descriptionAsso: "",
          pictureAsso:"",
          listCountrie: [],

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

            axios.get('/allPays').then(response => {
                console.log("test",response);
                this.setState({ 
                    listCountrie: response.data.countrie,                
                })
            })
            
        });
    }

  

    handleSubmitForm = async (event) => {
        
        try {
            console.log(uriPicture1);
            this.state.photo = uriPicture1;
            this.state.name = this.state.titleAsso;
            this.state.description = this.state.descriptionAsso;

            axios.post('/addAsso', {formAddAsso : this.state})
            .then((response) => {
              
                if (response.data.association['name']===this.state.name){
                    alert("L'association "+this.state.name+" a été créée avec succès");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la création de l'association "+this.state.name+" :(");
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
                
            <section id="add_asso">
                ajouter une association

                <form enctype="multipart/form-data">
                    <section className="section1 col-5">
                        <div className="main_picture_asso">
                            <label htmlFor="picAsso"><i className="fas fa-camera"></i></label>
                            <input type="file" id="picAsso" required='required' style={{display:'none'}} name="picAsso" value={this.state.picture1} ></input>
                        </div>
                        
                    </section>

                    <section className="section2 col-7">
                        <input type="text" name="titleAsso" placeholder="Nom de l'association" required='required' value={this.state.title} onChange={event => this.handleChange(event)}>
                        </input>

                        <p>description de l'association</p>

                        <textarea name="descriptionAsso" required='required' value={this.state.description}onChange={event => this.handleChange(event)}></textarea>
            
                        {/* <input type="checkbox" name='countrie' defaultValue={'null'} value={this.state.countrie} onChange={event => this.handleChange(event)}/>
                                {this.state.listCountrie.map(countries => {
                                    return (
                                        <input type="checkbox" value={countries.id} name={countries.name}/>
                                    )
                                })} */}
                                
                        <div className="price_submit">
                            <input type='button' value="AJOUTER" onClick={this.handleSubmitForm}/>
                        </div>
                    </section>
                </form>
            </section>
        )
    }
}

export default AddAsso;