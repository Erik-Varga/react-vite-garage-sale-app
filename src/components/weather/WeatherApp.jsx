import React, { useState } from 'react'
import Layout from '../layout/Layout'
import { Search } from 'lucide-react'
import axios from 'axios'



const WeatherApp = () => {
    const [cityValue, setCityValue] = useState(32779);
    const [stateValue, setStateValue] = useState("Florida");
    const apiKey = import.meta.env.VITE_REACT_APP_TEMPERATURE_ID;

    const getGeoCoordinates = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${cityValue}&limit=5&appid=${apiKey}`)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                alert(err);
            })
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            getGeoCoordinates();
        }
    }

    const handleChange = (e) => {
        setCityValue(e.target.value);
    }

  return (
    <Layout>
        <h1>Weather App</h1>

        <div>
            <Search />
        </div>
        <input 
            type="text" 
            value={cityValue} 
            onKeyDown={handleKeyDown}
            onChange={handleChange} 
            placeholder='City Name (eg. Longwood)' 
            className='w-full' />

    </Layout>
  )
}

export default WeatherApp