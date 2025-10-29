import React, { useState, useEffect } from "react";
import { fetchUserById } from "../..";
import Profile from "../../img/profile.jpg";
interface ConversationProps {
  data: {
    members: string[];
  };
  currentUser: any;
  online: boolean;
}

// const Api =  import.meta.env.? import.meta.env.VITE_API_URL:'http://localhost:3000/';
const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';


const Conversation: React.FC<ConversationProps> = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState<any>(null); // Replace 'any' with a specific type if available
  const REACT_APP_PUBLIC_FOLDER = `${Api}uploads/profile/`;
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);

    const getUserData = async () => {
      fetchUserById(userId).then(res=>{
        if(res){
            setUserData(res);
            console.log("userId:" +userId)
        }
      
      })
    };

    getUserData();
  }, [data.members, currentUser]); // Added dependencies for useEffect

  return (
    <>
      <div className="follower conversation" style={{margin:"0"}}>
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={ userData?.profile? REACT_APP_PUBLIC_FOLDER  + userData?.profile: Profile }
            alt="Profile"
            className="followerImage" loading="lazy"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>{userData?.name}</span>
            <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec",margin:"0" }} />
    </>
  );
};

export default Conversation;