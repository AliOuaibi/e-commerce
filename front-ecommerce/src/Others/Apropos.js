import React from 'react';
import '../assets/CSS/Style.css';
import Footer from '../NavElements/Footer';
import Toolbar from '../NavElements/Toolbar';

class Apropos extends React.Component {


    render() {
        return (
            <section>
                <Toolbar />
                <section className="Apropos">
                    <div className="container">
                        <h1 className="logo">hii<span className="dot ">.</span></h1>
                        <p>
                            Notre ambition ? Participer à la construction du monde de demain : un monde plus juste, plus solidaire.
                        </p>
                        <div className="picture equipe">
                        </div>

                        <p>
                            <span className="Logo">hii<span className="dot ">.</span></span> est un projet collaboratif crée par et pour la solidarité. L'idée est née dans les bureaux de l'équipe TACK-D, composée de cinq entrepreneurs :
                            Taslima, Ali, Chaima, Koumba et Daisy. Animée par son envie de créer un espace qui soit à la fois une place de commerce solidaire, un panneau publicitaire pour les créateurs
                            et un collecteur de fonds pour les associations, cette équipe de cinq mousquetaires a réunie toutes les forces, compétences et savoirs individuels pour écrire un projet à leur image :
                            Passionné, concis, simple, accessible, humain, solidaire.
                             </p>
                        <p>
                            Notre premier pas vers ce projet a été de réfléchir à notre "pourquoi" et nous sommes vites arrivés à la conclusion collective : aider.
                            </p>
                        <p>
                            Les produits que nous mettons à la vente sur <span className="Logo">hii<span className="dot ">.</span></span> ont été minutieusements pensés entre l'équipe design de TACK-D et les créateurs des quatre coins du monde avec lesquels nous travaillons. Nous les avons voulu inédits, exclusifs, durables et éthiques. Pari réussi !
                            Chaque vente réalisée chez <span className="Logo">hii<span className="dot ">.</span></span> permet de récolter des fonds pour une association, une cause importante, ou un créateur en besoin.
                        </p>


                        <p>
                            Le schéma est plutôt simple :
                                </p>

                        <div className="picture schema">
                        </div>

                        <p>
                            Chez <span className="Logo">hii<span className="dot ">.</span></span>, le donneur n'est plus seulement donneur mais acteur du changement auquel il choisit de prendre part et les bénéficiaires ne sont plus seulement receveurs passifs 
                            mais acteurs eux aussi dans cet échange en proposant leurs savoir-faire, leurs arts et créations en échange de ce don.
                                </p>

                        <p>
                            Le monde a besoin de vous, n'attendez plus et rejoignez l'aventure <span className="Logo">hii<span className="dot ">.</span></span> !
                                </p>
                        <div className="button"><a href="/Shop">SHOPPER</a></div>


                    </div>
                </section>
                <Footer />
            </section>
        )
    }
}

export default Apropos;