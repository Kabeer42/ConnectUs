import React from 'react';
import { Outlet } from 'react-router-dom';
import SavedLeftSide from './SavedLeftSide';

const SavedPostLayout = () => {
  return (
    <div style={{display:'flex', gap:'5%', margin:"0 2% ",  width:"100vw", height:"85vh"}}> 
    <div style={{width:'20%', borderRight: '2px solid #ccc'}}>
         <SavedLeftSide/> 
    </div>
      
        <div  style={{width:'80%', overflow:'hidden', overflowY:'scroll'}}> 
      <Outlet/>      
        </div>
      
    </div>
  );
}

export default SavedPostLayout;
