import axios from "axios"





export const addItemToCart=async (data)=>{
    try{
         const res=await axios.put("api/cart/add",data)
         return res.data
    }catch(err){
        console.log(err.message)
    }
}


export const removeCartItem=async (data)=>{
    try{
         const res=await axios.delete(`api/cart_items/${data}`)
         return res.data
    }catch(err){
        console.log(err.message)
    }
}



export const updateCartItem=async (data)=>{
    try{
         const res=await axios.put(`api/cart_items/${data.cartItemId}`,data.data)
         return res.data
    }catch(err){
        console.log(err.message)
    }
}



export const getCartItems=async()=>{
    try{
        const res=await axios.get(`api/cart/`)
        return res.data
   }catch(err){
       console.log(err.message)
   }
}