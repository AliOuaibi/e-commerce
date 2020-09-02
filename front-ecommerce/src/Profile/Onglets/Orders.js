import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import axios from 'axios';
import jsPDF from 'jspdf';

let countOrders=0

class Orders extends Component {

    state = {
        idUser : localStorage.getItem("userId"),
      
    }
    componentDidMount() {
       
        this.getOrders();
        this.dataArticle();
    }
    getOrders = async () => {
        axios.get('/myOrders/'+ this.state.idUser).then(response => {
            this.setState({ 
                myOrders: response.data.orders,                
            })
            countOrders = this.state.myOrders.length;
            console.log("myOrders", this.state.myOrders)
        })
    }

    dataArticle = async () => {
        await axios.get('/allArticle').then(response => {
            this.setState({      
                allArticle:response.data.articles
            })
            console.log(this.state.allArticle)
                
        })
    }

    jsPdfGenerator = () => {
        var doc = new jsPDF('p', 'pt');
        doc.text(250,20,'HII.')


        doc.text(25,30,'Facture')
        doc.setFont('arial')

        doc.setFont('normal')

        let result = this.state.allArticle;


        for(let i=0; i<countOrders; i++){
            console.log(this.state.myOrders[i].articles)
            let orderArticles = this.state.myOrders[i].articles.split(' ');


            let countProduct ={};    
            orderArticles.forEach(function(i) {
                countProduct[i] = (countProduct[i]||0) + 1;
            });
            let productInfo=Object.keys(countProduct)
            for(let y=0; y<productInfo.length; y++){
                let articleDetails = productInfo[y].split('-');
                console.log(articleDetails);
                let idArticle = articleDetails[0];

                let details;
                for(let a=0; a<result.length; a++){
                    if(result[a]['id'] == idArticle){
                        details = result[a];
                    }
                }
                //console.log(details.name,'teeeeeeeeeeest');
                // doc.text(20,90, 'Article: '+details.name)
            }
            doc.text(20,50, 'Comande n°'+'  '+ this.state.myOrders[0].id)
            doc.text(20,110, 'Prix: '+this.state.myOrders[0].total+'euros')
            
        }

        doc.save("facture.pdf")
        console.log('test');
    }

    showOrders = () =>{
        let htmlOrders = [];
        for(let i=0; i<countOrders; i++){
            console.log(this.state.myOrders[i].articles)
            let orderArticles = this.state.myOrders[i].articles.split(' ');

            let htmlArticles=[];
            let result = this.state.allArticle;


            let countProduct ={};    
            orderArticles.forEach(function(i) {
                countProduct[i] = (countProduct[i]||0) + 1;
            });
           
            let productInfo=Object.keys(countProduct)

            
            for(let y=0; y<productInfo.length; y++){
                let articleDetails = productInfo[y].split('-');
                console.log(articleDetails);
                let idArticle = articleDetails[0];
                let sizeAritcle = articleDetails[1];
                let priceAritcle = articleDetails[2];
                let countryIdAritcle = articleDetails[3];
                let assoIdAritcle = articleDetails[4];
                let quantityArticle = countProduct[productInfo[y]];
                let details;
                for(let a=0; a<result.length; a++){
                    
                    if(result[a]['id'] == idArticle){
                        details = result[a];
                    }
                    console.log("details", details)
                }

                if(details){
                    htmlArticles.push(
                        <a href={"/Article/"+idArticle}>
                            <div className="article">
                                <div className="picture" style={{ backgroundImage: `url("${details['photo1']}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                </div>
                                <p className="name">{details.name}</p>
                                <p className="quantity">{priceAritcle}€ x {quantityArticle}</p>
                                <p className="quantity">Taille {sizeAritcle}</p>
                                <p className="total">{priceAritcle * quantityArticle}€</p>
                            </div>
                        </a>
                    )
                }
            }
       
            console.log("orderArticles", orderArticles)
            htmlOrders.push(
                <div className="order">

                    <div className="orderInfo">
                        <div className="num_date">
                            <p className="orderNum">
                                Commande n°{this.state.myOrders[i].id}
                            </p>
                            <p className="orderDate">
                                le {this.state.myOrders[i].dateOrder}
                            </p>
                        </div>

                        
                        <div className="buttonDownload">
                           <a onClick={this.jsPdfGenerator}>E-TICKET</a> 
                        </div>
                    </div>
                    <div className="showArticles col-12">
                        {htmlArticles}
                    </div>

                    <div className="orderInfo2">
                        <div className="orderStatus">
                            STATUS : {this.state.myOrders[i].status}
                        </div>

                        <div className="count_price">
                            <div className="orderCount">
                                {orderArticles.length} articles
                            </div>

                            <div className="orderPrice">
                                TOTAL : {this.state.myOrders[i].total} €
                            </div>
                        </div>
                       
                    </div>
                </div>
            )
        }
    
        return htmlOrders
    }

    render(){
        return(
            <section className="myOrders">
      
                {countOrders>0 && this.showOrders()}
            </section>
        )
    }
}
export default Orders;

