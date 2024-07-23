import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/myContext';
import BackButton from '../../components/buttons/BackButton';
import { CircleUserRound } from 'lucide-react';
import ViewItems from './../../components/buttons/ViewItems';
import { Popconfirm, Table } from 'antd';
import Loader from '../../components/loader/Loader';
import { FaRegTrashCan } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const UserDashboard = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));

    // context
    const context = useContext(myContext);
    const { loading, getAllOrders, getAllOffers } = context;

    // antd table
    const columns = [
    {
        title: 'Item ID',
        dataIndex: 'itemID',
        key: 'itemID',
        sorter: (a, b) => a.itemID.localeCompare(b.itemID),
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price.localeCompare(b.price),
        render: (price) => (
            <div className='flex justify-start'>${price}</div>
        )
    },
    {
        title: 'offerAmount',
        dataIndex: 'makeOfferInfo',
        key: 'offerAmount',
        // sorter: (a, b) => a.makeOfferInfo - b.makeOfferInfo,
        render: (makeOfferInfo) => (
            <div className='flex justify-start'>${makeOfferInfo.offerAmount}</div>
        )
    },
    {
        title: 'email',
        dataIndex: 'makeOfferInfo',
        key: 'email',
        // sorter: (a, b) => a.makeOfferInfo - b.makeOfferInfo,
        render: (makeOfferInfo) => (
            <div className='flex justify-start'>{makeOfferInfo.email}</div>
        )
    },
    {
        title: 'name',
        dataIndex: 'makeOfferInfo',
        key: 'name',
        // sorter: (a, b) => a.makeOfferInfo - b.makeOfferInfo,
        render: (makeOfferInfo) => (
            <div className='flex justify-start'>{makeOfferInfo.name}</div>
        )
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
        title: 'Offer Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => new Date(a.date) - new Date(b.date),
        defaultSortOrder: 'descend',
    },
];

const confirm = (e) => e.deleteOffer(id);

  const cancel = (e) => {
    toast.success('Delete canceled!')
  };

   // filter search data
    // const filterOrSoldData = getAllOffers.filter((obj) => obj.status.toLowerCase().includes('sold'));


    return (
        <Layout>
            <BackButton />
            <div className="container flex flex-col mx-auto px-4">

                <div className="top">
                    <div className="bg-gray-50 p-5 border border-gray-100 rounded-lg">
                        <h1 className="text-2xl font-bold text-gray-500">User Dashboard</h1>
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
                            
                        </span>
                            <div className='flex flex-col'>
                                {user?.name}
                            </div>
                            <div>
                                {user?.email}
                            </div>
                            <div>
                                {user?.date}
                            </div>
                            <div>
                                {user?.role}
                            </div>
                    </div>
                </div>

                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>
                        <div>
                            Total Number of Orders: {getAllOrders.filter((obj) => obj.userid === user?.uid).length}
                        </div>

                        {getAllOrders.filter((obj) => obj.userid === user?.uid).map((order, index) => {
                            return (
                                <div key={index}>
                                    <div className='my-4'>
                                        <hr />
                                    </div>
                                    <div className='p-2 bg-yellow-200'>
                                        Order Status: <span className='font-bold'>{order.orderStatus}</span> 
                                    </div>
                                    <div>
                                        Order #{order.orderID}
                                    </div>
                                    <div>
                                        {order.email}
                                    </div>
                                    <div>
                                        Total Items: {order.totalItems}
                                    </div>
                                    <div>
                                        Total Price: ${order.totalPrice}
                                    </div>
                                    <div>
                                        submitted on: {order.orderDate2}
                                    </div>

                                    {order.cartItems.map((item, index) => {
                                        const { id, date, quantity, price, title, itemImageUrl1, itemImageUrl2, itemImageUrl3, category } = item;
                                        const { status } = order;

                                        return (
                                            <div key={index} className='my-2 flex overflow-hidden rounded-xl'>
                                                <div className="w-full border-r border-gray-100 bg-gray-50 p-5">
                                                    <div className="flex justify-around gap-2">
                                                        <img
                                                            className='h-40 w-40 rounded-lg border border-gray-200 object-cover object-center'
                                                            src={itemImageUrl1}
                                                            alt={title}
                                                        />
                                                        <img
                                                            className='h-40 w-40 rounded-lg border border-gray-200 object-cover object-center'
                                                            src={itemImageUrl2}
                                                            alt={title}
                                                        />
                                                        <img
                                                            className='h-40 w-40 rounded-lg border border-gray-200 object-cover object-center'
                                                            src={itemImageUrl3}
                                                            alt={title}
                                                        />
                                                    </div>

                                                    <div className='flex justify-center mt-2'>
                                                    {title} | ${price}

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }).reverse()}
                    </div>
                </div>

                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold">Offer Details</h2>
                        <div className="flex justify-center relative top-10">
                            {loading && <Loader />}
                        </div>
                        <div>
                            Total Number of Offers: {getAllOffers.filter((obj) => obj.makeOfferInfo.userid === user?.uid).length}
                        </div>
                        {/* <div>
                            <Table className='flex justify-center' dataSource={getAllOffers.filter((obj) => obj.makeOfferInfo.userid === user?.uid)} columns={columns} size='small' bordered sorter pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }} />
                        </div> */}

                        {getAllOffers.filter((obj) => obj.makeOfferInfo.userid === user?.uid).map((offer, index) => {
                            return (
                                <div key={index}>
                                    <div className='my-4'>
                                        <hr />
                                    </div>
                                    <div className='p-2 bg-yellow-200'>
                                        Offer Status: <span className='font-bold'>{offer.offerStatus}</span> 
                                    </div>
                                    <div>
                                        Offer #{offer.offerID}
                                    </div>
                                    <div className='font-bold'>
                                        {offer.title}
                                    </div>
                                    <div>
                                        Price: ${offer.price} | Your Offer: ${offer.makeOfferInfo.offerAmount}
                                    </div>
                                    <div>
                                        submitted on: {offer.offerDate2}
                                    </div>
                                </div>
                            )
                        }).reverse()}
                    </div>
                </div>
            <ViewItems />
            </div>
        </Layout>
    )
}

export default UserDashboard