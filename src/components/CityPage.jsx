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
    const [tmrwIndex, setTmrwIndex] = useState(0)
    const city = useParams().city

    const dispatch = useDispatch()


    const capitalize = (str) => {
        return str.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") // can't live without a little bit of jank
    }

    const getCoordinates = async () => {
        try {
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=7829ebfe5c6e128e7eebe730c3bb0b21`)
            if (res.ok) {
                const data = await res.json()
                const {lat, lon} = data[0]

                setTmrwIndex(Math.ceil((25-new Date(weather.dt*1000).getHours()) / 3)) // FIX THIS
                getWeather(lat, lon)
                getForecast(lat, lon)
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
                setWeather({...data})
                console.log("weather is", data)
            } else {
                throw new Error(res.status + res.statusText)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getForecast = async (lat, lon) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=7829ebfe5c6e128e7eebe730c3bb0b21`)
            if (res.ok) {
                const data = await res.json()
                setForecastTmrw(data.list.slice(tmrwIndex,8+tmrwIndex))
                setForecastDaT(data.list.slice(8+tmrwIndex,16+tmrwIndex))
                setForecastDaDaT(data.list.slice(16+tmrwIndex,24+tmrwIndex))
                console.log("forecast is", forecastTmrw)
            } else {
                throw new Error(res.status + res.statusText)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setRecent = () => {
        dispatch({type: "SET_RECENT", payload: {name: weather.name, temp: weather.main.temp.toFixed(0), icon: weather.weather[0].icon}})
    }

    useEffect(() => {
        getCoordinates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => { // FIX THIS
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
                {forecastTmrw.length > 0 && <Container>
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