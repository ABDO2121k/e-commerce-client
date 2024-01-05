
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import HomeCarousel from '../../components/navigation/HomeCarousel'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Collections from '../../components/HomeSectionComponnts/Collections'
import { authContext } from '../../../context/authContext'
import { toast } from 'react-toastify'

const Home = () => {
  const [data,setData]=useState([])
  const auth=useContext(authContext);

  useEffect(()=>{
    const getAllProducts=async()=>{
      try {
        const res = await auth?.getCatSettingsData();
        return  setData(res)
      } catch (err) {
        console.log(err);
        return toast.error(err);
      }
    }
    getAllProducts()
  },[])
  return (
      <div >
        <HomeCarousel/>
        <Collections/>
        <div className='py-20 space-y-10 flex flex-col justify-center px-5 lg:px-10'>
         {data?.map((d,i)=> <HomeSectionCarousel key={i} data={d.products.content} sectionName={d.cat}/>)}
        </div>
      </div> 
  )
}

export default Home