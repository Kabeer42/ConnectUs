import React, { useEffect, useState } from 'react';
import { fetchUserById, getApplicantById } from '../..';

interface jobDetailProps{
applicantId : any,
}
const RightCard:React.FC<jobDetailProps> = ({applicantId}) => {
    const [loading, setLoading] =useState(true)
    const [userData, setUserData] = useState<any>({})
    const [formData, setFormData] = useState<any>({})
    const [fileType, setFileType] = useState<any>()
    const [fileSize, setFileSize] = useState<any>()
    useEffect(()=>{
        getApplicantById(applicantId).then((res:any)=>{
            setFormData(res.applications)
            setUserData(res.users)
            setFileType(res.fileType)
            if(res.fileSizeInMB){
              if(res.fileSizeInMB > 1){
                setFileSize(res.fileSizeInMB + " MB")
              }else{
                setFileSize((res.fileSizeInMB* 1024).toFixed(2)+ " KB")
              }
            }
            setLoading(false)
            console.log(res.applications)
        })
    },[applicantId])

  
    
    const handlePreview = () => {
      if (formData.applicant_resume) {
          window.open(`http://localhost:3000/uploads/resume/${formData.applicant_resume}`, '_blank');
      } 
  };


  return (
    
    <>
    {
        loading?<></>:
        applicantId ?
        
        <>
        <div style={{ margin: "20px", overflow:"hidden", overflowY:"scroll", height:"90vh" }}>
          <h6>Review your application</h6>
          <hr />
          <div>
            <h6>Contact Information</h6>
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
                  src={`http://localhost:3000/uploads/profile/${userData.profile}`}
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
                  {userData.name}
                </h6>
                <p
                  style={{
                    margin: "0",
                    padding: "0",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  Student at {userData.university.name}
                </p>
                <p style={{ margin: "0", padding: "0", fontSize: "12px" }}>
                  {" "}
                  {userData.userLocation}
                </p>
              </div>
            </div>

            <div style={{margin:"20px"}}>
                <h6>Email Address</h6>
                <p>{formData.applicant_email}</p>
            </div>
            <div style={{margin:"20px"}}>
                <h6>Phone country code</h6>
                <p>{formData.country_code}</p>
            </div> <div style={{margin:"20px"}}>
                <h6>Mobile phone number</h6>
                <p>{formData.applicant_contact}</p>
            </div>
            <hr />
            <div>
              <h6>Resume</h6>
              {formData.applicant_resume ? (
          <div className="show-resume">
            <div
              style={
                fileType == "pdf"
                 
                  ? {
                  
                      fontSize: "18px",
                      textTransform: "uppercase",
                      background: "rgb(244, 98, 98)",
                      color: "white",
                      textAlign: "center",
                      padding: "14px 15px",
                      borderRadius: "10px 0px 0px 10px ",
                    }
                  : {
                  
                      fontSize: "18px",
                      textTransform: "uppercase",
                      background: "blue",
                      color: "white",
                      textAlign: "center",
                      padding: "14px 15px",
                      borderRadius: "10px 0px 0px 10px ",
                    }
              }
            >
              {fileType}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "70%",
                fontSize: "14px",
                fontWeight: "600",
                padding: "8px",

              }}
              >
              <span>{formData.applicant_resume}</span>

              <span style={{ fontSize: "12px", fontWeight: "400" }}>
                { 
                    fileSize
                }
              </span>
            </div>
            <button style={{padding:"0",border:"none", background:"none"}} onClick={handlePreview} disabled={!formData.applicant_resume}>
            Preview
        </button>
          </div>
        ) : (
          <></>
        )}
        <hr />
        <div>
          <h6>Additional Questions</h6>
          <div>
            {
              formData.applicant_education && 
              <div style={{marginLeft:"20px", display:"flex", gap:"30px"}}>
                <div>
                     <h6>What is your current degree program? </h6>
                   <p>{formData.applicant_education.degree}</p>
                </div>
                <div  style={{height:"50px", width:'1.5px',margin:"0 10px", background:"grey"}}></div>
              <div>
              <h6>Semester</h6>
              <p>{formData.applicant_education.semester}</p>
              </div>
              </div>
           
            }
            {
              formData.applicant_LanguageSkill &&
              <><div style={{margin:"10px 20px", }}>
              {
                formData.applicant_LanguageSkill.map((language:any)=>(
                  <><div >
                      <h6>
                     What is your level of proficiency in {language.language}?
                  </h6>
                  <p>{language.proficiency}</p>
                  </div>
                
                  </>
                ))
              }</div>
              </>
            }
            {
              formData.requiredSkills &&
              <>
              {formData.requiredSkills.map((data:any)=>(
              <>
              <div style={{margin :'20px'}}>
                 <h6>How many levels of {data.skill} you had completed</h6>
              <p>{data.level}</p>
              </div>
             
              </>
              ))}
              </>
            }

            {
              formData.custom_question &&
              <>
              <div style={{margin:"20px"}}>
                <h6>
                  {formData.custom_question.question}
                </h6>
                <p>
                {formData.custom_question.ans}
                </p>
              </div>
              </>
            }
          </div>
        </div>
            </div>
          </div>
        </div>
      </>

    :<>
    <div>
        {/* Please Select any Post to get Details */}
    </div>
    
    </>
    }
    </>
  );
}

export default RightCard;
