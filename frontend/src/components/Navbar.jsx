import React from "react"
import {Link} from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/rooms">Rooms</Link>
            <Link to="/Students">Students Range</Link>
            <Link to="/allocate">Allocation</Link>
        </nav>
    )
}