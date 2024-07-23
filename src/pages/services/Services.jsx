import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'

const Services = () => {
    const [showToggle, setShowToggle] = useState(true);

    const handleShowToggle = () => {
        setShowToggle(!showToggle)
    };

    useEffect(() => {
        setShowToggle(false);
    },[]);


  return (
    <div>
        <section className="">
    <div className="p-5 bg-gray-50">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <div className="lg:text-center">
                <h2
                    onClick={handleShowToggle}
                    className="font-heading mb-4 bg-orange-100 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest text-black uppercase title-font cursor-pointer">
                    Why choose me?
                </h2>

                {showToggle && <>
                <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
                    I know tech, I'm selling stuff.
                </p>
                <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
                    I've held my own yard sale annually at my house for over a decade. I have fine tuned the buying process so we may have a well organized and smooth transaction.
                </p>
                </>}
            </div>

            {showToggle &&
            <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    <div className="relative">
                        <dt>
                            <div
                                className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                <img src="https://www.svgrepo.com/show/503163/api-settings.svg" />
                            </div>
                            <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Powerful API</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">
                            This web application is always enabled and updated often.
                        </dd>
                    </div>
                    <div className="relative">
                        <dt>
                            <div
                                className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                <img src="https://www.svgrepo.com/show/503138/webpack.svg" />
                            </div>
                            <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                                Easy to Request Items
                            </p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500"> Add Items to Cart, Submit Requests
                        </dd>
                    </div>
                    <div className="relative">
                        <dt>
                            <div
                                className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                <img src="https://www.svgrepo.com/show/511771/dashboard-671.svg" />

                            </div>
                            <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Low Transaction Cost
                            </p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500"> Our items are priced to save! Making an offer is always an option.
                        </dd>
                    </div>
                    <div className="relative">
                        <dt>
                            <div
                                className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                                <img src="https://www.svgrepo.com/show/76267/free-commercial-label.svg" />

                            </div>
                            <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">Powerful Dashboard
                            </p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500"> Free account & contact management
                        </dd>
                    </div>
                </dl>

                <section class="bg-white dark:bg-gray-900 mt-10">
                    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                        <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
                        <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                            <div>
                                <div class="mb-10">
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        What do you mean by "Figma assets"?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">You will have access to download the full Figma project including all of the pages, the components, responsive pages, and also the icons, illustrations, and images included in the screens.</p>
                                </div>
                                <div class="mb-10">                        
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        What does "lifetime access" exactly mean?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">Once you have purchased either the design, code, or both packages, you will have access to all of the future updates based on the roadmap, free of charge.</p>
                                </div>
                                <div class="mb-10">
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        How does support work?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">We're aware of the importance of well qualified support, that is why we decided that support will only be provided by the authors that actually worked on this project.</p>
                                    <p class="text-gray-500 dark:text-gray-400">Feel free to <a href="#" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline" target="_blank" rel="noreferrer">contact us</a> and we'll help you out as soon as we can.</p>
                                </div>
                                <div class="mb-10">
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        I want to build more than one project. Is that allowed?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">You can use Windster for an unlimited amount of projects, whether it's a personal website, a SaaS app, or a website for a client. As long as you don't build a product that will directly compete with Windster either as a UI kit, theme, or template, it's fine.</p>
                                    <p class="text-gray-500 dark:text-gray-400">Find out more information by <a href="#" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">reading the license</a>.</p>
                                </div>
                            </div>
                            <div>
                                <div class="mb-10">
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        What does "free updates" include?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">The free updates that will be provided is based on the <a href="#" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">roadmap</a> that we have laid out for this project. It is also possible that we will provide extra updates outside of the roadmap as well.</p>
                                </div>
                                <div class="mb-10">
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        What does the free version include?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">The <a href="#" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">free version</a> of Windster includes a minimal style guidelines, component variants, and a dashboard page with the mobile version alongside it.</p>
                                    <p class="text-gray-500 dark:text-gray-400">You can use this version for any purposes, because it is open-source under the MIT license.</p>
                                </div>
                                <div class="mb-10">
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        What is the difference between Windster and Tailwind UI?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">Although both Windster and Tailwind UI are built for integration with Tailwind CSS, the main difference is in the design, the pages, the extra components and UI elements that Windster includes.</p>
                                    <p class="text-gray-500 dark:text-gray-400">Additionally, Windster is a project that is still in development, and later it will include both the application, marketing, and e-commerce UI interfaces.</p>
                                </div>
                                <div class="mb-10">
                                    <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                                        Can I use Windster in open-source projects?
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-400">Generally, it is accepted to use Windster in open-source projects, as long as it is not a UI library, a theme, a template, a page-builder that would be considered as an alternative to Windster itself.</p>
                                    <p class="text-gray-500 dark:text-gray-400">With that being said, feel free to use this design kit for your open-source projects.</p>
                                    <p class="text-gray-500 dark:text-gray-400">Find out more information by <a href="#" class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">reading the license</a>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            }

        </div>
    </div>
</section>
    </div>
  )
}

export default Services