import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          name: "",
          surname: "",
          adress: "",
          email: "",
          password: "",
          password_confirmation:"",
        };
    }

    handleSubmitForm = async (event) => {
        
        try {
            axios.post('/registerUser', {formRegister : this.state})
            .then((response) => {
                console.log(response.data);
                if (response.data==="echec"){
                    alert('un compte associé à cette adresse existe déjà');
                }
                else if (response.data==="password"){
                    alert('les mots de passe doivent être identiques');
                }
                else{
                    
                    localStorage.setItem('userId', response.data.user.id);
                    localStorage.setItem('userSurname', response.data.user.surname);
                    localStorage.setItem('userName', response.data.user.name);
                    localStorage.setItem('userEmail', response.data.user.email);
                    localStorage.setItem('userPassword', response.data.user.password);
                    localStorage.setItem('userOrders', response.data.user.orders);
                    localStorage.setItem('userAdress', response.data.user.adress);
                    localStorage.setItem('userRole', response.data.user.roles);

                    alert('hii '+ response.data.user.surname +' !' )
                    window.location.href = "/Profile"
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
     
    render() {
    
        return (
        
            <div className="sign_up col-lg-7 col-md-7 col-sm-7">
        
                <div className="picture col-5">
                    
                </div>

                <form className="col-7" >
                    <h1>inscription<span className='dot'>.</span></h1>
                    <label htmlFor='surname'>PRÉNOM </label>
                    <input type='text' name='surname' required='required' 
                    value={this.state.surname}
                    onChange={event => this.handleChange(event)}/><br/>

                    <label htmlFor='name'>NOM </label>
                    <input type='text' name='name' required='required' 
                    value={this.state.name}
                    onChange={event => this.handleChange(event)}/><br/>

                    <label htmlFor='adress'>ADRESSE </label>
                    <input type='text' name='adress' required='required' 
                    value={this.state.adress}
                    onChange={event => this.handleChange(event)}/><br/>

                    <label htmlFor='email'>EMAIL </label>
                    <input type='email' name='email' required='required' 
                    value={this.state.email}
                    onChange={event => this.handleChange(event)}/><br/>

                    <label htmlFor='password'>MOT DE PASSE </label>
                    <input type='password' name='password' required='required' 
                    value={this.state.password}
                    onChange={event => this.handleChange(event)}/><br/>

                    <label htmlFor='confirm'>CONFIRMATION </label><input type='password' name='password_confirmation' required='required' 
                    value={this.state.passwordConfirm}
                    onChange={event => this.handleChange(event)}/><br/>

                    <label htmlFor='rules'>J'accepte les conditions générales d'utilisation <input type='checkbox' name='rules' required='required'/></label><br/>
                    <input type='button' value="S'INSCRIRE" onClick={this.handleSubmitForm}/>
                </form>
    
            </div>
        );
    }
}

export default SignUp