import React from 'react';
import postIcon from "../../img/postIcon.png"
import jobIcon from "../../img/job.png"
const SavedLeftSide = () => {
  return (
    <div style={{display:'flex', position:"relative",zIndex:"9", flexDirection:'column',gap:'20px'}}>
        <div style={{width:"52%", marginBottom:'30px'}}><i> <h1  className='preLoadText' data-text='Saved' >Saved</h1></i></div>
     
           
      <div onClick={()=>{window.location.href ='/savedPost'}} className='savedButton'>
        <img src={postIcon} style={{height:'34px'}} alt={postIcon}/>
        <h5 style={{fontWeight:"bold"}}>Saved Posts</h5>
      </div>

      <div  onClick={()=>{window.location.href ='/savedPost'}}  className='savedButton'>
        <img src={jobIcon} style={{height:'34px'}} alt={jobIcon} />
        <h5 style={{fontWeight:"bold"}}>Saved Jobs</h5>
      </div>
      
    </div>
  );
}

export default SavedLeftSide;
