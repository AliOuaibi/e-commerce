import React, { Component } from 'react'
import axios from 'axios';

let splitURL = window.location.href.split('/');
let productId = splitURL[4];
//let dataProduct;

class Test2 extends Component{
    
    constructor(props) {
        super(props);
    
        this.state = {
          size: "M",
          quantity: "1",
          country: "id_country",
          association: "id_asso",
          dataProduct:null,
         
        };
    }

    componentDidMount(){

        axios.get('/findArticle/'+productId).then(response => {
            //console.log(response.data.article.name)
         
            //dataProduct = response.data.article; 
            this.setState({ 
                dataProduct: response.data.article,                
            })          
            console.log(this.state.dataProduct)
        })
       
    }

    handleSubmitForm = async (event) => {
        
        try {

            let toCart = productId+'-'+this.state.size+'-'+this.state.quantity+'-'+this.state.country+'-'+this.state.association;

            if(localStorage.getItem("Cart") !== null){
                let contentsStorage = localStorage.getItem('Cart');
                localStorage.setItem('Cart', contentsStorage+' '+toCart);
            }
            else{
                localStorage.setItem('Cart', toCart);
            }

            console.log(productId+'-'+this.state.size+'-'+this.state.quantity+'-'+this.state.country+'-'+this.state.association);
            alert('Article ajouté au panier avec succès');
            window.location.reload();
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
        
        if(this.state.dataProduct!==null){
            let url1 ="../assets/IMG/Articles/"+this.state.dataProduct.photo1
            return(
                
                <section className="showArticles">
    
    
                    <form className="">
                        <div>
                            test ajout article panier
                            <h1>{this.state.dataProduct.name}</h1>
                            <p>{this.state.dataProduct.price} €</p>
                            <p>{this.state.dataProduct.description}</p>

                            

                            <div className="fake_pic" style={{backgroundImage: `url(${url1})`}}></div>
                            <div className="fake_pic" style={{backgroundImage: `url("../assets/IMG/Articles/credit_card.png")`}}></div>
                            <div className="fake_pic"></div>
                            <div className="fake_pic"></div>

                            <section className="section2 col-7">
                                <div >
                                    taille : 
                                    <select name='size' defaultValue={'M'} value={this.state.size} onChange={event => this.handleChange(event)}>
                                        <option value='XS'>XS</option>
                                        <option value='S'>S</option>
                                        <option value='M'>M</option>
                                        <option value='L'>L</option>
                                        <option value='XL'>XL</option>
                                        <option value='XXL'>XXL</option>
                                        <option value='XXXL'>XXXL</option>
                                    </select>
                                </div>
    
                                <br></br>
                                <br></br>
    
                                <div >
                                    quantity : 
                                    <select name='quantity' defaultValue={'M'} value={this.state.quantity} onChange={event => this.handleChange(event)}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </select>
                                </div>
    
                    
                                <div className="price_submit">
                                    <input type='button' value="AJOUTER" onClick={this.handleSubmitForm}/>
                                </div>
                            </section>
                        </div>
                    </form>
                </section>
    
            )
        }

        else{
            return(
                <section className="homeAdmin">
                    <h1>product not found</h1>
                    <a href={"/Shop"}>Go to shop</a>
                </section>
                    
             
            )
        }
    }
}

export default Test2;