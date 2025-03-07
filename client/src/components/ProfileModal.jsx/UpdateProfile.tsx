import React, { useEffect, useState } from "react";
import Loader from "../../img/page_loader.gif";
import "./UpdateProfile.css";
import { User } from "../../Types/Types";
import ReactQuill from "react-quill";
import { fetchUserByRoleAs } from "../..";
import axios from "axios";
import makeToast from "../../pages/Tosater";

interface Skills {
skillName:string,
skillLevel: number
}

interface UserType{
  contact: string,
  firstName: string,
  lastName: string,
  bio: string,
  university: string,
  registrationNo: string,
  cgpa: string,
  semester: string,
  skills: Skills[],
  program: string,
  userLocation:string,
  address: string,
  Website_URL: string,
  companyType: string,
  legal_document: File | null,
}

interface profileProps{
user:any,
setModalOpened:any
}
const UpdateProfile: React.FC<profileProps> = ({ user,setModalOpened }) => {
  const userId = localStorage.getItem("userId");
  const roleAs = localStorage.getItem("roleAs");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<any>("");

  function handleDescriptionChange(content: string) {
    setFormData({
      ...formData,
      bio: content,
    });
  }
  const [ScreenLoading, setScreenLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserType>({
    contact: user.contact?user.contact  :"",
    firstName: user.firstName ?user.firstName : "",
    lastName: user.lastName ?user.lastName : "",
    bio: user.bio ?user.bio : "",
    university:user.university ?user.university :  "",
    registrationNo:user.registrationNo ?user.registrationNo :  "",
    cgpa: user.cgpa ? user.cgpa : "",
    semester: user.semester ?user.semester : "",
    skills:user.skills ?user.skills :  [],
    program:user.program ?user.program :  "",
    userLocation: user.userLocation ?user.userLocation : '',
    address: user.address ?user.address : "",
    Website_URL: user.Website_URL ?user.Website_URL : "",
    companyType: user.companyType ?user.companyType : "",
    legal_document: user.legal_document ?user.legal_document : "",
  });

  const [university, setUniversity] = useState<User[]>([]);
  const [Error, setError] = useState({
    _id: "",
    name: "",
    email: "",
    password: "",
    roleAs: "",
    contact: "",
    firstName: "",
    lastName: "",
    profile: "",
    bio: "",
    university: "",
    university_id: "",
    registrationNo: "",
    cgpa: "",
    userLocation: '',
    semester: "",
    skills: '',
    program: "",
    address: "",
    companyType: "",
    legal_document:'',
    Website_URL: "",
  });

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

   
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; 
      setFormData((preData:any)=>({
      ...preData, legal_document: file
    }))
      setSelectedFile(file);
     
            // check the fil
      const extension = file.name.split(".").pop()?.toLowerCase();
      setFileType(extension);
    }
  };

  useEffect(() => {
    fetchUserByRoleAs("University")
      .then((res: any) => {
        setUniversity(res);
      })
      .catch((error: any) => {
        console.error("Error fetching university data:", error);
      });
  }, []);


  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value;
      if (value !== '' && !formData.skills.includes({skillName:value, skillLevel:1})) {
        setFormData({...formData, skills: [...formData.skills, {skillName:value, skillLevel:1}]});
        e.target.value = '';
      }
    console.log(formData.skills);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      let check_Error = false;
      if (formData.firstName === "" || formData.firstName.length < 3) {
        setError((prev) => ({ ...prev, firstName: "first Name is Required" }));
        check_Error = true;
      } else {
        setError((prev) => ({ ...prev, firstName: "" }));
      }
      if (formData.lastName === "" || formData.firstName.length < 3) {
        setError((prev) => ({ ...prev, lastName: "Last Name is Required" }));
        check_Error = true;
      } else {
        setError((prev) => ({ ...prev, lastName: "" }));
      }
      if (formData.userLocation === "" || formData.userLocation.length < 3) {
        setError((prev) => ({ ...prev, userLocation: "Location is Required" }));
        check_Error = true;
      } else {
        setError((prev) => ({ ...prev, userLocation: "" }));
      }
      if (formData.bio === "" || formData.bio.length < 3) {
        setError((prev) => ({
          ...prev,
          bio: "tell me some thing about you...",
        }));
        check_Error = true;
      } else {
        setError((prev) => ({ ...prev, bio: "" }));
      }
      if (
        formData.contact === "" ||
        formData.bio.length < 11 ||
        formData.contact.length > 13
      ) {
        setError((prev) => ({
          ...prev,
          contact: "Check You contact number...",
        }));
        check_Error = true;
      } else {
        setError((prev) => ({ ...prev, contact: "" }));
      }
      if (formData.address === "" || formData.address.length < 3) {
        setError((prev) => ({
          ...prev,
          address: "Your Address is required...",
        }));
        check_Error = true;
      } else {
        setError((prev) => ({ ...prev, address: "" }));
      }
      if (check_Error === true) {
        return;
      }
    }

    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 3000);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if(roleAs === "Student"){
      
    }else if(roleAs === "Company"){
      let hasError = false;
      let errors: any = {};
  
      if(formData.companyType === ""){
          errors.companyType = "Company Type is Required";
          hasError = true;
      } else {
          errors.companyType = "";
      }
  
      if(formData.Website_URL === ""){
          errors.Website_URL = "Website URL is Required";
          hasError = true;
      } else {
          errors.Website_URL = "";
      }
  
      if(formData.registrationNo === ""){
          errors.registrationNo = "Registration No is Required";
          hasError = true;
      } else {
          errors.registrationNo = "";
      }
  
      if(selectedFile === null){
          errors.legal_document = "Legal Document is Required";
          hasError = true;
      } else {
          
          errors.legal_document = "";
      }
  
      if(formData.skills.length === 0){
          errors.skills = "Skills are Required";
          hasError = true;
      } else {
          errors.skills = "";
      }
  
      setError(errors);
  
      if(hasError) {
          return;
      }
  
      // Proceed with form submission or further processing
  }
  
    const updateUser = async () => {
      try {
        const response = await axios.put(`http://localhost:3000/api/user/${userId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
        );
        // console.log(response.data);
        if(response.data){
          makeToast('success',"Data Updated Successfuly")
          setModalOpened(false)
        }
        else{
          makeToast('error',"Data Not Updated")
        }
        // Handle success
      } catch (error:any) {
      
        // Handle error
        makeToast('error',error.message.toString())

      }
    };

    updateUser();


    console.log(formData);
  };

  return (
    <>
      {ScreenLoading ? (
        <>
          <div style={{ height: "450px" }}>
            <img
              style={{ width: "55%", marginLeft: "22%" }}
              src={Loader}
              alt="No Loader Found"
            />
          </div>
        </>
      ) : (
        <form className="update-info" onSubmit={handleSubmit} ref={null}>
          {currentStep === 1 && (
            <>
              <div style={{  gap:'20px' }}>
                <div
                  style={{
                    width: "45%",
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
                    First Name
                  </label>
                  <input
                  
                    type="text"
                    className="infoInput update-input"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {Error.firstName && (
                    <p className="Error-messages">{Error.firstName}</p>
                  )}
                </div>

                <div
                  style={{
                    width: "45%",
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
                    {" "}
                    Last Name
                  </label>
                  <input
                   
                    type="text"
                    className="infoInput update-input "
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {Error.lastName && (
                    <p className="Error-messages">{Error.lastName}</p>
                  )}
                </div>
              </div>
              <div style={{gap:'20px'}}>
                <div
                  style={{
                    width: "45%",
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
                    {" "}
                    Contact No:
                  </label>
                  <input
                    
                    type="number"
                    className="infoInput update-input no-spin "
                    name="contact"
                    placeholder="Contact No"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  {Error.contact && (
                    <p className="Error-messages">{Error.contact}</p>
                  )}
                </div>
                <div
                  style={{
                    width: "45%",
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
                    
                    Location:
                  </label>
                  <input
                  list="location"
                    
                    type="text"
                    className="infoInput update-input no-spin "
                    name="userLocation"
                    placeholder="Location"
                    value={formData.userLocation}
                    onChange={handleChange}
                  />
                  <datalist id="location">
                      <option value='Lahore, Punjab, Pakistan' />
                      <option value='Karachi, Sindh, Pakistan' />
                      <option value='Islamabad, Punjab, Pakistan' />
                      <option value='Multan,Punjab, Pakistan'/>
                      
                  </datalist>
                  {Error.address && (
                    <p className="Error-messages">{Error.userLocation}</p>
                  )}
                </div>
              </div>
<div >
   <div
                  style={{
                    width: "45%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop:'0px'
                  }}
                  >
                  <label
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      margin:'0px',
                      marginBottom: "10px",
                    }}
                  >
                    
                    Address:
                  </label>
                  <input
                    
                    type="text"
                    className="infoInput update-input no-spin "
                    name="address"
                    placeholder="Current Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {Error.address && (
                    <p className="Error-messages">{Error.address}</p>
                  )}
                </div>
</div>
             
              <div
                style={
                  Error.contact
                    ? { height: "370px",}
                    : { height: "370px", }
                }
              >
                <div style={{ width: "100%", height: "300px" }}>
                  <label style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {" "}
                    Something About Your Self
                  </label>
                  <ReactQuill
                    className="quill-editor"
                    value={formData.bio}
                    onChange={handleDescriptionChange}
                  />
                </div>
              </div>
              {Error.bio && <p className="Error-messages">{Error.bio}</p>}

              <div style={{ display: "flex", justifyContent: "end" }}>
                <button
                  className="button r-button"
                  style={{ width: "20%", marginBottom: "20px" }}
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {currentStep === 2 &&(
       
          roleAs  === "Student" ?
          (
            <>
              <div style={{ gap:"20px"}}>
                <div
                  style={{
                    width: "45%",
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
                    
                    Program/Degree
                  </label>
                  <input
                  
                    type="text"
                    className="infoInput update-input"
                    name="program"
                    placeholder="Program/Degree"
                    value={formData.program}
                    onChange={handleChange}
                    list="programSuggestions"
                  />
                  <datalist id="programSuggestions">
                    <option value="Computer Science" />
                    <option value="Information Technology" />
                    <option value="Software Engineering" />
                    <option value="Data Science" />
                    <option value="Cyber Security" />
                  </datalist>
                  {Error.lastName && (
                    <p className="Error-messages">{Error.lastName}</p>
                  )}
                </div>

                <div
                  style={{
                    width: "45%",
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
                    {" "}
                    Registration No: (
                    <span style={{ fontSize: "12px" }}>University</span>)
                  </label>
                  <input
                  
                    type="text"
                    className="infoInput update-input"
                    name="registrationNo"
                    placeholder="Registration No"
                    value={formData.registrationNo}
                    onChange={handleChange}
                  />
                  {Error.registrationNo && (
                    <p className="Error-messages">{Error.registrationNo}</p>
                  )}
                </div>
              </div>

              <div >
                <div
                  style={{
                    width: "45%",
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
                    {" "}
                    University Name
                  </label>
                  {user.university &&
                    user.university.name?<>
                    <div style={{
                      height: "45px",
                      color: "black",
                      border: "none",
                      outline: "none",
                      background: "rgb(227 226 226)",
                      padding: "10px",
                      borderRadius: "5px",
                    }}> 
                     { user.university.name}
                    </div>
                    </>:
                    <select
                    style={{
                      height: "45px",
                      color: "black",
                      border: "none",
                      outline: "none",
                      background: "rgb(227 226 226)",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    name="university"
                    value={formData.university}
                    onChange={(e) => handleChange(e as any)}
                  >
                    <option value="">Select University</option>
                    {university.map((university, index) => (
                      <option key={index} value={university._id}>
                        {university.name}
                      </option>
                    ))}
                  </select>}
                  {Error.university && (
                    <p className="Error-messages">{Error.university}</p>
                  )}
                </div>
              </div>

              <div style={{  gap:"20px" }}>
                <div
                  style={{
                    width: "45%",
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
                    {" "}
                    Current Semester/Year
                  </label>
                  <input
                  
                    type="text"
                    className="infoInput update-input"
                    name="semester"
                    placeholder="Semester/Year"
                    value={formData.semester}
                    onChange={handleChange}
                  />
                  {Error.semester && (
                    <p className="Error-messages">{Error.semester}</p>
                  )}
                </div>

                <div
                  style={{
                    width: "45%",
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
                    {" "}
                    Current CGPA
                  </label>
                  <input
                  
                    type="text"
                    className="infoInput update-input"
                    name="cgpa"
                    placeholder="Current CGPA"
                    value={formData.cgpa}
                    onChange={handleChange}
                  />
                  {Error.cgpa && <p className="Error-messages">{Error.cgpa}</p>}
                </div>
              </div>

              <div style={{display:"flex", justifyContent:'start', flexDirection:"column", }}>
                        <label style={{fontSize:"14px",marginBottom:"5px", fontWeight:"600"}}>Skills</label>
                        <div style={{display:"flex", gap:"20px", textAlign:"start", justifyItems:"start",justifyContent:"start", margin:'0', padding:"0"}}>
                             {formData.skills.map((skill, index) => (
                                <div key={index} style={{background:'orange', borderRadius:"10px", padding:"5px 10px"}} >
                                  <span style={{color:"white"}}>{skill.skillName}</span> <span style={{cursor:"pointer", color:'white'}} onClick={() => setFormData({...formData, skills: formData.skills.filter((s, i) => i !== index)})}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg></span>
                                </div>
                            ))} 
                        </div>
                       
                        <div className='skills-input-container'>
                            <input 
                            list="skillSuggestions"
                            className='skills-input'
                                id='text-input'
                                type="text" 
                                placeholder="Skills" 
                               onKeyDown={handleKeyPress}
                            />
                            <div 
                                onClick={() => {
                                    const value = (document.querySelector('#text-input') as HTMLInputElement)?.value;
                                    if (value !== '' && !formData.skills.includes({skillName:value, skillLevel:1})) {
                                        setFormData({...formData, skills: [...formData.skills, {skillName:value, skillLevel:1}]});
                                        (document.querySelector('#text-input') as HTMLInputElement).value = '';
                                    }
                                }}
                                style={{marginLeft: '10px'}}
                            >
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>
                            </div>
                            <datalist id="skillSuggestions">
                    <option value="Python" />
                    <option value="Data Science" />
                    <option value="Java" />
                    <option value="C/C++" />
                  </datalist>
                        </div>
                        {Error.skills && <p style={{fontSize:"10px", color:"red", margin:'0px'}}>{Error.skills}</p>}
                  
                        
                    </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  
                  marginTop: "30px",
                }}
              >
                <button
                  className="button r-button"
                  style={{ width: "30%" }}
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="button r-button"
                  style={{ width: "30%" }}
                  onClick={handleSubmit}
                >
                  Update Data
                </button>
              </div>
            </>
          )
        : roleAs  === "Company" ?
        (
          <>
          <div style={{  gap:"20px"}}>
            <div
              style={{
                width: "45%",
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
                
                Company Website
              </label>
              <input
                style={{
                  height: "45px",
                }}
                type="text"
                className="infoInput update-input"
                name="Website_URL"
                placeholder="Website URL"
                value={formData.Website_URL}
                onChange={handleChange}
              />
              
              {Error.Website_URL && (
                <p className="Error-messages">{Error.Website_URL}</p>
              )}
            </div>

            <div
              style={{
                width: "45%",
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
                {" "}
                Registration No: (
                <span style={{ fontSize: "12px" }}>Government</span>)
              </label>
              <input
                style={{
                  height: "45px",
                }}
                type="text"
                className="infoInput update-input"
                name="registrationNo"
                placeholder="Registration No"
                value={formData.registrationNo}
                onChange={handleChange}
              />
              {Error.registrationNo && (
                <p className="Error-messages">{Error.registrationNo}</p>
              )}
            </div>
          </div>

          <div style={{ gap:'20px' }}>
                <div
                  style={{
                    width: "45%",
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
                  Company Type
                  </label>
                  <input
                  
                    type="text"
                    className="infoInput update-input"
                    name="companyType"
                    placeholder="Company Type"
                    value={formData.companyType}
                    onChange={handleChange}
                    list="companyTypeSuggestions"
                  />
                  <datalist id="companyTypeSuggestions">
                    <option value="Software Development" />
                    <option value="Data Science" />
                    <option value="Cyber Security" />
                    <option value="Artificial Intelligence" />
                  </datalist>
                  {Error.companyType && (
                    <p className="Error-messages">{Error.companyType}</p>
                  )}
                </div>

              
              </div>
       
          <div style={{  gap:"20px" }}>
          <div style={{width:'100%'}}>
            <h6>Legal Document</h6>
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
              {Error.legal_document && (
                  <p className="Error-messages" style={{margin:"0", padding:'0'}}>{Error.legal_document}</p>
                )}
            <label htmlFor="inputFile">
              <div className="resumeButton">Upload Documents</div>
              <input
                type="file"
                hidden
                id="inputFile"
                accept=".pdf,.doc,.docx"
                name="legal_document"
                onChange={handleFileChange}
              />
              <p>DOC, DOCX, PDF (2 MB)</p>
            </label>
          </div>
          </div>

          <div style={{display:"flex", justifyContent:'start',flexDirection:"column", }}>
                    <label style={{fontSize:"14px",marginBottom:"5px", fontWeight:"600"}}>Skills on which your company works</label>
                    <div style={{display:"flex", gap:"20px", textAlign:"start", justifyItems:"start",justifyContent:"start", margin:'0', padding:"0"}}>
                         {formData.skills.map((skill, index) => (
                            <div key={index} style={{background:'orange', borderRadius:"10px", padding:"5px 10px"}} >
                              <span style={{color:"white"}}>{skill.skillName}</span> <span style={{cursor:"pointer", color:'white'}} onClick={() => setFormData({...formData, skills: formData.skills.filter((s, i) => i !== index)})}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg></span>
                            </div>
                        ))} 
                    </div>
                   <div style={{width:'100%'}}>
                      <div className='skills-input-container' >
                        <input 
                        list="skillSuggestions"
                        className='skills-input'
                            id='text-input'
                            type="text" 
                            placeholder="Skills" 
                           onKeyDown={handleKeyPress}
                        />
                        <div 
                            onClick={() => {
                                const value = (document.querySelector('#text-input') as HTMLInputElement)?.value;
                                if (value !== '' && !formData.skills.includes({skillName:value, skillLevel:1})) {
                                    setFormData({...formData, skills: [...formData.skills, {skillName:value, skillLevel:1}]});
                                    (document.querySelector('#text-input') as HTMLInputElement).value = '';
                                }
                            }}
                            style={{marginLeft: '10px'}}
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>
                        </div>
                        <datalist id="skillSuggestions">
                <option value="Python" />
                <option value="Data Science" />
                <option value="Java" />
                <option value="C/C++" />
              </datalist>
                    </div>
                   </div>
                  
                    {Error.skills && <p style={{fontSize:"10px", color:"red", margin:'0px'}}>{Error.skills}</p>}
              
                    
                </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              
              marginTop: "30px",
            }}
          >
            <button
              className="button r-button"
              style={{ width: "30%" }}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="button r-button"
              style={{ width: "30%" }}
              onClick={handleSubmit}
            >
              Update Data
            </button>
          </div>
        </>
        ):
        roleAs === "University" ?
        (
          <>
          <div style={{  gap:"20px"}}>
            <div
              style={{
                width: "45%",
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
                
                Website URL
              </label>
              <input
                style={{
                  height: "45px",
                }}
                type="text"
                className="infoInput update-input"
                name="Website_URL"
                placeholder="Website URL"
                value={formData.Website_URL}
                onChange={handleChange}
              />
              
              {Error.Website_URL && (
                <p className="Error-messages">{Error.Website_URL}</p>
              )}
            </div>

            <div
              style={{
                width: "45%",
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
                {" "}
                Registration No: (
                <span style={{ fontSize: "12px" }}>Government</span>)
              </label>
              <input
                style={{
                  height: "45px",
                }}
                type="text"
                className="infoInput update-input"
                name="registrationNo"
                placeholder="Registration No"
                value={formData.registrationNo}
                onChange={handleChange}
              />
              {Error.registrationNo && (
                <p className="Error-messages">{Error.registrationNo}</p>
              )}
            </div>
          </div>

       
          <div style={{  gap:"20px" }}>
          <div style={{width:'100%'}}>
            <h6>Legal Document</h6>
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
              {Error.legal_document && (
                  <p className="Error-messages" style={{margin:"0", padding:'0'}}>{Error.legal_document}</p>
                )}
            <label htmlFor="inputFile">
              <div className="resumeButton">Upload Documents</div>
              <input
                type="file"
                hidden
                id="inputFile"
                accept=".pdf,.doc,.docx"
                name="legal_document"
                onChange={handleFileChange}
              />
              <p>DOC, DOCX, PDF (2 MB)</p>
            </label>
          </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              
              marginTop: "30px",
            }}
          >
            <button
              className="button r-button"
              style={{ width: "30%" }}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="button r-button"
              style={{ width: "30%" }}
              onClick={handleSubmit}
            >
              Update Data
            </button>
          </div>
        </> 
        ):(
          <>
            <button
              className="button r-button"
              style={{ width: "30%" }}
              onClick={handleSubmit}
            >
              Update Data
            </button>
          </>
        )
        )}
        
        </form>
      )}
    </>
  );
};

export default UpdateProfile;
