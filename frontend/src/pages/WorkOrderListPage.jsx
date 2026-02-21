import { useEffect,useState } from "react"
import { getWorkOrders } from "../api/api"
import { useNavigate } from "react-router-dom"

export default function WorkOrderListPage({select}) {

  const [orders,setOrders] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    document.title = "Work Orders"
    load()
  },[])

  const load = async ()=>{
    const data = await getWorkOrders()
    setOrders(data)
  }

  return (
    <div>

      <h2>Work Orders</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Internal ID</th>
            <th>Client</th>
            <th>Arrival Date</th>
            <th>Part Model</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Technical Report</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr
              key={o.id}
              onClick={() => navigate(`/work-orders/${o.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{o.internal_id}</td>
              <td>{o.client}</td>
              <td>{o.arrival_date}</td>
              <td>{o.part_model}</td>
              <td>{o.serial_number}</td>
              <td>{o.status}</td>
              <td>{o.technical_report || "-"}</td>
              <td>{o.amount != null ? o.amount : "-"}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}