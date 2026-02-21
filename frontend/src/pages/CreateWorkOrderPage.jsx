import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createWorkOrder } from "../api/api"

export default function CreateWorkOrderPage() {

  const navigate = useNavigate()

  const [form,setForm] = useState({
    internal_id: "",
    client: "",
    arrival_date: "",
    part_model: "",
    serial_number: ""
  })

  useEffect(() => {
    document.title = "Create Work Order"
  }, [])

  const submit = async (e)=>{
    e.preventDefault()

    await createWorkOrder(form)

    navigate("/")   // go back to work order list
  }

  return (
    <form onSubmit={submit}>

      <input
        placeholder="Internal ID"
        value={form.internal_id}
        onChange={(e)=>setForm({...form, internal_id:e.target.value})}
      />

      <input
        placeholder="Client"
        value={form.client}
        onChange={(e)=>setForm({...form, client:e.target.value})}
      />

      <input
        type="date"
        value={form.arrival_date}
        onChange={(e)=>setForm({...form, arrival_date:e.target.value})}
      />

      <input
        placeholder="Part Model"
        value={form.part_model}
        onChange={(e)=>setForm({...form, part_model:e.target.value})}
      />

      <input
        placeholder="Serial Number"
        value={form.serial_number}
        onChange={(e)=>setForm({...form, serial_number:e.target.value})}
      />

      <button type="submit">
        Create Work Order
      </button>

    </form>
  )
}