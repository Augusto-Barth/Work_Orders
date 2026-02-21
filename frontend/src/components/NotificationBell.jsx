import { useEffect, useState } from "react"
import { getNotifications, markNotificationRead } from "../api/api"

export default function NotificationBell({ role }) {

  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)

  const userId = role === "technician" ? 1 : 2

  const load = async () => {
    const data = await getNotifications(userId)
    setNotifications(data)
  }

  useEffect(() => {
    load()

    const interval = setInterval(load, 4000)

    return () => clearInterval(interval)
  }, [role])

  const handleRead = async (id) => {
    await markNotificationRead(id)
    load()
  }

  const unreadNotifications = notifications.filter(n => !n.read)

  return (
    <div style={{ position: "relative", marginLeft: "20px" }}>

      <button onClick={() => setOpen(!open)}>
        🔔 {unreadNotifications.length}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 40,
            background: "white",
            border: "1px solid #ccc",
            padding: "10px",
            maxHeight: "300px",
            overflow: "auto"
          }}
        >

          {unreadNotifications.length === 0 ? (
            <p>No unread notifications</p>
          ) : (
            <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>work_order_id</th>
                  <th>type</th>
                  <th>user_id</th>
                  <th>read</th>
                  <th>text</th>
                </tr>
              </thead>

              <tbody>
                {unreadNotifications.map(n => (
                  <tr
                    key={n.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRead(n.id)}
                  >
                    <td>{n.id}</td>
                    <td>{n.work_order_id}</td>
                    <td>{n.type}</td>
                    <td>{n.user_id}</td>
                    <td>false</td>
                    <td>{n.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      )}

    </div>
  )
}