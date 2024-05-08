import { apiSlice } from "../apiSlice";

const TASKS_URL="/task"
export const taskApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      
        getDashbordStats:builder.query({
            query:()=>({
                url: `${TASKS_URL}/dashbord`,
                method:"GET",
                credentials:"include"
            })
        }),
        getAllTask:builder.query({
            query:({strQuery, isTrashed,search})=>({
                url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                method:"GET",
                credentials:"include"
            })
        }),
        createTask:builder.mutation({
            query:(data)=>({
                url: `${TASKS_URL}/create`,
                method:"POST",
                body:data,
                credentials:"include"
            })
        }),
       
        updateTask:builder.mutation({
            query:(data)=>({
                url: `${TASKS_URL}/update/${data._id}`,
                method:"PUT",
                body:{},
                credentials:"include"
            })
        }),
        trashTask:builder.mutation({
            query:({id})=>({
                url: `${TASKS_URL}/${id}`,
                method:"PUT",
                credentials:"include"
            })
        })




    })
})

export const {useGetDashbordStatsQuery,
              useGetAllTaskQuery,
              useCreateTaskMutation,
              useUpdateTaskMutation,
            useTrashTaskMutation
             }=taskApiSlice