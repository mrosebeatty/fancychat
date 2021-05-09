import React, { Component } from "react";
import SignUpForm from "../src/components/SignUpForm";
import LoginForm from "../src/components/LoginForm";
import {auth, messageRef, roomRef} from '../src/fire'
import 'bulma/css/bulma.css'
import SideBar from '../src/components/SideBar'
import MainPanel from '../src/components/MainPanel'
import ChatPanel from '../src/components/ChatPanel'

class App extends Component {
  state = {
    isLoggedIn: false,
    email: '',
    uid: null,
    rooms: {},
    selectedRoom: null,
    messages: {}
  };

  handleSignUp = ({email,password}) => {
    auth.createUserWithEmailAndPassword(email,password)
    .catch(err => console.error(err))
  };

  
  loadData =() =>{
    roomRef.once('value')
    .then(roomData=>{const rooms = roomData.val()
    const selectedRoom=Object.keys(rooms)[0]
  this.setState({
    rooms,
    selectedRoom
  })})
  }

  componentDidMount(){
    auth.onAuthStateChange(user =>{
      if(user){
        const{email,uid}=user
        this.setState({
          email,
          uid,
          isLoggedIn: true
        })
        //Requests the rooms associated with the user from the db
        this.loadData();
        roomRef.on('value', roomData => {const rooms = roomData.val()
        this.setState({rooms})})
      }
    })
  }

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
    console.log('error')
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

  addRoom =(roomName) => {

    const room ={
      author: this.state.uid,
      name: roomName,
      created: Date.now()
    }
    roomRef.push(room)
  }
  sendMessage =(message)=>{
    messageRef.push(message)
  }

  render() { 
    return (
      <div className='columns vh-100 is-gapless'>
        <SideBar logout={this.logout} rooms={this.state.rooms}
        selectedRoom ={this.state.selectedRoom}
        setRoom={this.setRoom} addRoom={this.addRoom}/>
        <MainPanel>
          {this.state.isLoggedIn ? 
          <ChatPanel messages={this.state.messages} roomId={this.state.selectedRoom} email={this.state.email} uid={this.state.uid}
          sendMessage={this.sendMessage}/>:
          <div>
          <SignUpForm onSignUp={this.handleSignUp} />
          <LoginForm onLogin={this.handleLogin}/> 
          </div>
          }
        </MainPanel>
      </div>
    );
  }
}

export default App;
