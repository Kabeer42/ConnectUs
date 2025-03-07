import React, { useEffect, useState } from "react";
import CustomProgressBar from "./customProgressBar";
import "./JobModal.css";
import { JobApplyFunction } from "../..";
import makeToast from "../../pages/Tosater";
interface StepperProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  job: any;
  userData: any;
}
const JobApply: React.FC<StepperProps> = ({
  modalOpened,
  setModalOpened,
  job,
  userData,
}) => {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState(3);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<any>("");


  const [currentStep, onStepChange] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [Error, setError] = useState<any>({});


  useEffect(()=>{
    setFormData({...formData, applicant_id: userData._id, job_id: job._id})
  },[selectedFile])

  useEffect(() => {
    if (job.skills_level && userData.skills) {
      const updatedSkills = job.skills_level.reduce((acc: any[], data: any) => {
        const userSkill = userData.skills.find(
          (skills: any) => skills.skillName === data.skill
        );
  
        if (userSkill) {
          acc.push({
            skill: data.skill,
            level: userSkill.skillLevel,
          });
        }
  
        return acc;
      }, []);
  
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        requiredSkills: updatedSkills,
      }));
    }
  }, [selectedFile ]);
  

  useEffect(()=>{
    if(!formData.applicant_LanguageSkill){
      if(job.languages){
        const updatedLanguage = job.languages.reduce((acc: any[], data: any) => {
          
    
            acc.push({
              language: data.language,
              proficiency: 'none',
            });
          
    
          return acc;
        }, []);
          setFormData({...formData,applicant_LanguageSkill:updatedLanguage })
      }
     
    }
    
  },[job])

  const handlePrev = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handlePreview = () => {
    if (uploadSuccess) {
        window.open(uploadSuccess, '_blank');
    } else if (selectedFile) {
        const fileURL = URL.createObjectURL(selectedFile);
        window.open(fileURL, '_blank');
    }
};


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

   
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; 
      setFormData((preData:any)=>({
      ...preData, applicant_resume: file
    }))
      setSelectedFile(file);
     
            // check the fil
      const extension = file.name.split(".").pop()?.toLowerCase();
      setFileType(extension);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("No file selected");
      return;
    }
console.log(formData)
    JobApplyFunction(formData).then((res: any) => (
     
      setModalOpened(false)

    )).catch((err: any) => (
      console.log(err)
    ));

   
  };

  const handleChange=(event:any)=>{
    const { name, value } = event.target;
    
    if (name === 'applicant_email') {
      setError((prevError:any) => ({
        ...prevError,
        applicant_email: '',
      }));
    }

    if(name==='country_code'){
      if(value!=="" || value.length!=0){
          setError((prevError:any) => ({
        ...prevError,
        country_code: '',
      }));
      }
    
    }


    if(name==='applicant_contact'){
      if(value.length<1){
        setError((prevError:any) => ({
          ...prevError,
          applicant_contact: 'Please Enter You contact number',
        }));
      }else{
setError((prevError:any) => ({
        ...prevError,
        applicant_contact: '',
      }));

      }
      
      
    }
    setFormData((prevFormData:any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const handleEducationChange=(event:any)=>{
    const { name, value } = event.target;
    setFormData((prevFormData:any) => ({
      ...prevFormData,applicant_education: {...formData.applicant_education,
          [name]: value,
      }
    
    }));
  }

  const changeCustomQuestion= (event:any)=>{
    const { name, value } = event.target;
    setFormData((prevFormData:any) => ({
      ...prevFormData,custom_question: {
          question:job.custom_question.question,
          [name]: value,
      }
    
    }));
  }


  const handleChangeLanguage = (event: any, language: string) => {
    const { name, value } = event.target;
    console.log("Input changed:", { name, value });
  
    setFormData((prevFormData: any) => {
      console.log("Previous form data:", prevFormData);
  
      const existingLanguageIndex = prevFormData.applicant_LanguageSkill.findIndex(
        (skill: any) => skill.language === language
      );
      console.log("Existing language index:", existingLanguageIndex);
  
      let updatedLanguageSkills;
      if (existingLanguageIndex !== -1) {
        updatedLanguageSkills = prevFormData.applicant_LanguageSkill.map(
          (skill: any, index: number) =>
            index === existingLanguageIndex
              ? { ...skill, [name]: value }
              : skill
        );
      } else {
        updatedLanguageSkills = [
          ...prevFormData.applicant_LanguageSkill,
          { language, [name]: value },
        ];
      }
  
      console.log("Updated language skills:", updatedLanguageSkills);
  
      return {
        ...prevFormData,
        applicant_LanguageSkill: updatedLanguageSkills,
      };
    });
  };
  
  
  useEffect(() => {
    // Calculate progress based on the current step
    if (
      job.skills_level ||
      job.education ||
      job.language ||
      job.comfort_location
    ) {
      if (job.custom_question) {
        setSteps(5);
      } else {
        setSteps(4);
      }
    } else if (job.custom_question) {
      setSteps(4);
    }
    const progressPercentage = Math.floor((currentStep / (steps - 1)) * 100);
    setProgress(progressPercentage);
  }, [currentStep]);

  const handleNext = () => {
    let isError = false;
    if (currentStep === 0) {
    // Check applicant_email
  if (!formData.applicant_email) {
    setError((prevError: any) => ({
      ...prevError,
      applicant_email: 'Please Select Your email',
    }));
    isError = true;
  } else {
    setError((prevError: any) => ({
      ...prevError,
      applicant_email: '',
    }));
  }

  // Check country_code
  if (!formData.country_code) {
    setError((prevError: any) => ({
      ...prevError,
      country_code: 'Please Select Your country Code',
    }));
    isError = true; // Set isError to true here as well
  } else {
    setError((prevError: any) => ({
      ...prevError,
      country_code: '',
    }));
  }

  
  // Check applicant_contact
  if (!formData.applicant_contact || formData.applicant_contact.length >13 || formData.applicant_contact.length<11 ) {
    setError((prevError: any) => ({
      ...prevError,
      applicant_contact: 'Please Enter Your Contact number',
    }));
    isError = true; // Set isError to true here as well
  } else {
    setError((prevError: any) => ({
      ...prevError,
      applicant_contact: '',
    }));
  }

    if(isError){
      return;
    }
    }

    if(currentStep==1){

      let isError= false;
      if(!formData.applicant_resume){
        setError((preError:any)=>({
          ...preError,
          applicant_resume:'Please Upload Your Resume'
        }));
        isError = true; // Set isError to true here as well
      }else{
        setError((preError:any)=>({
          ...preError,
          applicant_resume:''
        }));
      }
      console.log(formData)
      if(isError){
        return;
      }
    }

    if(currentStep==2){
      let isError=false;
  
      if(job.education){
          if(!formData.applicant_education.degree || !formData.applicant_education.semester){
            setError({...Error, stepTowError:'Please Fill all the Requried Data'}) ;
             isError=true;
          }else{
            setError({...Error, stepTowError:''}) ;
          }
        
      }
    
      if(job.languages){
        if(!formData.applicant_LanguageSkill ){
          setError({...Error, stepTowError:'Please Fill all the Requried Data'}) ;
          isError=true;
        }else{
          setError({...Error, stepTowError:''}) ;
        }
       
      }
      if(job.comfort_location){
        if(!formData.comfort_location){
          setFormData({...formData, comfort_location: 'No'})
        }
      }
      if(job.hybrid_work){
        if(!formData.hybrid_work){
          setFormData({...formData, hybrid_work: 'No'})
        }
      }
   if(isError){
    return;
   }
    }
if(job.custom_question){
  let isError = false;
    if(currentStep===3){
      if(!formData.custom_question || formData.custom_question.ans===""){
        setError({...Error, "custom_question":"Please Answer This Question "})
        isError = true;
      }else{
        setError({...Error, "custom_question":""})
      }
   }
      if(isError){
        return
      }
}
 
    if (currentStep < steps - 1) {
      onStepChange(currentStep + 1);
    }
  };
  return (
    <div>
      <CustomProgressBar percentage={progress} />

      <div>
        {currentStep === 0 && (
          <div style={{ margin: "20px" }}>
            <h6> Contact info</h6>
            <div
                  style={{
                    display: "flex",
                    margin: "20px",
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
            <div>
              <div
                style={{
                  margin: "0px 30px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Email address
                </label>
                <select
                  className="infoInput"
                  style={{ padding: "10px" }}
                  name="applicant_email"
                  value={formData.applicant_email}
                  onChange={
                    handleChange
                  }
                >
                  <option value="">Select an option</option>
                  <option value={userData.email}>{userData.email}</option>
                </select>
                {Error.applicant_email && (
                  <p className="Error-message" style={{margin:"0", padding:'0'}}>{Error.applicant_email}</p>
                )}
              </div>

              <div
                style={{
                  margin: "0px 30px",
                  display: "flex",
                  flexDirection: "column",
                  // marginBottom: "20px",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Phone country code
                </label>
                <select
                  className="infoInput"
                  style={{ padding: "10px" }}
                  name="country_code"
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="+92">Pakistan +92</option>
                </select>
                {Error.country_code && (
                    <p className="Error-message">{Error.country_code}</p>
                  )}
              </div>

              <div
                style={{
                  margin: "0px 30px",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20px",
                }}
              >
                <label
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  Mobile phone number
                </label>

                <input
                  className="infoInput  no-spin"
                  style={{ padding: "10px" }}
                  type="number"
                  placeholder="contact number"
                  name="applicant_contact"
                  onChange={handleChange}
                />
                {Error.applicant_contact && (
                    <p className="Error-message">{Error.applicant_contact}</p>
                  )}
              </div>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div style={{ margin: "20px" }}>
            <h6>Resume</h6>
            <p>Be sure to include an updated resume</p>
            {selectedFile ? (
              
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
                          padding: "14px 10px",
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
                    width: "80%",
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "8px 10px",
                    color:"black"
                  }}
                >
                  <span>{selectedFile.name}</span>

                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    {selectedFile.size >= 1048576
                      ? (selectedFile.size / 1048576).toFixed(2) + " MB"
                      : // Convert to KB
                        (selectedFile.size / 1024).toFixed(2) + " KB"}
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}
              {Error.applicant_resume && (
                  <p className="Error-message" style={{margin:"0", padding:'0'}}>{Error.applicant_resume}</p>
                )}
            <label htmlFor="inputFile">
              <div className="resumeButton">Upload Resume</div>
              <input
                type="file"
                hidden
                id="inputFile"
                accept=".pdf,.doc,.docx"
                name="applicant_resume"
                onChange={handleFileChange}
              />
              <p>DOC, DOCX, PDF (2 MB)</p>
            </label>
          </div>
        )}
        {currentStep === 2 && (
          <>
            <div style={{ margin: "20px" }}>
              <h6>Additional Questions</h6>

              {job.education && (
                <>
                  <div style={{display:"flex", gap:"40px"}}>
                    <div style={{width:"60%"}}>
                      <h6>What is your current degree program? </h6>
                      <select className="infoInput text-input" name="degree" onChange={handleEducationChange}>
                        <option value="">Degree Program</option>
                        <option value={userData.program}>{userData.program}</option>
                      

                      </select>
                    </div>
                    <div>
                      <h6>Semester</h6>
                      <select className="infoInput text-input" name="semester" onChange={handleEducationChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>

                      </select>
                    </div>
                       
                  </div>
                </>
              )}
              {job.skills_level &&
                job.skills_level.map((data: any) => (
                  <>
                    {userData.skills.map((skills: any, index: number) =>
                      data.skill === skills.skillName ? (
                        <>
                       
                          <div key={index}>
                            <h6 style={{ marginTop: "18px" }}>
                              How many levels of {data.skill} you had completed{" "}
                            </h6>
                            <div
                              className="infoInput"
                              style={{ padding: "10px 20px" }}
                            >
                              {skills.skillLevel}
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                ))}
              {job.languages &&
                job.languages.map((language: any, index: any) => (
                  <>
                    <div key={index} style={{ marginTop: "20px" }}>
                      <h6>
                       What is your level of proficiency in {language.language}?
                      </h6>
                      <select
                        name="proficiency"
                        style={{ padding: "10px 20px" }}
                        className="infoInput"
                        // value={formData.applicant_LanguageSkill[index].proficiency || ""}
                       onChange={(e)=>{handleChangeLanguage(e,language.language)}}
                      >
                        <option value="None">None</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Professional">Professional</option>
                        <option value="Native or bilingual">
                          Native or bilingual
                        </option>
                      </select>
                    </div>
                  </>
                ))}

              {job.comfort_location && (
                <>
                  <div>
                    <h6 style={{ marginTop: "18px" }}>
                      Are you comfortable commuting to this job's location?
                    </h6>
                    <select
                      name="comfort_location"
                     
                      className="infoInput"
                      style={{ padding: "10px 20px" }}
                      onChange={handleChange}
                    >
                       <option value="No">No</option>
                      <option value="Yes">Yes</option>
                     
                    </select>
                  </div>
                </>
              )}
              {job.hybrid_work && (
                <>
                  <div>
                    <h6 style={{ marginTop: "18px" }}>
                      Are you comfortable to continuing with Hybrid Work?
                    </h6>
                    <select
                      name="hybrid_work"
                      className="infoInput"
                      style={{ padding: "10px 20px" }}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </>
              )}

                {Error.stepTowError && (
                  <p className="Error-message" style={{margin:"0", padding:'0'}}>{Error.stepTowError}</p>
                )}

            </div>
          </>
        )}
        {job.custom_question
          ? currentStep == 3 && (
              <>
                <div style={{ margin: "20px" }}>
                  <h6>Work authorization</h6>
                  <div style={{ margin: "20px" }}>
                    <h6>{job.custom_question.question}</h6>
                    {job.custom_question.response_type == "Yes/No" ? (
                      <>
                        <select
                          name="ans"
                          className="infoInput"
                          style={{ padding: "10px 20px" }}
                          onChange={changeCustomQuestion}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <input
                          className="infoInput"
                          name="ans"
                          style={{ padding: "10px" }}
                          type="number"
                          placeholder="0"
                          onChange={changeCustomQuestion}                        />
                      </>
                    )}
                  </div>
                </div>
                {Error.custom_question && (
                  <p className="Error-message" style={{margin:"0", padding:'0'}}>{Error.custom_question}</p>
                )}
              </>
            )
          : currentStep == 3 && (
              <>
                <div style={{ margin: "20px" }}></div>
              </> 
            )}
        {currentStep == 4 && (
          <>
            <div style={{ margin: "20px" }}>
              <h6>Review your application</h6>
              <hr />
              <div>
                <h6>Contect Information</h6>
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
                  <p>Be sure to include an updated resume</p>
                  {selectedFile ? (
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
                  <span>{selectedFile.name}</span>

                  <span style={{ fontSize: "12px", fontWeight: "400" }}>
                    {selectedFile.size >= 1048576
                      ? (selectedFile.size / 1048576).toFixed(2) + " MB"
                      // Convert to KB
                       :  (selectedFile.size / 1024).toFixed(2) + " KB"}
                  </span>
                </div>
                <button style={{padding:"0",border:"none", background:"none"}} onClick={handlePreview} disabled={!selectedFile}>
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
                  <><div style={{margin:"20px"}}>
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
        )}
      </div>
      <div>
        {currentStep === 0 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "10px",
              }}
            >
              <button
                className="button r-button"
                style={{ width: "20%" }}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <button
              className="button r-button"
              style={{ width: "20%" }}
              onClick={handlePrev}
            >
              Previous
            </button>
            {currentStep === steps - 1 ? (
              <>
                <button
                  className="button r-button"
                  style={{ width: "20%" }}
                  onClick={handleSubmit}
                >
                  Apply
                </button>
              </>
            ) : (
              <button
                className="button r-button"
                style={{ width: "20%" }}
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApply;
