import axios from "axios"




export const AddReview=async(data)=>{
    try{
       const res=await axios.post('/api/ratings/create/',data)
       return res.data
    }catch(err){
        console.log(err.message)
        return err.message
    }
}

export const Review=async(productId)=>{
    try{
        const res=await axios.get(`/api/ratings/product/${productId}/`)
         return res.data
     }catch(err){
         console.log(err.message)
         return err.message
     }
}



export const RemoveRating=async(productId)=>{
    try{
        const res=await axios.delete(`/api/ratings/${productId}/`)
         return res.data
     }catch(err){
         console.log(err.message)
         return err.message
     }
}
