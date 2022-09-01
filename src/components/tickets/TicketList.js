import { useEffect, useState } from "react"
//importing CSS in React is "more modular", thus it makkes sense to create .css files in the same module as the .js module. By simply putting the desired module in quotes, you can import your .css module.
import "./Tickets.css"
//import useNavigate from react router DOM
import { useNavigate } from "react-router-dom"

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    // Almost always going to be for initial state in useEffect()

useEffect(
    () => {
        const searchedTickets = tickets.filter(ticket => {
            return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
        setFiltered(searchedTickets)
    }, 
    [ searchTermState ]
)

    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } 
            else {
                setFiltered(tickets)
            }          
         },
         [emergency]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
        },
        [] 
        // When this array is empty, you are observing initial component state
    )

    useEffect( 
        () => {
            if (honeyUserObject.staff) {
                //for employees
                setFiltered(tickets)
            }
            else {
                //for customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )
    /* In the function below:
    1. convert all of the objects from the API fetch into their corresponding HTML representations. 
    2. establish "Callback Function"(located in tickets.map function):
    3. for each ticket (passing ticket as the function argument), ***RETURN*** HTML representation of a ticket.
    ***REMINDER*** You do not need the "$" for string interpolation in JSX.
    4. For boolean decisions, can use terinary statement 
    {? "what you want to display for yes" 
    : "what you want to display for no"}

    */

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""           
            })
            setFiltered(openTicketArray)
        }
        else {
            const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
            setFiltered(myTickets)
        }
    },
        [ openOnly ]
    )

    return <> 
    {
        honeyUserObject.staff
            ? <>
                <button onClick={() => {setEmergency(true)}}>Emergency Only</button>
                <button onClick={() => {setEmergency(false)}}>Show All</button>
                </>
            : <>
                <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
                <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
    }
  
            <h2>List of Tickets</h2>

            <article className="tickets">
                {
                    filteredTickets.map(
                        (ticket) => {
                            return <section className="ticket" key={`ticket--${ticket.id}`}>
                                <header>{ticket.description}
                                </header>
                                <footer>Emergency: {ticket.emergency ? "🧨" : "No"} 
                                </footer>
                            </section>
                        }
                    )
                }
            </article>
            </>
    }
