import React from 'react'
import axios from 'axios';
import $ from 'jquery';

let splitURL = window.location.href.split('/');
let productId = splitURL[5];
let uriPicture1, uriPicture2, uriPicture3, uriPicture4, stockHTML;
let colorSelect = "null";

class EditProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          id: productId,
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
          photo_name1:"",
          photo_name2:"",
          photo_name3:"",
          photo_name4:"",
          stockXS:"",
          stockS:"",
          stockM:"",
          stockL:"",
          stockXL:"",
          color: "null",
          previewContent:"",
          listAssociations: [],
          listContinents: [],
          listCountrie: [],
          listCategorie: [],
          listProduct: [],
          dataProduct: [],
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

        const dataArticle = async () => {
            await axios.get('/allArticle').then(response => {
                if (response.data=="not found"){
                    this.setState({ 
                        found: "false",               
                    })
                }
                else{
                    this.setState({ 
                        listProduct: response.data.articles,               
                    })
                    console.log(this.state.listProduct)       
                }
            })
        }
        dataArticle();

        if(productId!==undefined){
            axios.get('/findArticle/'+productId).then(response => {
                if (response.data=="not found"){
                    this.setState({ 
                        found: "false",               
                    })
                }
                else{

                    this.setState({ 
                        dataProduct: response.data.article,
                    })
                    this.state.name = this.state.dataProduct.name;
                    this.state.description = this.state.dataProduct.description;
                    this.state.association = this.state.dataProduct.association;
                    this.state.continent = this.state.dataProduct.continent;
                    this.state.countrie = this.state.dataProduct.countrie;
                    this.state.categorie =this.state.dataProduct.categorie;
                    this.state.genre = this.state.dataProduct.genre;
                    this.state.color = this.state.dataProduct.color;
                    this.state.price = this.state.dataProduct.price;
                    this.state.photo_1 = this.state.dataProduct.photo1;
                    this.state.photo_2 = this.state.dataProduct.photo2;
                    this.state.photo_3 = this.state.dataProduct.photo3;
                    this.state.photo_4 = this.state.dataProduct.photo4;
                    this.state.photo_name1 = this.state.dataProduct.photo_name1;
                    this.state.photo_name2 = this.state.dataProduct.photo_name2;
                    this.state.photo_name3 = this.state.dataProduct.photo_name3;
                    this.state.photo_name4 = this.state.dataProduct.photo_name4;
                    this.state.stockXS = this.state.dataProduct.stockXS;
                    this.state.stockS = this.state.dataProduct.stockS;
                    this.state.stockM = this.state.dataProduct.stockM;
                    this.state.stockL = this.state.dataProduct.stockL;
                    this.state.stockXL = this.state.dataProduct.stockXL;

                    let previewHTML =
                    <section className="article_preview">
                       
                    </section>
                 
            
                    this.setState({
                        previewContent : previewHTML,
                    });     
                }
            })
        }

        
    }


    handleSubmitForm = async (event) => {
        
        try { 
            if(uriPicture1==undefined){
                this.state.photo_1 = this.state.dataProduct.photo_name1;
            }
            else{
                this.state.photo_1 = uriPicture1;
            }

            if(uriPicture2==undefined){
                this.state.photo_2 = this.state.dataProduct.photo_name2;
            }
            else{
                this.state.photo_2 = uriPicture2;
            }

            if(uriPicture3==undefined){
                this.state.photo_3 = this.state.dataProduct.photo_name3;
            }
            else{
                this.state.photo_3 = uriPicture3;
            }

            if(uriPicture4==undefined){
                this.state.photo_4 = this.state.dataProduct.photo_name4;
            }
            else{
                this.state.photo_4 = uriPicture4;
            }

            if(colorSelect!=="null"){
                this.state.color = colorSelect;
            }
            console.log(this.state)
            
            axios.post('/editProduct/'+productId, 
            {formEditProduct:{
                    id: this.state.id,
                    name:this.state.name,
                    price: this.state.price,
                    color: this.state.color,
                    description: this.state.description,
                    continent: this.state.continent,
                    countrie: this.state.countrie,
                    categorie: this.state.categorie,
                    photo1: this.state.photo_1,
                    photo2: this.state.photo_2,
                    photo3: this.state.photo_3,
                    photo4: this.state.photo_4,
                    genre: this.state.genre,
                    stockXS: this.state.stockXS,
                    stockS: this.state.stockS,
                    stockM: this.state.stockM,
                    stockL: this.state.stockL,
                    stockXL: this.state.stockXL,
                }
            })
            .then((response) => {
           
                if (response.data=="succes"){
                    alert("L'article a bien été modifié");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la modification de l'article");
                }
            
            }, (error) => {
                console.log(error);
            });
        } catch (error) {                                                                                               
            console.log(error.message)
        }

        event.preventDefault();
    }

    handleDelete = async (event)  =>{
        try {
            axios.post('/deleteProduct/'+productId, 
            {formDeleteProduct:
                {
                    id: this.state.id
                }
            })
            .then((response) => {
           
                if (response.data=="succes"){
                    alert("L'article a bien été supprimé");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la suppression de l'article");
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
                        
                        {this.state.listProduct.map(product => {
                            return (
                                <a href={"/Admin/editProduct/"+product.id}>
                                    <section className="article">
                                        <div className="photo_article col-4" style={{ backgroundImage: `url("${product.photo1}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        
                                        <div className="info">
                                            <div>
                                                <div className="name">{product.name}</div>
                                                <div className="association">association</div>
                                                <div className="price">{product.price} €</div>
                                            </div>
                                        </div>
                                    </section>
                                </a>
                            )
                        })}

                    </div>



                    <div className="col-9" id="edit_product_form">
                  
                        <form enctype="multipart/form-data"  className="edit_section">
                        <section className="section1 col-4">
                            <div className="main_picture" style={{ backgroundImage: `url("${this.state.photo_1}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

                            
                            <div className="stock">
                            <p>articles en stock :</p>
                            <div className="label">
                                <p>XS</p>
                                <input type="text" name="stockXS" required='required' value={this.state.stockXS} onChange={event => this.handleChange(event)}/>
                            </div>

                            <div className="label">
                                <p>S</p>
                                <input type="text" name="stockS" required='required' value={this.state.stockS} onChange={event => this.handleChange(event)}/>
                            </div>

                            <div className="label">
                                <p>M</p>
                                <input type="text" name="stockM" required='required' value={this.state.stockM} onChange={event => this.handleChange(event)}/>
                            </div>

                            <div className="label">
                                <p>L</p>
                                <input type="text" name="stockL" required='required' value={this.state.stockL} onChange={event => this.handleChange(event)}/>
                            </div>

                            <div className="label">
                                <p>XL</p>
                                <input type="text" name="stockXL" required='required' value={this.state.stockXL} onChange={event => this.handleChange(event)}/>
                            </div>

                        </div>
                          
                        </section>

                        <section className="section2 col-8">
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
                                <div className="color noir"></div>

                            </div>
                            <div className="description">
                                <p>description de l'article</p>
                                <textarea name="description" required='required' value={this.state.description}onChange={event => this.handleChange(event)}></textarea>
                            </div>

                            <div className="pics">

                                <div className="min_pic pic2 col-3" style={{ backgroundImage: `url("${this.state.photo_2}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <label htmlFor="picture2"><i className="fas fa-camera"></i></label>
                                    <input type="file" id="picture2" style={{display:'none'}} name="photo_2" value={this.state.picture2} onChange={event => this.handleChange(event)}></input>
                                </div>
                                
                                <div className="min_pic pic3 col-3" style={{ backgroundImage: `url("${this.state.photo_3}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <label htmlFor="picture3"><i className="fas fa-camera"></i></label>
                                    <input type="file" id="picture3" style={{display:'none'}} name="photo_3" value={this.state.picture3} onChange={event => this.handleChange(event)}></input>
                                </div>

                                <div className="min_pic pic4 col-3" style={{ backgroundImage: `url("${this.state.photo_4}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <label htmlFor="picture4"><i className="fas fa-camera"></i></label>
                                    <input type="file" id="picture4" style={{display:'none'}} name="photo_4" value={this.state.picture4} onChange={event => this.handleChange(event)}></input>
                                </div>
                            </div>
                            
                            

                            <div className="price_submit">
                                <div><input type="text" name="price" required='required' value={this.state.price} onChange={event => this.handleChange(event)}></input> €</div>
                                <input type='button' value="MODFIER" onClick={this.handleSubmitForm}/>
                            </div>

                            <input type="button" name="delete" value ="SUPPRIMER L'ARTICLE" className="col-12" onClick={this.handleDelete}/>
                        </section>
                    </form>
                    </div>
                </section>
            </section>
        )
    }
}

export default EditProduct;