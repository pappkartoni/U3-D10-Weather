import { useState } from "react"
import { Form, Navbar, Container} from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router"
import { FaSun } from "react-icons/fa"


const Navi = (props) => {
    const location = useLocation()
    const navigate= useNavigate()
    const [query, setQuery] = useState("")

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (query) {
            console.log("go to", query)
            navigate(`/${query}`)
        }
    }  

    return (
        <Navbar collapseOnSelect expand="md" variant="dark">
        <Container fluid className="px-5">
            <Link to="/">
                <Navbar.Brand className="d-flex align-items-center">
                    <FaSun className="mr-2" style={{color: "gold"}}/>
                    <span>FloWeather</span>
                </Navbar.Brand>
            </Link>
            {location.pathname !== "/" && <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control required onChange={handleChange} type="text" placeholder="Enter city name..." />
                        </Form.Group>
                    </Form>}
        </Container>
    </Navbar>
    )
}

export default Navi