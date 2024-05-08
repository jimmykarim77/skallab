import React from 'react'
import { TiThMenu } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSidebar } from '../redux/slices/authSlice';
import UserAvatar from './UserAvatar';



const Navbar = () => {
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  return (
    <div className='bg-white flex justify-between items-center px-4 py-3 2xl:py-4 sticky z-10 top-0'>
     <div className='flex gap-4'>
      <button onClick={()=>dispatch(setOpenSidebar(true))}
      className='text-2xl text-gray-500 block md:hidden'> 
      <TiThMenu/></button>

      <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
      <BiSearchAlt  className='text-gray-500 text-xl'/>
      <input type="text"
       placeholder='Recherche....'
       className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
      />
      </div>
     </div>
    <div className=''>
     <UserAvatar/>
    </div>

    </div>
  )
}

export default Navbar
