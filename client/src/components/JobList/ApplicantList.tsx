import React, { useEffect, useState } from 'react'
import RightCard from './RightCard'
import LeftCard from './LeftCard'
import { useParams } from 'react-router-dom'
import { getApplicantByJobId } from '../..'

const ApplicantList = () => {

  const {jobId} = useParams();

  const [loading, setLoading] = useState(true)
  const [ApplicationData, setApplicationData] = useState<any[]>([])
  const [applicantId, setApplicantId] = useState<any>() 

  useEffect(()=>{
    getApplicantByJobId(jobId).then((res:any)=>{
      setApplicationData(res.applicant)
        setLoading(false)
      
      // console.log(res.applicant)
      setApplicantId(res.applicant[0]._id)
     
    })
  },[jobId])

  return (
   <>
   {  loading ?<>
      Loading...
   </>:ApplicationData.length > 0 ?
     <div className='job-list'>
        <div className='left-site-list'>
            <div>
            <div className='job-cart-list'>
                {
                 
                   ApplicationData.map((data:any)=>(
                   
                   <>
                   {
                    <LeftCard key={data._id} data={data} setApplicantId={setApplicantId}/>
                   }
                   </>
                      
                    ))
                }
            
            </div>
          
           
            </div>

        </div>
        <div className='right-site-list' >
           <RightCard applicantId={applicantId} />
        </div>
    </div>:
    <>
     <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'80vh', fontSize:'30px', fontWeight:'bold'}}>
    
    No Applicant Found
    </div>
    </>
   }
   </>
  )
}

export default ApplicantList