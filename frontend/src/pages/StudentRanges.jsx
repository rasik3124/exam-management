import React, { useEffect } from "react"
import StudentRange from "../components/StudentRangeForm"
import { getStudentRange, createStudentRange } from "../api/allocation"

export default function StudentRangesPage() {
    const [ranges, setRanges] = React.useState([])

    const fetchRange = async () => {
        const res = await getStudentRange()
        setRanges(res.data)
    }

    useEffect(() => {fetchRange()},[])

     return (
    <div className="container">
      <h2>Student Ranges</h2>
      <StudentRange onCreate={async r => { await createStudentRange(r); fetchRange() }} />
      <table>
        <thead><tr><th>ID</th><th>Start</th><th>End</th><th>Exclude</th></tr></thead>
        <tbody>
          {ranges.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.start_reg}</td><td>{r.end_reg}</td><td>{r.exclude_reg.join(', ')}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}