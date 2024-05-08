import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../redux/slices/api/taskSlice";
import { toast } from "sonner";
import { dateFormatter } from "../../utils/utils";


const LISTS = ["todo", "inprogress", "completed"];
const PRIORIRY = ["haute", "normal", "faible"];



const AddTask = ({ open, setOpen,task }) => {

  const defaultValues={
    title:task?.title || "",
    date: dateFormatter(task?.date || new Date()),
    team:[],
    stage:"",
    priority:""
  }

  const {register,handleSubmit,formState: { errors }} = useForm({defaultValues});

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority || PRIORIRY[2]);
  
  const [createTask]=useCreateTaskMutation();
  const [updateTask]=useUpdateTaskMutation();
  
  const submitHandler = async(data) => {
   
    try {
        const newData={
            ...data, 
           
            team,
            stage,
            priority,
           
           
        }
       
        const res = task?.id 
        ? await updateTask({...newData,_id:task._id}).unwrap()
        
         :await createTask(newData).unwrap()
        toast.success(res.message)
        setTimeout(() => {
            setOpen(false)
            window.location.reload()
        }, 500);

    } catch (err) {
        console.log(err)
        toast.error(err?.data?.message || err.error)
        
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "modifier tache" : "ajouter tache"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Titre de la Tache'
              type='text'
              name="title"
              label='title'
              className='w-full rounded'
              register={register('title', { required: "title is require" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label='Priorité'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Date de La tache'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Date est require!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Niveau'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              
            </div>

            <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
                <button className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                > Ajouter</button>
              <button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
               
              >Annuler</button>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;