import React from 'react'
import axios from 'axios';
import $ from 'jquery';

let splitURL = window.location.href.split('/');
let orderId = splitURL[5];
let uriPicture1;

class Orders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          id: orderId,
          name: "",
          photo:"",
          price:"",
          listOrders: [],
          listUsers: [],
          dataOrder: [],
          buyerInfo: [],
          allArticle: [],
          displayArticles: [],
          listOk: [],
          articlesRef:"",
        };
    }

        
    componentDidMount(){

        this.getUsers() 
    }

    selectStatus = async (value) => {
        this.setState({ 
            status : value,                
        })
        if(value == "WAITING"){
            $('#waiting').css('background-color', '#00bab2');

            $('#confirmed').css('background-color', '#8f8f8f');
            $('#preparation').css('background-color', '#8f8f8f');
            $('#sent').css('background-color', '#8f8f8f');
            $('#delivered').css('background-color', '#8f8f8f');
        }
        if(value == "CONFIRMED"){
            $('#waiting').css('background-color', '#00bab2');
            $('#confirmed').css('background-color', '#00bab2');

            $('#preparation').css('background-color', '#8f8f8f');
            $('#sent').css('background-color', '#8f8f8f');
            $('#delivered').css('background-color', '#8f8f8f');
        }
        if(value == "PREPARATION"){
            $('#waiting').css('background-color', '#00bab2');
            $('#confirmed').css('background-color', '#00bab2');
            $('#preparation').css('background-color', '#00bab2');

            $('#sent').css('background-color', '#8f8f8f');
            $('#delivered').css('background-color', '#8f8f8f');
        }
        if(value == "SENT"){
            $('#waiting').css('background-color', '#00bab2');
            $('#confirmed').css('background-color', '#00bab2');
            $('#preparation').css('background-color', '#00bab2');
            $('#sent').css('background-color', '#00bab2');

            $('#delivered').css('background-color', '#8f8f8f');
        }
        if(value == "DELIVERED"){
            $('#waiting').css('background-color', '#00bab2');
            $('#confirmed').css('background-color', '#00bab2');
            $('#preparation').css('background-color', '#00bab2');
            $('#sent').css('background-color', '#00bab2');
            $('#delivered').css('background-color', '#00bab2');
        }
        
    }

    getUsers = async () => {
        axios.get('/allUsers').then(response => {

            this.setState({ 
                listUsers: response.data.users,                
            })
            console.log(this.state.listUsers)
        })
        this.getOrders();
    }

    getOrders = async () => {
      
        axios.get('/allOrders').then(response => {
   
            this.setState({ 
                listOrders: response.data.orders,                
            })

            for(let i=0; i<this.state.listUsers.length; i++){
                for(let y=0; y<this.state.listOrders.length; y++){
                    if(this.state.listUsers[i].id == this.state.listOrders[y].idUser){
                        this.state.listOrders[y].name = this.state.listUsers[i].surname + ' ' + this.state.listUsers[i].name                
                    }
                }
            }
            
            console.log(this.state.listOrders)
            this.setState({ 
                listOk: this.state.listOrders,                
            })

            if(orderId!==undefined){
             
                for(let i=0; i<this.state.listOrders.length; i++){
                    if(this.state.listOrders[i].id == orderId){
                        this.setState({ 
                            status : this.state.listOrders[i].status, 
                            price : this.state.listOrders[i].total,                
                        })



                        for(let y=0; y<this.state.listUsers.length; y++){

                            if(this.state.listUsers[y].id == this.state.listOrders[i].idUser){
                                console.log(this.state.listUsers[y])

                                this.setState({ 
                                    buyerInfo : this.state.listUsers[y], 
                                    articlesRef : this.state.listOrders[i].articles, 
                                    dataArticle:"",           
                                })

                            }
                        }

          
                        this.dataArticle = async () => {
                            await axios.get('/allArticle').then(response => {
                                let result;
                                this.setState({      
                                    allArticle:response.data.articles
                                })
                                result = this.state.allArticle;
                                
                                let orderArticles = this.state.articlesRef.split(' ');
                                let htmlArticles=[];
                           
        
                                let countProduct ={};    
                                orderArticles.forEach(function(i) {
                                    countProduct[i] = (countProduct[i]||0) + 1;
                                });
                            
                                let productInfo=Object.keys(countProduct)
                                
                               
                           
                                for(let y=0; y<productInfo.length; y++){
                                    let articleDetails = productInfo[y].split('-');
                                    
                                    let idArticle = articleDetails[0];
                                    let sizeAritcle = articleDetails[1];
                                    let priceAritcle = articleDetails[2];
                                    let countryIdAritcle = articleDetails[3];
                                    let assoIdAritcle = articleDetails[4];
                                    let quantityArticle = countProduct[productInfo[y]];
                                    let result = this.state.allArticle;
                                    let details; let photo=""; let name="";
        
                                    
                                    for(let a=0; a<result.length; a++){
                                        if(result[a]['id'] == idArticle){
                                            details = result[a];
                                            photo = result[a].photo1;
                                            name = result[a].name;
                                        }
                                    }
                                  
                                    htmlArticles.push(
                                        <a href={"/Admin/editProduct/"+idArticle}>
                                            <div className="article">
                                                <div className="picture" style={{ backgroundImage: `url("${photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                                </div>
                                                <p className="name">{name}</p>
                                                <p className="quantity">{priceAritcle}€ x {quantityArticle}</p>
                                                <p className="quantity">Taille {sizeAritcle}</p>
                                                <p className="total">{priceAritcle * quantityArticle}€</p>
                                            </div>
                                        </a>
                                    )

                                    
                                }
                                this.setState({      
                                    displayArticles:htmlArticles
                                    
                                })
                            })
                        }
                        this.dataArticle()
                    }
                }

             
            }
        })
    }

    handleSubmitForm = async (event) => {
        
        try { 
           
            console.log(this.state.id, this.state.status)
            
            axios.post('/updateOrder/'+orderId,{
                formUpdateOrder:{
                    id: this.state.id,
                    status:this.state.status,
                }
            })
            .then((response) => {
           
                if (response.data=="succes"){
                    alert("L'état de la commande a bien été mis à jour");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de la mise à jour de la commande");
                }
            
            }, (error) => {
                console.log(error);
            });
        } catch (error) {                                                                                               
            console.log(error)
        }

        event.preventDefault();
    }

    handleCancel = async (event)  =>{
        try { 
           
            console.log(this.state.id, this.state.status)
            
            axios.post('/updateOrder/'+orderId,{
                formUpdateOrder:{
                    id: this.state.id,
                    status:"CANCELED",
                }
            })
            .then((response) => {
           
                if (response.data=="succes"){
                    alert("La commande a bien été annulé");
                    window.location.reload();
                }
                else{
                    alert("Une erreur s'est produite lors de l'annulation de la commande");
                }
            
            }, (error) => {
                console.log(error);
            });
        } catch (error) {                                                                                               
            console.log(error)
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

        if(this.state.buyerInfo == "" && this.state.displayArticles == ""){
            return(
                <section id="orders_admin">
                <section className="order_form">

                    <div className="allProduct col-3">
                        
                        {this.state.listOk.map(order => {
                            return (

                                <a href={"/Admin/Orders/"+order.id}>
                                    <section className="article">
                                        <div className="info">
                                            <h5 className="order_number">Order n°{order.id}</h5>
                                            <div className="name">{order.name}</div>
                                            <div className="status">{order.status}</div>
                                            <div className="articles_ref">{order.articles}</div>
                                        </div>
                                    </section>
                                </a>
                            )
                        })}

                    </div>



                    <div className="col-9" id="update_order">
                        
                    </div>
                </section>
            </section>
            )
        }
        else{
        return(

            <section id="orders_admin">
                <section className="order_form">

                    <div className="allProduct col-3">
                        
                        {this.state.listOk.map(order => {
                            return (

                                <a href={"/Admin/Orders/"+order.id}>
                                    <section className="article">
                                        {/* <div className="photo_article col-4" style={{ backgroundImage: `url("${categorie.photo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div> */}
                                        
                                        <div className="info">
                                            <h5 className="order_number">Order n°{order.id}</h5>
                                            <div className="name">{order.name}</div>
                                            <div className="status">{order.status}</div>
                                            <div className="articles_ref">{order.articles}</div>
                                        </div>
                                    </section>
                                </a>
                            )
                        })}

                    </div>



                    <div className="col-9" id="update_order">
                        <p className="num_Order">Commande n°{this.state.id} - TOTAL :{this.state.price}€</p>
                        <p className="status_Order">état de la commande : {this.state.status}</p>
                        <form enctype="multipart/form-data"  className="edit_section">

                            <section className="section2 col-12">
                                <div className="userInfo col-2">
                                    <p className="name">{this.state.buyerInfo.surname} {this.state.buyerInfo.name}</p>
                                    <p className="adress">{this.state.buyerInfo.adress}</p>
                                </div>
                                <div className="selectStatus col-9">

                                    <div className="status">
                                        <p className="statusIcon" id="waiting" onClick={(e) => this.selectStatus("WAITING")}><i class="fas fa-clock"></i></p>
                                        <p className="statusName">WAITING</p>
                                    </div>

                                    <div className="status">
                                        <p className="statusIcon" id="confirmed" onClick={(e) => this.selectStatus("CONFIRMED")}><i class="fas fa-check-circle"></i></p>
                                        <p className="statusName">CONFIRMED</p>
                                    </div>

                                    <div className="status">
                                        <p className="statusIcon" id="preparation" onClick={(e) => this.selectStatus("PREPARATION")}><i class="fas fa-box-open"></i></p>
                                        <p className="statusName">PREPARATION</p>
                                    </div>

                                    <div className="status">
                                        <p className="statusIcon" id="sent" onClick={(e) => this.selectStatus("SENT")}><i class="fas fa-truck"></i></p>
                                        <p className="statusName">SENT</p>
                                    </div>

                                    <div className="status">
                                        <p className="statusIcon" id="delivered" onClick={(e) => this.selectStatus("DELIVERED")}><i class="fas fa-home"></i></p>
                                        <p className="statusName">DELIVERED</p>
                                    </div>

                                </div>
                            </section>

                            <section className="section1">
                                {/* {this.state.articlesRef} */}
                                {this.state.displayArticles}
                                
                            </section>

                
                            <div className="buttons">
                                <input type="button" name="delete" value ="ANNULER LA COMMANDE" onClick={this.handleCancel}/>
                                <input type='button' value="MODIFIER LE STATUS" onClick={this.handleSubmitForm}/>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        )
        }
    }
}

export default Orders;