import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import myContext from '../../context/myContext'
import Loader from '../loader/Loader';
import { deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import { Button, Image, Popconfirm, Space, Table, Card } from 'antd';
import HorizontalRow from './../horizontalRow/HorizontalRow';
import ViewItems from '../buttons/ViewItems';

const UserDetails = () => {
    // get user from localStorage
    const user = JSON.parse(localStorage.getItem('users'));
    
    // context
    const context = useContext(myContext);
    const { loading, setLoading, getAllItems, getAllUsers, getAllUsersFunction, getAllOrders, getAllOrdersFunction, searchKey, setSearchKey } = context;

    // navigate
    const navigate = useNavigate();

    // state
    const [showTab, setShowTab] = useState('All Users');
    const filterAdminData = getAllUsers.filter((obj) => obj.role.toLowerCase().includes('admin'));
    const filterUserData = getAllUsers.filter((obj) => obj.role.toLowerCase().includes('user'));
    
    // antd table
    const columns = [
        {
            title: 'UID',
            dataIndex: 'uid',
            key: 'uid',
            sorter: (a, b) => a.uid.localeCompare(b.uid),
        },
        {
            title: 'Image',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <img src={avatar} alt='image' className='h-10 w-10' />
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
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            defaultSortOrder: 'descend',
        },
    ];

    // delete User
    const deleteUser = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'users', id));
            toast.success('User Deleted successfully');
            getAllUsersFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('An error has occurred!');
            setLoading(false);
        }
    };

    const confirm = (e) => e.deleteUser(id);

    const cancel = (e) => {
        toast.success('Delete canceled!')
    };

    return (
        <div>
            {/* <div className="pb-5 flex justify-center items-center gap-2">
                    <Button 
                        className={showTab === "All Users" ? "bg-gray-200" : ""}
                        onClick={() => setShowTab('All Users')}>
                            All Users
                    </Button>
                    <Button 
                        className={showTab === "Admin" ? "bg-gray-200" : ""}
                        onClick={() => setShowTab('Admin')}>
                            Admin
                    </Button>
                    <Button 
                        className={showTab === "User" ? "bg-gray-200" : ""}
                        onClick={() => setShowTab('User')}>
                            User
                    </Button>
            </div> */}

            {/* antd table */}
            {/* {showTab === "All Users" && <>
                <div className='flex justify-center items-center text-sm'>Count: {getAllUsers.length}</div>
                <div>
                    <Table className='hidden sm:flex justify-center' dataSource={getAllUsers} columns={columns} size='small' bordered sorter pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }} />
                </div>
            </>}

            {showTab === "Admin" && <>
                <div className='flex justify-center items-center text-sm'>Count: {filterAdminData.length}</div>
                <div>
                    <Table className='hidden md:flex justify-center' dataSource={filterAdminData} columns={columns} size='small' bordered sorter pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }} />
                </div>
            </>}

            {showTab === "User" && <>
                <div className='flex justify-center items-center text-sm'>Count: {filterUserData.length}</div>
                <div>
                    <Table className='hidden md:flex justify-center' dataSource={filterUserData} columns={columns} size='small' bordered sorter pagination={{ defaultPageSize: 25, showSizeChanger: true, pageSizeOptions: ['25', '50', '100'] }} />
                </div>
            </>} */}

            <HorizontalRow />

            <div className='mt-8 z-5'>
                <div className=''>
                {/* <h1 className="text-center text-2xl font-semibold first-letter:uppercase">{searchKey != '' ? 'Filtered' : 'Latest'} Items ({itemTotal})</h1> */}
                {/* <span className='flex justify-center'>
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
                </span> */}
                
                {/* {user?.role === 'admin' && 
                    <h1 className='px-2 border border-transparent font-semibold text-gray-800 flex justify-center'>
                        {itemValueTotal.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 0, 
                            minimumFractionDigits: 0, 
                        })}
                    </h1>
                } */}
                </div>

                <section className='text-gray-600 body-font'>                    
                    <div className="container px-5 py-5 mx-auto">                        
                        <div className="flex justify-center relative top-20">
                            {loading && <Loader />}
                        </div>
                        
                        <div className="flex flex-wrap justify-center">
                            {getAllUsers.map((item, index) => {
                                const { uid, name, email, avatar, role, date, time } = item
                                return (
                                    <Card key={index} className='w-[400px]'>
                                        <div className="flex flex-col h-full border border-gray-300 rounded-xl overflow-hidden shadow-md">
                                            <div className="w-full flex flex-1 justify-between items-center">
                                                <img 
                                                    // onClick={() => navigate(`/item-info/${id}`)}
                                                    className='h-40 w-40 object-cover' 
                                                    src={avatar} 
                                                    alt="" />
                                            
                                                <div className="p-6">
                                                    <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                                                        {role}
                                                    </h2>
                                                    <h1 className='title-font text-lg font-medium text-gray-900 dark:text-white mb-3'>
                                                        {name}
                                                    </h1>
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                                                        {email}
                                                    </span>
                                                    <div>Joined: {date}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                            
                        </div>
                    </div>
                </section>

            </div>
        </div>
      )
}

export default UserDetails