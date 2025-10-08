import {useState} from "react"
import { Form } from "react-router-dom"

export default function RoomForm({onCreate}) {
    const [name, setName] = useState("")
    const [capacity, setCapacity] = useState('')

    const submit = (e) => {
        e.preventDefault()
        if(!name || !capacity) return alert("Enter the Room name and capacity.")
        const cap = parseInt(capacity, 10)
        if(isNaN(cap) || cap<=0) return alert("Capacity must be a valid one.")
        onCreate({name, capacity: cap})
        setName(""); setCapacity("")
    }
    return (
        <form onSubmit={submit}>
            <input placeholder="Room Name: " value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Capacity: " value={capacity} onChange={e=>setCapacity(e.target.value)} />
            <button type="submit">Add new Room</button>
        </form>
    )
}