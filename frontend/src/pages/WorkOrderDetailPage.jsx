import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  getWorkOrder,
  addTechnicalReport,
  addAmount,
  finishOrder
} from "../api/api"

export default function WorkOrderDetailPage({ role }) {

  const { id } = useParams()
  const [order, setOrder] = useState(null)

  const technicianId = 1
  const commercialId = 2

  useEffect(() => {
    document.title = "Work Order Details"
    load()
  }, [id])

  const load = async () => {
    const data = await getWorkOrder(id)
    setOrder(data)
  }

  const handleReport = async () => {
    const report = prompt("Technical report")
    if (!report) return
    await addTechnicalReport(id, report, technicianId)
    load()
  }

  const handleAmount = async () => {
    const amount = prompt("Amount")
    if (!amount) return
    await addAmount(id, Number(amount), commercialId)
    load()
  }

  const handleFinish = async () => {
    await finishOrder(id, technicianId)
    load()
  }

  if (!order) return <div>Loading...</div>

  return (
    <div>

      <h2>Work Order {order.internal_id}</h2>

      <p>Client: {order.client}</p>
      <p>Status: {order.status}</p>

      {role === "technician" && order.status === "PENDING_TECHNICAL_REVIEW" && (
        <button onClick={handleReport}>
          Add Technical Report
        </button>
      )}

      {role === "commercial" && order.status === "PENDING_AMOUNT" && (
        <button onClick={handleAmount}>
          Add Amount
        </button>
      )}

      {role === "technician" && order.status === "IN_PROGRESS" && (
        <button onClick={handleFinish}>
          Finish
        </button>
      )}

    </div>
  )
}