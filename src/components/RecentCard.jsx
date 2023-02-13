import { Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const RecentCard = (props) => {
    return (
        <Col xs={12} sm={6} md={3}>
            <Link to={`/${props.rec.loc}`}>
                <div className="d-flex flex-column recent-card mb-3">
                    <h5>{props.rec.loc}</h5>
                    <div className="d-flex align-items-center">
                        <img src={`http://openweathermap.org/img/wn/${props.rec.icon}@2x.png`} alt={props.rec.temp}/>
                        <h4>{props.rec.temp}°C</h4>
                    </div>
                </div>
            </Link>
            </Col>
    )
}

export default RecentCard