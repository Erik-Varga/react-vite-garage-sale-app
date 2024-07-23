import React from 'react';
import './FlatClock.css';

const FlatClock = () => {
    var inc = 1000;

clock();

function clock() {
  const date = new Date();

  const hours = ((date.getHours() + 11) % 12 + 1);
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  const hour = hours * 30;
  const minute = minutes * 6;
  const second = seconds * 6;
  
  document.querySelector('.hour').style.transform = `rotate(${hour}deg)`
  document.querySelector('.minute').style.transform = `rotate(${minute}deg)`
  document.querySelector('.second').style.transform = `rotate(${second}deg)`
}

setInterval(clock, inc);


    return (
        <div className='min-clock-container'>
            <div class="min-clock-clock">
                <div class="min-clock-wrap">
                    <span class="min-clock-hour"></span>
                    <span class="min-clock-minute"></span>
                    <span class="min-clock-second"></span>
                    <span class="min-clock-dot"></span>
                </div>
            </div>
        </div>
    )
}

export default FlatClock