import React from 'react'

const Track = () => {
  return (
    <section>
        <div className='container mx-auto px-5 py-10 md:py-14'>
            {/* main */}
            <div className="flex flex-wrap -m-4 text-center">
                {/* track 1 */}
                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div className="border-2 hover:shadow-md hover:shadow-gray-200 border-gray-200 bg-antique-tin dark:bg-gray-600 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
                        <h2 className='title-font font-medium text-lg text-white'>Premium T-shirts</h2>
                        <p className="leading-relaxed text-gray-100 dark:text-white">
                            Our shirts are 100% comfy!
                        </p>
                    </div>
                </div>
                {/* track 2 */}
                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div className="border-2 hover:shadow-md hover:shadow-gray-200 border-gray-200 bg-antique-tin dark:bg-gray-600 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
                        <h2 className='title-font font-medium text-lg text-white'>Premium T-shirts</h2>
                        <p className="leading-relaxed text-gray-100 dark:text-white">
                            Our shirts are 100% comfy!
                        </p>
                    </div>
                </div>
                {/* track 3 */}
                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div className="border-2 hover:shadow-md hover:shadow-gray-200 border-gray-200 bg-antique-tin dark:bg-gray-600 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg">
                        <h2 className='title-font font-medium text-lg text-white'>Premium T-shirts</h2>
                        <p className="leading-relaxed text-gray-100 dark:text-white">
                            Our shirts are 100% comfy!
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}

export default Track