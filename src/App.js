import React, { Component } from "react";
import SignUpForm from "../src/components/SignUpForm";
import LoginForm from "../src/components/LoginForm";
import SideBar from '../src/components/SideBar'
import MainPanel from '../src/components/MainPanel'
import ChatPanel from '../src/components/ChatPanel'
import  {auth, messageRef, roomRef} from '../src/fire'
import 'bulma/css/bulma.css'


class App extends Component {
    state = {
      isLoggedIn: false,
      email: '',
      uid: null,
      rooms:{} ,
      selectedRoom: null,
      messages: {}
    };

    loadData =() =>{
      roomRef.once('value')
          .then(roomData=>{const rooms = roomData.val()
        const selectedRoom = Object.keys(rooms)[0]
        this.setState({
          rooms,
          selectedRoom
        })
        //Query all messages associated with selected room
        return messageRef.orderByChild('roomId').equalTo(selectedRoom).once('value')
      })
      .then(messageData => {const messages = messageData.val()|| {}
      this.setState({messages})})
      .catch(err => console.error(err))
        }

    componentDidMount(){
          auth.onAuthStateChanged(user =>{
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
      
              messageRef.on('child_added', data => {
                  const message = data.val ()
                  const key = data.key()
                  if(message.roomId === this.state.selectedRoom) {
                    this.setState({
                      messages: {
                        ...this.state.messages,
                        [key]: message
                      }
                    })
                  }
                })
            }
          })
        }

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
        .catch(err => console.error(err))
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

    addRoom = (roomName) => {const room = 
        {
          author: this.state.uid,
          name: roomName,
          created: Date.now()
        }
        roomRef.push(room)
    }

    setRoom =(id) => {
        messageRef
        .orderByChild('roomId')
        .equalTo(id)
        .once('value')
        .then(snapshot => {
          const messages = snapshot.val () || {};
        
        this.setState({
          selectedRoom: id,
          messages
        })
      })
      .catch(err => console.error(err))
    }

    sendMessage =(message)=>
        {messageRef.push(message)}

    render() { 
        return (
          <div className='columns vh-100 is-gapless'>
            <SideBar logout={this.logout} rooms={this.state.rooms}
            selectedRoom ={this.state.selectedRoom}
            setRoom={this.setRoom} addRoom={this.addRoom}/>
            
              {this.state.isLoggedIn ? 
              <MainPanel>
              <ChatPanel messages={this.state.messages} roomId={this.state.selectedRoom} email={this.state.email} uid={this.state.uid}
              sendMessage={this.sendMessage}/>
              </MainPanel> :
              <MainPanel>
              <SignUpForm onSignUp={this.handleSignUp} />
              <LoginForm onLogin={this.handleLogin}/> 
              </MainPanel>
              }
          </div>
        );
      }
}

export default App
