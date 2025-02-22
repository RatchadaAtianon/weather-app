import React, { useEffect, useState, useRef} from 'react'
import './Weather.css'
import { search_icon, wind, humidity, sun, slightly_cloudy, cloudy, rain, snow, drizzle, thunderstorm, moon, cloudy_night, night_rain } from '../components/icons';

const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": sun,
    "01n": moon,
    "02d": slightly_cloudy,
    "02n": cloudy_night,
    "03d": cloudy,
    "03n": cloudy_night,
    "04d": cloudy,
    "04n": cloudy_night,
    "09d": drizzle,
    "09n": night_rain,
    "10d": rain,
    "10n": night_rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
  }

  const search = async(city) => {
    if(city === ""){
      alert("Enter a city name")
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || sun;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: (data.name).toLowerCase(),
        icon: icon,
      });
    } catch(error) {
      alert("Please a valid city name")
    }
  }

  useEffect(() => {
    search("London");
  }, [])

  return (
  <div className='weather'>
    <div className="search-bar-container">
      <input ref={inputRef} className="input-box" type="text" placeholder='Search a city name' onKeyDown={(e) => {
        if (e.key === "Enter" && inputRef.current) {
          search(inputRef.current.value.trim());
        }
      }}/>
      <img className='search-icon' src={search_icon} alt='' onClick={()=>search(inputRef.current.value)}/>
    </div>
    <img className='weather-icon' src={weatherData.icon} alt=''/>
    <p className='temperature'>{weatherData.temperature}°c</p>
    <p className='city'>{weatherData.city}</p>
    <div className="weather-data">
      <div className="col">
        <img className="humidity" src={humidity} alt=''/>
        <div>
            <span>{weatherData.humidity} %</span>
        <span>Humidity</span>
    </div>
    </div>
  <div className="col">
      <img className="wind" src={wind} alt=''/>
      <div>
          <span>{weatherData.windSpeed} km/h</span>
          <span>Wind Speed</span>
      </div>
    </div>
  </div>
</div>
  )
}

export default Weather