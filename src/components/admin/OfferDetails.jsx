import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/myContext'
import Loader from '../loader/Loader';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button, Image, Popconfirm, Space, Switch, Table } from 'antd';
import { Card, Typography } from '@material-tailwind/react';
import { Trash2 } from 'lucide-react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const OfferDetails = () => {
// context
const context = useContext(myContext);
const { loading, setLoading, getAllOffers, getAllOffersFunction } = context;

// console.log(getAllItems);

// navigate
const navigate = useNavigate();

// antd table
const columns = [
    {
        title: 'Offer ID',
        dataIndex: 'offerID',
        key: 'offerID',
        sorter: (a, b) => a.offerID.localeCompare(b.offerID),
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
        title: 'Offer Amount',
        dataIndex: 'makeOfferInfo',
        key: 'offerAmount',
        // sorter: (a, b) => a.makeOfferInfo - b.makeOfferInfo,
        render: (makeOfferInfo) => (
            <div className='flex justify-start'>${makeOfferInfo.offerAmount}</div>
        )
    },
    {
        title: 'User Image',
        dataIndex: 'makeOfferInfo',
        key: 'userAvatar',
        render: (makeOfferInfo) => (
            <img src={makeOfferInfo.avatar} alt='image' className='h-10 w-10' />
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
        title: 'Offer Status',
        dataIndex: 'offerStatus',
        key: 'offerStatus',
        sorter: (a, b) => a.offerStatus.localeCompare(b.offerStatus),
    },
    {
        title: 'Offer Date',
        dataIndex: 'offerDate2',
        key: 'offerDate2',
        sorter: (a, b) => new Date(a.offerDate2) - new Date(b.offerDate2),
        defaultSortOrder: 'descend',
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'action',
        render: (id, index) => (
            <div key={index} className='flex gap-3 px-2'>
                <Link to={`/update-offer/${id}`}>
                    <FaRegEdit size={20} />
                </Link>
                <Popconfirm
                    title="Delete the offer"
                    description="Are you sure to delete this offer?"
                    onConfirm={() => deleteOffer(id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    {/* <Button danger>Delete</Button> */}
                    <FaRegTrashCan size={20} className='cursor-pointer hover:text-red-500' />
                </Popconfirm>
            </div>
        ),
    },
];

// delete item
const deleteOffer = async (id) => {
    setLoading(true);
    // const choice = window.confirm(
    //     'Are you sure you want to delete this Offer?'
    // );
    // if (choice) {
        // Perform your dangerous critical action here.
        try {
            await deleteDoc(doc(fireDB, 'offers', id));
            toast.success('Offer Deleted successfully');
            getAllOffersFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('An error has occurred!');
            setLoading(false);
        }
    // }
};

const confirm = (e) => e.deleteOffer(id);

  const cancel = (e) => {
    toast.success('Delete canceled!')
  };

   // filter search data
    // const filterOrSoldData = getAllOffers.filter((obj) => obj.offerStatus.toLowerCase().includes('sold'));

    
    return (
        <div>
            {/* text */}
            <div className="py-5 flex justify-center items-center gap-2">
                <h1 className="text-xl text-gray-600 font-bold">
                    All Offers
                </h1>
            </div>

            {/* antd table */}
            <div>
                <Table className='flex justify-center' dataSource={getAllOffers} columns={columns} size='small' bordered sorter pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }} />
            </div>
        </div>
      )
}

export default OfferDetails