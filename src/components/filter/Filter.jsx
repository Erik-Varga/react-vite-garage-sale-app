import React, { useContext } from 'react'
import myContext from '../../context/myContext'
import { Search } from 'lucide-react';

const Filter = () => {
    // context
    const context = useContext(myContext);
    const { mode, searchKey, setSearchKey } = context;

    const handleReset = () => {
        setSearchKey('')
    }

  return (
    <>
        <div className="w-full mx-auto p-5 ">
            <div className="p-5 rounded-lg bg-woods-tan shadow-md border border-gray-200">
                <div className="relative flex items-center">
                    <div className="flex flex-1 items-center gap-2 dark:text-black">
                        <Search />
                        <input 
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value.toLowerCase())}
                            type="text" 
                            name="searchkey"
                            placeholder='Search here'
                            className='px-8 py-2 w-full rounded border-transparent outline-0 text-sm'
                        />
                        <button 
                            onClick={() => handleReset()}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Filter