'mport { MoveRight } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const AddToCartButton = () => {
    const navigate = useNavigate();

    const logoutNavbar = () => {
        localStorage.clear('users');
        // toast.success('Logout successful');
        navigate('/');
      };

    return (
        <div>
            <Link to={'/login'}>
                <button className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-outline hover:bg-woods-rust text-black hover:text-white px-6 font-medium tracking-wide shadow-md transition focus:outline-none md:mr-4 md:mb-0 md:w-auto font4" onClick={logoutNavbar}>
                    Add To Cart
                </button>
            </Link>
        </div>
    )
}

export default AddToCartButton