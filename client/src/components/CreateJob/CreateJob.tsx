import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Profile from '../../img/img2.png';
import Loader from "../../img/page_loader.gif"
import  "./CreateJob.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createJob } from '../..';
import makeToast from '../../pages/Tosater';
interface ModalProps {
    setModalOpened: (opened: boolean) => void;
    setSize: (opened: boolean) => void;

  }

  interface skill{
    skill: string,
    level: string,
    required:boolean;
  }
  interface languages{
    language:string,
    proficiency: string,
    required:boolean
  }
  interface custom_question{
    question:string,
    response_type: string,
    ideal_ans: string,
  }
  interface JobProps{
    user_id:string,
    Job_title: string,
    Company: string,
    Workplace_type: string,
    Job_location: string,
    Job_type: string,
    description: string,
    Skills: string[],
   
    email_website: string,
    education: {
        degree: string,
        semester: number,
        required: boolean
    },
    skills_level: skill[],
    hybrid_work : boolean,
    languages: languages[],
    comfort_location:boolean;
    custom_question: custom_question;

  }
const CreateJob: React.FC<ModalProps> =({setSize, setModalOpened} ) => {
    // Get User Id form localStorage
    const userId = localStorage.getItem('userId');

    const [ScreenLoading,setScreenLoading] =useState(false)
    const [currentStep, setCurrentStep] = useState(1);

  useEffect(()=>{
    setFormData ({ ...formData, user_id : userId || "" })
    if(currentStep===1){
        setSize(true);
    }else{
        setSize(false);
    }
    
},[])  

    const [formData, setFormData] = useState<JobProps>({
        user_id: "",
        Job_title: '',
        Company: '',
        Workplace_type: 'On-site',
        Job_location: '',
        Job_type: 'Full-time',
        description: '',
        Skills: [],
       
        email_website: '',
        education: {
            degree: '',
            required: false,
            semester: 1
        },
        skills_level: [],
        hybrid_work: false,
        languages:[
            {
                language: '',
                proficiency: '',
                required: false
            }
        ],
        comfort_location:false,
        custom_question: {
            question: '',
            response_type:"",
            ideal_ans:''
        } ,
    });
    const [Error, setError] = useState({
        user_id: "",
        Job_title: '',
        Company: '',
        Workplace_type: '',
        Job_location: '',
        Job_type: '',
        description: '',
        skills: '',
        email_website: '',
        education: '',
        SkillsLevel: '',
        SkillsLevel1: '',
        SkillsLevel2: '',
    });
 
    const handleSkillChange = (index: number, field: string, value: string | boolean) => {
        setFormData((prevFormData) => {
            const updatedSkillsLevel = [...prevFormData.skills_level];
            updatedSkillsLevel[index] = {
                ...updatedSkillsLevel[index],
                [field]: value
            };
            return { ...prevFormData, skills_level: updatedSkillsLevel };
        });
    };


const handleEducationChange = (field: keyof any, value: string | number | boolean) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        education: {
            ...prevFormData.education,
            [field]: value
        }
    }));
};



const handleCustomQuestion = (field: keyof any, value: string | number | boolean) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        custom_question: {
            ...prevFormData.custom_question,
            [field]: value
        }
    }));
};

const handleLanguageChange = (index: number, field: keyof any, value: string | boolean) => {
    setFormData((prevFormData) => {
        const updatedLanguages = [...prevFormData.languages];
        updatedLanguages[index] = {
            ...updatedLanguages[index],
            [field]: value
        };
        return { ...prevFormData, languages: updatedLanguages };
    });
};
const handleSectionClose = (section: string) => {
    setOrderedSections((prevOrder) => prevOrder.filter((s) => s !== section));
    setActiveSections((prev) => prev.filter((s) => s !== section));

    // Reset formData based on the section
    if (section === 'Education') {
        setFormData((prevFormData) => ({
            ...prevFormData,
            education: {
                degree: '',
                semester: 0,
                required: false
            }
        }));
    } else if (section.startsWith('Languages')) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            languages: prevFormData.languages.map((lang) => ({
                ...lang,
                language: '',
                proficiency: 'None',
                required: false
            }))
        }));
    }
    else if (section.startsWith('Skills') ||section.startsWith('Skills1') || section.startsWith('Skills2') ) {
        // For Skills, Skills1, Skills2
        setFormData((prevFormData) => ({
            ...prevFormData,
            skills_level: prevFormData.skills_level.map((skill) => ({
                ...skill,
                skill: '',
                level: '1',
                required: false
            }))
        }));
    }
};

    // Stepper 3 Variables
    const [ResponseType, setResponseType] = useState(true);
    const [activeSections, setActiveSections] = useState<string[]>([]); // Track active sections
    const [orderedSections, setOrderedSections] = useState<string[]>([]); // Track order of active sections

    const toggleSection = (section: string) => {
        setActiveSections((prev) => {
            if(section==='Skills'){
                if (prev.filter((s) => s === 'Skills').length< 1) {
                    setOrderedSections((prevOrder) => [...prevOrder, section]); // Add section to order 
                    return [...prev, section]; // Add section if not active
                }
                if (prev.filter((s) => s === 'Skills1').length< 1) {
                    setOrderedSections((prevOrder) => [...prevOrder, 'Skills1']); // Add section to order 
                    return [...prev, 'Skills1']; // Add section if not active
                }
                if (prev.filter((s) => s === 'Skills2').length< 1) {
                    setOrderedSections((prevOrder) => [...prevOrder, 'Skills2']); // Add section to order 
                    return [...prev, 'Skills2']; // Add section if not active
                }
              
            }else if (section==='Languages'){
                if (prev.filter((s) => s === "Languages" ).length<1) {
                    setOrderedSections((prevOrder) => [...prevOrder, "Languages"]); // Add section to order
                    return [...prev, "Languages"]; // Add section if not active
                }
                if (prev.filter((s) => s === "Languages1" ).length<1) {
                    setOrderedSections((prevOrder) => [...prevOrder, "Languages1"]); // Add section to order
                    return [...prev, "Languages1"]; // Add section if not active
                }
                if (prev.filter((s) => s === "Languages2" ).length<1) {
                    setOrderedSections((prevOrder) => [...prevOrder, "Languages2"]); // Add section to order
                    return [...prev, "Languages2"]; // Add section if not active
                }
            } else {
                 if (prev.includes(section)) {
                setOrderedSections((prevOrder) => prevOrder.filter((s) => s !== section)); // Remove from order   
                return prev.filter((s) => s !== section); // Remove section if already active
                
            } else {
                if (!prev.includes(section)) {
                    setOrderedSections((prevOrder) => [...prevOrder, section]); // Add section to order 
                    return [...prev, section]; // Add section if not active
                }
            }
               
            }
            return prev
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleDescriptionChange = (content: string) => {
        setFormData({
            ...formData,
            description: content
        });
    };


    const handleNext = () => {
        setScreenLoading(true);
        setTimeout(() => {
            setScreenLoading(false);
        }, 3000);

        if (currentStep === 1) {
            let hasError = false; // Track if there are any errors

            if (formData.Job_title.length < 3) {
                setError((prev) => ({ ...prev, Job_title: 'Job Title must be at least 3 Characters' }));
                hasError = true; // Set error flag
            } else {
                setError((prev) => ({ ...prev, Job_title: '' }));
            }

            if (formData.Company.length < 3) {
                setError((prev) => ({ ...prev, Company: 'Company Name Must be Written' }));
                hasError = true; // Set error flag
            } else {
                setError((prev) => ({ ...prev, Company: '' }));
            }

            if (formData.Job_location.length < 3) {
                setError((prev) => ({ ...prev, Job_location: 'Job Location must be Defined' }));
                hasError = true; // Set error flag
            } else {
                setError((prev) => ({ ...prev, Job_location: '' }));
            }

            if (hasError) {
                setScreenLoading(false); // Stop loading if there are errors
                return; // Prevent moving to the next step
            }

            setSize(false);
        } 

        if(currentStep === 2){
            let hasError = false; // Track if there are any errors
            if(formData.description.length < 1 ){
                setError((prev) => ({ ...prev, description: 'Add Description of you Job For Better Experience and Make it understandable'}));
                hasError = true; // Set error flag
            }else{
                setError((prev) => ({ ...prev, description: '' }));
            }
            if(formData.Skills.length<1){
                setError((prev) => ({ ...prev, Skills: 'Add at least 1 Skill'}))
                hasError = true; // Set error flag
            }else{
                setError((prev) => ({ ...prev, Skills: '' }));
            }
            if(hasError){
                return;
            }
        }

       
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        
        if(currentStep === 2 ){
            setSize(true)
        } 
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        createJob(formData).then(
            res=>{
                makeToast('success',res.message)
                setModalOpened(false)
            }
        )
        console.log(formData)
    };

  return (
  <>{ScreenLoading?
  <><div style={{height:"450px"}}>
     <img style={currentStep===1?{width:"280px",marginTop:'30%'}:{width:"55%",marginLeft:'22%', }} src={Loader} alt="No Loader Found" />
  </div>
 
  </>:
   <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
                <div>
                    <div>
                          <label style={{fontSize:"14px",marginBottom:"5px", fontWeight:"600"}}>Job title</label>
                    <input  className='infoInput'   type="text" name="Job_title" style={{padding:"10px 8px", width:'90%'}} value={formData.Job_title} onChange={handleChange} placeholder="Add the Title you are " />
                    {Error.Job_title && <p style={{fontSize:"10px", color:"red", margin:'0px'}}>{Error.Job_title}</p>}
                    </div>
                  
                    <label style={{fontSize:"14px", marginTop:"10px", marginBottom:"5px" , fontWeight:"600"}}>Company Name </label>
                    <input   className='infoInput'  type="text" name="Company" style={{padding:"10px 8px", width:'90%'}} value={formData.Company} onChange={handleChange} placeholder="Company" />
                    {Error.Company && <p style={{fontSize:"10px", color:"red", margin:'0px'}}>{Error.Company}</p>}
                    
                    <label style={{fontSize:"14px", marginTop:"10px", marginBottom:"5px" , fontWeight:"600"}}>Workplace Type </label>
                    {/* <input  className='infoInput'   type="text" name="Workplace_type"  style={{padding:"10px 8px", width:'90%'}}  value={formData.Workplace_type} onChange={handleChange} placeholder="Workplace Type" /> */}
                    
                    
                    <select className='infoInput' style={{padding:"10px 8px", width:'90%', color:'black'}} value={formData.Workplace_type}  onChange={(e)=>{
                        setFormData({...formData, Workplace_type: e.target.value || 'On-site'})
                    }} >
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                    </select>
                    <label style={{fontSize:"14px", marginTop:"10px", marginBottom:"5px" , fontWeight:"600"}}> Location </label>
                    <input list='location'   className='infoInput'  type="text" name="Job_location"  style={{padding:"10px 8px", width:'90%'}}  value={formData.Job_location} onChange={handleChange} placeholder="Job Location" />
                    <datalist id = 'location'>
                    <option value="Lahore, Punjab, Pakistan" />
                    <option value="Islamabad, Punjab, Pakistan" />
                    <option value="Multan, Punjab, Pakistan" />
                    <option value="Rawalpindi, Punjab, Pakistan" />
                    <option value="Karachi, sindh, Pakistan" />                    
                    </datalist>
                    
                    {Error.Job_location && <p style={{fontSize:"10px", color:"red", margin:'0px'}}>{Error.Job_location}</p>}
                    
                    <label style={{fontSize:"14px", marginTop:"10px", marginBottom:"5px" , fontWeight:"600"}}> Job Type </label>
                    {/* <input   className='infoInput'  type="text" name="Job_type"  style={{padding:"10px 8px", width:'90%'}}  value={formData.Job_type} onChange={handleChange} placeholder="Job Type" /> */}
                    <select className='infoInput' style={{padding:"10px 8px",  width:'90%', color:'black'}}  name="Job_type" value={formData.Job_type}  onChange={(e)=>{
                        setFormData({...formData, Workplace_type: e.target.value || 'Full-time'})
                    }} >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                        <option value="Other">Other</option>
                    </select>
                    <button className='button r-button' type="button" style={{width:"250px", marginTop:"30px"}} onClick={handleNext}>Next</button>
                </div>
            )}
            {currentStep === 2 && (
                <div>
                    <h2 style={{fontSize:"18px", fontWeight:'600', marginLeft:'20px', marginBottom:"0" }}>Job Detail Description </h2>
                  <div className="quill-editor-container">
                  <ReactQuill className='quill-editor' value={formData.description} onChange={handleDescriptionChange} />
                    </div>
                    {Error.description && <p style={{fontSize:"10px", color:"red", margin:'0px'}}>{Error.description}</p>}
                   
                    <div className='input-container'>
                        <label style={{fontSize:"16px",marginBottom:"5px", fontWeight:"600"}}>Skills <span style={{fontSize:"14px", fontWeight:"400"}}>(Add minimum 5 skills. This is for search )</span> </label>
                        <div style={{display:"flex", gap:"20px", textAlign:"start", justifyItems:"start",justifyContent:"start", margin:'0', padding:"0"}}>
                             {formData.Skills.map((skill, index) => (
                                <div key={index}  style={{background:'orange', borderRadius:"10px", padding:"5px 10px"}} >
                                  <span style={{color:"white"}}>{skill}</span> <span style={{cursor:"pointer", color:'white'}} onClick={() => setFormData({...formData, Skills: formData.Skills.filter((s, i) => i !== index)})}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg></span>
                                </div>
                                
                            ))} 
                        </div>
                       
                        <div className='skills-input-container'>
                            <input 
                            className='skills-input'
                                id='text-input'
                                type="text" 
                                placeholder="Skills" 
                                onKeyDown={(e:any) => {
                                    if (e.key === 'Enter') {
                                      const value = e.target.value;
                                      if (value !== '' && !formData.Skills.includes(value)) {
                                        setFormData({...formData, Skills: [...formData.Skills, value]});
                                        e.target.value = '';
                                      }
                                    }
                                  }}
                            />
                            <div 
                                onClick={() => {
                                    const value = (document.querySelector('#text-input') as HTMLInputElement)?.value;
                                    if (value !== '' && !formData.Skills.includes(value)) {
                                        setFormData({...formData, Skills: [...formData.Skills, value]});
                                        (document.querySelector('.text-input') as HTMLInputElement).value = '';
                                    }
                                }}
                                style={{marginLeft: '10px'}}
                            >
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>
                            </div>
                        </div>
                        {Error.skills && <p style={{fontSize:"10px", color:"red", margin:'0px'}}>{Error.skills}</p>}
                  
                        
                    </div>
                  
                    <div className="button-container">
                        <button className='button r-button' type="button" onClick={handleBack}>Back</button>
                        <button className='button r-button' type="button" onClick={handleNext}>Next</button>
                    </div>
                </div>
            )}
            {currentStep === 3 && (
                <div >
                    <h4 style={{marginBottom:"20px"}}>Applicant collection </h4>

                 <div className='row'>
                    <div className='input-container'>
                    <label style={{fontSize:"14px",marginBottom:"5px", fontWeight:"600"}}>Email/Website</label> 
                    
                    <input   className='infoInput text-input' style={{border:'1px solid orange'}}  type="text" name="email_website" value={formData.email_website} onChange={handleChange} placeholder="Email/Website" />
                    </div>
                    <div style={{
                        margin:"20px"
                    }}> 
                          <h4>
                          Screening questions
                    </h4>
                  <span>
                      We recommend adding 3 or more questions. Applicants must answer each question.
                  </span>
                    </div>
                  
                   {orderedSections.map((section) => (
                    activeSections.includes(section) && <div className='option-card' key={section}>
                         {section === 'Education' && (
                           <>
                           
                        <div className='box-1' style={{justifyContent:'space-between'}}>
                            <h6>Have you completed the following level of education: [Degree]?</h6>
                            <svg  onClick={() => {
                                        handleSectionClose('Education');
                                    }}
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                        <div className='box-2'>
                            <div>
                                <span style={{marginLeft:"13px"}}>  Degree<span>*</span></span>
                                <input list='programSuggestions' className='infoInput text-input'  type="text" name="degree"  onChange={(e) => handleEducationChange('degree', e.target.value)}  placeholder="Degree" />
                                <datalist id="programSuggestions">
                                    <option value="Computer Science" />
                                    <option value="Information Technology" />
                                    <option value="Software Engineering" />
                                    <option value="Data Science" />
                                    <option value="Cyber Security" />
                                </datalist>
                            </div>
                            <div style={{display:'flex', flexDirection:"column" }}>
                                <span style={{fontSize:"16px", fontWeight:"500"}}>
                                Semester <span style={{fontSize:"12px"}}>(Ideal answer)</span>:
                                </span>
                                <input  className='infoInput text-input'  type="number" name='semester' onChange={(e) => handleEducationChange('semester', e.target.value)}  value={formData.education.semester} placeholder='Minimum Semester' />
                            </div>
                            <div style={{marginTop:"25px"}}>
                                <input type="checkbox" name="required" onChange={(e) => handleEducationChange('required', e.target.checked)}  style={{transform: 'scale(1.5)', margin: '0 5px'}} />
                                Must–have qualification
                            </div>
                        </div>
                       
                    
                           </>
                        )}


                        {section === 'Skills' && (
                           <>
                           
                        <div className='box-1' style={{justifyContent:'space-between'}}>
                            <h6>How many Levels of Quiz you completed of this [Skill]?</h6>
                            <svg  onClick={() => {
                                        handleSectionClose('Skills');
                                    }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                        <div className='box-2'>
                            <div>
                                <span style={{marginLeft:"13px"}}>  Skill<span>*</span></span>
                                <input list='skills'  className='infoInput text-input'  type="text" name="skill" onChange={(e) => handleSkillChange(0, e.target.name, e.target.value)}  placeholder="Skill" />
                                    <datalist id='skills'>
                                        <option value="Python"></option>
                                        <option value="Data Science"></option>
                                        <option value="Java"></option>
                                        <option value="C/C++"></option>
                                    </datalist>

                            </div>
                            <div style={{width:"150px"}}>
                                <span>
                                Ideal answer:(1-5)
                                </span>
                                <input  min={1} max={5} name='level'  placeholder='0' style={{width:"60px", marginTop:'12px', height:"30px", marginLeft:"10px"}} type="number" onChange={(e) => handleSkillChange(0, e.target.name, e.target.value)}  />
                                
                            </div>
                            <div style={{marginTop:"25px"}}>
                                <input type="checkbox" name="required" 
                                 onChange={(e) => handleSkillChange(0, e.target.name, e.target.checked)}  style={{transform: 'scale(1.5)', margin: '0 5px'}} />
                                Must–have qualification
                            </div>
                        </div>
                       
                    
                           </>
                        )}

                        {section === 'Skills1' && (
                       <>
                           
                       <div className='box-1' style={{justifyContent:'space-between'}}>
                           <h6>How many Levels of Quiz you completed of this [Skill]?</h6>
                           <svg  onClick={() => {
                                       handleSectionClose('Skills1');
                                   }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                           <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                           </svg>
                       </div>
                       <div className='box-2'>
                           <div>
                               <span style={{marginLeft:"13px"}}>  Skill<span>*</span></span>
                               <input list='skills'  className='infoInput text-input'  type="text" name="skill" onChange={(e) => handleSkillChange(1, e.target.name, e.target.value)}  placeholder="Skill" />
                           </div>
                           <div style={{width:"150px"}}>
                               <span>
                               Ideal answer:(1-5)
                               </span>
                               <input  min={1} max={5} name='level'  placeholder='0' style={{width:"60px", marginTop:'12px', height:"30px", marginLeft:"10px"}} type="number" onChange={(e) => handleSkillChange(1, e.target.name, e.target.value)}  />
                           </div>
                           <div style={{marginTop:"25px"}}>
                               <input type="checkbox" name="required" id="educationChecked" onChange={(e) => handleSkillChange(1, e.target.name, e.target.checked)}  style={{transform: 'scale(1.5)', margin: '0 5px'}} />
                               Must–have qualification
                           </div>
                       </div>
                      
                   
                          </>
                        )}

                        {section === 'Skills2' && (
                              <>
                           
                              <div className='box-1' style={{justifyContent:'space-between'}}>
                                  <h6>How many Levels of Quiz you completed of this [Skill]?</h6>
                                  <svg  onClick={() => {
                                              handleSectionClose('Skills2');
                                          }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                  </svg>
                              </div>
                              <div className='box-2'>
                                  <div>
                                      <span style={{marginLeft:"13px"}}>  Skill<span>*</span></span>
                                      <input  list='skills' className='infoInput text-input'  type="text" name="skill" onChange={(e) => handleSkillChange(2, e.target.name, e.target.value)}  placeholder="Skill" />
                                  </div>
                                  <div style={{width:"150px"}}>
                                      <span>
                                      Ideal answer:(1-5)
                                      </span>
                                      <input  min={1} max={5} name='level'  placeholder='0' style={{width:"60px", marginTop:'12px', height:"30px", marginLeft:"10px"}} type="number" onChange={(e) => handleSkillChange(2, e.target.name, e.target.value)}  />
                                  </div>
                                  <div style={{marginTop:"25px"}}>
                                      <input type="checkbox" name="required" id="educationChecked" onChange={(e) => handleSkillChange(2, e.target.name, e.target.checked)}  style={{transform: 'scale(1.5)', margin: '0 5px'}} />
                                      Must–have qualification
                                  </div>
                              </div>
                             
                          
                                 </>
                        )}



                        {section === 'HybridWork' && (
                            // Hybrid Work content
                            <>
                            
                        <div className='box-1' style={{justifyContent:'space-between'}}>
                            <h6>Are you comfortable working in a hybrid setting?</h6>
                            <svg onClick={()=>{handleSectionClose('HybridWork')}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                        <div className='box-2'>
                        
                            <div style={{width:"110px"}}>
                                <span>
                                Ideal answer:
                                </span>
                                <span> Yes</span>
                                </div>
                            <div style={{marginTop:"25px"}}>
                                <input type="checkbox" name="educationChecked" id="educationChecked" onChange={(e) => {

                                }} style={{transform: 'scale(1.5)', margin: '0 5px'}} />
                                Must–have qualification
                            </div>
                        </div>
                       
                    
                            </>
                        )}
                        {section === 'Languages' && (
                            // Language content
                            <>
                            
                        <div className='box-1' style={{justifyContent:'space-between'}}>
                            <h6>What is your level of proficiency in [Language]?</h6>
                            <svg 
                               onClick={()=>{handleSectionClose('Languages')}}
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                        <div className='box-2'>
                            <div>
                                <span style={{marginLeft:"13px"}}>  Language<span>*</span></span>
                                <input  list='Language' className='infoInput text-input'  type="text" name="language"  onChange={(e) => handleLanguageChange(0, e.target.name, e.target.value)} placeholder="English, Urdu, Hindi...." />
                                <datalist id='Language'>
                                        <option value="English"></option>
                                        <option value="Urdu"></option>
                                        <option value="Hindi"></option>
                                    </datalist>
                            </div>
                            <div style={{width:'150px'}}>
                                <span style={{fontSize:"16px", fontWeight:"500"}}>
                                Ideal answer:
                                </span>
                                <select name="proficiency"  onChange={(e) => { handleLanguageChange(0, 'proficiency', e.target.value)}}  className='select-option' id="">
                                    <option value="None">None</option>
                                    <option value="Conversational">Conversational</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Native or bilingual">Native or bilingual</option>
                                
                                </select>
                            </div>
                            <div style={{marginTop:"25px"}}>
                                <input type="checkbox" name="required" onChange={(e) => handleLanguageChange(0, 'required', e.target.checked)}  style={{transform: 'scale(1.5)', margin: '0 5px'}}  />
                                Must–have qualification
                            </div>
                        </div>
                       
                    
                            </>
                        )}

                        {section === 'Languages1' && (
                            // Language content
                            <>
                            
                            <div className='box-1' style={{justifyContent:'space-between'}}>
                                <h6>What is your level of proficiency in [Language]?</h6>
                                <svg 
                                   onClick={()=>{handleSectionClose('Languages1')}}
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                            <div className='box-2'>
                                <div>
                                    <span style={{marginLeft:"13px"}}>  Language<span>*</span></span>
                                    <input list='Language'  className='infoInput text-input'  type="text" name="language"  onChange={(e) => handleLanguageChange(1, e.target.name, e.target.value)} placeholder="English, Urdu, Hindi...." />
                                </div>
                                <div style={{width:'150px'}}>
                                    <span style={{fontSize:"16px", fontWeight:"500"}}>
                                    Ideal answer:
                                    </span>
                                    <select name="proficiency"  onChange={(e) => { handleLanguageChange(1, 'proficiency', e.target.value)}}  className='select-option' id="">
                                        <option value="None">None</option>
                                        <option value="Conversational">Conversational</option>
                                        <option value="Professional">Professional</option>
                                        <option value="Native or bilingual">Native or bilingual</option>
                                    
                                    </select>
                                </div>
                                <div style={{marginTop:"25px"}}>
                                    <input type="checkbox" name="required" onChange={(e) => handleLanguageChange(1, 'required', e.target.checked)}  style={{transform: 'scale(1.5)', margin: '0 5px'}}  />
                                    Must–have qualification
                                </div>
                            </div>
                           
                        
                                </>
                        )}
                         {section === 'Languages2' && (
                            // Language content
                            <>
                            
                            <div className='box-1' style={{justifyContent:'space-between'}}>
                                <h6>What is your level of proficiency in [Language]?</h6>
                                <svg 
                                   onClick={()=>{handleSectionClose('Languages2')}}
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                            <div className='box-2'>
                                <div>
                                    <span style={{marginLeft:"13px"}}>  Language<span>*</span></span>
                                    <input  list='Language' className='infoInput text-input'  type="text" name="language"  onChange={(e) => handleLanguageChange(2, e.target.name, e.target.value)} placeholder="English, Urdu, Hindi...." />
                                </div>
                                <div style={{width:'150px'}}>
                                    <span style={{fontSize:"16px", fontWeight:"500"}}>
                                    Ideal answer:
                                    </span>
                                    <select name="proficiency"  onChange={(e) => { handleLanguageChange(2, 'proficiency', e.target.value)}}  className='select-option' id="">
                                        <option value="None">None</option>
                                        <option value="Conversational">Conversational</option>
                                        <option value="Professional">Professional</option>
                                        <option value="Native or bilingual">Native or bilingual</option>
                                    
                                    </select>
                                </div>
                                <div style={{marginTop:"25px"}}>
                                    <input type="checkbox" name="required" onChange={(e) => handleLanguageChange(2, 'required', e.target.checked)}  style={{transform: 'scale(1.5)', margin: '0 5px'}}  />
                                    Must–have qualification
                                </div>
                            </div>
                           
                        
                                </>
                        )}
                        {section === 'JobLocation' && (
                            // Job Location content
                            <>
                            
                        <div className='box-1' style={{justifyContent:'space-between'}}>
                            <h6>Are you comfortable commuting to this job's location?</h6>
                            <svg   onClick={()=>{handleSectionClose('JobLocation')}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                        <div className='box-2'>
                        
                            <div style={{width:"110px"}}>
                                <span>
                                Ideal answer:
                                </span>
                                <span> Yes</span>
                                </div>
                            <div style={{marginTop:"25px"}}>
                                <input type="checkbox" name="comfort_location"  onChange={(e) => {
                                    setFormData({...formData, 'comfort_location':e.target.checked})
                                }}  style={{transform: 'scale(1.5)', margin: '0 5px'}} />
                                Must–have qualification
                            </div>
                        </div>
                       
                    
                            </>
                        )}
                        {section === 'CustomQuestion' && (
                            // Custom Question content
                            <>
                            
                        <div className='box-1' style={{justifyContent:'space-between'}}>
                            <h6>Write a custom screening question.</h6>
                            <svg  onClick={()=>{handleSectionClose('CustomQuestion')}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                        
                        <div >
                            
                                <span style={{marginLeft:"13px"}}> Question<span>*</span></span>
                            <textarea name="custom-question" className='infoInput' style={{width:"100%"}} placeholder='Try asking a question like, "Will you be able to bring your own device?"' 
                            onChange={(e)=>{handleCustomQuestion('question', e.target.value)}}
                            ></textarea>
                            <div className='box-2'>
                            <div style={{width:"120px"}}>
                                <span style={{fontSize:"16px", fontWeight:"500"}}>
                               Response Type:
                                </span>
                                <select className='select-option' style={{padding:"5px"}} onChange={(e)=>{
                                    if(e.target.value==='true'){
                                        handleCustomQuestion('response_type', "Yes/No")
                                        setResponseType(true)
                                    }else{
                                        handleCustomQuestion('response_type', "Numeric")
                                        setResponseType(false)
                                    }
                                }} name="" id="">
                                    <option value="true">Yes/No</option>
                                    <option value="false">Numeric</option>
                                </select>
                            </div>
                            {ResponseType ?
                                <div style={{width:"120px"}}>
                                <span style={{fontSize:"16px", fontWeight:"500"}}>
                                Ideal answer:
                                </span>
                                <select className='select-option' style={{padding:"5px"}} name="" id="" onChange={(e)=>{
                                     handleCustomQuestion('ideal_ans',e.target.value )
                                }}> 
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>:
                            
                            <div style={{width:"180px"}}>
                                <span style={{fontSize:"16px", fontWeight:"500"}}>
                                Ideal answer (minimum):
                                </span>
                                <input  min={1}  onChange={(e)=>{
                                     handleCustomQuestion('ideal_ans',e.target.value )
                                }} style={{width:"60px", marginTop:'12px', height:"30px", marginLeft:"10px"}} type="number" /> 
                            </div>
                            
                            }
                            <div style={{marginTop:"25px"}}>
                                <input type="checkbox" name="educationChecked" id="educationChecked" onChange={(e) => {}}  style={{transform: 'scale(1.5)', margin: '0 5px'}}  />
                                Must–have qualification
                            </div>
                        </div>
                           
                        </div>
                       
                    
                            </>
                        )}
                    </div>
                   ))}
                 
                    <div  className='question-button-container'>
                         <button onClick={(e) => {
                             e.preventDefault();
                            toggleSection('Education')}} className={activeSections.includes('Education') ? "button-clicked" : "button-active"}>
                         Education
                         </button>
                         <button onClick={(e) =>{ e.preventDefault(); toggleSection('Skills')}} className={activeSections.includes('Skills') ? "button-clicked" : "button-active"}>
                         Expertise With Skill
                         </button>
                         <button onClick={(e) => {  e.preventDefault();
                             toggleSection('HybridWork'); 
                             setFormData(prevFormData => ({ ...prevFormData, hybrid_work: !prevFormData.hybrid_work }));
                         }} className={activeSections.includes('HybridWork') ? "button-clicked" : "button-active"}>
                         Hybrid Work
                         </button>
                         <button onClick={(e) =>{ e.preventDefault(); toggleSection('Languages')} } className={activeSections.includes('Languages') ? "button-clicked" : "button-active"}>
                         Language
                         </button>
                        
                         <button onClick={(e) => {  e.preventDefault();
                             toggleSection('JobLocation');
                              
                             setFormData(prevFormData => ({ ...prevFormData, comfort_location: !prevFormData.comfort_location }));
                         }} className={activeSections.includes('JobLocation') ? "button-clicked" : "button-active"}>
                         Job Location
                         </button> 
                         <button onClick={(e) =>{ e.preventDefault(); toggleSection('CustomQuestion')}} className={activeSections.includes('CustomQuestion') ? "button-clicked" : "button-active"}>
                         Custom Question
                         </button>
                    </div>
                 
                        
                 
                  
                 </div >

                 <div className='button-container'>
                 <button className='button r-button' type="button" onClick={handleBack}>Back</button>
                    <button className='button r-button' type="submit">Create Job</button>
                 </div>
                </div>
            )}
        </form>}

  </>
  );
}

export default CreateJob;