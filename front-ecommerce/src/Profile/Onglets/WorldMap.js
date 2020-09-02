import React, { Component } from "react";
import $ from 'jquery';
import axios from 'axios';

import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography
} from "react-simple-maps";

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto"
};

let countOrders=0;
let allCountryId=[];
let allCountryName=[];


class WorldMap extends Component {
    state = {
        highlighted: "",
        hovered: false,
        test:"",
        myOrders:[],
        idUser:localStorage.getItem("userId"),
        countOrders:"",
    };
    handleMove = geo => {
        if (this.state.hovered);

        $('.test').text(geo.properties.NAME);
        this.setState({
            hovered: true,
            highlighted: geo.properties.CONTINENT,
            test:geo.properties.NAME,
        });
    };
    handleLeave = () => {
        this.setState({
            highlighted: "",
            hovered: false
        });
    };
 
    componentDidMount(){
        this.getOrders()
      
    }
    getOrders = async () => {
        await axios.get('/myOrders/'+ this.state.idUser).then(response => {
            this.setState({ 
                myOrders: response.data.orders,                
               
            })
            countOrders=this.state.myOrders.length
            console.log("myOrders", this.state.myOrders)
            console.log("count orders", this.state.countOrders)
        })
        this.ordersByCountry();
        
    }

    ordersByCountry(){
        console.log(countOrders)
        for(let i=0; i<countOrders; i++){
            
            let orderArticles = this.state.myOrders[i].articles.split(' ');

            let htmlArticles=[];
            let result = this.state.allArticle;


            let countProduct ={};    
            orderArticles.forEach(function(i) {
                countProduct[i] = (countProduct[i]||0) + 1;
            });
           
            let productInfo=Object.keys(countProduct)
            
            
            console.log("count", productInfo);
            for(let y=0; y<productInfo.length; y++){
                let articleDetails = productInfo[y].split('-');
                console.log(articleDetails);
              
                let countryIdAritcle = articleDetails[3];
                
                allCountryId.push(
                    countryIdAritcle
                )
            }
        }
        console.log("all-id-country", allCountryId)

        this.getCountry()
    }

    getCountry = async () => {
        await axios.get('/allPays').then(response => {
            this.setState({ 
                listCountries: response.data.countrie,                
            })
        })

        for(let i=0; i<this.state.listCountries.length; i++){
            for(let y=0; y<allCountryId.length; y++){
                if(this.state.listCountries[i].id == allCountryId[y]){
                    allCountryName.push(
                        this.state.listCountries[i].name
                    )
                }
            }
        }
        console.log(allCountryName)
    }

    
  render() {
    return (
        
        <div style={wrapperStyles}>
          
            <ComposableMap
                projectionConfig={{
                    scale: 205,
                    rotation: [3, 0, 0]
                }}
                width={980}
                height={551}
                style={{
                    width: "100%",
                    height: "auto"
                }}
                >
                <ZoomableGroup center={[10, 20]} disablePanning>
                    <Geographies
                    geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
                    disableOptimization
                    >
                    {(geographies, projection) =>
                        geographies.map((geography, i) => (
                        <Geography
                            key={i}
                            cacheId={geography.properties.ISO_A3 + i}
                            geography={geography}
                            projection={projection}
                            onMouseMove={this.handleMove}
                            onMouseLeave={this.handleLeave}
                            style={{
                            default: {
                                fill:
                                geography.properties.CONTINENT ===
                                this.state.highlighted
                                    ? "#a56e2e"
                                    : "black",
                                
                                    
                                fill:
                                geography.properties.NAME === allCountryName[0] || geography.properties.NAME === allCountryName[1] || geography.properties.NAME === allCountryName[2] || geography.properties.NAME === allCountryName[3] || 
                                geography.properties.NAME === allCountryName[4] || geography.properties.NAME === allCountryName[5] || geography.properties.NAME === allCountryName[6] || geography.properties.NAME === allCountryName[7] || 
                                geography.properties.NAME === allCountryName[8] || geography.properties.NAME === allCountryName[9] || geography.properties.NAME === allCountryName[10] || geography.properties.NAME === allCountryName[11] ||
                                geography.properties.NAME === allCountryName[12] || geography.properties.NAME === allCountryName[13] || geography.properties.NAME === allCountryName[14] || geography.properties.NAME === allCountryName[15] || 
                                geography.properties.NAME === allCountryName[16] || geography.properties.NAME === allCountryName[17] || geography.properties.NAME === allCountryName[18] || geography.properties.NAME === allCountryName[19] || 
                                geography.properties.NAME === allCountryName[20] || geography.properties.NAME === allCountryName[21] || geography.properties.NAME === allCountryName[22] || geography.properties.NAME === allCountryName[23] || 
                                geography.properties.NAME === allCountryName[24] || geography.properties.NAME === allCountryName[25] || geography.properties.NAME === allCountryName[26] || geography.properties.NAME === allCountryName[27] || 
                                geography.properties.NAME === allCountryName[28] || geography.properties.NAME === allCountryName[29] || geography.properties.NAME === allCountryName[30] || geography.properties.NAME === allCountryName[31] || 
                                geography.properties.NAME === allCountryName[32] || geography.properties.NAME === allCountryName[33] || geography.properties.NAME === allCountryName[34] || geography.properties.NAME === allCountryName[35] || 
                                geography.properties.NAME === allCountryName[36] || geography.properties.NAME === allCountryName[37] || geography.properties.NAME === allCountryName[38] || geography.properties.NAME === allCountryName[39] ||     
                                geography.properties.NAME === allCountryName[40] || geography.properties.NAME === allCountryName[41] || geography.properties.NAME === allCountryName[42] 
                                    ? "00bab2"
                                    : "black",

                                stroke:
                                geography.properties.CONTINENT ===
                                this.state.highlighted
                                    ? "white"
                                    : "#B2A27D",
                                strokeWidth: 0.75,
                                outline: "none",
                                transition: "all 250ms"
                            },
                            hover: {
                                fill: "#f9cca5",
                                stroke: "white",
                                strokeWidth: 0.75,
                                outline: "none",
                                transition: "all 250ms"
                            },
                            pressed: {
                                fill: "#00bab2",
                                stroke: "white",
                                strokeWidth: 0.75,
                                outline: "none",
                                transition: "all 250ms"
                            }
                            }}
                        />
                        ))
                    }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            
            <section className="legende">
                <div className="true"></div>
                <div className="false"></div>
                <div className="test"></div>
            </section>

            
        </div>
    );
  }
}

export default WorldMap;
