import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/myContext'
import Loader from '../loader/Loader';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button, Image, Popconfirm, Space, Table } from 'antd';

const SoldDetails = () => {
    // context
    const context = useContext(myContext);
    const { loading, setLoading, getAllItems, getAllItemsFunction } = context;

    // navigate
    const navigate = useNavigate();

    // filter search data
    const filterSoldData = getAllItems.filter((obj) => obj.status.toLowerCase().includes('sold'));

    // antd table
    const columns = [
        // {
        //     title: 'UID',
        //     dataIndex: 'uid',
        //     key: 'uid',
        //     sorter: (a, b) => a.uid.localeCompare(b.uid),
        // },
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
            sorter: (a, b) => a.price - b.price,
            render: (price) => (
                <div className='flex justify-center'>$ {price}</div>
            )
        },
        {
            title: 'SoldPrice',
            dataIndex: 'soldPrice',
            key: 'soldPrice',
            sorter: (a, b) => a.soldPrice - b.soldPrice,
            render: (soldPrice) => (
                <div className='flex justify-center'>$ {soldPrice}</div>
            )
        },
        {
            title: 'Sold Diff',
            dataIndex: 'soldDiff',
            key: 'soldDiff',
            sorter: (a, b) => a.soldDiff - b.soldDiff,
            render: (soldDiff) => (
                <div className='flex justify-center'>$ {soldDiff}</div>
            )
        },
        {
            title: 'Image 1',
            dataIndex: 'itemImageUrl1',
            key: 'itemImageUrl1',
            width: 100,
            render: (t, r) => (
                <div className='flex gap-2'>
                    <img src={`${r.itemImageUrl1}`} className='h-20 w-20 object-cover object-center rounded-sm' />
                </div>
            )
        },
        {
            title: 'Image 2',
            dataIndex: 'itemImageUrl2',
            key: 'itemImageUrl2',
            width: 100,
            render: (t, r) => (
                <div className='flex gap-2'>
                    <img src={`${r.itemImageUrl2}`} className='h-20 w-20 object-cover object-center rounded-sm' />
                </div>
            )
        },
        {
            title: 'Image 3',
            dataIndex: 'itemImageUrl3',
            key: 'itemImageUrl3',
            width: 100,
            render: (t, r) => (
                <div className='flex gap-2'>
                    <img src={`${r.itemImageUrl3}`} className='h-20 w-20 object-cover object-center rounded-sm' />
                </div>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        // {
        //     title: 'Modified Date',
        //     dataIndex: 'date',
        //     key: 'date',
        //     sorter: (a, b) => new Date(a.date) - new Date(b.date),
        //     defaultSortOrder: 'descend',
        // },
        {
            title: 'Posting Date',
            dataIndex: 'postingDate2',
            key: 'postingDate2',
            sorter: (a, b) => new Date(a.postingDate2) - new Date(b.postingDate2),
            defaultSortOrder: 'descend',
        },
        // {
        //     title: 'Posting Date3',
        //     dataIndex: 'postingDate3',
        //     key: 'postingDate3',
        //     sorter: (a, b) => new Date(a.postingDate3) - new Date(b.postingDate3),
        //     defaultSortOrder: 'descend',
        // },
        {
            title: 'Sold Date2',
            dataIndex: 'soldDate2',
            key: 'soldDate2',
            sorter: (a, b) => new Date(a.soldDate2) - new Date(b.soldDate2),
            defaultSortOrder: 'descend',
        },
        // {
        //     title: 'Sold Date3',
        //     dataIndex: 'soldDate3',
        //     key: 'soldDate3',
        //     sorter: (a, b) => new Date(a.soldDate3) - new Date(b.soldDate3),
        //     defaultSortOrder: 'descend',
        // },
        {
            title: 'Days to sell',
            dataIndex: 'soldDateDiff',
            key: 'soldDateDiff',
            width: 100,
            render: (soldDateDiff) => {
                
                const diffDays = Math.ceil(soldDateDiff / (1000 * 60 * 60 * 24)); 
            
            return (
                <div className='flex gap-2'>
                    {diffDays}
                    {/* <div src={`${diffInDates}`} className='h-20 w-20 object-cover object-center rounded-sm' /> */}
                </div>
            )} 
        },
        // {
        //     title: 'Diff Date',
        //     dataIndex: 'soldDateDiff',
        //     key: 'soldDateDiff',
        //     // sorter: (a, b) => new Date(a.soldDateDiff) - new Date(b.soldDateDiff),
        //     // defaultSortOrder: 'descend',
        // },
        // {
        //     title: 'Diff Date',
        //     dataIndex: 'soldDateDiff',
        //     key: 'soldDateDiff',
        //     // sorter: (a, b) => new Date(a.soldDateDiff) - new Date(b.soldDateDiff),
        //     // defaultSortOrder: 'descend',
        // },
        // {
        //     title: 'Action',
        //     dataIndex: 'id',
        //     key: 'action',
        //     render: (id, index) => (
        //         <div key={index} className='flex gap-3 px-2'>
        //             {/* <Link to={`/update-item/${id}`}>
        //                 <FaRegEdit size={20} />
        //             </Link> */}
        //             <Popconfirm
        //                 title="Delete the task"
        //                 description="Are you sure to delete this item?"
        //                 onConfirm={() => deleteItem(id)}
        //                 onCancel={cancel}
        //                 okText="Yes"
        //                 cancelText="No"
        //             >
        //                 <FaRegTrashCan size={20} className='cursor-pointer hover:text-red-500' />
        //             </Popconfirm>
        //         </div>
        //     ),
        // },
    ];

    // delete item
    const deleteItem = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'items', id));
            toast.success('Item Deleted successfully');
            getAllItemsFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('An error has occurred!');
            setLoading(false);
        }
    };

    const confirm = (e) => e.deleteItem(id);

      const cancel = (e) => {
        toast.success('Delete canceled!')
      };

    return (
        <div>
            <div className="py-5 flex justify-center items-center gap-2">
                {/* text */}
                <h1 className="text-xl text-gray-600 font-bold">
                    {filterSoldData.length}x Sold Items
                </h1>
            </div>

            {/* loader component */}
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            {/* antd table */}
            <div>
                <Table className='flex justify-center' dataSource={filterSoldData} columns={columns} size='small' bordered sorter pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }} />
            </div>
        </div>
    )
}

export default SoldDetails