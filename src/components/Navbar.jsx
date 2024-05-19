import React from 'react'
import {appleImg, bagImg, searchImg } from '../utils'


import {navLists} from '../constants'

const Navbar = () => {
  return (
   <header className='flex justify-between items-center py-5 px-5 sm:px-10 w-full'>
    <nav className=' flex w-full screen-max-width '>
        <img src={appleImg} height={18} width={14} alt="appleImg" />
   

    <div className=' flex flex-1 justify-center max-sm:hidden'>
     {navLists.map((nav)=>(
                <div key={nav} className='px-5 text-sm text-gray transition-all hover:text-white' >
                    {nav}
                </div>
            ))}
    </div>

    <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
        <img height={18} width={14} src={searchImg} alt={searchImg} />
        <img height={18} width={14} src={bagImg} alt={bagImg} />

    </div>

    <div className='flex items-baseline gap-7'>
        
    </div>
    </nav>
   </header>
  )
}

export default Navbar