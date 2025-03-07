import React, { useEffect, useState } from 'react';
import './DonutChart.css'
import axios from 'axios';
// Define the types for the props
interface DonutChartProps {
  correctPercentage: number;
  wrongPercentage: number;
   newSkillLevel:number;
   skillName:string
}

// Define the DonutChart component
const DonutChart: React.FC<DonutChartProps> = ({ correctPercentage, wrongPercentage,  newSkillLevel,skillName }) => {
 const currentId  = localStorage.getItem('userId');
 const [tryAgain,setTryAgain]  = useState(false);
    // Ensure percentages sum to 100 for proper display
  const totalPercentage = correctPercentage + wrongPercentage ;
  const unansweredPercentage = 100 - totalPercentage;
  // Calculate colors
  const correctColor = '#00FF00'; // Green
  const wrongColor = '#FF0000';   // Red
  const unansweredColor = '#808080'; // Grey

  useEffect(() =>{
    const updateResult = async() => {
        const marksUpdate = correctPercentage;
    try {
        const response = await axios.put(`http://localhost:3000/api/quiz/updateResult/${currentId}`,{marksUpdate,newSkillLevel,skillName})
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }        
    }
    if(correctPercentage >= 75){
        updateResult();
        setTryAgain(false);
    }else{
        setTryAgain(true);
    }
   
  },[correctPercentage])
  // Calculate the color stops based on the percentages
  var gradient;
  if(tryAgain){
     gradient = `conic-gradient(
      
        ${wrongColor} 0% ${wrongPercentage}% ,  
        ${correctColor} ${wrongPercentage}%  ${wrongPercentage+correctPercentage}%, 
        ${unansweredColor} ${correctPercentage + wrongPercentage}% 100%
      )`;
  }else{
   gradient = `conic-gradient(
    ${correctColor} 0% ${correctPercentage}%, 
    ${wrongColor} ${correctPercentage}% ${correctPercentage + wrongPercentage}%, 
    ${unansweredColor} ${correctPercentage + wrongPercentage}% 100%
  )`;
}
  return (
    <div className="dashboard">
      <h3>Overall Performance</h3>
      <div style={{display:'flex',alignItems:'center',gap:"20px" , justifyContent:"center", marginTop:"50px", marginBottom:"30px"}}>
       <div className="donut-chart">
        <div
          className="donut"
          style={{ background: gradient }}
        >
        
        </div>  
        {tryAgain === true?<>
            <div className="percentage">Try Again</div>
        </>:
        <div className="percentage">{correctPercentage}%</div>
      }</div>
      <div className="legend">
        <div><span className="correct"></span> Correct answer ({correctPercentage}%)</div>
        <div><span className="wrong"></span> Wrong answer ({wrongPercentage}%)</div>
        <div><span className="unanswered"></span> Unanswered ({unansweredPercentage}%)</div>
      </div>  
    
      </div>
      {tryAgain?<>
      <div style={{display:'flex',alignItems:'center',gap:"30px" , justifyContent:"center"}}>
            <button className='red-button' onClick={()=>{window.location.reload()}}>Try Again</button>
        {/* <button className='green-button' > Details</button> */}
      </div>
    
      </>:
       <div style={{display:'flex',alignItems:'center',gap:"30px" , justifyContent:"center"}}>
        <button className='green-button' onClick={()=>{window.location.reload()}} >Next</button>
   {/* <button className='green-button' > Details</button> */}
 </div>
     
      }
    </div>
  );
};

export default DonutChart;
