import React, { useEffect, useState } from 'react'
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { FaWind } from "react-icons/fa";
import moment from 'moment';
import Weather from './Weather';
import { Thermometer } from 'lucide-react';
import { TbSquareChevronDown, TbSquareChevronUp } from 'react-icons/tb';

const WeatherCard = ({
    location,
    sunrise, sunset,
    dayTime1, dayTime2, dayTime3, dayTime4, dayTime5,
    temperature1, temperature2, temperature3, temperature4, temperature5,
    temperatureMin1, temperatureMin2, temperatureMin3, temperatureMin4, temperatureMin5,
    temperatureMax1, temperatureMax2, temperatureMax3, temperatureMax4, temperatureMax5,
    iconUrl1, iconUrl2, iconUrl3, iconUrl4, iconUrl5,
    descriptionData1, descriptionData2, descriptionData3, descriptionData4, descriptionData5,
    humidity1, humidity2, humidity3, humidity4, humidity5,
    windSpeedData1, windSpeedData2, windSpeedData3, windSpeedData4, windSpeedData5,
}) => {
    var local1 = moment.utc(dayTime1).local().format('ddd')
    var local2 = moment.utc(dayTime2).local().format('ddd')
    var local3 = moment.utc(dayTime3).local().format('ddd')
    var local4 = moment.utc(dayTime4).local().format('ddd')
    var local5 = moment.utc(dayTime5).local().format('ddd')

    const [showDescription, setShowDescription] = useState(false);

    useEffect(() => {
        setShowDescription(false)
    }, []);

    return (
        <div className="w-full md:w-3/4 sm:max-w-sm px-4 py-5 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className='font-bold'>
                {location} | 
            </div>
                <span className='flex flex-col justify-center text-xs'>
                    {moment().format('MM/D/YY, h:mm a')}
                </span>
            

            <div>
                {/* description */}
                <button
                    onClick={() => setShowDescription(!showDescription)}
                    className='text-sm text-gray-600 hover:bg-white'
                >
                    {showDescription 
                    ? 
                    <>
                    <TbSquareChevronDown size={26} title='hide' /> Hide details
                    </>
                    : 
                    <>
                    <TbSquareChevronUp size={26} title='show' /> Show details
                    </>
                    } 
                </button>

                {showDescription && <>
                    <Weather />
                    <div className='text-xs'>Sunrise/Sunset</div>

                    <div className='flex justify-between items-center mt-2'>
                        <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-400">
                            <GiSunrise size={30} /> &nbsp;
                            {new Date(sunrise * 1000).toLocaleTimeString('en-US')}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-400">
                            {new Date(sunset * 1000).toLocaleTimeString('en-US')}
                            <GiSunset size={30} /> &nbsp;
                        </div>
                    </div>

                    <hr className='my-4' />

                    <div className='text-xs'>Forecast</div>
                    <div className='flex w-full justify-between gap-1 items-center text-xs'>
                        <div className='flex justify-around items-center gap-2 bg-gray-100 p-2'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <div className=''>{local1}</div>
                                <img src={iconUrl1} className='h-12 w-12 bg-white rounded-full' alt="" />
                                {temperatureMin1} / {temperatureMax1}
                            </div>
                        </div>
                        <div className='flex justify-around items-center gap-2 bg-gray-100 p-2'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <div className=''>{local2}</div>
                                <img src={iconUrl2} className='h-12 w-12 bg-white rounded-full' alt="" />
                                {temperatureMin2} / {temperatureMax2}
                            </div>
                        </div>
                        <div className='flex justify-around items-center gap-2 bg-gray-100 p-2'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <div className=''>{local3}</div>
                                <img src={iconUrl3} className='h-12 w-12 bg-white rounded-full' alt="" />
                                {temperatureMin3} / {temperatureMax3}
                            </div>
                        </div>
                        <div className='flex justify-around items-center gap-2 bg-gray-100 p-2'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <div className=''>{local4}</div>
                                <img src={iconUrl4} className='h-12 w-12 bg-white rounded-full' alt="" />
                                {temperatureMin4} / {temperatureMax4}
                            </div>
                        </div>
                        <div className='flex justify-around items-center gap-2 bg-gray-100 p-2'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <div className=''>{local5}</div>
                                <img src={iconUrl5} className='h-12 w-12 bg-white rounded-full' alt="" />
                                {temperatureMin5} / {temperatureMax5}
                            </div>
                        </div>
                    </div>
                </>}
                <>

                </>
            </div>
        </div>
    )
}

export default WeatherCard