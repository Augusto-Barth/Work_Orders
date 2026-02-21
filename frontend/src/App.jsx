import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react";

import Navbar from "./components/Navbar"
import WorkOrderListPage from "./pages/WorkOrderListPage"
import CreateWorkOrderPage from "./pages/CreateWorkOrderPage"
import WorkOrderDetailPage from "./pages/WorkOrderDetailPage"

export default function App(){

  const [role, setRole] = useState("technician") // technician | commercial

  return (
    <BrowserRouter>

      <Navbar role={role} setRole={setRole} />

      <div style={{padding:"20px"}}>

        <Routes>

          <Route
            path="/"
            element={<WorkOrderListPage role={role} />}
          />

          <Route
            path="/create"
            element={<CreateWorkOrderPage role={role} />}
          />

          <Route
            path="/work-orders/:id"
            element={<WorkOrderDetailPage role={role} />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  )
}