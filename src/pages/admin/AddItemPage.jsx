import React, { useContext, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/myContext'
import { useNavigate } from 'react-router-dom'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { fireDB } from '../../firebase/FirebaseConfig'
import categoryList from '../../components/category/CategoryList'
import conditionList from './../../components/condition/ConditionList';
import statusList from './../../components/status/StatusList';
import { Archive, Captions, DollarSign, Image, List, NotebookPen } from 'lucide-react';

import { Calendar } from 'primereact/calendar';
import Loader from '../../components/loader/Loader'

const AddItemPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // item state
  const [item, setItem] = useState({
    itemID: Date.now(),
    title: '',
    price: '',
    postingDate: Timestamp.now(),
    postingDate2: '',
    itemImageUrl1: '',
    itemImageUrl2: '',
    itemImageUrl3: '',
    category: '',
    condition: '',
    status: '',
    amountOffered: 0,
    offerTitle: '',
    sold: false,
    soldPrice: 0,
    soldDiff: 0,
    soldQuantity: 0,
    soldDate: Timestamp.now(),
    soldDate2: '',
    description: '',
    storage: '',
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      'en-US',
      {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    ),
    soldDateDiff: '',
  });

  // add item function
  const addItemFunction = async () => {
    // console.log(item?.postingDate)
    if (
      item.title == '' || 
      item.price == '' || 
      item.itemImageUrl1 == '' || 
      item.itemImageUrl2 == '' || 
      item.itemImageUrl3 == '' || 
      item.category == '' || 
      item.condition == '' || 
      item.status == '' || 
      item.description == '' || 
      item.storage == '' || 
      item.postingDate == ''
    ) {
      return toast.error('All fields are required!')
    }
    
    setLoading(true);
    try {
      const itemRef = collection(fireDB, 'items');
      await addDoc(itemRef, item);
      toast.success('Item added successfully!');
      setTimeout(() => {
        navigate('/admin-dashboard');
        window.location.reload();
      }, 1000);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Add item failed');
      setLoading(false);
    }
  };


  return (
    <Layout>
      {/* loader component */}
      {loading && <Loader />}
      
      <div className="flex justify-center items-center mt-5">
        {/* add item form */}
        <div className="bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* top heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-gray-500">Add Item</h2>
          </div>

          {/* input title */}
          <div className="mb-3 flex items-center gap-2">
            <Captions className='text-gray-500' />
            <input 
              type="text" 
              name='title'value={item.title} 
              onChange={(e) => {
                setItem({
                  ...item,
                  title: e.target.value
                })
              }}
              placeholder='Item Title'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-96 rounded-md outline-none placeholder-gray-500'
            />
          </div>
          
          {/* input Price */}
          <div className="mb-3 flex items-center gap-2">
            <DollarSign className='text-gray-500' />
            <input 
              type="text" 
              name='price'
              value={item?.price} 
              onChange={(e) => {
                setItem({
                  ...item,
                  price: e.target.value
                })
              }}
              placeholder='Item Price'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-1/3 rounded-md outline-none placeholder-gray-500'
              />
            <Calendar 
              id='postingDate' 
              name='postingDate' 
              value={item?.postingDate ? item?.postingDate : null} 
              onChange={(e) => {
                setItem({
                  ...item,
                  postingDate: e.value
                })
              }}
              showTime
              hourFormat="12"
              dateFormat="mm/dd/yy"
              showButtonBar
              showIcon
            />
              

            {/* input postingDate */}
            {/* <div className="mb-3 flex items-start gap-2"> */}
            {/* {displayDate} */}
            {/* <NotebookPen className='text-gray-500 mt-1' /> */}
            
          {/* </div> */}
          </div>

          {/* input itemImageUrl1 */}
          <div className="mb-3 flex items-center gap-2">
            <Image className='text-gray-500' />
            <input 
              type="text" 
              name='itemURL1'value={item.itemImageUrl1} 
              onChange={(e) => {
                setItem({
                  ...item,
                  itemImageUrl1: e.target.value
                })
              }}
              placeholder='Item Image URL 1'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-96 rounded-md outline-none placeholder-gray-500'
            />
          </div>

          {/* input itemImageUrl2 */}
          <div className="mb-3 flex items-center gap-2">
            <Image className='text-gray-500' />
            <input 
              type="text" 
              name='itemURL1'value={item.itemImageUrl2} 
              onChange={(e) => {
                setItem({
                  ...item,
                  itemImageUrl2: e.target.value
                })
              }}
              placeholder='Item Image URL 2'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-96 rounded-md outline-none placeholder-gray-500'
            />
          </div>

          {/* input itemImageUrl3 */}
          <div className="mb-3 flex items-center gap-2">
            <Image className='text-gray-500' />
            <input 
              type="text" 
              name='itemURL1'value={item.itemImageUrl3} 
              onChange={(e) => {
                setItem({
                  ...item,
                  itemImageUrl3: e.target.value
                })
              }}
              placeholder='Item Image URL 3'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-96 rounded-md outline-none placeholder-gray-500'
            />
          </div>

          {/* input category */}
          <div className="mb-3 flex items-center gap-2">
            <List className='text-gray-500' />
            <select 
              value={item.category} 
              onChange={(e) => {
                setItem({
                  ...item,
                  category: e.target.value
                })
              }}
              name='category' 
              className="w-full px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option>Select Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option className='first-letter:uppercase' key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          {/* input condition */}
          <div className="mb-3 flex items-center gap-2">
            <List className='text-gray-500' />
            <select 
              value={item.condition} 
              onChange={(e) => {
                setItem({
                  ...item,
                  condition: e.target.value
                })
              }}
              name='condition' 
              className="w-full px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option>Select Condition</option>
              {conditionList.map((value, index) => {
                const { name } = value;
                return (
                  <option className='first-letter:uppercase' key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          {/* input status */}
          <div className="mb-3 flex items-center gap-2">
            <List className='text-gray-500' />
            <select 
              value={item.status} 
              onChange={(e) => {
                setItem({
                  ...item,
                  status: e.target.value
                })
              }}
              name='status' 
              className="w-full px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option>Select Status</option>
              {statusList.map((value, index) => {
                const { name } = value;
                return (
                  <option className='first-letter:uppercase' key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          {/* input description */}
          <div className="mb-3 flex items-start gap-2">
            <NotebookPen className='text-gray-500 mt-1' />
            <textarea 
              name='description' 
              value={item.description} 
              onChange={(e) => {
                setItem({
                  ...item,
                  description: e.target.value
                })
              }}
              placeholder='Item Description' 
              rows='5' 
              className='w-full px-2 py-1 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none placeholder-gray-500'>
            </textarea>
          </div>

          {/* input storage */}
          <div className="mb-3 flex items-center gap-2">
            <Archive className='text-gray-500' />
            <input 
              type="text" 
              name='storage'
              value={item.storage} 
              onChange={(e) => {
                setItem({
                  ...item,
                  storage: e.target.value
                })
              }}
              placeholder='Item Storage'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-96 rounded-md outline-none placeholder-gray-500'
            />
          </div>
          
          {/* input postingDate */}
          {/* <div className="mb-3 flex items-center justify-center gap-2">
            
            <Calendar 
              id='postingDate' 
              name='postingDate' 
              value={item?.postingDate} 
              onChange={(e) => {
                setItem({
                  ...item,
                  postingDate: e.target.value
                })
              }}
              showTime
              hourFormat="12"
              dateFormat="mm/dd/yy"
              showButtonBar
              showIcon
            />
          </div> */}

          


          {/* add item button */}
          <div className="mb-3">
            <button
              onClick={addItemFunction}
              type='button'
              className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md'
            >
              Add Item
            </button>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default AddItemPage