import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Dashbord from "./pages/Dashbord";
import TDetails from './pages/TDetails';
import Tasks from "./pages/Tasks";
import UsersT from './pages/UsersT';
import Sigin from './pages/Sigin';
import Sigup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import { Fragment, useRef } from 'react';
import { setOpenSidebar } from './redux/slices/authSlice';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { IoMdCloseCircleOutline } from "react-icons/io";


function App() {

  function Layout(){
    const {user}=useSelector((state)=>state.auth)
    const location = useLocation()

    return user ?(
     <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar/> 
      </div>
     <MobileSidebar />
         <div className='flex-1 overflow-y-auto'>
          <Navbar /> 
          <div>
          <Outlet className="p-4 2xl:px-10"/>
          </div>
         </div>
      
     </div>
    ):(
        <Navigate to="/sign-in" state={{from:location}} replace/>
    )
  }

  const MobileSidebar=()=>{
    const {isSidebarOpen} = useSelector((state)=>state.auth)
    const mobileMenuRef = useRef(null)
    const dispatch = useDispatch()
    const closeSidebar=()=>{
      dispatch(setOpenSidebar(false)) 
    }
    return <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref)=> (
        <div ref={(node)=>(mobileMenuRef.current=node)}
         className={clsx('md:hidden w-full h-full bg-black/40 transition-all duration-700 transform',
          isSidebarOpen? "translate-x-0" : "translate-x-full"   
        )}
        onClick={()=>closeSidebar()}
        >
          <div className='bg-white w-3/4 absolute h-full'>
            <div className='w-full flex justify-end px-5 mt-5'>
              <button
              onClick={()=>closeSidebar()}
              className='flex justify-end items-end' 
              >
                <IoMdCloseCircleOutline   size={30}/>
                </button> 
            </div>
            <div className='-mt-10'>
              <Sidebar/>

            </div>

          </div>

        </div>)}
      </Transition>
    </>
  }
  
  return (
    <div className='w-full min-h-screen bg-[#f3f4f6]'>
    <Routes>
      <Route element={<Layout />}>
      <Route index path='/' element={<Navigate to='/dashbord' />}/>
      <Route path='/dashbord' element={<Dashbord />}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path="/completed/:status" element={<Tasks/>}/>
      <Route path="/in-progress/:status" element={<Tasks/>}/>
      <Route path="/todo/:status" element={<Tasks/>}/>
      <Route path="/team" element={<UsersT />}/>
      <Route path="/task/:id" element={<TDetails />}/>
    </Route>

     <Route path='/sign-in' element={<Sigin/>}/>
     <Route path='/sign-up' element={<Sigup/>}/>
    </Routes>
    <Toaster richColors />
    </div>
  )
  
}

export default App
