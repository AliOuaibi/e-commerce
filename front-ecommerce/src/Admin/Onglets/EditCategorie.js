import React from 'react'
import axios from 'axios';
import $ from 'jquery';

let splitURL = window.location.href.split('/');
let categorieId = splitURL[5];
let uriPicture1;

class EditCategorie extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          id: categorieId,
          name: "",
          photo:"",
          listCategorie: [],
          listProduct: [],
          dataProduct: [],
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
        
                var fakePath = $('#picCategorie').val();
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
  

        axios.get('/allCategorie').then(response => {

            this.setState({ 
                listCategorie: response.data.categories,                
            })
        })

        const dataCategorie = async () => {
            await axios.get('/allCategorie').then(response => {
                if (response.data=="not found"){
                    this.setState({ 
                        found: "false",               
                    }) 
                }
                else{
                    this.setState({ 
                        listCategorie: response.data.categories,               
                    }) 
                    console.log(this.state.listCategorie)       
                }
            })
        }
        dataCategorie();  

        if(categorieId!==undefined){
            axios.get('/findCategorie/'+categorieId).then(response => {
                if (response.data=="not found"){
                    this.setState({ 
                        found: "false",               
                    })
                }
                else{
                    this.setState({ 
                        dataCategorie: response.data.categorie,
                    })
                    this.state.name = this.state.dataCategorie.name;
                    this.state.photo = this.state.dataCategorie.photo;
                    this.state.photo_initial = this.state.dataCategorie.photo_name;
                }
            })
        }

        
    }


    handleSubmitForm = async (event) => {
        
        try { 
            if(uriPicture1!==undefined){
                this.state.photo = uriPicture1;
            }
            else{
                this.state.photo = this.state.photo_initial;
            }
            console.log(this.state)
            
            axios.post('/editCategorie/'+categorieId, 
            {formEditCategorie:{
                    id: this.state.id,
                    name:this.state.name,
                    photo: this.state.photo,
                    
                }
            })
            .then((response) => {
           
                if (response.data=="succes"){
                    alert("La catégorie a bien été modifié");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la modification de la catégorie");
                }
            
            }, (error) => {
                console.log(error.message);
            });
        } catch (error) {                                                                                               
            console.log(error.message)
        }

        event.preventDefault();
    }

    handleDelete = async (event)  =>{
        try {
            axios.post('/deleteCategorie/'+categorieId, 
            {formDeleteProduct:
                {
                    id: this.state.id
                }
            })
            .then((response) => {
           
                if (response.data=="succes"){
                    alert("La categorie a bien été supprimé");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la suppression de la categorie");
                }
            
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            
        }
       
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

            <section id="edit_product">
                <section className="product_form">

                    <div className="allProduct col-3">
                        
                        {this.state.listCategorie.map(categorie => {
                            return (
                                <a href={"/Admin/editCategorie/"+categorie.id}>
                                    <section className="article">
                                        <div className="photo_article col-4" style={{ backgroundImage: `url("${categorie.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        
                                        <div className="info">
                                            <div className="name">{categorie.name}</div>
                                        </div>
                                    </section>
                                </a>
                            )
                        })}

                    </div>



                    <div className="col-9" id="edit_categorie">
                  
                        <form enctype="multipart/form-data"  className="edit_section">
                            <section className="section2 col-7">
                                <input type="text" name="name" placeholder="Nom de la categorie" required='required' value={this.state.name} onChange={event => this.handleChange(event)}>
                                </input>
                            </section>

                            <section className="section1">
                                <div className="main_picture_categorie col-7" style={{ backgroundImage: `url("${this.state.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <label htmlFor="picCategorie"><i className="fas fa-camera"></i></label>
                                    <input type="file" id="picCategorie" required='required' style={{display:'none'}} name="picCategorie" value={this.state.pictureCategorie} ></input>
                                </div>
                            </section>

                
                            <div className="price_submit">
                                <input type='button' value="MODIFIER" onClick={this.handleSubmitForm}/>
                            </div>
                            <input type="button" name="delete" value ="SUPPRIMER LA CATEGORIE" className="col-12" onClick={this.handleDelete}/>
                        </form>
                    </div>
                </section>
            </section>
        )
    }
}

export default EditCategorie;