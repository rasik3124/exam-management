import axios from "axios"

const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {'Content-Type' : "application/json"},
})
export const getRooms = () => API.get("rooms/")
export const createRooms = (room) => API.post('rooms/',room)

export const getStudentRange= () => API.get("student-ranges/")
export const createStudentRange = (range) => API.post("student-ranges",range)

export const runAllocation = () => API.post("allocate/")
export const getAllocation = () => API.get("allocate/")

export const getExport = () => API.get("export/")

export default API