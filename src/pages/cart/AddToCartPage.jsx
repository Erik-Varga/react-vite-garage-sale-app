import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { ArrowLeft, ShoppingCart, Trash, Trash2 } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../../redux/cartSlice';
import BuyNowModal from '../../components/buyNowModal/BuyNowModal';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { fireDB } from '../../firebase/FirebaseConfig';
import BackButton from '../../components/buttons/BackButton';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button, Image, Popconfirm, Space, Table } from 'antd';

const AddToCartPage = () => {
    // navigate
    const navigate = useNavigate();

    // redux
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // functions
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success('Deleted from cart')
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const handleClearCart = () => {
        cartItems.map(item =>  dispatch(deleteFromCart(item)))
    }

    let cartArray = [];

    const cartArrayTotal = cartItems.map((item, index) => {
        cartArray.push(`${index+1} ${item.title} • ${item.itemID} (${item.storage}) | `)
    });

    const cartItemsTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    const cartValueTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // user
    const user = JSON.parse(localStorage.getItem('users'));     

    // address info state
    const [addressInfo, setAddressInfo] = useState({
        name: user?.name,
        email: user?.email,
        avatar: user?.avatar,
        mobileNumber: '',
        time: Timestamp.now(),
    });

    const buyNowFunction = () => {
        // validation
        if (addressInfo.name === '' || addressInfo.address === '' || addressInfo.mobileNumber === '') {
            return toast.error('All fields are required!');
        };

        // order info
        const orderInfo = {
            cartItems,
            cartArray,
            addressInfo,
            email: user.email,
            userid: user.uid,
            orderStatus: 'Order submitted',
            time: Timestamp.now(),
            orderID: Date.now(),
            orderDate: Timestamp.now(),
            orderDate2: new Date().toLocaleString(
                'en-US',
                {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit', 
                    minute:'2-digit'
                }
            ),
            totalItems: cartItemsTotal,
            totalPrice: cartValueTotal,
            name: user.name,
            mobileNumber: addressInfo.mobileNumber,
        };

        try {
            const orderRef = collection(fireDB, 'orders');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: '',
                address: '',
                mobileNumber: '',
            })
            toast.success('Order placed successfully!');
            handleClearCart();
            if (user.role === "user") {
                navigate('/user-dashboard')
            } else if (user.role === "admin") {
                navigate('/admin-dashboard')
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error(error);
            toast.error('An error has occurred!');
        };
    };

    // console.log(cartItemsTotal)
    // console.log(cartValueTotal)

    const dataInfo = [
        { id: 1, name: "Empty Cart"}
    ];

    // antd table
    const columns = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        //     sorter: (a, b) => a.id.localeCompare(b.id),
        // },
        {
            title: 'Empty Cart',
            dataIndex: 'id',
            key: 'action',
            render: (id, index) => (
                <div key={index} className='flex justify-center'>
                    <Popconfirm
                        title="Empty Cart"
                        description="Are you sure to empty your cart?"
                        onConfirm={() => handleClearCart()}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <FaRegTrashCan size={20} className='cursor-pointer hover:text-red-500' />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const confirm = (e) => toast.success('Cart emptied!');
    const cancel = (e) => toast.success('Empty Cart canceled!');

  return (
    <Layout>
        <BackButton />
        <div className="container mx-auto px-2 lg:max-w-7xl lg:px-0">
            <div className="mx-auto w-full md:max-w-2xl p-4 lg:max-w-7xl">
                <h1 className="flex gap-2 items-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                    <ShoppingCart size={50} />
                </h1>
                <form className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                    <section aria-labelledby='cart-heading' className='rounded-lg bg-white lg:col-span-6'>
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        <ul role='list' className='divide-y divide-gray-200'>
                            {cartItems.length > 0
                            ?
                            <>                    

                            {cartItems.map((item, index) => {
                                const { id, title, category, price, itemImageUrl1, itemImageUrl2, itemImageUrl3, quantity } = item;
                                return (
                                    <div key={index} className='mt-5'>
                                        
                                        <div className='text-sm'>Item: {index + 1}</div>
                                        <div className="">
                                            <div className="">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm font-semibold text-black">
                                                            {title}
                                                        </h3>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            &nbsp;&nbsp;${price}
                                                        </p>
                                                    </div>
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                                        {category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex py-3 gap-2">
                                            <div className="flex-shrink-0">
                                                <img src={itemImageUrl1} alt='image' className='h-24 w-24 rounded-lg border border-gray-200 object-cover object-center' />
                                            </div>
                                            <div className="flex-shrink-0">
                                                <img src={itemImageUrl2} alt='image' className='h-24 w-24 rounded-lg border border-gray-200 object-cover object-center' />
                                            </div>
                                            <div className="flex-shrink-0">
                                                <img src={itemImageUrl3} alt='image' className='h-24 w-24 rounded-lg border border-gray-200 object-cover object-center' />
                                            </div>
                                        </div>
                                        <div className="my-5 flex">
                                            {/* <div className="min-w-24 flex">
                                                <button 
                                                    onClick={() => handleDecrement(id)} 
                                                    type='button' 
                                                    className='h-7 w-7'
                                                >
                                                    -
                                                </button>
                                                <input type="text" className='mx-1 h-7 w-9 rounded-md border text-center' readOnly={true} value={quantity} />
                                                <button 
                                                    onClick={() => handleIncrement(id)} 
                                                    type='button' 
                                                    className='h-7 w-7 items-center justify-center'
                                                >
                                                    +
                                                </button>
                                            </div> */}
                                            <div className="flex text-sm">
                                                <button 
                                                    onClick={() => deleteCart(item)}
                                                    type='button' 
                                                    className='flex items-center space-x-1 px-2 py-1 pl-0'
                                                >
                                                    <Trash size={12} className='text-red-500' />
                                                    <span className='text-xs font-medium text-red-500'>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                        {/* antd table */}
                                    </div>
                                )
                            })}
                                        <div className='mb-5 flex'>
                                            <Table className='flex justify-center' dataSource={dataInfo} columns={columns} size='small' bordered pagination={false} />
                                        </div>     
                            
                            
                        </>
                        :
                        <>
                        No items in cart
                        </>}
                        </ul>
                    </section>

                    {/* order summary */}
                    <section
                        aria-labelledby='summary-heading'
                        className='mt-16 rounded-md bg-white lg:col-span-6 lg:mt-0 lg:p-0'
                    >
                        <h2 
                            id='summary-heading'
                            className='border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4'>
                                Price Details
                        </h2>
                        <div className='bg-gray-50 p-5 border-2 rounded-md'>
                            <dl className='w-full space-y-1 px-2 py-4'>
                                <div className="flex items-center justify-between">
                                    <dt className='text-sm text-gray-800'>
                                        Price ({cartItemsTotal} {cartItemsTotal === 1 ? 'item' : 'items'})
                                    </dt>
                                    <dd className='text-sm font-medium text-gray-900'>${cartValueTotal}</dd>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <dt className="flex items-center text-sm text-gray-800">
                                        <span>Pickup in Longwood, FL</span>
                                    </dt>
                                    <dd className='text-sm font-medium text-gray-800'>Free</dd>
                                </div>
                                <div className="flex items-center justify-between border-y border-dashed py-4 font-bold">
                                    <dt className="text-base text-gray-900">
                                        <span>Total Amount</span>
                                    </dt>
                                    <dd className='text-sm text-gray-700'>${cartValueTotal}</dd>
                                </div>
                            </dl>
                            
                            <div className="flex gap-4 mb-6">
                                {user ? 
                                    <>
                                    {cartItemsTotal > 0 ? 
                                        <BuyNowModal 
                                            addressInfo={addressInfo}
                                            setAddressInfo={setAddressInfo}
                                            buyNowFunction={buyNowFunction}
                                        />
                                        :
                                        <></>
                                    }
                                    </>
                                : 
                                <>
                                    <Navigate to={'/login'} />
                                </>    
                                }
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default AddToCartPage
