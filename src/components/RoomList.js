import React from 'react'
import AddRoomForm from './AddRoomForm'

const Room =({rooms, selectedRoom,setRoom})=>{
    const styles = selectedRoom === rooms.id ? 'active room' : 'room'
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <li><a className={styles} onClick={()=>setRoom(rooms.id)}>{rooms.name}</a></li>
    )
}

const RoomList = ({rooms, selectedRoom,setRoom,addRoom}) => {
    return (
        <aside className = 'menu'>
            <h1 className='title'>Rooms:</h1>
            <ul className='menu-list'>
            {Object.keys(rooms)
            .map(roomKey => ({...rooms[roomKey], id: roomKey}))
            .map(roomObj => <Room key={roomObj.id} room={roomObj} selectedRoom={selectedRoom}
            onClick ={()=> setRoom(roomObj.id)}/>)
            }
            </ul>
            <div style={{marginTop: '30px'}}>
                < p className='menu-label has-text-white-is-size-5'>
                    Add a room
                </p>
                <AddRoomForm addRoom={addRoom}/>
            </div>
        </aside>
        )
    }

export default RoomList 
