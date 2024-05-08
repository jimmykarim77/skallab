import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Textbox from '../component/Textbox'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../redux/slices/api/authSlice'
import { setCredentials } from '../redux/slices/authSlice'
import { toast } from 'sonner'

 


const Sigup = () => {
    const {user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const {register, handleSubmit,formState:{errors},} = useForm()
    const navigate =  useNavigate();

 const [newRegister] = useRegisterMutation()
 
  const submithandler=async(data)=>{
    console.log(data)
    try {
      const result = await newRegister(data).unwrap()
      dispatch(setCredentials(result))
      toast.success("enregistrement en success")

    } catch (error) {
      toast.error(error?.data?.message || error.message)
     
    }
   
  }


  useEffect(()=>{
   user && navigate("/dashbord");
  },[user])


  return (
      
   <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row  bg-[#f3f4f6]'>
  <div className=" w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
     
     {/** left side */}
    <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
      <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center
      gap-5 md:gap-y-10 2xl:-mt-20'>
        <span className='flex gap-1 border rounded-full py-1 px-3  text-sm md:text-base
         border-gray-300 text-gray-600 '>manager les Task de tout les employer</span>
         <p className='flex flex-col justify-center gap-0 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
          <span>meilleure collaboration</span>
          <span>partager des idées</span>
         </p>
      </div>
      
        
    </div>

      {/** right side */}

    <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>

      <form onSubmit={handleSubmit(submithandler)} className='form-container w-full md:w-[400px]
       flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
        <div className=''>
          <p className='text-blue-600 text-3xl font-bold text-center'>Bienvenue! </p>
          <p className='text-center text-gray-700 text-base'> Enregistrer Vous</p>
        </div>
        <div className='flex flex-col gap-y-5'>

        <Textbox 
          placeholder="Nom et Prenom"
          type="text"
          name="name"
          label="Nom et prénom"
          className="w-full rounded-full"
          register={register("name",{
            required:"nom et prenom sont obligatoire!!"
          })}
          error={errors.name? errors.name.message:""}
          >
          </Textbox>
          <Textbox 
          placeholder="Poste occupé"
          type="text"
          name="poste"
          label="Poste occupé"
          className="w-full rounded-full"
          register={register("title",{
            required:"le champs poste est obligatoire!!"
          })}
          error={errors.poste? errors.poste.message:""}
          >
          </Textbox>
          <Textbox 
          placeholder="admin ou user"
          type="text"
          name="role"
          label="role"
          className="w-full rounded-full"
          register={register("role",{
            required:"le champs role est obligatoire!!"
          })}
          error={errors.role? errors.role.message:""}
          >
          </Textbox>
         <Textbox 
          placeholder="karim@email.com"
          type="email"
          name="email"
          label="Email"
          className="w-full rounded-full"
          register={register("email",{
            required:"l'adresse email et obligatoire!!"
          })}
          error={errors.email? errors.email.message:""}
          >
          </Textbox>


          <Textbox 
          placeholder="Mot de passe"
          type="password"
          name="password"
          label="mot de passe"
          className="w-full rounded-full"
          register={register("password",{
            required:"password obligatoire!!"
          })}
          error={errors.email? errors.email.message:""}
          >

          </Textbox>
       
         <button className='bg-blue-600 rounded-xl p-3 text-white'>CONNEXION</button>
         <div className='flex gap-2 text-sm '>
         <span> Vous avez un Compte deja</span>
         <Link to={"/sign-in"}>
         <p className='text-blue-600  cursor-pointer hover:underline'>Login</p>
         </Link>
         </div>
         
        </div>

      </form>
    </div>
  </div>
  </div>
  )
 
}

export default Sigup
