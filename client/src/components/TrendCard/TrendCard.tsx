import React, { useEffect, useState } from 'react'
import './TrendCard.css'

// import {TrendData} from '../../Data/TrendData.js'
import FollowAction from '../FollowersCard/FollowAction.js'
import { fetchUserByRoleAs, fetchUserByRoleAsExceptCurrent, GetJobByUserId } from '../../index.js';
import { timeAgo } from '../../pages/home/timeAgo.js';
import UniversityStudents from './StudentsAccept.js';
import axios from 'axios';
const TrendCard = () => {
  const [Companies, setCompanies] = useState<any[]>([]);
  const [universities, setUniversity] = useState<any[]>([]);
  const [UniStudents, SetUniStudents] = useState<any[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem("userId");
  const roleAs = localStorage.getItem("roleAs");
  const [jobs, setJobs] = useState<any[]>([]);


  // const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
  const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';

  useEffect(()=>{

    const fetchForUniversity = async ()=>{   
    try {
      const res = await axios.get(`${Api}api/user/students/${userId}`) ;
     SetUniStudents(res.data);
     console.log(res.data);
     
    } catch (error) {
     console.log(error);
     console.log(`${Api}api/user/students/${userId}`)
      
    }

  }
  if(roleAs==="University")
  fetchForUniversity()
  },[roleAs])
  useEffect(()=>{
const fetchForStudent = async ()=>{
    fetchUserByRoleAsExceptCurrent("Company", userId).then((res) => {
      if(res.length>0){
        setCompanies(res)
        setLoading(false)
      }
      else{
        fetchUserByRoleAsExceptCurrent("University", userId).then((res) => {
          if(res.length>0){
            setCompanies(res)
            setLoading(false)
          }
        })
      }
    }) };
    if(roleAs === "Student"){ 
      fetchForStudent();
    }else if(roleAs === "Company"){
      GetJobByUserId(userId ?? "").then((res:any) => {
        if(res.length>0){
          setJobs(res)
          setLoading(false)
        }
      })
    }else{
    const fetchCompanies = async ()=>{
        fetchUserByRoleAs("Company").then((res:any) => {
          setCompanies(res)
          setLoading(false)
        })
      }

       fetchUserByRoleAs("University").then((res:any) => {
        setUniversity(res)

    })
    
      fetchCompanies();
    }
   
  }, [])
  
  return (
    <>
    {
      roleAs === "Student"?
       <div className="FollowersCard" style={{height:"70vh", background:"white", borderRadius:"20px", padding:"10px", overflowY:"scroll"}}>
            <h3>Companies for you</h3>
            {Companies.map((follower:any, id:any)=>{
                return(
                  <FollowAction follower={follower} key={id} />
                )
            })}

    </div>: roleAs === "Company" ?
    <>
    <div className="FollowersCard" style={{height:"70vh", background:"white", borderRadius:"20px", padding:"10px", overflowY:"scroll"}}>
      <h3>Your Listed Jobs</h3>
      {jobs.map((data:any, id:any)=>{
        return(
          <div onClick={()=>{
            window.location.href = `/applicant/${data._id}`
          }} key={id} className='job-cart'>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                        <h2 style={{fontSize:'18px', margin:"0"}}>{data.Job_title}</h2>
    
                       
                    </div>  
               
    
                    <div>
                        <h6 style={{margin:"0",marginTop:"20px", fontSize:'14px', fontWeight:'400'}}>{data.Company}</h6>
                        <p style={{margin:"0", fontSize:'14px', fontWeight:'400'}}>{data.Job_location}</p>
                        <p style={{margin:"0", marginTop:'20px', fontSize:'14px', fontWeight:'400'}}>
                      
                        </p>
                        <p style={{margin:"0", marginTop:"20px",  fontSize:'12px', fontWeight:'400'}}>
                            Active {timeAgo(data.createdAt)}
                        </p>
                    </div>
                </div> 
        )
      })}
    </div>
    </>:
    roleAs === 'University'
    ?
    <>
      <div className="FollowersCard" style={{height:"70vh", background:"white", borderRadius:"20px", padding:"10px", overflowY:"scroll"}}>
            <h3>Connected Students</h3>
            {UniStudents.map((student:any, id:any)=>{
                return(
                  <UniversityStudents connectedStd={student} key={id} />
                )
            })}

    </div>
    </>:<>
    
    <div className="FollowersCard" style={{height:"70vh", background:"white", borderRadius:"20px", padding:"10px", overflowY:"scroll"}}>
            <h4>Connected Universities & Companies</h4>
            {Companies.map((follower:any, id:any)=>{
                return(
                  <UniversityStudents connectedStd={follower} key={id} />
                )
            })}
            {universities.map((follower:any, id:any)=>{
                return(
                  <UniversityStudents connectedStd={follower} key={id} />
                )
            })}
    </div>
    </>
    }
    </>
   
  )
}

export default TrendCard