import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/myContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { fireDB } from '../../firebase/FirebaseConfig'
import Loader from '../../components/loader/Loader'
import BackButton from '../../components/buttons/BackButton'
import HorizontalRow from '../../components/horizontalRow/HorizontalRow';
import offerStatusList from './../../components/status/OfferStatusList';
import { Flex, Progress } from 'antd';

const UpdateOfferPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllOffersFunction } = context;

  // navigate
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  // item state
  const [offer, setOffer] = useState({
    offerID: '',
    offerDate: Timestamp.fromDate(new Date()),
    offerDate2: '',
    name: '',
    email: '',
    avatar: '',
    title: '',
    quantity: '',
    price: '',
    offerAmount: '',
    makeOfferInfo: [],
    offerStatus: '',
    time: '',
    key: '',  
  });

  // get single offer function
  const getSingleOfferFunction = async () => {
    setLoading(true);
    try {
      const offerTemp = await getDoc(doc(fireDB, 'offers', id));

      const offer = offerTemp.data();
      setOffer({
        offerID: offer?.offerID,
        offerDate: offer?.offerDate.toDate(),
        offerDate2: offer?.offerDate2,
        name: offer?.makeOfferInfo.name,
        email: offer?.makeOfferInfo.email,
        avatar: offer?.makeOfferInfo.avatar,
        title: offer?.title,
        quantity: offer?.quantity,
        price: offer?.price,
        offerAmount: offer?.makeOfferInfo.offerAmount,
        makeOfferInfo: offer?.makeOfferInfo,
        offerStatus: offer?.offerStatus,       
        time: offer?.time,       
        key: offer?.key,       
      });
      setLoading(false);      
    } catch (error) {
      console.log(error);
      toast.error('An error has occurred!');
      setLoading(false);
    }
  };

  const updateOffer = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, 'offers', id), offer);
      toast.success('Offer Updated successfully!');
      getAllOffersFunction();
      setLoading(false);
      navigate('/admin-dashboard');
    } catch (error) {
      console.log(error);
      toast.error('An error has occurred!');
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleOfferFunction();
  }, [])

  return (
    <Layout>
      {/* loader component */}
      {loading && <Loader />}

      <BackButton />
      <div className="w-full flex justify-center items-center mt-5">
        {/* add item form */}
        <div className="flex flex-col justify-center bg-gray-50 px-8 py-6 border border-gray-100 rounded-xl shadow-md">
          {/* top heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-gray-500">Update Offer</h2>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <div>
              <img src={offer?.avatar} alt="" />
            </div>
            <div>{offer?.name} | {offer?.email}</div>
          </div>
          <div className='text-center text-gray-500 text-xm'>
            Offer ID# {offer?.offerID}
          </div>
          <div className="mb-3 flex justify-center items-center gap-2">
            <div>Offer Date: {offer?.offerDate2}</div>
          </div>
          <div className="mb-3 flex justify-center items-center gap-2 text-2xl">
              Price: ${offer?.price} vs Offer: ${offer?.offerAmount}
          </div>
          <div className="m-3 flex justify-center items-center gap-2 p-2 bg-yellow-200">
            <div>
              This offer is ${Number(offer?.offerAmount) - Number(offer?.price)} {Number(offer?.price) > Number(offer?.offerAmount) ? "less" : "more"} or {(Number(offer?.offerAmount) / Number(offer?.price) * 100).toFixed(0)}%  of the asking price.
            </div>           
          </div>

          <div className='flex justify-center items-center'>
            <Flex gap="small" wrap>
              <Progress type="circle" percent={((Number(offer?.offerAmount) / Number(offer?.price)) * 100).toFixed(0)} />
            </Flex>
          </div>
          <HorizontalRow />
       
          <div className="mb-3 flex flex-col justify-center items-center gap-2">
            {/* input status */}
            <div>Offer Status:</div>
            {/* <List className='text-gray-500' /> */}
            <select 
              value={offer?.offerStatus} 
              onChange={(e) => {
                setOffer({
                  ...offer,
                  offerStatus: e.target.value
                })
              }}
              name='offerStatus' 
              className="mb-3 px-1 py-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none cursor-pointer">
              <option disabled>Select Status</option>
              {offerStatusList.map((value, index) => {
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
              onClick={updateOffer}
              type='button'
              className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md'
            >
              Update Offer
            </button>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default UpdateOfferPage