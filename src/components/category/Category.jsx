import React from 'react';
import { useNavigate } from 'react-router-dom';
import categoryList from './CategoryList';
import HorizontalRow from '../horizontalRow/HorizontalRow';
import ContactButton from './../buttons/ContactButton';
import AboutButton from '../buttons/AboutButton';
import RegisterButton from './../buttons/RegisterButton';
import LoginButton from './../buttons/LoginButton';
import LogoutButton from './../buttons/LogoutButton';

const Category = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));
    
    // navigate
    const navigate = useNavigate();

    const allItemsImage = 'https://images.unsplash.com/photo-1513672494107-cd9d848a383e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
        <div>
            {/* main 1 */}
            {/* <HorizontalRow /> */}

            <div className="flex justify-center relative mt-2 mx-auto px-5 z-40">
                <div className="p-5 rounded-lg bg-white shadow-md border border-gray-300 text-center font-bold">
                    <div className='text-center font-bold'>Categories</div>
                    <div className="relative flex items-center">
                        <div className="flex flex-col mt-5 mx-2">
                            {/* main 2 */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {/* all items */}
                                <div
                                    onClick={() => navigate('/all-items')}
                                    className='w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-gray-500 transition-all hover:bg-gray-400 cursor-pointer mb-2'
                                >
                                    <div className="flex flex-col justify-center mb-12">
                                        {/* image tag */}
                                        <img className='w-16 h-16 lg:w-24 lg:h-24 object-cover rounded-xl' src={allItemsImage} alt="allItems" />
                                        {/* name */}
                                        <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase pt-2">All</h1>
                                    </div>
                                </div>
                                {/* category */}
                                {categoryList.sort((a, b) => (a.name > b.name) ? 1 : -1).map((item, index) => {
                                    return (
                                        <div key={index} className='flex flex-col justify-center items-center gap-2'>

                                            {/* category images */}
                                            <div
                                                onClick={() => navigate(`/category/${item.name}`)}
                                                className='w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-gray-500 transition-all hover:bg-gray-400 cursor-pointer opacity-80 hover:opacity-100'
                                            >
                                                <div className="flex justify-center">
                                                    {/* image tag */}
                                                    <img className='w-16 h-16 lg:w-24 lg:h-24 object-cover rounded-xl' src={item.image} />
                                                </div>
                                            </div>
                                            {/* name */}
                                            <h1 className="w-16 h-16 text-xs lg:text-lg text-center font-medium title-font capitalize">{item.name}</h1>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        <AboutButton />
                        <ContactButton />
                    </div>
                    <div className='mt-5 flex justify-center'>

                    {!user ?
                    <div className='flex'>
                        {/* <RegisterButton /> */}
                        <LoginButton />
                    </div>
                    :
                    ''
                    }

                    {user ?
                    <div className='flex'>
                        <LogoutButton />
                    </div>
                    :
                    ''
                    }
              </div>
                </div>
            </div>
        </div>
    )
}

export default Category