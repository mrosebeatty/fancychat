import "./App.css";
import React, { Component } from "react";
import SignUpForm from "../src/components/SignUpForm";
import LoginForm from "../src/components/LoginForm";
import {auth} from '../src/fire'


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
      <div className="App">
        <SignUpForm onSignUp={this.handleSignUp} />
        <LoginForm onLogin={this.handleLogin} />
        <button onClick={this.logout}>Logout</button>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
