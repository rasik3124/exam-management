import React, {useState} from "react"

export default function StudentRange({onCreate}) {
    const [startReg, setStartReg] = useState('')
    const [endReg, setEndReg] = useState("")
    const [excludeReg, setExcludeReg] = useState("")

    const submit = (e) => {
        e.preventDefault()
        if(!startReg || !endReg) return alert("Enter the Start and End register number.")
        const start = parseInt(startReg, 10)
        const end = parseInt(endReg, 10)
        if(isNaN(start) || isNaN(end) || start>end) return alert("Invaild Ranges")
        
        const exclude = excludeReg.split(",")
        .map(s => parseInt(s.trim(), 10))
        .filter(n => !isNaN(n))

        onCreate({startReg: start, endReg: end, excludeReg: exclude})
        setStartReg(''); setEndReg(""); setExcludeReg("")
    }
    return (
        <form onSubmit={submit}>
            <input placeholder="Enter the Start Register Number: " value={startReg} onChange={e=>setStartReg(e.target.value)} />
            <input placeholder="Enter the End register Number: " value={endReg} onChange={e=>setEndReg(e.target.value)}/>
            <input placeholder="Enter the Exclude reg with ',' comma separeated: " value={excludeReg} onChange={e=>setExcludeReg(e.target.value)}/>
            <button type='submit'>Add Range</button>
        </form>
    )
}
