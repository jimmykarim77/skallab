import React from 'react'
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import {MdAdminPanelSettings, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp,} from "react-icons/md";
import clsx from 'clsx';
import Chart from '../component/Chart';
import ChartbyM from '../component/ChartbyM';
import { useGetDashbordStatsQuery } from '../redux/slices/api/taskSlice';
import { summary } from '../assets/data';
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from '../utils/utils';
import UserInfo from '../component/UserInfo';
import moment from "moment"
const TaskTable = ({ tasks }) => {
  const ICONS = {
    haute: <MdKeyboardDoubleArrowUp />,
   normal: <MdKeyboardArrowUp />,
    faible: <MdKeyboardArrowDown />,
  };
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Titre de tache</th>
        <th className='py-2'>Niveau</th>
        <th className='py-2'>Utilisateur</th>
        <th className='py-2 hidden md:block'>crée le</th>
      </tr>
    </thead>
  );
  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />

          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
            {ICONS[task.priority]}
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
  return (
    <>
      <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable = ({ users }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Nom et Prénom</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Create le</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};


  


const Dashbord = () => {
  const {data}=useGetDashbordStatsQuery()
  console.log(data)
  const stats = [
    {
      _id: "1",
      label: "TOTAL TACHE",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "TACHE ACHEVEE",
      total: data?.tasks.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TACHE EN COURS ",
      total: data?.tasks.inprogress || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TACHE A FAIRE",
      total: data?.tasks.todo,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];
  return (
    <div className='h-full py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 p-4 gap-4'>
      {stats.map(({label,total,icon,bg},index)=>(
       <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
          <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600 '>{label}</p>
          <span className='text-2xl font-semibold'>{total}</span>
          <span className='text-sm text-gray-400'>60 le mois dernier</span>
          </div>
          <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center text-white ',bg)}>
              {icon}
          </div>
       </div>       
      ))}
      </div>
      <div className='flex flex-col md:flex-row gap-2 p-5'>
      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Tache Achevée Par Date
        </h4>
        <Chart data={data?.graphData}/>
      </div>
      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Tache Achevée Par Mois
        </h4>
        <ChartbyM data={data?.graphDataM}/>
      </div>
      </div>
      <div className='w-full flex flex-col md:flex-row px-5 gap-2 py-8 2xl:gap-4 '>       
        <TaskTable tasks={data?.last10Task}/>
        
        <UserTable users={data?.users}/>
      </div>
    </div>
  )
}

export default Dashbord

