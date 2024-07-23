import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';
import Loader from '../../components/loader/Loader';
import Category from '../../components/category/Category';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from 'react-icons/fa6';
import Filter from '../../components/filter/Filter';
import { ArrowDown10, ArrowDownZA, ArrowUp01, ArrowUpAZ, LayoutGrid, List } from 'lucide-react';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { IoAdd } from 'react-icons/io5';
import { Card } from 'antd';
import ScrollToTop from '../../components/buttons/ScrollToTop';

const AllItems = () => {
    // sort accordion
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    // get user from localStorage
    const user = JSON.parse(localStorage.getItem('users'));

    // context
    const context = useContext(myContext);
    const { loading, getAllItems, getAllAvailableItems, searchKey } = context;

    const itemTotal = getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.title.toLowerCase().includes(searchKey)).map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const itemValueTotal = getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.title.toLowerCase().includes(searchKey)).map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

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

    // handle not logged in
    const handleAddToCartNotLoggedIn = () => {
        toast.error('Please Login to Add to Cart!')
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // sort state
    const [sortTitleAtoZ, setSortTitleAtoZ] = useState(false);
    const [sortTitleZtoA, setSortTitleZtoA] = useState(false);
    const [sortPriceAtoZ, setSortPriceAtoZ] = useState(false);
    const [sortPriceZtoA, setSortPriceZtoA] = useState(false);
    const [sortDateTimeAtoZ, setSortDateTimeAtoZ] = useState(false);
    const [sortDateTimeZtoA, setSortDateTimeZtoA] = useState(true);

    const handleSortTitleAtoZ = () => {
        setSortTitleAtoZ(true);
        setSortTitleZtoA(false);
        setSortPriceAtoZ(false);
        setSortPriceZtoA(false);
        setSortDateTimeAtoZ(false);
        setSortDateTimeZtoA(false);
    };

    const handleSortTitleZtoA = () => {
        setSortTitleAtoZ(false);
        setSortTitleZtoA(true);
        setSortPriceAtoZ(false);
        setSortPriceZtoA(false);
        setSortDateTimeAtoZ(false);
        setSortDateTimeZtoA(false);
    };

    const handleSortPriceAtoZ = () => {
        setSortTitleAtoZ(false);
        setSortTitleZtoA(false);
        setSortPriceAtoZ(true);
        setSortPriceZtoA(false);
        setSortDateTimeAtoZ(false);
        setSortDateTimeZtoA(false);
    };

    const handleSortPriceZtoA = () => {
        setSortTitleAtoZ(false);
        setSortTitleZtoA(false);
        setSortPriceAtoZ(false);
        setSortPriceZtoA(true);
        setSortDateTimeAtoZ(false);
        setSortDateTimeZtoA(false);
    };

    const handleSortDateTimeAtoZ = () => {
        setSortTitleAtoZ(false);
        setSortTitleZtoA(false);
        setSortPriceAtoZ(false);
        setSortPriceZtoA(false);
        setSortDateTimeAtoZ(true);
        setSortDateTimeZtoA(false);
    };

    const handleSortDateTimeZtoA = () => {
        setSortTitleAtoZ(false);
        setSortTitleZtoA(false);
        setSortPriceAtoZ(false);
        setSortPriceZtoA(false);
        setSortDateTimeAtoZ(false);
        setSortDateTimeZtoA(true);
    };

    useEffect(() => {
        if (sortTitleAtoZ) {
            getAllItems.sort((a, b) => a.title.localeCompare(b.title));
        };

        if (sortTitleZtoA) {
            getAllItems.sort((a, b) => b.title.localeCompare(a.title));
        };

        if (sortPriceAtoZ) {
            getAllItems.sort((a, b) => a.price - b.price)
        };

        if (sortPriceZtoA) {
            getAllItems.sort((a, b) => b.price - a.price)
        };

        if (sortDateTimeAtoZ) {
            getAllItems.sort((a, b) => a.time - b.time)
        };

        if (sortDateTimeZtoA) {
            getAllItems.sort((a, b) => b.time - a.time)
        };

    }, [sortTitleAtoZ,
        sortTitleZtoA,
        sortPriceAtoZ,
        sortPriceZtoA,
        sortDateTimeAtoZ,
        sortDateTimeZtoA]);

    // view state
    const [gridView, setGridView] = useState(true);
    const [listView, setListView] = useState(false);

    const handleGridView = () => {
        setGridView(true);
        setListView(false);
    };

    const handleListView = () => {
        setGridView(false);
        setListView(true);
    };


    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }

    return (
        <Layout>
            <div className='relative z-0'>
                <div>
                    <Filter />
                </div>

                {/* sort */}
                {/* <div className='mt-2'>
                    <div className='flex justify-center items-center gap-5'>
                        <div className="flex flex-col">
                            <div className='px-2 font-bold'>Title</div>
                            <div className="flex flew-row">
                                <div className={sortTitleAtoZ ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortTitleAtoZ} title='A to Z'>
                                    <ArrowUpAZ />
                                </div>
                                <div className={sortTitleZtoA ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortTitleZtoA} title='Z to A'>
                                    <ArrowDownZA />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className='px-2 font-bold'>Price</div>
                            <div className="flex flew-row">
                                <div className={sortPriceAtoZ ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortPriceAtoZ} title='Lowest'>
                                    <ArrowUp01 />
                                </div>
                                <div className={sortPriceZtoA ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortPriceZtoA} title='Highest'>
                                    <ArrowDown10 />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className='px-2 font-bold'>Date</div>
                            <div className="flex flew-row">
                                <div className={sortDateTimeAtoZ ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortDateTimeAtoZ} title='Earliest'>
                                    <ArrowUp01 />
                                </div>
                                <div className={sortDateTimeZtoA ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortDateTimeZtoA} title='Latest'>
                                    <ArrowDown10 />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(1)} className='font1 px-3 hover:bg-gray-100'>Sort options</AccordionHeader>
                        <AccordionBody>
                            <div className='flex justify-center items-center gap-5'>
                                <div className="flex flex-col">
                                    <div className='px-2 font-bold'>Title</div>
                                    <div className="flex flew-row">
                                        <div className={sortTitleAtoZ ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortTitleAtoZ} title='A to Z'>
                                            <ArrowUpAZ />
                                        </div>
                                        <div className={sortTitleZtoA ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortTitleZtoA} title='Z to A'>
                                            <ArrowDownZA />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className='px-2 font-bold'>Price</div>
                                    <div className="flex flew-row">
                                        <div className={sortPriceAtoZ ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortPriceAtoZ} title='Lowest'>
                                            <ArrowUp01 />
                                        </div>
                                        <div className={sortPriceZtoA ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortPriceZtoA} title='Highest'>
                                            <ArrowDown10 />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className='px-2 font-bold'>Date</div>
                                    <div className="flex flew-row">
                                        <div className={sortDateTimeAtoZ ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortDateTimeAtoZ} title='Earliest'>
                                            <ArrowUp01 />
                                        </div>
                                        <div className={sortDateTimeZtoA ? 'bg-french-chateau p-1 font-bold flex justify-center cursor-pointer' : 'p-1 font-bold flex justify-center cursor-pointer'} onClick={handleSortDateTimeZtoA} title='Latest'>
                                            <ArrowDown10 />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </AccordionBody>
                    </Accordion>
                </div> */}

                <ScrollToTop />

                <div className='mt-8'>
                    {/* heading */}
                    <div className="mt-8">
                        <h1 className="text-center text-2xl font-semibold first-letter:uppercase">{searchKey.length > 0 ? 'Filtered' : 'All'} Items ({itemTotal})</h1>

                        <div className='flex justify-center'>
                            {searchKey.length > 0 && itemTotal === 0 ? 'No results found' : ''}
                        </div>

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
                    <section className='text-gray-600 body-font'>
                        {/* main 2 */}
                        <div className="px-5 py-5 mx-auto">

                            {/* loader component */}
                            <div className="flex justify-center relative top-20">
                                {loading && <Loader />}
                            </div>

                            {/* main 3 */}
                            <div className="flex flex-wrap justify-center -m-4">
                                {getAllItems.filter((obj) => obj.title.toLowerCase().includes(searchKey)).slice(0, 1000).map((item, index) => {
                                    const { id, title, category, price, itemImageUrl1, date } = item
                                    // console.log(item);

                                    return (
                                        <div key={index} className='p-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
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
                                                                className='bg-off-broadway hover:bg-blue-600 w-full text-white py-[4px] rounded-lg font-light my-2'
                                                            >
                                                                Add to Cart
                                                            </button>
                                                        </>}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>



                        </div>
                    </section>

                </div>

                <Category />
            </div>
        </Layout>
    )
}

export default AllItems