import React from 'react';
import axios from 'axios';
//let logged=false;

class LogIn extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          email: "",
          password: "",
        };
    }

    handleSubmitForm = async (event) => {
        
        try {
            axios.post('/logInUser', {formLogIn : this.state})
            .then((response) => {
                console.log(response.data);
                if (response.data=="echec"){
                    alert('mauvais identifiants')
                }
                else{

                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('userSurname', response.data.surname);
                    localStorage.setItem('userName', response.data.name);
                    localStorage.setItem('userEmail', response.data.email);
                    localStorage.setItem('userPassword', response.data.password);
                    localStorage.setItem('userOrders', response.data.orders);
                    localStorage.setItem('userAdress', response.data.adress);
                    localStorage.setItem('userRole', response.data.roles);

                    if(response.data.surname== "Admin"){
                        window.location.href = "/Admin"
                    }
                    else{

                        window.location.href = "/Profile"
                    }
                }
            
            }, (error) => {
                console.log(error);
            });

        } catch (error) {                                                                                                         
            console.log(error)
        }

        event.preventDefault();
    }
     
    handleChange(event) {
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
          [name]: value,
        });
    }
     
    render(){
        return(

        
            <div className="log_in col-lg-7 col-md-7 col-sm-7">
            
                <form className="col-12">
                    <h1>connexion<span className='dot'>.</span></h1>
                    <label htmlFor='email'>EMAIL</label><input type='email' name='email' required='required'
                    value={this.state.email}
                    onChange={event => this.handleChange(event)}/><br/>

                    <label htmlFor='password'>MOT DE PASSE</label><input type='password' name='password' required='required' 
                    value={this.state.password}
                    onChange={event => this.handleChange(event)}/><br/>
                
                    <label htmlFor='save'>Se souvenir de moi <input type='checkbox' name='save'/></label><br/>

                    <input type='submit' value="SE CONNECTER" onClick={this.handleSubmitForm}/>
                </form>
        
            </div>
        )
    
    }
}

export default LogIn