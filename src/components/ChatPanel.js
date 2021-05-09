import React from 'react'
import MessageList from '../components/MessageList'
import SendMessageForm from '../components/SendMessageForm'
const ChatPanel = (props) => (
    <div> 
        <MessageList messages={props.messages}/>
        <SendMessageForm sendMessage={props.sendMessage}email ={props.email} roomId={props.roomId} uid={props.uid}/>
    </div>
)

export default ChatPanel