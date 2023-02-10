import { useState } from "react"
import {Button, Container, Form} from "react-bootstrap"
import { useNavigate } from "react-router"

const Search = () => {
    const [query, setQuery] = useState("")
    const navigate= useNavigate()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (query) {
            navigate(`/${query}`)
        }
    }    

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control required onChange={handleChange} type="text" placeholder="Enter city name..." />
                    <Form.Text>Enter any city name and we'll try to find it 😊</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>
        </Container>
    )
}

export default Search