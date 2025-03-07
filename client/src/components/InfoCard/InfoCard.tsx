import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";

import { handleLogout } from "../Navbar/Navbar";

interface userPorps{
  user:any
}
export const StarRating = ({ level }: { level: number }) => {
  const maxStars = 5; // Total number of stars
  const filledStars = Math.min(level, maxStars); // Number of filled stars
  const unfilledStars = maxStars - filledStars; // Number of unfilled stars

  return (
    <div>
      {/* Render filled stars */}
      {Array(filledStars).fill(null).map((_, index) => (
        <span key={`filled-${index}`}>&#9733;</span> // Unicode for filled star
        
      ))}

      {/* Render unfilled stars */}
      {Array(unfilledStars).fill(null).map((_, index) => (
        <span key={`unfilled-${index}`}>&#9734;</span> // Unicode for unfilled star
      ))}
      <div>
        {level+"/"+maxStars}
      </div>
    
    </div>
  );
};
const WhatsAppLink = ({ phoneNumber, message }:any) => {
  const contact = phoneNumber.startsWith('0') ? `+92${phoneNumber.slice(1)}` : phoneNumber;
  // Format the WhatsApp URL with the phone number and optional message
  const whatsappUrl = `https://wa.me/${contact}?text=${encodeURIComponent(message)}`;
 
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      {phoneNumber}
    </a>
  );
};
const InfoCard:React.FC<userPorps> = ({user}) => { 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const currentUserId = localStorage.getItem('userId');
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
      {user._id === currentUserId && <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened} user={user}/>
        </div>}
      </div>
{
  user.roleAs === "Student" ?<>
  <div className="info">
    <span>
      <b>University: </b>
    </span>
    <span>{user.university.name}</span>
    

    </div>
    <div className="info">
      <span><b>Registration No: </b>
    </span>
    <span>{user.registrationNo}</span>

  </div>
  <div className="info">
    <span>
      <b>Department: </b>
    </span>
    <span>{user.program}</span>
  </div>
  <div className="info">
    <span>
      <b>Semester: </b>
    </span>
    <span>{user.semester}</span>
    
  </div>
    <div className="info">
      <span>
        <b>CGPA: </b>
      </span>
      <span>{user.cgpa}</span>
    </div>
    <div className="info">
      <span  className="collapsible" onClick={()=>{setIsCollapsed(!isCollapsed)}} >
         <b>Skills: </b>{
          isCollapsed ?
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
</svg>:
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>}
</span>
       <span>
       { isCollapsed && 
       <span className="content">{user.skills.map((skill:any)=>{
          return <div key={user.skills.skillName} onClick={()=>{window.location.href=`/quiz`}} style={{cursor:"pointer"}}>
            <br/>{skill.skillName}
            <StarRating level={skill.skillLevel-1} />
            </div>
        })}</span>}
      </span>
      
    </div>
  </>:
  <>
 <div className="info">
        <span>
          <b>Contact: </b>
        </span>
        <WhatsAppLink 
        phoneNumber={user.contact} 
        message="Hello, I would like to inquire about your services." 
      />
      </div>

      <div className="info">
        <span>
          <b>Located in: </b>
        </span>
        <span>{user.userLocation}</span>
      </div>

      <div className="info">
        <span>
          <b>Website </b>
        </span>
        <span><a href={user.Website_URL}>{user.Website_URL}</a></span>
      </div>
</>
     
}
{ user._id === currentUserId ?
      <button onClick={handleLogout} className="button logout-button">Logout</button>:<div style={{marginBottom:"2rem"}}></div>
}    </div>
  );
};

export default InfoCard;