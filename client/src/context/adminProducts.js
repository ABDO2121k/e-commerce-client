import axios from "axios"


export const CreateProduct=async(data)=>{
    try{
       await axios.post("/api/admin/products",data)
       return " added with success "
    }catch(err){
        return err
    }
}

export const UpdateProduct=async(data,id)=>{
    try{
       await axios.put(`/api/admin/products/${id}`,data)
       return " Updated with success "
    }catch(err){
        return err
    }
}