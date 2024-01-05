import axios from "axios"



export const getAllOrder=async(pageNumber,pageSize)=>{
    try{
        const res=await  axios.get(`/api/admin/orders/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        const data=res.data;
        return data
    }catch(err){
        return err
    }
}


export const confirmOrder=async(orderId)=>{
    try{
        const res=await  axios.put(`/api/admin/orders/${orderId}/confirm`)
        const data=res.data;
        return data
    }catch(err){
        return err
    }
}


export const shipOrder=async(orderId)=>{
    try{
        const res=await  axios.put(`/api/admin/orders/${orderId}/ship`)
        const data=res.data;
        return data
    }catch(err){
        return err
    }
}

export const deliverOrder=async(orderId)=>{
    try{
        const res=await  axios.put(`/api/admin/orders/${orderId}/deliver`)
        const data=res.data;
        return data
    }catch(err){
        return err
    }
}

export const CancelOrder=async(orderId)=>{
    try{
        const res=await  axios.put(`/api/admin/orders/${orderId}/cancel`)
        const data=res.data;
        return data
    }catch(err){
        return err
    }
}

export const deleteOrder=async(orderId)=>{
    try{
        const res=await  axios.delete(`/api/admin/orders/${orderId}/delete`)
        const data=res.data;
        return data
    }catch(err){
        return err.response
    }
}