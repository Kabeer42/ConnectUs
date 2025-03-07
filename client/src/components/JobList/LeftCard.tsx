import React, { useEffect, useState } from 'react';
import { timeAgo } from '../../pages/home/timeAgo';
import { fetchUserById } from '../..';

interface JobProps{
    data:any,
    setApplicantId:any,
    
}



const LeftCard:React.FC<JobProps> = ({data,setApplicantId}) => {
const [university, setUniversity] = useState<any>([])
const [location, setLocation] = useState(true)
    useEffect(()=>{
        fetchUserById(data.applicant_id.university).then((res:any)=>{
            setUniversity(res)
            setLocation(false)
        })
    },[data.applicant_id.university])
  return (<>
  
    <div onClick={()=>{
        setApplicantId(data._id)
    }} className='job-cart'>
                 <div>
           
            <div
              style={{
                display: "flex",
                margin: "10px 10px",
                gap: "20px",
                alignItems: "center",
              }}
              >
              <div>
                <img
                  style={{
                    height: "45px",
                    width: "45px",
                    borderRadius: "50%",
                  }}
                  src={`http://localhost:3000/uploads/profile/${data.applicant_id.profile}`}
                  alt=""
                />
              </div>

              <div>
                <h6
                  style={{
                    margin: "0",
                    padding: "0",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {data.name}
                </h6>
                <p
                  style={{
                    margin: "0",
                    padding: "0",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Student at {location ? "Loading..." : university.name}
                </p>
                <p style={{ margin: "0", padding: "0", fontSize: "12px" }}>
                  {" "}
                  {data.applicant_id.userLocation}
                </p>
              </div>
            </div>

           
        <hr />
        {
            data.requiredSkills.length > 0 &&
            data.requiredSkills.map((skill:any,index:any)=>(
                <span key={index}>{skill.skill} : {skill.level} <br/> </span>
            ))
        }
          </div>
            </div> 
            </>
  );
}

export default LeftCard;
