import React, { useContext, useState } from "react";
import '../Base.css'
import './Register.css'

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig";

import Layout from "../layout/Layout";
import { Timestamp, addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";

import HomeOnlyButton from './../buttons/HomeOnlyButton';
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import Img1 from '../../assets/userImage.svg'
import HorizontalRow from "../horizontalRow/HorizontalRow";
import GoogleButton from "react-google-button";

const Register = ({ setUserState }) => {
    // context
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('user');

    const dbRef = collection(fireDB, "user")

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState({
        displayName: "",
        email: "",
        password: "",
        cpassword: "",
        role: 'user',
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const validateForm = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be at least 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password must not exceed 10 characters";
        }
        if (!values.cpassword) {
            errors.cpassword = "Confirmation of password is required";
        } else if (values.cpassword !== values.password) {
            errors.cpassword = "Passwords do not match";
        }
        return errors;
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        
        const errors = validateForm(user);

        await Promise.all([
            setFormErrors(errors),
            setIsSubmit(true),
            setIsLoading(true)
        ]);
        
        if (Object.keys(errors).length === 0 && isSubmit) {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    user.email,
                    user.password
                );
                
                await setUserState(userCredential.user);
                
                addDoc(collection(fireDB, "user"), {
                    uid: userCredential.user.uid,
                    name: user.displayName,
                    email: user.email,
                    password: "",
                    avatar: Img1,
                    authProvider: "google",
                    role: "user",
                    loginType: "email",
                    createdAt: serverTimestamp(),
                    lastLoginAt: serverTimestamp(),
                    ordersData: [],
                    offersData: [],
                    time: Timestamp.now(),
                    date: new Date().toLocaleString(
                        'en-US',
                        {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                        }
                    ),
                });

                setIsLoading(false);

                try {
                    const q = query(
                        collection(fireDB, 'user'),
                        where('uid', '==', userCredential?.user?.uid)
                    );

                    const data = onSnapshot(q, (QuerySnapshot) => {
                        let user;
                        QuerySnapshot.forEach((doc) => user = doc.data());
                        localStorage.setItem('users', JSON.stringify(user));

                        toast.success('Registration successful');
                        setLoading(false);
                        if (user.role === 'user') {
                            navigate('/');
                        } else {
                            navigate('/');
                        }
                    })
                    return () => data;
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }

                setUser({
                    displayName: "",
                    email: "",
                    password: "",
                    cpassword: "",
                });

                navigate('/all-items', { replace: true });
            } catch (error) {
                console.error(error);
                setFormErrors(prev => ({ ...prev, firebase: error.message }));
                setIsLoading(false);
            }
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className='register'>
                <form onSubmit={signupHandler}>
                    <h1 className="font-bold">Create your account</h1>
                    <span className="mt-2 text-sm text-blue-400">using Email & Password</span>
                    <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        placeholder="Full Name"
                        onChange={changeHandler}
                        value={user.displayName}
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={changeHandler}
                        value={user.email}
                    />
                    <p className='error'>{formErrors.email}</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={changeHandler}
                        value={user.password}
                    />
                    <p className='error'>{formErrors.password}</p>
                    <input
                        type="password"
                        name="cpassword"
                        id="cpassword"
                        placeholder="Confirm Password"
                        onChange={changeHandler}
                        value={user.cpassword}
                    />
                    <p className='error'>{formErrors.cpassword}</p>
                    {formErrors.firebase && <p className='error'>{formErrors.firebase}</p>}

                    {isLoading && (
                        <div className="animate-spin">
                            <CgSpinner size={40} />
                        </div>
                    )}

                    <button type="submit" className='button_common'>
                        Register
                    </button>
                </form>

                <HorizontalRow />
                <span className="-mt-2">OR</span> 
                <span className="text-sm text-blue-400 py-2">using Google</span>
                <GoogleButton className='google-button' onClick={() => navigate('/login')} />

                <div className="mt-5">
                    <NavLink to="/login">Already registered? <span className="font-bold text-gray-700 hover:text-black">Login</span></NavLink>
                </div>
                <HomeOnlyButton />
            </div>
        </Layout>
    );

}
export default Register;
