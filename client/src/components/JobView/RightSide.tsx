import React, { useEffect, useState } from 'react';
import Profile from '../../img/profile.jpg';
import { fetchUserById, GetJobById } from '../..';
import JobApplyModal from '../JobApply/JobApplyModal';
import makeToast from '../../pages/Tosater';


interface jobDetailProps{
jobId : any,
setJobId :any,
}
const RightSide:React.FC<jobDetailProps> = ({jobId,setJobId}) => {
    const [modalOpened, setModalOpened] = useState(false)
    const [loading, setLoading] =useState(true)
    const [job, setJob]= useState<any>({})
    const [ProfileImg, setProfileImg] = useState(Profile)
    const [user, setUser] = useState<any>({})
    const roleAs = localStorage.getItem('roleAs')
    useEffect(()=>{
        const userId = localStorage.getItem('userId')
        fetchUserById(userId).then((res:any)=>{
            setUser(res)
        })
        if(jobId !== "" && jobId !== null){
            
             GetJobById(jobId).then(
            res=>{  makeToast('success', 'Job fetched successfully')
                setJob(res) 
                setLoading(false)
                 if (res && res.user_id && res.user_id.profile) {
                    
                    setProfileImg(`http://localhost:3000/uploads/profile/${res.user_id.profile}`);
                  
                  } 
            
            }
        )
        console.log(jobId)
        }else{
        makeToast('error', 'Job not found')
        }
       
    }, [jobId])


  return (
    
    <>
    {
        loading?<></>:
        jobId ?
        
    <div>
        <JobApplyModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={job}/>
    <div>
             <div  style={{display:"flex", justifyContent:'end',}}>
             <svg style={{cursor:"pointer"}} onClick={()=>setJobId('')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
             <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
             </svg>
             </div>
             <div style={{display:"flex", alignItems:"center",margin:"10px 0px" ,gap:"50px", justifyContent:"space-between"}}>
            <h4 id="job-title" style={{transition: 'font-size 0.3s'}}>{job.Job_title}</h4>
             <div>
                 <img src={ProfileImg} style={{height:"45px", width:"45px", borderRadius:'50%' }}  alt={job.user_id.profile} />
             </div>
             </div>
             <div style={{display:"flex", justifyContent:"start", gap:"10px", alignItems:'center'}}>
             <a href='' className='company-link' >
                 {job.Company}<span style={{marginLeft:"10px",}}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                 <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                 <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                 </svg>
                 </span>
             </a>
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                     <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
             </svg>
             </div>
             <div id="job-location" style={{marginTop:"10px"}}>
                 <h6>
                      {job.Job_location}
                 </h6>

               
             </div>
             <div className='right-side-buttons'>
                { roleAs === 'Student' &&
             <button onClick={()=>{if(user.isVerified){setModalOpened(!modalOpened)}else{alert("Please Verify your profile to apply for this job")}} } className='button'> <h6 style={{margin:"0"}}>Apply Now</h6></button>
             }<button className='button'>    
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                </svg>
             </button>
             <button className='button'>    
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
<path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg>
             </button>
             </div>
             </div>
             <hr />

             <div className='job-details'>
                 <div style={
                     {
                         margin:"20px 0px"
                     }
                 }>
                     <h6 style={{ margin:"0", marginBottom:"10px"}}>Job details</h6>
                 <p style={{fontSize:'14px', margin:"0", marginBottom:"10px"}}> Here’s how the job details align with your <a href='' className='company-link'> profile <span>
                     
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
<path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
</svg></span></a>.</p>

             <div style={{display:'flex', gap:"20px"}}>
             <svg style={{color:"grey"}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-briefcase-fill" viewBox="0 0 16 16">
<path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
<path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
</svg>
                 <h6>Job types</h6>
             </div>
             <div style={{margin:"10px 30px", padding:"8px 20px",cursor:"pointer", border:'1px solid grey', width:"110px", borderRadius:"10px"}}>
                <p style={{fontSize:'14px', margin:'0', fontWeight:"500"}}> {job.Job_type}</p>
             </div>  

                 </div>
                
             <hr />
             <div>
                 <h6 style={{ margin:"0", marginBottom:"10px"}}>{job.Location}</h6>
                 <div style={{display:'flex', gap:"10px"}}>
                 <svg  style={{color:"grey"}}  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
<path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg>
                     <h6 style={{fontSize:'16px', margin:"0", marginBottom:"10px"}}>Lahore</h6>
                 </div>
             </div>

             <hr />
             <div>
                 <h6>Full job description</h6>
                 <p style={{fontSize:'14px', margin:"20px", marginBottom:"60px" }}  dangerouslySetInnerHTML={{ __html: job.description }}>
                    
                    </p>
             </div>
             </div>
            
 </div>

    :<>
    <div>
        {/* Please Select any Post to get Details */}
    </div>
    
    </>
    }
    </>
  );
}

export default RightSide;
