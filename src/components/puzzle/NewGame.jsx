import React from 'react'
// import { Button } from 'antd';
import { Button } from '@material-tailwind/react';
import { RefreshCcw } from 'lucide-react';

const NewGame = ({ reset }) =>
  <div className='button-wrapper'>
    <button onClick={reset} type="button" className="newGameButton mb-10 text-black bg-white hover:bg-blue-100 focus:none focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:none">
      Shuffle
      <RefreshCcw />
    </button>

  </div>

export default NewGame