
import React, { useState } from "react";

import { summary } from "../assets/data";
import { getInitials } from "../utils/utils";
import clsx from "clsx";
import { useGetTeamListQuery } from "../redux/slices/api/userSlice";





const UsersT = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);



  const {data}= useGetTeamListQuery()
 
  
const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>Nom et Pénom</th>
        <th className='py-2'>Poste</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
       
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
            <span className='text-xs md:text-sm text-center'>
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className='p-2'>{user.title}</td>
      <td className='p-2'>{user.email}</td>
      <td className='p-2'>{user.role}</td>

    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className="text-2xl font-semibold capitalize p-3">Utilisateurs</h1>
        
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full p-4'>
              <TableHeader />
              <tbody>
                {data?.map((user, index) => (
                  <TableRow key={index} user={user} />
                 
                ))}
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
    </>
  );
};

export default UsersT
