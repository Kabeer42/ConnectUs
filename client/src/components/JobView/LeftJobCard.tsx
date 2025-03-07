import React, { useState } from 'react';
import { timeAgo } from '../../pages/home/timeAgo';

interface JobProps{
    data:any,
    setJobId:any,
    
}



const LeftJobCard:React.FC<JobProps> = ({data,setJobId}) => {
    const [Overlay , setOverlay ] = useState(false);
    const [PopList, setPopList] = useState(false)
    const sanitizeHtml = (html:any) => {
        const tempDiv = document.createElement('div');
        tempDiv.textContent = html;
        return tempDiv.innerHTML;
      };
  return (<>
    { Overlay && <div className='overlay' onClick={()=>{
      setPopList(false);
        setOverlay(false);
          
        }} />}
    <div onClick={()=>{
        setJobId(data._id)
    }} className='job-cart'>
                <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <h2 style={{fontSize:'18px', margin:"0"}}>{data.Job_title}</h2>

                    <svg onClick={()=>{
                       setPopList(true)
                        setOverlay(true)
                    }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    </svg>
                </div>  
            {PopList &&
                <div className='job-cart-option'>
                     <ul>
                        <li>
                            Save Job
                        </li>
                        <li>
                            Not interested
                        </li>
                        </ul>   
                </div>}

                <div>
                    <h6 style={{margin:"0",marginTop:"20px", fontSize:'14px', fontWeight:'400'}}>{data.Company}</h6>
                    <p style={{margin:"0", fontSize:'14px', fontWeight:'400'}}>{data.Job_location}</p>
                    <p style={{margin:"0", marginTop:'20px', fontSize:'14px', fontWeight:'400'}}>
                    <div className='description' dangerouslySetInnerHTML={{ __html: data.description }}></div>
                    </p>
                    <p style={{margin:"0", marginTop:"20px",  fontSize:'12px', fontWeight:'400'}}>
                        Active {timeAgo(data.createdAt)}
                    </p>
                </div>
            </div> 
            </>
  );
}

export default LeftJobCard;
