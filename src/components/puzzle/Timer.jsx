import { Clock, TimerIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from 'antd';

const Timer = () => {
  const seconds = 900;
  const [counter, setCounter] = useState(seconds);

  const resetCounter = () => {
    setCounter(seconds);
  }

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className='font4 flex items-center justify-center gap-2 mt-5'>
      <TimerIcon />
      <div>Countdown: {counter}</div>
      <Button onClick={resetCounter}>
        Reset
      </Button>
    </div>
  )
}

export default Timer