import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

const MyState = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    // items
    const [getAllItems, setGetAllItems] = useState([]);
    
    const getAllItemsFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, 'items'),
                orderBy('time'),
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let itemArray = [];
                QuerySnapshot.forEach((doc) => {
                    itemArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllItems(itemArray);
                setLoading(false);
            })
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // items
    const [getAllAvailableItems, setGetAllAvailableItems] = useState([]);
    const getAllAvailableItemsFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, 'items'),
                where("status", "==", "For Sale"),
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let availableItemArray = [];
                QuerySnapshot.forEach((doc) => {
                    availableItemArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllAvailableItems(availableItemArray);
                setLoading(false);
            })
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // orders
    const [getAllOrders, setGetAllOrders] = useState([]);
    const getAllOrdersFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, 'orders'),
                orderBy('time'),
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrders(orderArray);
                setLoading(false);
            })
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // delete order function
    const deleteOrder = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'orders', id));
            toast.success('Order deleted successfully');
            getAllOrdersFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('An error has occurred');
        }
    };

    // sold items
    // orders
    const [getAllSoldItems, setGetAllSoldItems] = useState([]);

    const getAllSoldItemsFunction = async () => {
        setLoading(true);
        try {
            const soldItemsRef = collection(fireDB, 'items');
            const q = query(
                soldItemsRef,
                where("status", "==", "Sold"),
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let soldArray = [];
                QuerySnapshot.forEach((doc) => {
                    soldArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllSoldItems(soldArray);
                setLoading(false);
            })
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // users
    const [getAllUsers, setGetAllUsers] = useState([]);
    const getAllUsersFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, 'user'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUsers(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // delete user function
    const deleteUser = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'user', id));
            toast.success('Order deleted successfully');
            getAllUsersFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('An error has occurred');
        }
    };

    // offers
    const [getAllOffers, setGetAllOffers] = useState([]);
    const getAllOffersFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, 'offers'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let offerArray = [];
                QuerySnapshot.forEach((doc) => {
                    offerArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOffers(offerArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // delete offer function
    const deleteOffer = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'offers', id));
            toast.success('Offer deleted successfully');
            getAllOffersFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('An error has occurred');
        }
    };



    useEffect(() => {
        getAllItemsFunction();
        getAllAvailableItemsFunction();
        getAllOrdersFunction();
        getAllUsersFunction();
        getAllOffersFunction();
        getAllSoldItemsFunction();
    }, []);

    return (
        <MyContext.Provider 
            value={{ 
                loading, setLoading, 
                searchKey, setSearchKey, 
                getAllItems, getAllItemsFunction, 
                getAllAvailableItems, getAllAvailableItemsFunction, 
                getAllOffers, getAllOffersFunction, deleteOffer,
                getAllOrders, getAllOrdersFunction, deleteOrder, 
                getAllSoldItems, getAllSoldItemsFunction, 
                getAllUsers, getAllUsersFunction, deleteUser }}
            >
            {children}
        </MyContext.Provider>
    )
};

export default MyState;