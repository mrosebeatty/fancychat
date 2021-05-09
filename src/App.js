import React, { Component } from "react";
import SignUpForm from "../src/components/SignUpForm";
import LoginForm from "../src/components/LoginForm";
import {auth} from '../src/fire'
import 'bulma/css/bulma.css'
import SideBar from '../src/components/SideBar'
import MainPanel from '../src/components/MainPanel'


class App extends Component {
  state = {
    isLoggedIn: false,
    email: '',
    uid: null,
    rooms: {}
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
  setRoom =(id) => {
    this.setState({
      selectedRoom: id
    })
  }

  render() {
    return (
      <div className='columns vh-100 is-gapless'>
        <SideBar logout={this.logout} rooms={this.state.rooms}
        selectedRoom ={this.state.selectedRoom}
        setRoom={this.setRoom}/>
        <MainPanel>
          <SignUpForm onSignUp={this.handleSignUp} />
          <LoginForm onLogin={this.handleLogin}/> 
        </MainPanel>
      </div>
    );
  }
}

export default App;
