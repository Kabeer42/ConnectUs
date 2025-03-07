import React, { useEffect, useState } from 'react';


import './JobView.css';
import LeftJobCard from './LeftJobCard';
import { GetJobPosts, GetJobPostsByRelatedKeywordsAndLocation } from '../..';
import RightSide from './RightSide';
import axios from 'axios';
import { filterJobByDate, filterJobByJobType, filterJobByLocation, filterJobByWorkType } from './JobFilter';
const JobView = () => {
const [JobData, setJobData]= useState<any[]>([])

    const [jobId, setJobId] = useState('');
    const [SearchSkills , setSearchSkills ] = useState('');
    const [Location , setLocation ] = useState('');
    const [DatePosted , setDatePosted ] = useState(false);
    const [Jobtype , setJobtype ] = useState(false);
    const [LocationButton , setLocationButton ] = useState(false);
    const [WorkPlaceButton , setWorkPlaceButton ] = useState(false);
    const [PayButton , setPayButton ] = useState(false);
    const [Overlay , setOverlay ] = useState(false);
    const [SearchDropdown , setSearchDropdown] = useState(false);
    const [LocationDropdown , setLocationDropdown] = useState(false);


    // Filter Data
const [FilterDate, setFilterDate]= useState('')
const [FilterJobType, setFilterJobType]= useState('')
const [FilterLocation, setFilterLocation]= useState('')
const [FilterWorkPlaceType, setFilterWorkPlaceType]= useState('')
const [FilterPay, setFilterPay]= useState('')
const [filteredItems, setFilteredItems] = useState<any[]>([]);
const [filterDays, setFilterDays] = useState<number>(); // default to 30 days
const [countJob, setCountJob ] = useState<number>(0);

// To fetch Job Data From Data Base First-Time
    useEffect(() => {
        const fetchAll = ()=>{
            GetJobPosts().then(
            res=>{
                setJobData(res) 
                if (res.length > 0) { 
                  
                    setJobId(JobData[0]._id); 
                   
                }
               
              
            }
        )
        }

        fetchAll();
         
    }, []);
    // To Assign the Job Data to Filter Item & also Assign the Job Id of First Item
    useEffect(()=>{
        setFilteredItems(JobData);
        if(JobData.length>0){
            setJobId(JobData[0]._id);
        }
        setCountJob(JobData.length)
    }, [JobData])
 
    // Set the JobData Filter By Date....
    useEffect(() => {
        if(JobData && filterDays){
            setFilteredItems( filterJobByDate(JobData, filterDays))
    
        }
    },[FilterDate])

    useEffect(()=>{
        
        setCountJob(filteredItems.length);
    
    },[filteredItems])
    // Filter Job By Location
    useEffect(()=>{
        setFilteredItems(filterJobByLocation(JobData, FilterLocation))
    },[FilterLocation])

    // Filter Job By Work Type
    useEffect(()=>{
        setFilteredItems(filterJobByWorkType(JobData, FilterWorkPlaceType))
    },[FilterWorkPlaceType])

    // Filter Job By Job-Type
    useEffect(()=>{
        setFilteredItems(filterJobByJobType(JobData, FilterJobType))
    },[FilterJobType])
    const handleFilter = () => {
        if(SearchSkills!= '' && Location != ''){
            GetJobPostsByRelatedKeywordsAndLocation(SearchSkills, Location).then(
                res=>{
                    setJobData(res)
                }
            )
        }else{
            const fetchAll = ()=>{
                GetJobPosts().then(
                res=>{
                    setJobData(res)
                }
            )
            }
    
            fetchAll();
             
        }
    };

  
    function closeAll(){
        setDatePosted(false);
        setPayButton(false),
        setJobtype(false);
        setLocationButton(false);
        setWorkPlaceButton(false);
        setLocationDropdown(false);
        setSearchDropdown(false);
        setOverlay(true);

        
    }
  return (<div  className='job-view-body'>
   {Overlay && <div className='overlay' onClick={()=>{
      closeAll()
      setOverlay(false);
        
      }} />}
        
    <hr />

    <div className='search-fluter-div'>
<div className='search-div'>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>  
    <input type="text" value={SearchSkills} onClick={()=>{
        setSearchDropdown(true)
        setOverlay(true)
        setLocationDropdown(false)
    }} placeholder='Job Title, Keywords, Skills' onChange={(e)=>{
        setSearchSkills(e.target.value)
      
    }} />
       {SearchDropdown && 
        <div className='suggest-dropdown' style={{left:"5%"}}>
            <ul>
                <li onClick={() => { setSearchSkills('Work from Home'); setSearchDropdown(false); }}>Work from Home</li>
                <li onClick={() => { setSearchSkills('Part-time'); setSearchDropdown(false); }}>Part time</li>
                <li onClick={() => { setSearchSkills('remote'); setSearchDropdown(false); }}>remote</li>
                <li onClick={() => { setSearchSkills('data entry'); setSearchDropdown(false); }}>data entry</li>
                <li onClick={() => { setSearchSkills('internship'); setSearchDropdown(false); }}>internship</li>
                <li onClick={() => { setSearchSkills('fresh graduate'); setSearchDropdown(false); }}>fresh graduate</li>
                <li onClick={() => { setSearchSkills('graphic designer'); setSearchDropdown(false); }}>graphic designer</li>
            </ul>
        </div>
    }
  {SearchSkills &&  <svg onClick={()=>{setSearchSkills('')}}  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>}
   
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg>
    <input 
        type="text" 
        placeholder='Lahore' 
        value={Location}
        onChange={(e)=>{
            setLocation(e.target.value)
        }}
        // onFocus={() => setLocationDropdown(true)}
        onClick={() =>{ setLocationDropdown(true), setOverlay(true),setSearchDropdown(false)}}
        
    />
    {LocationDropdown && 
        <div className='suggest-dropdown' style={{right: '39%'}}>
            <ul>
                <li onClick={() => { setLocation('Lahore'); setLocationDropdown(false); }}>Lahore</li>
                <li onClick={() => { setLocation('Karachi'); setLocationDropdown(false); }}>Karachi</li>
                <li onClick={() => { setLocation('Islamabad'); setLocationDropdown(false); }}>Islamabad</li>
                <li onClick={() => { setLocation('Rawalpindi'); setLocationDropdown(false); }}>Rawalpindi</li>
            </ul>
        </div>
    }
   {Location && <svg onClick={()=>{setLocation('')}}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>}

    <button onClick={handleFilter} className='button r-button'>
    Find Jobs
    </button>
</div>

<div className='filters'>
    <div  className='filter-button'>
       <button 
       
       onClick={
        ()=>{
         
            closeAll()
            setDatePosted((prev)=> !prev);
        }
       }
       
       className='button r-button' style={{width:"100%"}}>
  <span >{FilterDate ? FilterDate : "Date posted"}</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
</button> 
{
    DatePosted &&
<div className='filter-dropdown' style={{width:"100%"}}>
    <ul>
       <li onClick={() => { setFilterDate('Last 24 hours');setFilterDays(1); setDatePosted(false); 

       
        }}> Last 24 hours</li>
                <li onClick={() => { setFilterDate('Last 3 days'); setFilterDays(3); setDatePosted(false); }}>Last 3 days</li>
                <li onClick={() => { setFilterDate('Last 14 days'); setFilterDays(14); setDatePosted(false); }}>Last 14 days</li>
                <li onClick={() => { setFilterDate('Last 30 days');setFilterDays(30); setDatePosted(false); }}>Last 30 days</li>
                <li onClick={() => { setFilterDate('All Time');setFilterDays(190); setDatePosted(false); }}> All time</li>
    </ul>
</div>}
    </div>
<div className='filter-button'>
    <button
      onClick={
        ()=>{
            closeAll()
            setJobtype((prev)=> !prev);
            
        }
       }
       
    className='button r-button' style={{width:"100%"}}>
  <span > {FilterJobType? FilterJobType : "Job Type"}</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
</button>
{
    Jobtype &&
    <div className='filter-dropdown' style={{width:"100%"}}>
    <ul>
       <li onClick={() => { setFilterJobType('Full-time'); setJobtype(false); }}> Full Time</li>
                <li onClick={() => { setFilterJobType('Part-time'); setJobtype(false); }}>Part Time</li>
                <li onClick={() => { setFilterJobType('Contract'); setJobtype(false); }}>Contract</li>
                <li onClick={() => { setFilterJobType('Internship'); setJobtype(false); }}>Internship</li>
                <li onClick={() => { setFilterJobType('Temporary'); setJobtype(false); }}> Temporary</li>
    </ul>
</div>
    }
</div>

<div className='filter-button'>
  <button 
    onClick={
        ()=>{
            closeAll()
            setLocationButton((prev)=> !prev);

        }
       }
       
  className='button r-button'>
  <span >{FilterLocation ? FilterLocation : "Location"}</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
</button>  
{
    LocationButton &&
<div className='filter-dropdown' style={{width:"100%"}}>
    <ul>
       <li onClick={() => { setFilterLocation('Lahore'); setLocationButton(false); }}> Lahore</li>
                <li onClick={() => { setFilterLocation('Karachi'); setLocationButton(false); }}>Karachi</li>
                <li onClick={() => { setFilterLocation('Faisalabad'); setLocationButton(false); }}>Faisalabad</li>
                <li onClick={() => { setFilterLocation('Islamabad'); setLocationButton(false); }}>Islamabad</li>
                <li onClick={() => { setFilterLocation('Rawalpindi'); setLocationButton(false); }}> Rawalpindi</li>
    </ul>
</div>
}
</div>

<div className='filter-button'>
 <button
   onClick={
    ()=>{
        closeAll()
        setWorkPlaceButton((prev)=> !prev)
        
    }
   }
   
 className='button r-button'>
  <span > {FilterWorkPlaceType ? FilterWorkPlaceType : "WorkPlace Type"}</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
</button>   
{
    WorkPlaceButton &&
<div className='filter-dropdown' style={{width:"100%"}}>
    <ul>
       <li onClick={() => { setFilterWorkPlaceType('On-site'); setWorkPlaceButton(false); }}> On-site</li>
       <li onClick={() => { setFilterWorkPlaceType('Remote'); setWorkPlaceButton(false); }}>Remote</li>
       <li onClick={() => { setFilterWorkPlaceType('Hybrid'); setWorkPlaceButton(false); }}>Hybrid</li>
    </ul>
</div>
}
</div>

<div className='filter-button'>
 <button 
   onClick={
    ()=>{
        closeAll();
        setPayButton((prev)=> !prev);
        

    }
   }
   
 className='button r-button'>
  <span >{ FilterPay ? FilterPay :  "Pay"}</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>
</button>   
{
    PayButton &&
<div className='filter-dropdown' style={{width:"100%"}}>
    <ul>
       <li onClick={() => { setFilterPay('Paid'); setPayButton(false); }}> Paid</li>
       <li onClick={() => { setFilterPay('Un Paid'); setPayButton(false); }}>Un Paid</li>
    </ul>
</div>
}
</div>

</div>
<div>

</div>
    </div>
    <hr />
    <div className='job-list'>
        <div className='left-site-list'>
            <div>
            <p style={{fontSize:"12px"}}>fresh graduate computer science jobs in Lahore</p>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                 <p style={{fontSize:'14px', fontWeight:"400"}}>Sort by: <span>relevance</span>-<span>date</span></p>  
                 <p style={{fontSize:'14px', fontWeight:"400"}}> {countJob} jobs</p>
            </div>
            <div className='job-cart-list'>
                {
                   
                   filteredItems.map((data:any)=>(
                         <LeftJobCard key={data._id} data={data} setJobId={setJobId}/>
                    ))
                }
            
            </div>
          
           
            </div>

        </div>
        <div className='right-site-list' >
           <RightSide jobId={jobId} setJobId={setJobId}/>
        </div>
    </div>
  </div>
  
  );
}

export default JobView;
