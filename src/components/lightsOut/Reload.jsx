import { RefreshCcw, RefreshCw } from 'lucide-react';
import React from 'react'

const Reload = () => {
    function refreshPage() {
        window.location.reload(false);
        // createGrid()
      }
  return (
    <>
    <div className='mt-10 flex flex-col hover:text-yellow-100 transition-all duration-500 ease-in-out'>
          <button className='text-slate-800 bg-slate-900 p-3 rounded-full animate-spin animate-spin-slow' onClick={refreshPage}>
            <RefreshCw size={50} />
          </button>
            <span className='p-2'>Refresh</span>
        </div>
    </>
  )
}

export default Reload