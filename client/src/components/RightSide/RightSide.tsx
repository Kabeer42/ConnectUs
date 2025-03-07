import React, { useEffect, useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import Post from "../../img/post.png";
import JobModal from "../JobModal/JobModal";
import { fetchUserById } from "../..";
import makeToast from "../../pages/Tosater";

const RightSide = () => {
  const roleAs = localStorage.getItem('roleAs');
  const [modalOpened, setModalOpened] = useState(false);
  const [jobModalOpened, setJobModalOpened] = useState(false);
  const [option,setOption] =useState(false);
  const userId = localStorage.getItem('userId');
  const [user,setUser] = useState<any>({});
  useEffect(()=>{
    fetchUserById(userId).then(res=>{
      setUser(res);
    })
  },[userId])
  return (
    <div className="RightSide">
      {
        option &&   
        <div onClick={()=>{setOption(false)}} id="overlay" style={{cursor:"pointer", position:'absolute', background:"grey", opacity:"0.3", top:"0", bottom:"0", left:"0", right:'0', zIndex:"0.8"}} />
      }
{/*       
      <div className="navIcons">
        <img src={Home} alt="" />
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div> */}

      <TrendCard />
      <div style={{position:'relative'}}>

        {
          option &&
          <div style={{position:'absolute', width:"250px",bottom:"50px", padding:"20px",zIndex:"1", background:"white", boxShadow:"2px 2px 8px 8px rgba(0,0,0,0.2)", borderRadius:'10px' }}>
        <div onClick={()=>{
          setModalOpened(true);
          setOption(false);
        }} style={{display:'flex', justifyContent:"space-between", cursor:"pointer"}}>
           <h5>Post</h5>
           <img src={Post} style={{height:'30px'}} alt="" />
        </div>
       {roleAs === "Company" && <div onClick={()=>{
          if(user.isVerified){
            setJobModalOpened(true);
            setOption(false);
          }
          else{
            makeToast("error","Please Wait! Your Account is under review");
          }
        }} style={{display:'flex', justifyContent:"space-between", cursor:"pointer", marginTop:"20px"}} >
           <h5>Create Job</h5>
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
</svg>
        </div>}
        </div>}
         <button className="button r-button" onClick={() => setOption(true)}>
        Share
      </button>
      </div>
     
      <ShareModal modalOpened={modalOpened } setModalOpened={setModalOpened} />
      <JobModal modalOpened={jobModalOpened } setModalOpened={setJobModalOpened} />
    </div>
  );
};

export default RightSide;
