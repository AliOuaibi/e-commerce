import React from 'react'
import axios from 'axios';


// const Associations = () => (

class Associations extends React.Component {
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
                        listAsso: response.data.association,
                    })
                    console.log(this.state.listAsso)
                }
            })
        }
        dataAssociations();


    }

    render() {
        return (

            <section className="Associations">
                <div className="all col-lg-9 col-md-9 col-sm-9">
                    {this.state.listAsso.map(association => {
                        return (
                            <div className="association col-lg-2 col-md-2 col-sm-2">
                                <a href={"/Association/"+association.id}>
                                <div className="text">
                                    <h1>{association.name}</h1>
                                    <p id="jeteste">{association.description}</p>
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


export default Associations;