import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    let assignedEmployee = null

    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const canClose = () => {
      
    }

    const closeTicket = () => {
      const copy = {
          
      }
    }


    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
            onClick={() => {
                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: userEmployee.id,
                        serviceTicketId: ticketObject.id
                    })
                })
                .then (response => response.json())
                .then (() => {
                   //GET the state from the API again
                    getAllTickets()
                })
                }}  
            >Claim</button>
        } else {
            return ""
        }
    }

    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
    <header>
      {
          currentUser.staff
            ? `Ticket ${ticketObject.id}`
            : <Link to={`/tickets/${ticketObject.id}/edit`}>
            Ticket {ticketObject.id}</Link>
      }
    </header>
    <section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
    <footer>
        {
            ticketObject.employeeTickets.length
                ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                : buttonOrNoButton()
                }
    </footer>
  </section>
}