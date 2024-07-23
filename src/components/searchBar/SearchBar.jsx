import React, { useContext, useState } from 'react'
import { GoSearch } from 'react-icons/go';
import myContext from './../../context/myContext';
import { useNavigate } from 'react-router-dom';

const searchData = [
    {
        name: 'Fashion',
        image: 'https://images.unsplash.com/photo-1666136242335-6a765f42d3cd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Swim',
        image: 'https://images.unsplash.com/photo-1691315720837-ba3509f28ed1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Suit',
        image: 'https://images.unsplash.com/photo-1637526997367-d44a21b2c3c3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },

]

const SearchBar = () => {
    // context
    const context = useContext(myContext);
    const { getAllItems } = context;
    
    // navigate
    const navigate = useNavigate();

    // search state
    const [search, setSearch] = useState('');

    // filter search data
    const filterSearchData = getAllItems.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8);

  return (
    <div className=''>
        {/* search input */}
        <div className="input flex justify-center">
            <span className='flex items-center mr-1 text-black'><GoSearch size={25} /></span>
            <input 
                type="text" 
                placeholder='Search here' 
                onChange={(e) => setSearch(e.target.value)}
                className='bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black'
            />
        </div>

        {/* search drop-down */}
        <div className="flex justify-center">
            {search && <div className='block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2'>
                {filterSearchData.length > 0 ? 
                <>
                    {filterSearchData.map((item, index) => {
                        return (
                            <div 
                                key={index} 
                                onClick={() => navigate(`/item-info/${item.id}`)}
                                className='py-2 px-2'>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <img className='w-10' src={item.itemImageUrl} alt="" />
                                    {item.title}
                                </div>
                            </div>
                        )
                    })}
                </> 
                : 
                <>
                    <div className="flex justify-center">
                        <img className='w-20' src='https://cdn-icons-png.flaticon.com/128/10437/10437090.png' alt='img' />
                    </div>
                </>}    
            </div>}
        </div>

    </div>
  )
}

export default SearchBar