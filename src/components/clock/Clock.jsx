import React, { useEffect, useState } from 'react'
import './Clock.css';
import AnalogClock from './AnalogClock';

const Clock = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

    const [time, setTime] = useState({
        hours: new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours(),
        minutes: new Date().getMinutes(),
        zone: new Date().getHours() >= 12 ? "PM" : "AM",
    });

    const [day, setDay] = useState({
        currDay: days[new Date().getDay()],
        currMonth: months[new Date().getMonth()],
        currDate: new Date().getDate(),
        currYear: new Date().getFullYear(),
    });

    function updateTime() {
        setTime({
            hours: new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours(),
            minutes: new Date().getMinutes(),
            zone: new Date().getHours() >= 12 ? "PM" : "AM",
        })
    };

    function updateDay() {
        setDay({
            currDay: days[new Date().getDay()],
            currMonth: months[new Date().getMonth()],
            currDate: new Date().getDate(),
            currYear: new Date().getFullYear(),
        })
    };

    let interval;

    useEffect(() => {
        interval = setInterval(() => {
            updateTime();
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        interval = setInterval(() => {
            updateDay();
        }, 86400000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
  return (
    <div className='flex flex-col gap-2'>
        <div className="clock-container mt-5 relative pb-1 w-[350px] rounded-sm flex flex-col items-center justify-center bg-gray-50 text-gray-400">
            <div className="clock-container_top">
                <p className="time">
                    <span className="hour">{time.hours < 10 ? `0${time.hours}` : time.hours}</span>
                    <span className="colon text-gray-700">:</span>
                    <span className="minute">{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span>
                    
                    <span className="zone text-gray-700">{time.zone}</span>
                </p>
            </div>
            <div className="clock-container_bottom">
                <p className='flex gap-2'>
                    <span className="day">{day.currDay}</span>
                    <span className="date">{day.currDate} {day.currMonth} {day.currYear}</span>
                </p>
            </div>
        </div>
        {/* <AnalogClock /> */}

    </div>
  )
}

export default Clock