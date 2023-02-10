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
        <div className="py-5">
            <section className="bg-white my-5 mx-auto p-3">
                <Container className="d-flex flex-column">
                    <h1 className="text-center mb-5">Check the weather in your city of choice!</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control required onChange={handleChange} type="text" placeholder="Enter city name..." />
                            <Form.Text>Enter any city name and we'll try to find it 😊</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Container>
            </section>
        </div>
    )
}

export default Search