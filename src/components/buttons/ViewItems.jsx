import React from 'react'
import { Link } from 'react-router-dom'

const ViewItems = () => {
    return (
        <div>
            <Link to={'/all-items'}>
                <button className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-woods-taupe hover:bg-woods-rust px-6 font-medium tracking-wide text-white shadow-md transition focus:outline-none md:mr-4 md:mb-0 md:w-auto font4">
                    View Items
                </button>
            </Link>
        </div>
    )
}

export default ViewItems