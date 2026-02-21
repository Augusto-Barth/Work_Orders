const API = "http://127.0.0.1:8000"

export async function getNotifications(userId) {

  const res = await fetch(`${API}/users/${userId}/notifications`)
  return res.json()
}

export async function markNotificationRead(id) {

  const res = await fetch(`${API}/notifications/${id}/read`, {
    method: "POST"
  })

  return res.json()
}

export async function getWorkOrders() {
  const res = await fetch(`${API}/work-orders`)
  return res.json()
}

export async function getWorkOrder(id) {
  const res = await fetch(`${API}/work-orders/${id}`)
  return res.json()
}

export async function createWorkOrder(data) {
  const res = await fetch(`${API}/work-orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json()
}

export async function addTechnicalReport(id, report, user_id) {
  const res = await fetch(`${API}/work-orders/${id}/technical-report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      report: report,
      user_id: user_id
    })
  })

  return res.json()
}

export async function addAmount(id, amount, user_id) {
  const res = await fetch(`${API}/work-orders/${id}/amount`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: amount,
      user_id: user_id
    })
  })

  return res.json()
}

export async function finishOrder(id, user_id) {
  const res = await fetch(`${API}/work-orders/${id}/finish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: user_id
    })
  })

  return res.json()
}