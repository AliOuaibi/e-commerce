import React from 'react'
import '../assets/CSS/Style.css';
import NavLogged from './NavLogged';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';


// CONTENU DES ONGLETS
import Info from './Onglets/Info';
import Gift from './Onglets/Gift';
import Orders from './Onglets/Orders';

let splitURL = window.location.href.split('/');
let ongletName = splitURL[4];

const Onglets = () => (

    <section className="ongletsAdmin col-4">

        <div className="profil_onglet">
            <div className="profile_pic"></div>
            <div className="info">
                {localStorage.getItem("userSurname")} {localStorage.getItem("userName")}
            </div>
        </div>
        <a href="/Profile/EditInfo">
            <div className="button">
                éditer mes infos 
                <div className="icon"><i className="fas fa-user"></i></div>
            </div>
        </a>

        <a href="/Profile/Orders">
            <div className="button">     
                mes commandes
                <div className="icon"><i class="fas fa-box"></i></div>
            </div>
        </a>

        <a href="/Profile/Gift">
            <div className="button">
                mes dons
                <div className="icon"><i class="fas fa-search-dollar"></i></div>
            </div>
        </a>
    </section>
)


function Board(){
    switch(ongletName){
        case "EditInfo" :
            return(
                <div className="board col-7">
                    <Info/>
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

        case "Gift" :
            return(
                <div className="board col-7">
                    <Gift/>
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


const Profile = () => (
    <section>

        <Toolbar/>
        <section className="">
            <div className="homeAdmin">
                <div className="banniereAdmin">
                    <div className="title">MON PROFIL</div>
                </div>
                <div className="interfaceAdmin">
                    <Onglets/>
                    <Board/>
                </div>
            </div>
        </section>
        <Footer/>

    </section>
)

export default Profile;