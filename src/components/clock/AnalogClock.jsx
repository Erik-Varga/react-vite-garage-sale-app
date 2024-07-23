import React, { useEffect, useState } from 'react'
import './AnalogClock.css';

const AnalogClock = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {}, []);

    const Mark = ({ angle, type }) => {
        return (
            <div
                style={{ transform: `rotate(${angle}deg)` }}
                className={`clock__face-mark clock__face-mark--${type}`}>
                <div style={{ width: "2px", height: type === "hour" ? "10px" : "5px", backgroundColor: type === "hour" ? "black" : "gray" }}></div>
            </div>
        )
    };

    const Hand = ({ angle, type }) => {
        return (
            <div 
                style={{ transform: `rotate(${angle}deg)` }}
                className="clock__hand">
                <div className={`clock__hand-body clock__hand-body--${type}`} />

            </div>
        )
    };

    const renderFaceMarks = () => {
        const marks = [];
        for (let i = 1; i <= 60; i++) {
            marks.push(<Mark angle={i * 6} type={i % 5 === 0 ? "hour" : "min"}></Mark>)
        }
        return marks;
    };

    return (
        <div className='container'>
            <div className='clock bg-gray-100'>
                <div className="clock__face">
                    <div className="clock__face-mark">
                        {renderFaceMarks()}
                    </div>
                    <Hand type="hour"  angle={30 * 2} />
                    <Hand type="minute"  angle={6 * 2} />
                    <Hand type="second" angle={6 * 5}  />
                </div>
            </div>
        </div>
    )
}

export default AnalogClock