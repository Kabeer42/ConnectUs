import React, { useEffect, useState } from 'react'
import makeToast from '../../pages/Tosater';
import axios from 'axios';
import { io } from 'socket.io-client';

interface AboutThisAccountModalProps{
    setAboutThisAccountModal:React.Dispatch<React.SetStateAction<boolean>>
    UserData:any
}

const AboutThisAccountModal:React.FC<AboutThisAccountModalProps> = ({setAboutThisAccountModal, UserData}) => {

const [User, setUser]  = useState<any>({});
useEffect(()=>{
  setUser(UserData);
},[]);
  const userId = UserData._id;
  // console.log(User);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    // Fetch follower count
    const socket = io('http://localhost:3000'); 
    const fetchFollowerCount = async () => {
        try{
        const response = await axios.get(`http://localhost:3000/api/user/followers/count/${userId}`);
        if(response.status === 200){
          // makeToast("success", "Follower count fetched successfully");
        setFollowerCount(response.data.count);
    }
  }catch(error){
    makeToast("error", "Error fetching follower count");
  }
  };

    // Fetch following count  
    const fetchFollowingCount = async () => {
        try{
        const response = await axios.get(`http://localhost:3000/api/user/following/count/${userId}`);
        if(response.status === 200){
        setFollowingCount(response.data.count);
    }
  }catch(error){
    makeToast("error", "Error fetching following count");
  }
  };

    fetchFollowerCount();
    fetchFollowingCount();

    // Listen for socket updates to adjust the counts in real-time
    socket.on("new-follower", () => {
        setFollowerCount(prevCount => prevCount + 1);
    });

    socket.on("follow-success", () => {
        setFollowingCount(prevCount => prevCount + 1);
    });

    socket.on("unfollowed", () => {
        setFollowerCount(prevCount => prevCount - 1);
    });

    socket.on("unfollow-success", () => {
        setFollowingCount(prevCount => prevCount - 1);
    });
}, [User]);

    const storage = `http://localhost:3000/uploads/profile/`
  return (

    <div style={{position:"fixed", borderRadius:"10px", width:"45%",paddingTop:"10px", top:'22%', left:"27%",  zIndex:"9",  background:"white", boxShadow:"0px 0px 10px 0px rgba(0, 0, 0, 0.5)",  justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
     <p style={{fontSize:"18px", fontWeight:"600", textAlign:"center"}}>
        About This Account
        </p> 
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <img src={storage + User.profile} style={{height:"90px", width:"90px", borderRadius:"50%", objectFit:"cover"}} alt="Profile" />
            <p style={{fontSize:"18px", fontWeight:"600", textAlign:"center", marginBottom:"0"}}>
                {User.name}
            </p>
            {User.roleAs === "Student" &&
            <p style={{fontSize:"14px", fontWeight:"400",color:"#808080", textAlign:"center", marginTop:"0"}}>
                Student At: <span style={{fontSize:"15px", fontWeight:"bold", color:"#000"}}>  {User.university.name}</span>
            </p>
            }
            <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{followingCount}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{followerCount}</span>
            <span>Followers</span>
          </div>

          
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{2}</span>
                <span>Posts</span>
              </div>
            </>
          
        </div>
        <hr />
      </div>
        </div>


        <div onClick={()=>{setAboutThisAccountModal(false)}} style={{width:"100%", background:" rgba(0, 0, 0, 0.1)", cursor:"pointer",  fontWeight:"600", padding:"10px", textAlign:"center",   }}>
         Close
        </div>
    </div>
  )
}

export default AboutThisAccountModal