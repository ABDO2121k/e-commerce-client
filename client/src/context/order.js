import axios from "axios"




export const createOrder= async(data) =>{
    try{
        const res=await axios.post('/api/orders/',data.addresse)
        return res.data
    }catch(err){
        console.log(err)
    }
}


export const getOrderById= async(orderId) =>{
    try{
        const res=await axios.get(`/api/orders/${orderId}`)
        return res.data
    }catch(err){
       throw new Error(err)
    }
}


export const getOrderHistory=async ()=>{
    try{
        const res=await axios.get(`/api/orders/user/`)
        return res.data
    }catch(err){
        console.log(err)
    }
}


export const PaidOrder=async(orderId)=>{
    try{
        const res=await axios.get(`/api/orders/${orderId}/paid`)
        return res.data
    }catch(err){
        console.log(err)
    }
}