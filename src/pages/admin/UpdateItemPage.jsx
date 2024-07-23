import React, { useContext, useEffect, useState } from 'react'
import categoryList from '../../components/category/CategoryList'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/myContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { fireDB } from '../../firebase/FirebaseConfig'
import Loader from '../../components/loader/Loader'
import { Archive, ArrowDown, ArrowUp, Captions, DollarSign, Hash, Image, List, NotebookPen, PencilLine } from 'lucide-react';
import conditionList from '../../components/condition/ConditionList'
import { Calendar } from 'primereact/calendar';
import statusList from '../../components/status/StatusList'
import BackButton from '../../components/buttons/BackButton'
import moment from 'moment'

const UpdateItemPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllItemsFunction } = context;

  // navigate
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  // item state
  const [item, setItem] = useState({
    itemID: '',
    title: '',
    price: 0,
    postingDate: Timestamp.fromDate(new Date()),
    postingDate2: '',
    postingDate3: '',
    itemImageUrl1: '',
    itemImageUrl2: '',
    itemImageUrl3: '',
    category: '',
    condition: '',
    status: '',
    offerTitle: '',
    sold: '',
    soldPrice: 0,
    soldDiff: 0,
    soldQuantity: '',
    soldDate: Timestamp.fromDate(new Date()),
    soldDate2: '',
    soldDate3: '',
    description: '',
    storage: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      'en-US',
      {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }
    ),
    soldDateDiff: 0,
  });

  // get single item function
  const getSingleItemFunction = async () => {
    setLoading(true);
    try {
      const itemTemp = await getDoc(doc(fireDB, 'items', id));
      // console.log(item.data());

      const item = itemTemp.data();
      setItem({
        itemID: item?.itemID,
        title: item?.title,
        price: item?.price,
        postingDate: item?.postingDate.toDate(),
        postingDate2: new Date(item?.postingDate.seconds * 1000).toLocaleString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit'
          }
        ),
        postingDate3: new Date(item?.postingDate2).getTime(),
        itemImageUrl1: item?.itemImageUrl1,
        itemImageUrl2: item?.itemImageUrl2,
        itemImageUrl3: item?.itemImageUrl3,
        category: item?.category,
        condition: item?.condition,
        status: item?.status,
        sold: item?.sold,
        soldPrice: item?.soldPrice,
        soldDiff: (Number(item?.soldPrice) - Number(item?.price)),
        soldQuantity: item?.soldQuantity,
        soldDate: item?.soldDate.toDate(),
        soldDate2: new Date(item?.soldDate.seconds * 1000).toLocaleString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit'
          }
        ),
        soldDate3: new Date(item?.soldDate2).getTime(),
        description: item?.description,
        storage: item?.storage,
        quantity: item?.quantity,
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
        soldDateDiff: (Number(item?.soldDate3) - Number(item?.postingDate3)),
      });
      setLoading(false);
      // console.log(item?.postingDate)
      console.log(item?.soldDate)

      
    } catch (error) {
      console.log(error);
      toast.error('An error has occurred!');
      setLoading(false);
    }
  };

  const updateItem = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, 'items', id), item);
      toast.success('Item Updated successfully!');
      getAllItemsFunction();
      setLoading(false);
      navigate('/admin-dashboard');
    } catch (error) {
      console.log(error);
      toast.error('An error has occurred!');
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleItemFunction();
  }, [])

  return (
    <Layout>
      {/* loader component */}
      {loading && <Loader />}

      <BackButton />
      <div className="flex justify-center items-center mt-5">
        {/* add item form */}
        <div className="bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* top heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-gray-500">Update Item</h2>
          </div>
          <div className='flex justify-center gap-2 mb-5'>
            <img className='h-40 w-40 object-cover object-center' src={item?.itemImageUrl1} alt={item?.name} />
            <img className='h-40 w-40 object-cover object-center' src={item?.itemImageUrl2} alt={item?.name} />
            <img className='h-40 w-40 object-cover object-center' src={item?.itemImageUrl3} alt={item?.name} />
          </div>

          <div className='text-gray-500 text-xm'>
            ID# {item?.itemID}
          </div>

          {/* input title */}
          <div className="mb-3 flex items-center gap-2">
            <Captions className='text-gray-500' />
            <input 
              type="text" 
              name='title'
              value={item?.title} 
              onChange={(e) => {
                setItem({
                  ...item,
                  title: e.target.value
                })
              }}
              placeholder='Item Title'
              className='bg-gray-50 font-bold text-gray-900 border border-gray-200 p-2 w-full rounded-md outline-none placeholder-gray-500'
            />
          </div>
          
          {/* input price */}
          {/* <div className="mb-3 flex items-center gap-2">
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
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-96 rounded-md outline-none placeholder-gray-500'
            />
          </div> */}

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
              name='itemURL1'
              value={item?.itemImageUrl1} 
              onChange={(e) => {
                setItem({
                  ...item,
                  itemImageUrl1: e.target.value
                })
              }}
              placeholder='Item Image URL 1'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-full rounded-md outline-none placeholder-gray-500'
            />
          </div>

          {/* input itemImageUrl2 */}
          <div className="mb-3 flex items-center gap-2">
            <Image className='text-gray-500' />
            <input 
              type="text" 
              name='itemURL2'
              value={item?.itemImageUrl2} 
              onChange={(e) => {
                setItem({
                  ...item,
                  itemImageUrl2: e.target.value
                })
              }}
              placeholder='Item Image URL 2'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-full rounded-md outline-none placeholder-gray-500'
            />
          </div>

          {/* input itemImageUrl3 */}
          <div className="mb-3 flex items-center gap-2">
            <Image className='text-gray-500' />
            <input 
              type="text" 
              name='itemURL3'
              value={item?.itemImageUrl3} 
              onChange={(e) => {
                setItem({
                  ...item,
                  itemImageUrl3: e.target.value
                })
              }}
              placeholder='Item Image URL 3'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-full rounded-md outline-none placeholder-gray-500'
            />
          </div>

          {/* input category */}
          <div className="mb-3 flex items-center gap-2">
            <div className='w-1/2'>Category:</div>
            {/* <List className='text-gray-500' /> */}
            <select 
              value={item?.category} 
              onChange={(e) => {
                setItem({
                  ...item,
                  category: e.target.value
                })
              }}
              name='category' 
              className="w-1/2 px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option disabled>Select Item Category</option>
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
            <div className='w-1/2'>Condition:</div>
            {/* <List className='text-gray-500' /> */}
            <select 
              value={item?.condition} 
              onChange={(e) => {
                setItem({
                  ...item,
                  condition: e.target.value
                })
              }}
              name='condition' 
              className="w-1/2 px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option disabled>Select Condition</option>
              {conditionList.map((value, index) => {
                const { name } = value;
                return (
                  <option className='first-letter:uppercase' key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          <div className="mb-3 flex items-center gap-2">
            {/* input status */}
            <div className='w-1/2'>Status:</div>
            {/* <List className='text-gray-500' /> */}
            <select 
              value={item?.status} 
              onChange={(e) => {
                setItem({
                  ...item,
                  status: e.target.value
                })
              }}
              name='status' 
              className="w-1/2 px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option disabled>Select Status</option>
              {statusList.map((value, index) => {
                const { name } = value;
                return (
                  <option className='first-letter:uppercase' key={index} value={name}>{name}</option>
                )
              })}
            </select>
          </div>

          {/* input soldPrice */}
          <div className="mb-3 flex items-center gap-2">
            {item?.status === "Sold" ? 
            <>
            <DollarSign className='text-gray-500' />
            <input 
              type="text" 
              name='soldPrice'
              value={item?.soldPrice} 
              onChange={(e) => {
                setItem({
                  ...item,
                  soldPrice: e.target.value
                })
              }}
              placeholder='Item Sold Price'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-1/4 rounded-md outline-none placeholder-gray-500'
              />
                            
              <div>#</div>
            <input 
              type="text" 
              name='soldQuantity'
              value={item?.soldQuantity} 
              onChange={(e) => {
                setItem({
                  ...item,
                  soldQuantity: e.target.value
                })
              }}
              placeholder='Quantity Sold'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-1/4 rounded-md outline-none placeholder-gray-500'
              />
              
            

            <Calendar 
              id='soldDate' 
              name='soldDate' 
              value={item?.soldDate ? item?.soldDate : null} 
              onChange={(e) => {
                setItem({
                  ...item,
                  soldDate: e.value
                })
              }}
              showTime
              hourFormat="12"
              dateFormat="mm/dd/yy"
              showButtonBar
              showIcon
            />
              </> : <></>}
          </div>

          <div className="my-4 flex items-start gap-2 text-gray-500">
            {Number(item?.soldPrice) < Number(item?.price) ? <ArrowDown /> : <ArrowUp />}
            {Number((Number(item?.soldPrice) / Number(item?.price) * 100)).toFixed(0)}%
            {/* {Number(item?.soldPrice) === 0 ? `` : `| ${item?.soldDiff}`} */}
            {/* ${item?.soldDiff} */}
          </div>

          {/* input description */}
          <div className="mb-3 flex items-start gap-2">
            <PencilLine className='text-gray-500 mt-1' />
            <textarea 
              name='description' 
              value={item?.description} 
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

          {/* input quantity */}
          {/* <div className="mb-3 flex items-center gap-2">
            <Hash className='text-gray-500' />
            <input 
              type="text" 
              name='quantity'
              value={item?.quantity} 
              onChange={(e) => {
                setItem({
                  ...item,
                  quantity: e.target.value
                })
              }}
              placeholder='Item Quantity'
              className='bg-gray-50 text-gray-900 border border-gray-200 p-2 w-96 rounded-md outline-none placeholder-gray-500'
            />
          </div> */}

          {/* update item button */}
          <div className="mb-3">
            <button
              onClick={updateItem}
              type='button'
              className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md'
            >
              Update Item
            </button>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default UpdateItemPage