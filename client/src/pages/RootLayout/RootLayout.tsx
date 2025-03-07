import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { fetchAllPosts, fetchUserById } from '../..';
import LoadingError from '../../img/404-error.webp';
import makeToast from '../Tosater';
const RootLayout = () => {
    const [Data, setData] = useState(false);
    const [Loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
  useEffect(()=>{
    
    fetchUserById(userId).then(res => setData(true));
   if(!userId){
    makeToast('error', "Please Login To Access");
   }
   

  },[])

  useEffect(()=>{
    if(Data){
      setLoading(false);
    }
  },[Data])
  return (
  <>
  {
    userId?
    Loading ? <>
    </> : 
    Data ?
    <>
  <Navbar/>
  <div style={{  marginTop:"70px",  padding: '1rem 1rem' }}>
      
  <Outlet/>
  </div>
  </>:
  <>
  <div style={{width:"100%", padding:'auto'}} >
    <img style={{width:"50%", marginLeft:"25%", mixBlendMode:"multiply"}} src={LoadingError} alt="404 error"  loading='eager'  />
  </div>
  
  </>:<>
  
  <Navigate to={'/sign-in'}/>
  </>
  
}
  
  </>
  );
}

export default RootLayout;
