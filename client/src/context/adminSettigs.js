import axios from 'axios'



export const setNews=async(data)=>{
    try{
       await axios.post('/api/news',data)
       return "news updated with success"
    }catch(err){
        console.log(err)
        return err
    }
}

export const getNews=async()=>{
    try{
      const res= await axios.get('/api/news')
       return  res.data
    }catch(err){
        console.log(err)
        return err
    }
}


export const setCatSettings=async(data)=>{
    try{
       await axios.post('/api/catSettings',data)
       return "Category Items Added with success"
    }catch(err){
        console.log(err)
        return err
    }
}

export const getCatSettings=async()=>{
    try{
      const res= await axios.get('/api/catSettings')
       return res.data
    }catch(err){
        console.log(err)
        return err
    }
}

export const getCatSettingsData=async()=>{
    try{
      const res= await axios.get('/api/catSettings/data')
       return res.data
    }catch(err){
        console.log(err)
        return err
    }
}