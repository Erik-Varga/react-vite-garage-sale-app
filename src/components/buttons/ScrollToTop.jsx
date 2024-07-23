import React from 'react'
import { useEffect, useState } from 'react'
import { BiArrowFromBottom } from 'react-icons/bi'
import { MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md'


const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
      }

  const toggleVisibility = () => {
    if (window.scrollY > 300 || window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-5 right-2 z-100">
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          isVisible ? 'opacity-100' : 'opacity-0',
          'relative flex items-center gap-2 my-2 ml-2 bg-gray-100 hover:bg-gray-200 py-2 px-3 rounded-sm font4 text-sm z-50',
        )}
      >
        <MdOutlineKeyboardDoubleArrowUp size={25} />
      </button>
    </div>
  )
}

export default ScrollToTop