import {useState} from "react"
import {runAllocation} from "../api/allocation"

export default function RunAllocationBtn({onDone}) {
    const [loading, setLoading] = useState(false)

    const handle = async () => {
        try {
            setLoading(true)
            const res = await runAllocation()
            alert(`Allocation ${res.data.length || 0} students`)
            if (onDone) onDone()
        }
        catch (er) {
            console.error(er)
            alert("Allocation is failed")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <button onClick={handle} disabled={loading}>
            {loading ? 'Running...' : 'Run Allocation'} 
        </button>
    )
}