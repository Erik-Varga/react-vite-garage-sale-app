import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { CircleUserRound, List, ShoppingBasket, TicketCheck, Users } from 'lucide-react';
import ItemDetails from '../../components/admin/ItemDetails';
import SoldDetails from '../../components/admin/SoldDetails';
import AvailableDetails from '../../components/admin/AvailableDetails';
import OfferDetails from '../../components/admin/OfferDetails';
import OrderDetails from '../../components/admin/OrderDetails';
import UserDetails from '../../components/admin/UserDetails';
import { SiCashapp } from 'react-icons/si';
import { FaCartArrowDown } from 'react-icons/fa6';
import { TbSum } from 'react-icons/tb';
import ScrollToTop from '../../components/buttons/ScrollToTop';
import { FaHandHoldingUsd } from 'react-icons/fa';

const AdminDashboard = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));

    // context
    const context = useContext(myContext);
    const { getAllItems, getAllOffers, getAllOrders, getAllUsers } = context;

    const offerTotal = getAllOffers.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const offerValueTotal = getAllOffers.map(item => item.makeOfferInfo.offerAmount * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const priceValueTotal = getAllOffers.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const priceValuePct = (Number(offerValueTotal) / Number(priceValueTotal) * 100).toFixed(0) + "%"

    // total items
    const itemTotal = getAllItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const itemValueTotal = getAllItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    
    // total items
    const orderTotal = getAllOrders.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const orderValueTotal = getAllOrders.map(item => item.totalPrice).reduce((prevValue, currValue) => prevValue + currValue, 0);

    // sold items
    const itemSoldTotal = getAllItems.map(item => item.soldQuantity * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const itemSoldValueTotal = getAllItems.map(item => item.soldPrice * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    
    // percent sold
    const percentSold = ((Number(itemSoldTotal) / Number(itemTotal)) * 100).toFixed(0);
    
    const itemSoldDiffTotal = getAllItems.map(item => item.soldDiff * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const itemAvailableTotal = Number(itemTotal - itemSoldTotal);
    const itemAvailableValueTotal = itemValueTotal - itemSoldValueTotal - itemSoldDiffTotal;


    return (
        <Layout>
            {/* top */}
            <div className="top my-5 px-5">
                <div className="bg-gray-50 py-5 border border-gray-100 rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-500">Admin Dashboard</h1>
                    <span className='flex items-center gap-2 text-sm'>
                            {user?.avatar 
                            ? 
                            <>
                                <img src={user?.avatar} alt="" className='h-12 w-auto rounded-full' />
                            </> 
                            : 
                            <>
                                <CircleUserRound size={40} />
                            </>}
                            {user?.name} | {user?.email} | {user?.date} | {user?.role}
                        </span>
                </div>
            </div>

            <ScrollToTop />

            {/* percent sold chart */}
            <div className='m-6 flex flex-col justify-center'>
                <div className="text-center">
                    {percentSold}% of Inventory Sold
                </div>
                {/* <h1>Progress Bar</h1> */}
                <div className="h-4 relative rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-200 absolute"></div>
                    <div className="h-full bg-green-500 absolute" style={{ width: `${percentSold}%` }}></div>
                </div>
            </div>

            {/* bottom */}
            <Tabs>

                <TabList className="flex flex-wrap m-4 text-center justify-center">
                    {/* total items */}
                    <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                        <div className="flex items-center gap-1 justify-center border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                            <div className="flex items-center text-gray-500 w-12 h-12">
                                <TbSum size={40} />
                            </div>
                            <h2 className="title-font font-medium text-3xl pr-2 text-gray-400 fonts1">
                                {getAllItems.length}
                            </h2>
                            <p className='text-gray-500 font-bold'>
                                Total {getAllItems.length === 1 ? 'Item' : 'Items'}
                            </p>
                            <p className='px-2 border border-transparent font-semibold text-gray-800'>
                                {itemValueTotal.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                    minimumFractionDigits: 0,
                                })}
                            </p>
                        </div>
                    </Tab>

                    {/* sold items */}
                    <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                        <div className="flex items-center gap-1 justify-center border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                            <div className="flex flex-col">
                                <div className='flex items-center'>
                                    <div className="flex items-center text-gray-500 w-12 h-12">
                                        <SiCashapp size={30} />
                                    </div>
                                    <h2 className="title-font font-medium text-3xl pr-2 text-gray-400 fonts1">
                                        {itemSoldTotal.toLocaleString('en-US', {})}
                                    </h2>
                                    <p className='text-gray-500 font-bold'>
                                        Sold {itemSoldTotal === 1 ? 'Item' : 'Items'}
                                    </p>
                                    <p className='px-2 border border-transparent font-semibold text-gray-800'>
                                        {itemSoldValueTotal.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Tab>

                    {/* available items */}
                    <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                        <div className="flex items-center gap-1 justify-center border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                            <div className="flex items-center text-gray-500 w-12 h-12">
                                <FaCartArrowDown size={30} />
                            </div>
                            <h2 className="title-font font-medium text-3xl pr-2 text-gray-400 fonts1">
                                {itemAvailableTotal.toLocaleString('en-US', {})}
                            </h2>
                            <p className='text-gray-500 font-bold'>
                                Available {itemAvailableTotal === 1 ? 'Item' : 'Items'}
                            </p>
                            {/* <p className='px-2 border border-transparent font-semibold text-gray-800'>
                                {itemAvailableValueTotal.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                    minimumFractionDigits: 0,
                                })}
                            </p> */}
                        </div>
                    </Tab>

                    {/* offer items */}
                    <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                        <div className="flex items-center gap-1 justify-center border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                            <div className="flex flex-col">
                                <div className='flex items-center'>
                                    <div className="flex items-center text-gray-500 w-12 h-12">
                                        <FaHandHoldingUsd size={30} />
                                    </div>
                                    <h2 className="title-font font-medium text-3xl pr-2 text-gray-400 fonts1">
                                        {offerTotal.toLocaleString('en-US', {})}
                                    </h2>
                                    <p className='text-gray-500 font-bold'>
                                        {offerTotal === 1 ? 'Offer' : 'Offers'}
                                    </p>
                                    <p className='px-2 border border-transparent font-semibold text-gray-800'>
                                        {offerValueTotal.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        })}
                                    </p>/
                                    <p className='px-2 border border-transparent font-semibold text-gray-500'>
                                        {priceValueTotal.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        })}
                                    </p>
                                    <p className='text-gray-500'>
                                        {priceValuePct > 0 ? <>({priceValuePct})</> : <></>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Tab>

                    {/* total orders */}
                    <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                        <div className="flex items-center gap-1 justify-center border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                            <div className="flex items-center text-gray-500 w-12 h-12">
                                <TicketCheck size={30} />
                            </div>
                            <h2 className="title-font font-medium text-3xl pr-2 text-gray-400 fonts1">
                                {getAllOrders.length}
                            </h2>
                            <p className='text-gray-500 font-bold'>
                                Total {getAllOrders.length === 1 ? 'Order' : 'Orders'}
                            </p>
                            <p className='px-2 border border-transparent font-semibold text-gray-800'>
                                {orderValueTotal.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumFractionDigits: 0,
                                    minimumFractionDigits: 0,
                                })}
                            </p>
                        </div>
                    </Tab>

                    {/* total users */}
                    <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                        <div className="flex items-center gap-1 justify-center border bg-gray-50 hover:bg-gray-100 border-gray-100 px-4 py-3 rounded-xl">
                            <div className="flex items-center text-gray-500 w-12 h-12">
                                <Users size={30} />
                            </div>
                            <h2 className="title-font font-medium text-3xl pr-2 text-gray-400 fonts1">
                                {getAllUsers.length}
                            </h2>
                            <p className='text-gray-500 font-bold'>
                                Total {getAllUsers.length === 1 ? 'User' : 'Users'}
                            </p>
                        </div>
                    </Tab>

                </TabList>

                <TabPanel>
                    <ItemDetails />
                </TabPanel>

                <TabPanel>
                    <SoldDetails />
                </TabPanel>

                <TabPanel>
                    <AvailableDetails />
                </TabPanel>

                <TabPanel>
                    <OfferDetails />
                </TabPanel>

                <TabPanel>
                    <OrderDetails />
                </TabPanel>

                <TabPanel>
                    <UserDetails />
                </TabPanel>
            </Tabs>
        </Layout>
    )
}

export default AdminDashboard