import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  

// Aqui obtenemos las coordenadas de la API del navegador
//y las montamos en un estado

  const success = (pos) => {
  
    const newCoords = {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const newCallAPISearch = (cityName) => {
    const API_KEY = "20f190cf445d2037ec269990f441afc0"
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
    axios.get(URL)
      .then(res => {
        setCoords(res.data.coord)
        setWeather(res.data)
      })
        
      
      .catch(err => alert("Not found this place"))
  }

  const changeUnitTemperature = () => setIsCelsius(!isCelsius)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  //_______________peticion cde datod a la API del clima____________//

  useEffect(() => {
    if(coords) {
      const API_KEY = "20f190cf445d2037ec269990f441afc0"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(1)
          const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(1)
          const newTemperature ={
            celsius: tempCelsius, 
            fahrenheit: tempFahrenheit
          }
          setTemperature(newTemperature)
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])


  return (
    <div className="App">
      {
        weather ? (
        <WeatherCard 
        weather={weather} 
        temperature={temperature}
        changeUnitTemperature={changeUnitTemperature}
        isCelsius={isCelsius}
        newCallAPISearch={newCallAPISearch}
        />
        ) :
        <div class="center">
        <div class="ring"></div>
        <span>Loading...</span>
      </div>
        
      }
    </div>
  ) 
}

export default App
