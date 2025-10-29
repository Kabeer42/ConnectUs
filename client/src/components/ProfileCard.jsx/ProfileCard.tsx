import React, { useEffect, useState } from "react";
import Cover from "../../img/coverPhoto.jpg";
import Profile from "../../img/profile.jpg";
import "./ProfileCard.css";
import {  Posts, User } from "../../Types/Types";
import { createChat, fetchPostsByUserId, fetchUserById } from "../..";
import ProfileImageModal from "./ProfileImageModal";
import CoverImageModal from "./CoverImageModal";
import axios from "axios";
import { io } from "socket.io-client";
import makeToast from "../../pages/Tosater";

interface userPorps{
  user:User
}

const ProfileCard:React.FC<userPorps> = ({user}) => {

const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
// const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';
const Socket_URL = import.meta.env.VITE_SOCKET_URL? import.meta.env.VITE_SOCKET_URL:'http://localhost:3000/';
// const Socket_URL = import.meta.env.VITE_SOCKET_URL? import.meta.env.VITE_SOCKET_URL:'https://connect-us-be.vercel.app/';
  let userId = user._id;
  const currentUserId = localStorage.getItem("userId");
  const [modalOpened, setModalOpened] = useState(false)
  const [CoverModal, setCoverModal] = useState(false)
  const [post, setPost] = useState<Posts[]>([]);
  const [userData, setUserData] = useState(user);
  const ProfilePage = true;
   let coverImage =  userData.coverPhoto ? `${Api}uploads/coverPhoto/${userData.coverPhoto}`  :Cover ;
  let profileImage = userData.profile ? `${Api}uploads/profile/${userData.profile}` : `${Api}uploads/profile/default.jpg`;

  const [isCoverImageChange, setIsCoverImageChange]= useState(false);
  const [isProfileImageChange, setIsProfileImageChange] = useState(false)


  useEffect(() => {
    if (userId) {
      fetchPostsByUserId(userId).then((res) => {
        setPost(res);
      });

    }  }, [userId]);
    // console.log(post);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        // Fetch follower count
        const socket = io(`${Socket_URL}`); 
        const fetchFollowerCount = async () => {
            try{
            const response = await axios.get(`${Api}api/user/followers/count/${userId}`);
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
            const response = await axios.get(`${Api}api/user/following/count/${userId}`);
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
    }, []);

const createChats = () => {
  
  createChat(currentUserId,userId).then((res)=>{
    if(res){
      makeToast("success", "Chat created successfully");
      
      window.location.href = `/chat`
    }

  }
).catch((error:any)=>{
  makeToast("error", error.response.data.message);
})
}

  useEffect(()=>{
    fetchUserById(userId).then(res=>{
      if(res){
        setUserData(res)
      }
      
    })
  },[isCoverImageChange,isProfileImageChange])


  return (
    <div className="ProfileCard">
      <CoverImageModal modalOpened={CoverModal} setModalOpened={setCoverModal} setCoverImages={setIsCoverImageChange} coverImage={coverImage} userId={user._id}/>
      <ProfileImageModal modalOpened={modalOpened} setModalOpened={setModalOpened } setProfileImages={setIsProfileImageChange}  profile={profileImage} userId={user._id}/>
      <div className="ProfileImages">
        <div className="cover">
            <img src={coverImage} alt="Cover" />
           { currentUserId === user._id && <span onClick={()=>{setCoverModal(true)}} className="edit-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
      </span>}
        </div>
      
    <span className="profile">
      <div className="profile-image">
         <img style={{background:"white"}} src={profileImage} alt="Profile" /> 
      </div>
     
      {  currentUserId === user._id && <span onClick={()=>{setModalOpened(true)}} className="edit-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
      </span>}
    </span>
      
      </div>

      <div className="ProfileName">
        <span>{userData.name}</span>
        <span style={{maxWidth:'90%'}}>
          { user.roleAs === "Student" && userData.skills.map((value: any, id: any) => (
            <span key={id}>{value.skillName} {id !== user.skills.length - 1 && <> | </>} </span>
          ))}
        </span>
      </div>
      {currentUserId !== user._id &&  
            <div onClick={()=>{
              createChats()
            }} className="button " style={{margin:"auto", padding:'5px 10px'}}>
              Message
            </div>}
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

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{post.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
