import "./App.css";
import React, { Component } from "react";
import SignUpForm from "../src/components/SignUpForm";
import LoginForm from "../src/components/LoginForm";
import {auth} from '../src/fire'
import 'bulma/css/bulma.css'


class App extends Component {
  state = {
    isLoggedIn: false,
    email: '',
    uid: null
  };

  handleSignUp = ({email,password}) => {
    auth.createUserWithEmailAndPassword(email,password)
    .catch(err => console.error(err))
  };

  handleLogin = ({email,password}) => {
    auth.signInWithEmailAndPassword(email,password)
    .then(user => {
      const {email, uid} = user
      this.setState ({
        isLoggedIn:true,
        email,
        uid
      })
    })
    .catch()
   console.log('App', this.state)
  };

  logout =(e)=> {
    auth.signOut()
    .then(()=> {
      this.setState({
        email: '',
        uid: null,
        isLoggedIn: false
      })
    })
  }

  render() {
    return (
      <div className='columns vh-100'>
        <div className='column is-3 hero is-primary'>
          <h1>Side Bar</h1>
          <div className='control'>
          <button onClick={this.logout} className='button is-fullwidth'>Logout</button>
          </div>
          
          </div>
        <div className='column hero'> 
          <div className='hero-body'>
            <div className='columns is-centered'>
              <div className='columns is-half'>
               <SignUpForm onSignUp={this.handleSignUp} />
               <LoginForm onLogin={this.handleLogin}/> 
              </div>
            </div>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
