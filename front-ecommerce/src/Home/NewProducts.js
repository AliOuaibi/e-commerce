import React from 'react';
import axios from 'axios';

let lastProducts;
class NewProducts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            newProduct: [],
            loading: true,
            found: "",
        };
    }

    componentDidMount() {

        const dataArticle = async () => {
            await axios.get('/newArticle').then(response => {
                if (response.data == "not found") {
                    this.setState({
                        found: "false",
                    })
                }
                else {
                    this.setState({
                        newProduct: response.data.last_articles,
                    })
                    this.state.newProduct.splice(0, this.state.newProduct.length-3);
                    console.log(this.state.newProduct)
                }
            })
        }
        dataArticle();
    }


    render(){
       
        return (
            <div className="testiee">
                <section className="NewProducts col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <h1 className="manuscrit">Nouveaux  articles</h1>
                    <div className="products">   
                        {this.state.newProduct.map(product => {
                            return (    
                                
                                <div className="product col-lg-3 col-md-3 col-sm-3">
                                    <div className="picture" style={{ backgroundImage: `url("${product.photo1}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className="info">
                                        <a href={"/Article/"+product.id}>
                                            <div>
                                                <div className="name">{product.name}</div>
                                            </div>
                                        </a>
                                        <div className="price">{product.price} €</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>


                <div className="size">
                    <div className="demi-fond"></div>
                </div>
            </div>
        )
        
    }
}


export default NewProducts;