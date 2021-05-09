import React from 'react'
import RoomList from '../components/RoomList'

const SideBar =({logout,rooms,selectedRoom, setRoom}) => {
    return (
    <div className='column is-3 hero is-primary' style={{padding: '10px'}}>
       <RoomList rooms={rooms} selectedRoom={selectedRoom} setRoom={setRoom}/> 
      <div className='control'>
      <button onClick={logout} className='button is-fullwidth'>Logout</button>
    </div>
    </div>
    )
  }

  export default SideBar