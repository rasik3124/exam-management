import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import RoomsPage from "./pages/Rooms"
import StudentRangesPage from './pages/StudentRanges'
import AllocationPage from './pages/Allocation'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="container"><h2>Welcome</h2><p>Manage rooms, student ranges, and allocations.</p></div>} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/students" element={<StudentRangesPage />} />
        <Route path="/allocate" element={<AllocationPage />} />
      </Routes>
    </>
  )
}
