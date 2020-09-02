import React from 'react'
import '../assets/CSS/Style.css';

const Data = () => (

    <section className="Data col-lg-12 col-md-12 d-xs-none d-sm-none" style={{paddingLeft: "15%", 
        paddingRight: "15%"}}>
        
        <div>
            <p className="number">00</p>
            <p className="title">ASSOCIATIONS <br></br> <span role="img" aria-label="hands" className="emoji">🤝</span></p>
        </div>

        <div>
          <p className="number">00</p>
          <p className="title">PAYS <br/> D'INTERVENTION <br></br> <span role="img" aria-label="world" className="emoji">🌍</span></p>
        </div>

        <div>
            <p className="number">00</p>
            <p className="title">COMMANDES <br></br> <span role="img" aria-label="orders" className="emoji">📦</span></p>
        </div>

        <div>
            <p className="number">00<span className="centimes">.00€</span></p>
            <p className="title">REVERSÉS <br></br><span role="img" aria-label="money" className="emoji">💰</span></p>
        </div>
    </section>
 
)

export default Data;