import { Container, Row, Col } from "react-bootstrap"
import { format } from "date-fns"

const Forecast = (props) => {
    return (
        <Container className="my-4 p-0">
            <h4>{props.title}</h4>
            <Row style={{borderBlock: "1px solid gray"}}>
                {props.weathers.map((w, i) => {
                    if (i % 2 !== 0) {
                        return (
                            <Col key={i} className="d-flex flex-column align-items-center">
                                <h5>{format(new Date(w.dt*1000), "HH:mm b dd/MM")}</h5>
                                <h6>{w.main.temp.toFixed(0)}°C</h6>
                                <img src={`http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`} alt={w.weather[0].main}/>
                            </Col>
                        )
                    } else {
                        return <span key={i}></span>
                    }
                })}
            </Row>
        </Container>
    )
}

export default Forecast