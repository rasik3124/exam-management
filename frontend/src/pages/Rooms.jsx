import {useEffect, useState} from "react"
import { getRooms, createRooms } from "../api/allocation"
import RoomForm from "../components/RoomForm"

export default function RoomsPage(){
    const [rooms,setRooms] = useState([])

    const fetchRooms = async () => {
        const res = await getRooms()
        console.log("Rooms API response:", res.data)
        setRooms(res.data)
    }

    useEffect(() => {fetchRooms()},[])

    return (
        <div className="container">
      <h2>Rooms</h2>
      <RoomForm onCreate={async r => { await createRooms(r); fetchRooms() }} />
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Capacity</th></tr></thead>
        <tbody>
          {rooms.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.capacity}</td></tr>)}
        </tbody>
      </table>
    </div>
    )
}