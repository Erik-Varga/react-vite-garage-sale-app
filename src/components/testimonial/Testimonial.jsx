import React from 'react'

const Testimonial = () => {
  return (
    <div>
        <section className="text-gray-600 body-font mb-10">
            {/* main */}
            <div className="container px-5 py-10 mx-auto">
                {/* heading */}
                <h1 className="text-center text-3xl font-bold text-black">
                    Testimonial
                </h1>
                {/* paragraph */}
                <h2 className='text-center text-2xl font-semibold mb-10'>
                    What our <span className='text-gray-500'>customers</span> are saying!
                </h2>

                <div className="flex flex-wrap -m-4">
                    {/* testimonial 1 */}
                    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                        <div className="h-full text-center">
                            <img className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="testimonial" />
                            <p className="leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae quam ratione fugiat in pariatur laudantium repellendus! Doloremque dolores voluptate quam aperiam explicabo et alias officia in veritatis molestiae, dolore sint!</p>
                            <span className="inline-block h-1 w-10 rounded bg-gray-400 mt-6 mb-4" />
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Jill Doe</h2>
                            <p className="text-gray-500">Happy Customer</p>
                        </div>
                    </div>
                    {/* testimonial 2 */}
                    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                        <div className="h-full text-center">
                            <img className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2' src="https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="testimonial" />
                            <p className="leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae quam ratione fugiat in pariatur laudantium repellendus! Doloremque dolores voluptate quam aperiam explicabo et alias officia in veritatis molestiae, dolore sint!</p>
                            <span className="inline-block h-1 w-10 rounded bg-gray-400 mt-6 mb-4" />
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Jon Doe</h2>
                            <p className="text-gray-500">Happy Customer</p>
                        </div>
                    </div>
                    {/* testimonial 3 */}
                    <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                        <div className="h-full text-center">
                            <img className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2' src="https://images.unsplash.com/photo-1588466585717-f8041aec7875?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD" alt="testimonial" />
                            <p className="leading-relaxed">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae quam ratione fugiat in pariatur laudantium repellendus! Doloremque dolores voluptate quam aperiam explicabo et alias officia in veritatis molestiae, dolore sint!</p>
                            <span className="inline-block h-1 w-10 rounded bg-gray-400 mt-6 mb-4" />
                            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Joe Joe</h2>
                            <p className="text-gray-500">Happy Customer</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Testimonial