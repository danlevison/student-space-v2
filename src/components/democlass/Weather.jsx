import React, { useState, useEffect } from 'react'
import Image from "next/image"
import WeatherPlaceholder from "../../../public/assets/weather-placeholder.png"

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
          throw new Error('Weather data not available')
        }

        const weather = await response.json()
        setWeatherData(weather)
      } catch (err) {
        setError(err)
      }
    }

    fetchWeatherData()
  }, [])

  if (error) {
    console.log(error)
    return <div>Error: {error.message}</div>
  }

  if (!weatherData) {
    return <Image
    className="py-2" 
    src={WeatherPlaceholder} 
    alt="Weather icon" 
    width={64} 
    height={64} 
    priority 
    />
  }

  const { name: location, main: { temp: temperature }, weather } = weatherData
  const weatherIcon = weather[0].icon


  return (
    <div className="flex flex-col text-center pb-4">
        <div className="flex justify-center items-center">
            <img className="w-[70px]" src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather Icon" />
            <p className="text-sm md:text-xl ml-[-10px]">{temperature.toFixed(0)}°</p>
        </div>
        <h2 className="text-sm md:text-xl mt-[-20px]">{location}</h2>
    </div>
  )
}

export default Weather
