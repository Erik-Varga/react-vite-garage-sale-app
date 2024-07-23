import { MousePointer2, MoveUp, Thermometer } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { FaWind } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
import { useNavigate } from 'react-router-dom';

const Weather = () => {
  const [data, setData] = useState([]);
  const [showTemp, setShowTemp] = useState(false);
  const [iconData, setIconData] = useState("");
  const [descriptionData, setDescriptionData] = useState("");
  const [location, setLocation] = useState("longwood");

  const API_KEY = import.meta.env.VITE_REACT_APP_TEMPERATURE_ID;
  const iconUrl = `https://openweathermap.org/img/wn/${iconData}@2x.png`;

  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
          setIconData(result.weather[0].icon);
          setDescriptionData(result.weather[0].description);
          // console.log(result)
        });
      setShowTemp(true);
    }
    fetchData();
  }, [location])

  return (
    <div className='flex items-center justify-around py-1 px-3 text-sm bg-blue-50 rounded-md m-2'>
      {showTemp ? <>
        <div className='w-full flex flex-col gap-2 mb-4'>
          <div className="flex items-center justify-between text-gray-700 dark:text-gray-400">
            <Thermometer size={35} />
            <div className="flex flex-col">
              <span className='text-base font-bold'>
                {data?.main.temp.toFixed(0)}°
              </span>
              <span>
              feels like: {data?.main.feels_like.toFixed(0)}°

              </span>

            </div>
            <img src={iconUrl} className='h-12 w-12 bg-white rounded-full hover:cursor-pointer' alt="" onClick={() => navigate('/forecast')} />
            {descriptionData}
          </div>
          <div className='flex items-center justify-center bg-blue-100'>
            <div className="flex items-center text-gray-700 dark:text-gray-400 py-1 px-4">
              humidity: {data?.main.humidity.toFixed(0)}
              <WiHumidity size={30} /> &nbsp;
            </div>
            <div className="flex text-gray-700 dark:text-gray-400">
              wind: {data?.wind.speed.toFixed(0)}mph&nbsp;
              <FaWind size={20} />
              <MoveUp size={20} style={{ transform: `rotate(${data?.wind.deg - 180}deg)` }} />
            </div>
            <div>
            </div>
          </div>
        </div>
      </> : <></>}

    </div>
  )
}

export default Weather