import React from 'react'
import './DigitalClock.css'

const DigitalClock = () => {
    function clock() {
        let secDots = document.getElementById('secDots');
    let minDots = document.getElementById('minDots');
    let hrDots = document.getElementById('hrDots');

    var date = new Date();
    var hours = date.getHours() % 12;
    var amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours === 0 ? 12 : hours;
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    secDots.innerHTML = '<div>' + seconds + '</div>';
    minDots.innerHTML = '<div>' + minutes + '</div>';
    hrDots.innerHTML = '<div>' + hours + '</div>';

    }
    setInterval(clock, 1000);

  return (
    <div id='clock'>
        <div id="hrDots" className="text-[#ff2972] h-350 w-auto"></div>
        <div id="minDots" className="text-[#fee800] h-350 w-auto"></div>
        <div id="secDots" className="text-[#04fc43] h-350 w-auto"></div>
    </div>
  )
}

export default DigitalClock