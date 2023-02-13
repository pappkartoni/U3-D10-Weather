import { useEffect, useState } from "react"
import { Col, Container, Row, Table } from "react-bootstrap"
import { useParams } from "react-router"
import { format } from "date-fns"
import Forecast from "./Forecast"
import { useDispatch} from "react-redux"


const CityPage = () => {
    const [weather, setWeather] = useState({})
    const [forecastTmrw, setForecastTmrw] = useState([])
    const [forecastDaT, setForecastDaT] = useState([])
    const [forecastDaDaT, setForecastDaDaT] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const city = useParams().city

    const dispatch = useDispatch()


    const capitalize = (str) => {
        return str.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
    }

    const getCoordinates = async () => {
        try {
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7829ebfe5c6e128e7eebe730c3bb0b21`)
            if (res.ok) {
                const data = await res.json()
                const {lat, lon} = data[0]

                getWeather(lat, lon)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getWeather = async (lat, lon) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7829ebfe5c6e128e7eebe730c3bb0b21`)
            if (res.ok) {
                const data = await res.json()
                const _weather = {...data}

                setWeather(_weather)

                const tmrInd = Math.ceil((25-new Date(_weather.dt*1000).getHours()) / 3)
                getForecast(lat, lon, tmrInd)
            } else {
                throw new Error(res.status + res.statusText)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getForecast = async (lat, lon, tmrInd) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=7829ebfe5c6e128e7eebe730c3bb0b21`)
            if (res.ok) {
                const data = await res.json()
                const _forecasts = data.list 

                setForecastTmrw(_forecasts.slice(tmrInd,8+tmrInd))
                setForecastDaT(_forecasts.slice(8+tmrInd,16+tmrInd))
                setForecastDaDaT(_forecasts.slice(16+tmrInd,24+tmrInd))
                setIsLoading(false)
            } else {
                throw new Error(res.status + res.statusText)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setRecent = () => {
        dispatch({type: "SET_RECENT", payload: {loc: city, name: weather.name, temp: weather.main.temp.toFixed(0), icon: weather.weather[0].icon}})
    }

    useEffect(() => {
        console.log("city changed to", city)
        getCoordinates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city])

    useEffect(() => {
        if (Object.keys(weather).length) {
            setRecent()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weather])

    return (
        <div className="py-2">
            {Object.keys(weather).length && <section className="bg-white my-5 mx-auto p-3">
                <Container>
                    <h2>{capitalize(city)}, {weather.name}</h2>
                    <h4>{format(new Date(weather.dt*1000), "dd/MM HH:mm b")}</h4>
                    <Row className="mt-3">
                        <Col xs={12} md={6}>
                            <Row>
                                <Col>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main}/>
                                </Col>
                                <Col>
                                    <h2>{weather.main.temp.toFixed(1)}°C</h2>
                                    <span>Feels like: {weather.main.feels_like.toFixed(1)}°C</span>
                                </Col>
                            </Row>
                            <p>{capitalize(weather.weather[0].description)}</p>
                        </Col>
                        <Col xs={12} md={6}>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Max/Min</td>
                                        <td>{weather.main.temp_max.toFixed(0)}°C/{weather.main.temp_min.toFixed(0)}°C</td>
                                    </tr>
                                    <tr>
                                        <td>Humidity</td>
                                        <td>{weather.main.humidity}%</td>
                                    </tr>
                                    <tr>
                                        <td>Wind</td>
                                        <td>{weather.wind.speed} km/h</td>
                                    </tr>
                                    <tr>
                                        <td>Sunrise/Sunset</td>
                                        <td>{format(new Date(weather.sys.sunrise*1000), "HH:mm b")} / {format(new Date(weather.sys.sunset*1000), "HH:mm b")}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
                {!isLoading &&  <Container>
                    <h3>See the next days</h3>

                    <Forecast title="Tomorrow" weathers={forecastTmrw} />
                    <Forecast title={forecastDaT ? format(new Date(forecastDaT[0].dt*1000), "dd/MM") : "Day after that."} weathers={forecastDaT} />
                    <Forecast title={forecastDaDaT ? format(new Date(forecastDaDaT[0].dt*1000), "dd/MM") : "Day after that."} weathers={forecastDaDaT} />
                
                </Container>}
            </section>}
        </div>
    )
}

export default CityPage