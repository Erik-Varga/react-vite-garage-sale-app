import { MoveRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const RegisterButton = () => {
    return (
        <div>
            <Link to={'/register'}>
                <button className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-outline hover:bg-bitter-chocolate text-black hover:text-white px-6 font-medium tracking-wide shadow-md transition focus:outline-none md:mr-4 md:mb-0 md:w-auto font4">
                    Register
                </button>
            </Link>
        </div>
    )
}

export default RegisterButton