import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/myContext';
import Loader from '../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MessageCircleWarning } from 'lucide-react';
import { Card } from 'antd';
import ViewItems from './../buttons/ViewItems';


const HomePageProductCard = () => {
    // get user from localStorage
    const user = JSON.parse(localStorage.getItem('users'));

    // context
    const context = useContext(myContext);
    const { loading, getAllItems, searchKey, setSearchKey } = context;

    const itemTotal = getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.title.toLowerCase().includes(searchKey)).slice(0,8).map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const itemValueTotal = getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.title.toLowerCase().includes(searchKey)).slice(0,8).map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    getAllItems.sort((a, b) => b.time - a.time);
    
    // navigate
    const navigate = useNavigate();

    // redux
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // functions
    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success('Added to cart')
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success('Deleted from cart')
    };

    const handleReset = () => {
        setSearchKey('')
    };

    // handle not logged in
    const handleAddToCartNotLoggedIn = () => {
        toast.error('Please Login to Add to Cart!')
    };

    // card
    

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

  return (
    <div className='mt-8 z-5'>
        {/* heading */}
        <div className=''>
        <h1 className="text-center text-2xl font-semibold first-letter:uppercase">{searchKey != '' ? 'Filtered' : 'Latest'} Items ({itemTotal})</h1>
        <span className='flex justify-center'>
            {itemTotal === 0 ? 
                <div className='flex flex-col justify-center items-center'>
                    <div className='mt-5 flex items-center gap-1 text-red-600'><MessageCircleWarning /> 
                        {searchKey} not found
                    </div> 
                    <div className="flex items-center justify-end mt-2">
                        <button 
                            onClick={() => handleReset()}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>
                : 
                <></>}
        </span>
        {/* admin */}
        {user?.role === 'admin' && 
            <h1 className='px-2 border border-transparent font-semibold text-gray-800 flex justify-center'>
                {itemValueTotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0, 
                    minimumFractionDigits: 0, 
                })}
            </h1>
        }
        </div>

        {/* main 1 */}
        <section className='body-font'>
            {/* main 2 */}
            <div className="px-5 py-5 mx-auto">

                {/* loader component */}
                <div className="flex justify-center relative top-20">
                    {loading && <Loader />}
                </div>

                {/* main 3 */}
                <div className="flex flex-wrap justify-center">
                    {getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.title.toLowerCase().includes(searchKey)).slice(0,8).map((item, index) => {
                        const { id, title, category, price, itemImageUrl1, date } = item
                        // console.log(item);

                        return (
                            <div key={index} className='p-3 w-full md:w-1/2 lg:w-1/4 '>
                                <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                    <img
                                        onClick={() => navigate(`/item-info/${id}`)}
                                        className='lg:h-80 h-96 w-full object-cover'
                                        src={itemImageUrl1}
                                        alt="" />
                                    <div className="p-6">
                                        <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                                            Garage Sale
                                        </h2>
                                        <h1 className='title-font text-lg font-bold text-gray-900 dark:text-white mb-3 h-[60px]'>
                                            {title.substring(0, 50)}
                                        </h1>
                                        <span className="bg-woods-tan/40 text-black text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                            {category}
                                        </span>
                                        <h1 className='title-font text-lg font-medium text-gray-900 dark:text-white mb-3'>
                                            ${price}
                                        </h1>
                                        {date}
                                        {user ?
                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id)
                                                    ?
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className='bg-woods-red hover:bg-woods-red/90 w-full text-white py-[4px] rounded-lg font-light flex justify-center my-2'
                                                    >
                                                        <FaRegTrashCan size={25} /> Remove
                                                    </button>
                                                    :
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className='bg-woods-taupe hover:bg-woods-rust w-full text-white py-[4px] rounded-lg font-light my-2'
                                                    >
                                                        Add to Cart
                                                    </button>
                                                }
                                            </div>
                                            :
                                            <>
                                                <button
                                                    onClick={handleAddToCartNotLoggedIn}
                                                    className='bg-woods-taupe hover:bg-woods-rust w-full text-white py-[4px] rounded-lg font-light my-2'
                                                >
                                                    Add to Cart
                                                </button>
                                            </>}
                                    </div>
                                </div>
                            </div>
                        )})}
                    <div className='w-full mt-10 flex justify-center'>
                        <ViewItems />
                    </div>
                </div>
            </div>
        </section>

    </div>
  )
}

export default HomePageProductCard