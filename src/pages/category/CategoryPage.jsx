import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import myContext from '../../context/myContext';
import Layout from '../../components/layout/Layout';
import { ArrowDown10, ArrowDownZA, ArrowLeft, ArrowUp01, ArrowUpAZ, LayoutGrid, List, Loader } from 'lucide-react';
import HeroSection from '../../components/heroSection/HeroSection';
import Category from '../../components/category/Category';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import { FaRegTrashCan } from 'react-icons/fa6';
import Filter from '../../components/filter/Filter';

import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import { Card } from 'antd';
import BackButton from '../../components/buttons/BackButton';
import ScrollToTop from '../../components/buttons/ScrollToTop';
import categoryImage from '../../assets/garage-sale-bags1.jpg';

const abstractImage = "https://images.unsplash.com/photo-1588245345738-c8c0ad18c6ff?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const categoryImages = [abstractImage];

const CategoryPage = () => {
    // sort accordion
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    
    // get user from localStorage
    const user = JSON.parse(localStorage.getItem('users'));

    // random category image
     const RandomCategoryImage = ({ images }) => {
        const randomImage = getRandomElement(images);
      
        return (
            <div>
                <img src={randomImage} alt="" className='border rounded-sm shadow-md' />
            </div>
        )
      };

    // useParams
    const { categoryname } = useParams();

    // context
    const context = useContext(myContext);
    const { loading, getAllItems, searchKey } = context;

    const itemTotal = getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.category.includes(categoryname)).map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const itemValueTotal = getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.category.includes(categoryname)).map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    // getAllItems.sort((a, b) => b.time - a.time);
    
    // navigate
    const navigate = useNavigate();

    // filter item
    const filterItem = getAllItems.filter(sold => sold.status === "For Sale").filter((obj) => obj.category.includes(categoryname));

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
        <div>
        <BackButton />
        {/* <div>
            <img
              className='absolute opacity-30 h-auto w-full object-cover object-center'
              src={abstractImage} alt='category image'
            />
          </div> */}
            <Filter />

            {/* sort */}
            {/* <div className="rounded-md mt-2">
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(1)} className='font1 px-3 hover:bg-gray-100'>Sort options</AccordionHeader>
                    <AccordionBody>
                        <div className='flex justify-center items-center gap-5 w-1/'>

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

            {/* heading */}
            <div className="mt-8">
                <h1 className="text-center text-2xl font-semibold capitalize">{categoryname} ({itemTotal})</h1>
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
            {loading ? 
            <>
                <div className="flex justify-center">
                    <Loader />
                </div>
            </> 
            : 
            <>
            <section className='text-gray-600 body-font'>
            {/* main 2 */}
                <div className="flex flex-col px-5 py-5 mx-auto">
                    {/* main 3 */}
                    <div className='w-full flex justify-center mb-2'>
                        {/* <BackButton /> */}
                    </div>
                    <div className="flex flex-wrap justify-center m-4">
                        {filterItem.length > 0 
                        ? 
                        <>
                            {filterItem.filter(sold => sold.status === "For Sale").filter((obj) => obj.title.toLowerCase().includes(searchKey)).map((item, index) => {
                                const { id, title, category, description, price, itemImageUrl1, itemImageUrl2, itemImageUrl3, date } = item
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
                        </> 
                        : 
                        <>
                            No available items
                        </>}

                        
                    </div>
                </div>
            </section>
            </>}
            <Category />
        </div>
    </Layout>
  )
}

export default CategoryPage