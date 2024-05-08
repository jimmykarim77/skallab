import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../component/Loading'
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { Tab } from '@headlessui/react'
import clsx from 'clsx';
import { MdAdd } from "react-icons/md";
import BoardView from '../component/BoardView';

import Table from '../component/task/Table';
import { useGetAllTaskQuery } from '../redux/slices/api/taskSlice';
import AddTask from '../component/task/AddTask';

const choixs=[
  {title:"Vue tableau", icon:<MdGridView/>},
  {title:"Vue Liste", icon:<FaList/>}
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tasks = () => {
  const params = useParams()
  const [selected, setSelected] = useState(0)
  const [open, setOpen]=useState(false)


  const status = params?.status || ""
  const {data, isLoading} = useGetAllTaskQuery({
    strQuery: status, isTrashed:"", search:""
  })
  return (
  
    isLoading ? (
    <div className='py-10 text-center '>
      <Loading/>
    </div>
    ):(
      
    <div className='w-full'>
        <div className='flex items-center justify-between m-4'>
           <h2 className='text-2xl font-semibold capitalize'>
            {status? `${status} Tasks`:"Taches"}
           </h2>
           {
            !status && <button  onClick={() => setOpen(true)}
                        className='flex flex-row-reverse items-center bg-blue-600 rounded-md text-white gap-1 py-2 px-2 2xl:py-3'> 
                        <span> Ajouter</span>
                       <IoMdAddCircleOutline className='text-lg' />
                       </button>
           }
        </div>
       
        <div className='w-full px-1 sm:px-0'>
          <Tab.Group>
            <Tab.List className="flex space-x-6 rounded-xl p-1 ml-2">
              {
              choixs.map((tab,index)=>(
               <Tab key={index + tab.title}
                onClick={()=>setSelected(index)}
                className={({selected})=>
                  classNames(clsx(
                    "w-fit flex  items-center outline-none gap-2 px-3 py-2.5 text-base  font-medium leading-5 bg-white",
                  selected? "text-blue-700 border-b-2 border-blue-800": "text-gray-800 hover:text-blue-800")
                    
                  )
                }
                >
                 <span>{tab.icon}</span> 
                  <span> {tab.title}</span>
               </Tab>
                
              ))
              }
            </Tab.List>
            <Tab.Panel className="w-full  p-2">
              {!status && (
                <div className='gap-4 py-4'>
                <div className='flex flex-col gap-3 rounded-lg md:flex-row items-center justify-between   md:h-12 px-1  md:px-4  '>
              
                <div className='flex items-center justify-between bg-white w-full px-2.5 py-2'>
                <h1 className='bg-blue-600 rounded-full w-5 h-5'></h1>
                <span>A-Faire</span>
                <MdAdd />
                </div>
                <div className='flex items-center justify-between bg-white w-full px-2.5 py-2'>
                <h1 className='bg-yellow-600 rounded-full w-5 h-5'></h1>
                <span>En cours</span>
                <MdAdd />
                </div>
                 <div className='flex items-center justify-between bg-white w-full px-2.5 py-2'>
                <h1 className='bg-green-600 rounded-full w-5 h-5'></h1>
                <span>Achevée</span>
                <MdAdd />
                </div>
                </div>
    
                </div>
              )}

              {
                selected !== 1 ? (
                <BoardView tasks={data?.tasks}/>
              ):(
              <Table tasks={tasks} />
              )
              }
          
            </Tab.Panel>
          </Tab.Group>
          
        </div>
        <AddTask open={open} setOpen={setOpen} />
    </div>
    
   
    
  )
  )
}

export default Tasks
