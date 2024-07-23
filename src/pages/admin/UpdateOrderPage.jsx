import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/myContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { fireDB } from '../../firebase/FirebaseConfig'
import Loader from '../../components/loader/Loader'
import BackButton from '../../components/buttons/BackButton'
import orderStatusList from './../../components/status/OrderStatusList';
import HorizontalRow from './../../components/horizontalRow/HorizontalRow';

const UpdateOrderPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllOrdersFunction } = context;

  // navigate
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  // item state
  const [order, setOrder] = useState({
    orderID: '',
    orderDate: Timestamp.fromDate(new Date()),
    orderDate2: '',
    name: '',
    email: '',
    mobileNumber: '',
    avatar: '',
    totalItems: '',
    totalPrice: '',
    addressInfo: [],
    cartArray: [],
    cartItems: [],
    orderStatus: '',
    time: '',
    userID: '',
  });

  // get single order function
  const getSingleOrderFunction = async () => {
    setLoading(true);
    try {
      const orderTemp = await getDoc(doc(fireDB, 'orders', id));

      const order = orderTemp.data();
      setOrder({
        orderID: order?.orderID,
        orderDate: order?.orderDate.toDate(),
        orderDate2: order?.orderDate2,
        name: order?.name,
        email: order?.email,
        mobileNumber: order?.mobileNumber,
        avatar: order?.addressInfo.avatar,
        totalItems: order?.totalItems,
        totalPrice: order?.totalPrice,
        addressInfo: order?.addressInfo,
        cartArray: order?.cartArray,
        cartItems: order?.cartItems,
        orderStatus: order?.orderStatus,       
        time: order?.time,       
        userid: order?.userid,       
      });
      setLoading(false);      
    } catch (error) {
      console.log(error);
      toast.error('An error has occurred!');
      setLoading(false);
    }
  };

  const updateOrder = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, 'orders', id), order);
      toast.success('Order Updated successfully!');
      getAllOrdersFunction();
      setLoading(false);
      navigate('/admin-dashboard');
    } catch (error) {
      console.log(error);
      toast.error('An error has occurred!');
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleOrderFunction();
  }, [])

  return (
    <Layout>
      {/* loader component */}
      {loading && <Loader />}

      <BackButton />
      <div className="w-full flex justify-center items-center mt-5">
        {/* add item form */}
        <div className="bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* top heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-gray-500">Update Order</h2>
          </div>

          <div className='text-gray-500 text-xm mb-3'>
            Order ID# {order?.orderID}
          </div>
          <div className="mb-3 flex items-center gap-2">
            <div>
              <img src={order?.avatar} alt="" />
            </div>
            <div>{order?.name} | {order?.email} | {order?.mobileNumber}</div>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <div>Order Date: {order?.orderDate2}</div>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <div>Total Items: {order?.totalItems} | Total Price: ${order?.totalPrice}</div>
          </div>
          
          <div className="my-4 flex items-start gap-2 text-gray-500">
            {order?.cartArray}
          </div>

          <HorizontalRow />
       
          <div className="mb-3 flex flex-col justify-center items-center gap-2">
            {/* input status */}
            <div>Order Status:</div>
            {/* <List className='text-gray-500' /> */}
            <select 
              value={order?.orderStatus} 
              onChange={(e) => {
                setOrder({
                  ...order,
                  orderStatus: e.target.value
                })
              }}
              name='orderStatus' 
              className="mb-3 px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option disabled>Select Status</option>
              {orderStatusList.map((value, index) => {
                const { name } = value;
                return (
                  <option className='first-letter:uppercase' key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          {/* update item button */}
          <div className="mb-3">
            <button
              onClick={updateOrder}
              type='button'
              className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md'
            >
              Update Order
            </button>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default UpdateOrderPage