export default function NotificationDropdown({notifications}) {

  return (

    <div style={{
      position:"absolute",
      right:0,
      top:"30px",
      width:"300px",
      background:"red",
      border:"1px solid #ccc",
      padding:"10px"
    }}>

      {notifications.map(n => (

        <div key={n.id} style={{marginBottom:"10px"}}>
          {n.text}
        </div>

      ))}

    </div>

  )

}