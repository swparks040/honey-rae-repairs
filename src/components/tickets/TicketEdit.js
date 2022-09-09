import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {
    const { ticketId } = useParams()
    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false
    })

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`)
          .then((response) => response.json())
          .then((data) => {
            updateTicket(data);
          })
      }, [ticketId]
    )

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        return fetch(`http://localhost:8088/serviceTickets/${ticket.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return <form className="ticketForm">
        <h2 className="ticketForm__title">Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    placeholder="Describe issue in detail here."
                    style={{
                        height: "15rem"
                    }}
                    className="form-control"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            updateTicket(copy)
                        }
                    }>{ticket.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Emergency:</label>
                <input type="checkbox"
                    checked={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.emergency = evt.target.checked
                            updateTicket(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>

}