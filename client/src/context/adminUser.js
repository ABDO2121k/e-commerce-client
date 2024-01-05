import axios from "axios"

export const GetAllUsers=async()=>{
    try{
       const res=await axios.get("/api/users/allUsers")
       return res.data
    }catch(err){
        console.log(err)
        return err
    }
}