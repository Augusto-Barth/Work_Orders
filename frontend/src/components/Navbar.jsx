import { Link } from "react-router-dom"
import NotificationBell from "./NotificationBell"


export default function Navbar({ role, setRole }) {

  const toggleRole = () => {
    setRole(role === "technician" ? "commercial" : "technician")
  }

  return (
    <nav style={{display:"flex", gap:"20px", padding:"10px", borderBottom:"1px solid #ccc"}}>

      <Link to="/">Work Orders</Link>
      <Link to="/create">Create</Link>

      <button onClick={toggleRole}>
        Switch to {role === "technician" ? "Commercial" : "Technician"}
      </button>

      <span>Current role: <b>{role}</b></span>

      <NotificationBell role={role}/>

    </nav>
  )
}