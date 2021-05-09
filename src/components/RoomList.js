import React from 'react'

const Room =({room, selectedRoom,setRoom})=>{
    const styles = selectedRoom === room.id ? 'active room' : 'room'
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <li><a className={styles} onClick={()=>setRoom(room.id)}>{room.title}</a></li>
    )
}

const RoomList = ({rooms, selectedRoom,setRoom}) => {
    return (
        <aside className = 'menu'>
            <h1 className='title'>Rooms:</h1>
            <ul className='menu-list'>
            {Object.keys(rooms)
            .map(roomKey => ({...rooms[roomKey], id: roomKey}))
            .map(roomObj => <Room key={roomObj.id} room={roomObj} selectedRoom={selectedRoom}
            onClick ={()=>setRoom(roomObj.id)}/>)
            }
            </ul>
        </aside>
        )
    }

export default RoomList 
