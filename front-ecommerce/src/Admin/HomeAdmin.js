import React from 'react'
import '../assets/CSS/Style.css';


// CONTENU DES ONGLETS
import Client from './Onglets/Client';
import AddProduct from './Onglets/AddProduct';
import EditProduct from './Onglets/EditProduct';
import AddAsso from './Onglets/AddAsso';
import AddCategorie from './Onglets/Add_Categorie';
import EditCategorie from './Onglets/EditCategorie';
import EditAsso from './Onglets/EditAsso';
import Orders from './Onglets/Orders';
import Footer from '../NavElements/Footer';

let splitURL = window.location.href.split('/');
let ongletName = splitURL[4];

function Onglets(){
    return(
    <section className="ongletsAdmin col-4">

        <a href="/Admin/addProduct">
            <div className="button">     
                ajouter un article 
                <div className="icon"><i className="fas fa-tshirt"></i></div>
            </div>
        </a>

        <a href="/Admin/editProduct">
            <div className="button">
                modifier un article
                <div className="icon"><i className="fas fa-tshirt"></i></div>
            </div>
        </a>

        <a href="/Admin/addAsso">
            <div className="button">  
                ajouter une association
                <div className="icon"><i className="fas fa-hand-holding-heart"></i></div>
            </div>
        </a>

        <a href="/Admin/editAsso">
            <div className="button">
                modifier une association
                <div className="icon"><i className="fas fa-hand-holding-heart"></i></div>
            </div>
        </a>

        <a href="/Admin/addCategorie">
            <div className="button">
                ajouter une catégorie
                <div className="icon"><i class="fas fa-bookmark"></i></div>
            </div>
        </a>

        <a href="/Admin/editCategorie">
            <div className="button">
                modifier une catégorie
                <div className="icon"><i class="fas fa-bookmark"></i></div>
            </div>
        </a>

        <a href="/Admin/Orders">
            <div className="button"> 
                gérer les commandes
                <div className="icon"><i className="fas fa-box"></i></div>
            </div>
        </a>
    </section>
    )
}




function Board(){
    switch(ongletName){
        case "client" :
            return(
                <div className="board col-7">
                    <Client/>
                </div>
            )
            break;
        
        case "addProduct" :
            return(
                <div className="board col-7">
                    <AddProduct/>
                </div>
            )
            break;

        case "editProduct" :
            return(
                <div className="board col-7">
                    <EditProduct/>
                </div>
            )
            break;

        case "addAsso" :
            return(
                <div className="board col-7">
                    <AddAsso/>
                </div>
            )
            break;
        
        case "editAsso" :
            return(
                <div className="board col-7">
                    <EditAsso/>
                </div>
            )
            break;

        case "addCategorie" :
            return(
                <div className="board col-7">
                    <AddCategorie/>
                </div>
            )
            break;

        case "editCategorie" :
            return(
                <div className="board col-7">
                    <EditCategorie/>
                </div>
            )
            break;
        
        case "Orders" :
            return(
                <div className="board col-7">
                    <Orders/>
                </div>
            )
            break;

        default :
            return(
                <div className="board col-7">
             
                </div>
            )
    }
}


const HomeAdmin = () => (
    <section>

        <section className="">
            <div className="homeAdmin">
                <div className="banniereAdmin">
                    <div className="title">ESPACE ADMIN</div>
                </div>
                <div className="interfaceAdmin">
                    <Onglets/>
                    <Board/>
                </div>
            </div>
        </section>
        <br></br>
        <Footer/>

    </section>
)

export default HomeAdmin;