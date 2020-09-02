import React from 'react'
import axios from 'axios';


// const Associations = () => (

class PageAssociations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            listAsso: [],
            loading: true,
            found: "",
        };
    }

    componentDidMount() {

        const dataAssociations = async () => {
            await axios.get('/allAsso').then(response => {
                if (response.data == "not found") {
                    this.setState({
                        found: "false",
                    })
                }
                else {
                    this.setState({
                        listAsso: response.data.association}, function(){
                            console.log(this.state.listAsso)
                        
                    });
                    
                }
            })
        }
        dataAssociations();


    }

    render() {
        return (

            <section className="assos">
                <div className="container">
                    {this.state.listAsso.map(association => {
                        return (
                            <div className="regarde">
                                <a href={"/Association/" + association.id}>
                                    <div className="text">
                                        <h3>{association.name}</h3>
                                        <div className="logoasso">
                                            
                                        </div>
                                        <p id="">{association.description}</p>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}


export default PageAssociations;