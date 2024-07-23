import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Weather from './Weather';

// 5 day forecast
const URL = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = import.meta.env.VITE_REACT_APP_TEMPERATURE_ID;

const Forecast = () => {
  const [latitude, setLatitude] = useState("28.7113");
  const [longitude, setLongitude] = useState("-81.3924");
  const [location, setLocation] = useState(null);

  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const [dayTime1, setDayTime1] = useState("");
  const [dayTime2, setDayTime2] = useState("");
  const [dayTime3, setDayTime3] = useState("");
  const [dayTime4, setDayTime4] = useState("");
  const [dayTime5, setDayTime5] = useState("");

  const [temperature1, setTemperature1] = useState("");
  const [temperature2, setTemperature2] = useState("");
  const [temperature3, setTemperature3] = useState("");
  const [temperature4, setTemperature4] = useState("");
  const [temperature5, setTemperature5] = useState("");
  
  const [temperatureMin1, setTemperatureMin1] = useState("");
  const [temperatureMin2, setTemperatureMin2] = useState("");
  const [temperatureMin3, setTemperatureMin3] = useState("");
  const [temperatureMin4, setTemperatureMin4] = useState("");
  const [temperatureMin5, setTemperatureMin5] = useState("");
  
  const [temperatureMax1, setTemperatureMax1] = useState("");
  const [temperatureMax2, setTemperatureMax2] = useState("");
  const [temperatureMax3, setTemperatureMax3] = useState("");
  const [temperatureMax4, setTemperatureMax4] = useState("");
  const [temperatureMax5, setTemperatureMax5] = useState("");
  
  const [iconData1, setIconData1] = useState("");
  const [iconData2, setIconData2] = useState("");
  const [iconData3, setIconData3] = useState("");
  const [iconData4, setIconData4] = useState("");
  const [iconData5, setIconData5] = useState("");
  
  const [descriptionData1, setDescriptionData1] = useState("");
  const [descriptionData2, setDescriptionData2] = useState("");
  const [descriptionData3, setDescriptionData3] = useState("");
  const [descriptionData4, setDescriptionData4] = useState("");
  const [descriptionData5, setDescriptionData5] = useState("");

  const [humidity1, setHumidity1] = useState(null);
  const [humidity2, setHumidity2] = useState(null);
  const [humidity3, setHumidity3] = useState(null);
  const [humidity4, setHumidity4] = useState(null);
  const [humidity5, setHumidity5] = useState(null);
  
  const [windSpeedData1, setWindSpeedData1] = useState("");
  const [windSpeedData2, setWindSpeedData2] = useState("");
  const [windSpeedData3, setWindSpeedData3] = useState("");
  const [windSpeedData4, setWindSpeedData4] = useState("");
  const [windSpeedData5, setWindSpeedData5] = useState("");
  
  const iconUrl1 = `https://openweathermap.org/img/wn/${iconData1}@2x.png`;
  const iconUrl2 = `https://openweathermap.org/img/wn/${iconData2}@2x.png`;
  const iconUrl3 = `https://openweathermap.org/img/wn/${iconData3}@2x.png`;
  const iconUrl4 = `https://openweathermap.org/img/wn/${iconData4}@2x.png`;
  const iconUrl5 = `https://openweathermap.org/img/wn/${iconData5}@2x.png`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })

    try {
      axios.get(`${URL}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`)
      .then((weatherData) => {
        // console.log(weatherData.data);

        setLocation(weatherData.data.city.name);
        setSunrise(weatherData.data.city.sunrise);
        setSunset(weatherData.data.city.sunset);

        setDayTime1(weatherData.data.list[0].dt_txt);
        setDayTime2(weatherData.data.list[8].dt_txt);
        setDayTime3(weatherData.data.list[16].dt_txt);
        setDayTime4(weatherData.data.list[24].dt_txt);
        setDayTime5(weatherData.data.list[32].dt_txt);

        setTemperature1(weatherData.data?.list[0].main.temp.toFixed(0));
        setTemperature2(weatherData.data?.list[8].main.temp.toFixed(0));
        setTemperature3(weatherData.data?.list[16].main.temp.toFixed(0));
        setTemperature4(weatherData.data?.list[24].main.temp.toFixed(0));
        setTemperature5(weatherData.data?.list[32].main.temp.toFixed(0));

        setTemperatureMin1(weatherData.data?.list[0].main.temp_min.toFixed(0));
        setTemperatureMin2(weatherData.data?.list[8].main.temp_min.toFixed(0));
        setTemperatureMin3(weatherData.data?.list[16].main.temp_min.toFixed(0));
        setTemperatureMin4(weatherData.data?.list[24].main.temp_min.toFixed(0));
        setTemperatureMin5(weatherData.data?.list[32].main.temp_min.toFixed(0));

        setTemperatureMax1(weatherData.data?.list[0].main.temp_max.toFixed(0));
        setTemperatureMax2(weatherData.data?.list[8].main.temp_max.toFixed(0));
        setTemperatureMax3(weatherData.data?.list[16].main.temp_max.toFixed(0));
        setTemperatureMax4(weatherData.data?.list[24].main.temp_max.toFixed(0));
        setTemperatureMax5(weatherData.data?.list[32].main.temp_max.toFixed(0));

        setIconData1(weatherData.data?.list[0].weather[0].icon);
        setIconData2(weatherData.data?.list[8].weather[0].icon);
        setIconData3(weatherData.data?.list[16].weather[0].icon);
        setIconData4(weatherData.data?.list[24].weather[0].icon);
        setIconData5(weatherData.data?.list[32].weather[0].icon);

        setDescriptionData1(weatherData.data?.list[0].weather[0].description);
        setDescriptionData2(weatherData.data?.list[8].weather[0].description);
        setDescriptionData3(weatherData.data?.list[16].weather[0].description);
        setDescriptionData4(weatherData.data?.list[24].weather[0].description);
        setDescriptionData5(weatherData.data?.list[32].weather[0].description);
        
        setHumidity1(weatherData.data?.list[0].main.humidity);
        setHumidity2(weatherData.data?.list[8].main.humidity);
        setHumidity3(weatherData.data?.list[16].main.humidity);
        setHumidity4(weatherData.data?.list[24].main.humidity);
        setHumidity5(weatherData.data?.list[32].main.humidity);

        setWindSpeedData1(weatherData.data?.list[0].wind.speed);
        setWindSpeedData2(weatherData.data?.list[8].wind.speed);
        setWindSpeedData3(weatherData.data?.list[16].wind.speed);
        setWindSpeedData4(weatherData.data?.list[24].wind.speed);
        setWindSpeedData5(weatherData.data?.list[32].wind.speed);
      });
    } catch (error) {
      console.log('An error');
    }

    

  }, [latitude, longitude]);

  if (!location) return null;

  return (
    <>
        <div className='w-full m-5 flex flex-col justify-center items-center gap-2'>
          {/* <div className='mt-4 font2 text-2xl'>5 Day Forecast</div> */}
        
          <WeatherCard 
            location={location} 
            sunrise={sunrise} 
            sunset={sunset} 
            
            dayTime1={dayTime1}
            dayTime2={dayTime2}
            dayTime3={dayTime3}
            dayTime4={dayTime4}
            dayTime5={dayTime5}
            
            temperature1={temperature1} 
            temperature2={temperature2} 
            temperature3={temperature3} 
            temperature4={temperature4} 
            temperature5={temperature5} 

            temperatureMin1={temperatureMin1} 
            temperatureMin2={temperatureMin2} 
            temperatureMin3={temperatureMin3} 
            temperatureMin4={temperatureMin4} 
            temperatureMin5={temperatureMin5} 

            temperatureMax1={temperatureMax1} 
            temperatureMax2={temperatureMax2} 
            temperatureMax3={temperatureMax3} 
            temperatureMax4={temperatureMax4} 
            temperatureMax5={temperatureMax5} 

            iconUrl1={iconUrl1}
            iconUrl2={iconUrl2}
            iconUrl3={iconUrl3}
            iconUrl4={iconUrl4}
            iconUrl5={iconUrl5}
            
            descriptionData1={descriptionData1}
            descriptionData2={descriptionData2}
            descriptionData3={descriptionData3}
            descriptionData4={descriptionData4}
            descriptionData5={descriptionData5}

            humidity1={humidity1} 
            humidity2={humidity2} 
            humidity3={humidity3} 
            humidity4={humidity4} 
            humidity5={humidity5} 

            windSpeedData1={windSpeedData1}
            windSpeedData2={windSpeedData2}
            windSpeedData3={windSpeedData3}
            windSpeedData4={windSpeedData4}
            windSpeedData5={windSpeedData5}
            
            />

        </div>

    </>
  )
}

export default Forecast