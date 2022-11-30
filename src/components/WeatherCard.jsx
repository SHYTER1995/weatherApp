import React, { useState } from 'react'

const WeatherCard = ({weather, temperature, isCelsius, changeUnitTemperature, newCallAPISearch}) => {

    const [place, setPlace] = useState("")
    useState
    
    const handleChangePlace = (e) => {
        setPlace(e.target.value)
    }

return (
    <article className='weatherCard'>
        <h1 className='weatherCard-title'>Weather App</h1>
        <h3>{weather.name}, {weather.sys.country}</h3>
        <section className='weatherCard-body'>
            <div className='img-animation'>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            </div>
            <ul>
                <li className='weatherStatus'>{weather.weather[0].description}</li>
                <li>Wind speed: {weather.wind.speed} m/s</li>
                <li>Clouds: {weather.clouds.all} %</li>
                <li>Pressure: {weather.main.pressure} hPa</li>
            </ul>
        </section>
        <p className='weatherValues'>{isCelsius ? `${temperature.celsius} °C` : `${temperature.fahrenheit} °F`}</p>
        <button className='weatherCard-button' onClick={changeUnitTemperature}>Degrees °F/°C</button>
        <section className='weatherCard-footer'>
            <input 
            type="text" 
            value={place} 
            onChange={handleChangePlace} 
            />
            <button className='weatherCard-button' onClick={() => newCallAPISearch(place)}>Search by city / country</button>
        </section>
    </article>
)
}

export default WeatherCard
