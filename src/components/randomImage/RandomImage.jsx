import React, { useEffect, useState } from 'react'
import './RandomImage.css';

import image1 from '../../assets/garage-sale-sign1.jpg';
import image2 from '../../assets/garage-sale-sign2.jpg';
import image3 from '../../assets/garage-sale-sign3.jpg';
import image4 from '../../assets/garage-sale-sign4.jpg';
import image5 from '../../assets/garage-sale-sign5.jpg';
import image6 from '../../assets/garage-sale-sign6.jpg';
// import image4 from '../../assets/garage-sale-bags1.jpg';

const image7 = 'https://images.unsplash.com/photo-1518050227004-c4cb7104d79a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const images = [image1, image2, image3, image4, image5, image6, image7];

const RandomImage = () => {
    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex]
      }
      
      const RandomImage = ({ images }) => {
        const randomImage = getRandomElement(images);
      
        return (
            <div className='border-slate-500 border-2 rounded-md shadow-md'>
                <img src={randomImage} alt="" className='' />
            </div>
        )
      };
      
      const RandomQuote = ({ quotes }) => {
        const randomQuote = getRandomElement(quotes);
      
        return <blockquote className='mt-5 font2 shadow-md p-2 bg-yellow-100'>
          {randomQuote}
          </blockquote>
      };

      // Example usage:
      const quotes = [
        "Gigantic Garage Sale: Don't Miss Out!",
        "Epic Yard Sale: Treasures Await!",
        "Monster Sale: Everything Must Go!",
        "Unbelievable Bargains at Our Garage Sale!",
        "Hurry! Early bird gets the best deals!",
        "Don't wait! These deals won't last long.",
        "Lots and Lots and Lots of Stuff!",
        "Be on the lookout for HUGE SALES!"
      ];


      

  return (
    <div className='container'>
        <div className="content flex flex-col items-center justify-center">
            <RandomImage images={images} />
            <RandomQuote quotes={quotes} />
        </div>
        {/* <div className="imageFade">

        </div> */}
        
    </div>
  )
}

export default RandomImage