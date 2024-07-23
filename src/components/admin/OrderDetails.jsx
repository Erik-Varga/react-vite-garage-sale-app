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

const OrderDetails = () => {
// context
const context = useContext(myContext);
const { loading, setLoading, getAllOrders, getAllOrdersFunction } = context;

// console.log(getAllItems); 

// navigate
const navigate = useNavigate();

// antd table
const columns = [
    {
        title: 'orderID',
        dataIndex: 'orderID',
        key: 'orderID',
        sorter: (a, b) => a.orderID.localeCompare(b.orderID),
    },
    {
        title: 'User Image',
        dataIndex: 'addressInfo',
        key: 'userAvatar',
        render: (addressInfo) => (
            <img src={addressInfo.avatar} alt='image' className='h-10 w-10' />
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
        title: 'mobileNumber',
        dataIndex: 'mobileNumber',
        key: 'mobileNumber',
        sorter: (a, b) => a.mobileNumber.localeCompare(b.mobileNumber),
    },
    {
        title: 'Item List',
        dataIndex: 'cartArray',
        key: 'cartArray',
        // sorter: (a, b) => a.cartArray - b.cartArray,
        render: (cartArray) => (
            <div className='flex justify-start'>{cartArray}</div>
        )
    },
    {
        title: 'Total Items',
        dataIndex: 'totalItems',
        key: 'totalItems',
        sorter: (a, b) => a.totalItems - b.totalItems,
        render: (totalItems) => (
            <div className='flex justify-center'>{totalItems}</div>
        )
    },
    {
        title: 'Total Price',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        sorter: (a, b) => a.totalPrice - b.totalPrice,
        render: (totalPrice) => (
            <div className='flex justify-center'>$ {totalPrice}</div>
        )
    },
    {
        title: 'Order Status',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
    },
    {
        title: 'Order Date',
        dataIndex: 'orderDate2',
        key: 'orderDate2',
        sorter: (a, b) => new Date(a.orderDate2) - new Date(b.orderDate2),
        defaultSortOrder: 'descend',
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'action',
        render: (id, index) => (
            <div key={index} className='flex gap-3 px-2'>
                <Link to={`/update-order/${id}`}>
                    <FaRegEdit size={20} />
                </Link>
                <Popconfirm
                    title="Delete the order"
                    description="Are you sure to delete this order?"
                    onConfirm={() => deleteOrder(id)}
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
const deleteOrder = async (id) => {
    setLoading(true);
    // const choice = window.confirm(
    //     'Are you sure you want to delete this Order?'
    // );
    // if (choice) {
        // Perform your dangerous critical action here.
        try {
            await deleteDoc(doc(fireDB, 'orders', id));
            toast.success('Order Deleted successfully');
            getAllOrdersFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('An error has occurred!');
            setLoading(false);
        }
    // }
};

const confirm = (e) => e.deleteOrder(id);

  const cancel = (e) => {
    toast.success('Delete canceled!')
  };

   // filter search data
    // const filterOrSoldData = getAllOrders.filter((obj) => obj.status.toLowerCase().includes('sold'));

    
    return (
        <div>
            {/* text */}
            <div className="py-5 flex justify-center items-center gap-2">
                <h1 className="text-xl text-gray-600 font-bold">
                    All Orders
                </h1>
            </div>

            {/* antd table */}
            <div>
                <Table className='flex justify-center' dataSource={getAllOrders} columns={columns} size='small' bordered sorter pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }} />
            </div>
        </div>
      )
}

export default OrderDetails