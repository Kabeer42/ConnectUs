import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Profile from "../../img/profile.jpg";
import axios from 'axios';

interface StudentProps {
    connectedStd: any;
}
const socket = io('http://localhost:3000');
const UniversityStudents: React.FC<StudentProps> = ({ connectedStd }) => {
    const [isAccept, setisAccept] = useState(true);
    const currentUserId = localStorage.getItem('userId');
   
    const acceptStudent = async () => {
        setisAccept(true);
    }

    return (
        <div className="follower">
            <div onClick={()=>{window.location.href=`/profile/${connectedStd._id}`}} style={{cursor:"pointer" }}>
                <img 
                    src={connectedStd.profile ? `http://localhost:3000/uploads/profile/${connectedStd.profile}` : Profile} 
                    alt={connectedStd.profile} 
                    className='followerImage' 
                />
                <div className="name">
                    <span>{connectedStd.name}</span>
                    <span>{connectedStd.roleAs}</span>
                </div>
            </div>
        {
             isAccept ?
            <div>
            <button 
            onClick={() => acceptStudent()} 
            className='button fc-button'
        >
            Accepted
        </button> 
        </div>
    :<>
    
    </>    
    }
           
            
        </div>
    );
};

export default UniversityStudents;
