import "./App.css";
import React, { Component } from "react";
import SignUpForm from "../src/components/SignUpForm";
import LoginForm from "../src/components/LoginForm";
import {auth} from '../src/fire'


class App extends Component {
  state = {
    isLoggedIn: false,
    email: ''
  };

  handleSignUp = ({email,password}) => {
    auth.createUserWithEmailAndPassword(email,password)
    .catch(err => console.error(err))
  };

  handleLogin = (email) => {
   this.setState({
     isLoggedIn:true,
     email
   })
   console.log('App', this.state)
  };
  render() {
    return (
      <div className="App">
        <SignUpForm onSignUp={this.handleSignUp} />
        <LoginForm onLogin={this.handleLogin} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
