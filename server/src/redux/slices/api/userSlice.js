import { apiSlice } from "../apiSlice";

const USER_URL="/user"
export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
      
        getTeamList:builder.query({
            query:()=>({
                url: `${USER_URL}/get-team`,
                method:"GET",
                credentials:"include"
            })
        })


    })
})

export const {useGetTeamListQuery}=userApiSlice