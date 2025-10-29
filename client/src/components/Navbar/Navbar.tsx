import  { useEffect, useState } from 'react';
import logo from '../../img/logo.png';
import Notify from "../../img/notification.png"
import Home from '../../img/home.png'
import Profile from '../../img/profile.jpg';
import Msg from '../../img/message.png'
import Job from '../../img/job.png';
import Saved from '../../img/SavedPost.png';
import Quiz from '../../img/quiz.png';
import Loader from '../../img/loading.gif';

import "./Navbar.css"
import { fetchUserById } from '../..';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { timeAgo, timeAgoShort } from '../../pages/home/timeAgo';

const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
// const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';
const SocketUrl = import.meta.env.VITE_SOCKET_URL? import.meta.env.VITE_SOCKET_URL:'http://localhost:3000';
// const SocketUrl = import.meta.env.VITE_SOCKET_URL? import.meta.env.VITE_SOCKET_URL:'https://connect-us-be.vercel.app/';
const socket = io(`${SocketUrl}`); // Replace with your server URL

  const profilePath = `${Api}uploads/profile/`


const NotificationCard=({notification, setSelectedNotification}:{notification:Notification, setSelectedNotification:any})=>{
 
  const handleAccept = () => {
    if(notification.senderId.isVerified === false) {
 // Emit an event to the server to update the user's verification status
    socket.emit('verifyUser', { userId: notification.senderId._id });

    
    }
   // Close the notification card
    setSelectedNotification(null);
  };

return(
  <div style={{position:'fixed', left:"30%", borderRadius:"10px", right:"30%",top:"20%",backgroundColor:"white", boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.1)", padding:"20px",zIndex:"9",  display:'flex', justifyContent:'center', alignItems:'center', marginTop:"20px"}}>
  <div>
    <div onClick={()=>{window.location.href=`/profile/${notification.senderId?._id}`}} style={{display:'flex', alignItems:'center', marginBottom:"20px", cursor:"pointer"}}>
    {notification.senderId?.profile?
    <img style={{height:"40px", width:"40px", borderRadius:"50%", marginRight:"10px" }} src={profilePath+notification.senderId?.profile} alt={profileImage}   loading="lazy" />
    :
    <img style={{height:"40px", width:"40px", borderRadius:"50%", marginRight:"10px" }} src={profilePath+'default.jpg'} alt={profileImage}   loading="lazy" />
    
    }
  <div>
     <h6 style={{margin:"0", padding:"0", fontSize:"16px"}}>{notification.senderId?.name}</h6>
     <p style={{fontSize:"12px", margin:"0", padding:"0"}}>{timeAgo(notification.createdAt)}</p>
  </div>
 
    </div>
  <h6>{notification.message}</h6> 
  {
    notification.type==='verify-user' ?
    notification.senderId?.isVerified ?<>
    <div style={{display:'flex',flexDirection:"column", justifyContent:'center', alignItems:'center', marginTop:"50px"}}>
      <p>This User is Already Verified By You.</p>
    <button onClick={()=>{setSelectedNotification(null)}} className='button' style={{  padding:"8px 20px"}}>Close</button>
    
    </div>
    </>
    :
        
    <div style={{display:'flex', justifyContent:'space-between', marginTop:"30px"}}>
      <button onClick={()=>{setSelectedNotification(null)}} className='reject-button'>Reject</button>
      <button onClick={()=>{handleAccept()}} className='accept-button'>Accept</button>
  
    </div>
  :
  <button onClick={()=>{setSelectedNotification(null)}} className='button' style={{ margin:"auto", marginTop:"50px", padding:"8px 20px"}}>Close</button>
  }</div>
</div>
)
}
interface Notification {
  id: string;
  senderId:{
    _id:string;
    profile:string;
    name:string;
    isVerified:boolean;
  };
  message: string;
  read: boolean;
  type:string;
  createdAt:string;
}


export const handleLogout=()=>{
  localStorage.removeItem('roleAs');
  localStorage.removeItem('userId');
  window.location.href = '/sign-in';
} 

let profileImage='';
const Navbar = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [loading, setLoadings] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [isHovered, setIsHovered] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [ProfileCard , setProfileCard ] = useState(false);

    const closeAll=()=>{
      setSelectedNotification(null);
      setSidebarVisible(false);
      setProfileCard(false);
    }
    const toggleSidebar = () => {
      setSidebarVisible(!isSidebarVisible);
    };
    const roleAs = localStorage.getItem('roleAs')
    const [Loading, setLoading] = useState(true);
useEffect(()=>{

    setTimeout(() => {
     setLoading(false);
    }, 1000);
   
    },[]),
    
    useEffect(() => {
        // Fetch existing notifications from the server
        const fetchNotifications = async () => {
          try {
            const response = await axios.get(`${Api}api/notification/${userId}`); // Adjust endpoint as needed
            setNotifications(response.data);
          } catch (error) {
            console.error('Error fetching notifications:', error);
          }
        };
        fetchNotifications();

    },[])

    useEffect(()=>{
          // Listen for real-time notifications from Socket.IO
          socket.on('receiveNotification', (notification: Notification) => {
            // Add new notification to the state
            setNotifications(prevNotifications => [notification, ...prevNotifications]);
          });
          return () => {
            // Clean up the socket connection
            socket.off('receiveNotification');
          };
    })

useEffect(()=>{ 
  const handleSearch = async () => {
        setLoadings(true);
        try {
          const response = await axios.get<any[]>(`${Api}api/user/search/${keyword}`, {
           
          });
          if(response.data){
            console.log(response.data)
          setResults(response.data);
          setLoadings(false);
        }
      } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      };
      if(keyword && keyword.length>1){  
        handleSearch()
      }else{
        setResults([])
      }
},[keyword])
     
    const userId  = localStorage.getItem('userId')
    const [user, setUser] = useState<any>({})
    useEffect(() => {
      fetchUserById(userId).then(
        (response) => {
          if(response){
            setUser(response)
            if(response.profile){
                profileImage = `${ profilePath + response.profile}`
            }else{
                profileImage = Profile;
            }
          }
        }
      )
    }, [userId]);
  return  (<>
  <div className='overlay' style={{display:isSidebarVisible?'block':selectedNotification?'block': ProfileCard?'block': 'none',   backgroundColor:"rgba(0,0,0,0.5)", width:"100%", height:"100%", position:"fixed", top:"0", left:"0", zIndex:"3"}} onClick={()=>{
      setSidebarVisible(false)
      setSelectedNotification(null);
  }}></div>
   <div className='job-navbar'>
    
    <div className='logo'>
          <img src={logo} alt="Logo"   loading="lazy"/>
          <h4  style={{ color: isHovered ? 'transparent' : '#f9a225', transition: 'all 0.5s' }}>ConnectUs</h4>
          <div 
      className='search-div-animation' style={isHovered? {borderRadius:results.length>0?'21.25px 21.25px 0px 0px ':'21.25px'}:{}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <input
          style={{ width: '100%' }}
          type='search'
          value={keyword}
          onChange={(e)=>{setKeyword(e.target.value)}}
          placeholder='Search here ...'
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </div>
      <div className='search-results' style={{display:results.length>0?'block':'none'}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {loading ? (
            <p>Loading...</p>
          ) : results.length > 0 ? (
            results.map(user => (
              <div onClick={()=>{window.location.href = `/profile/${user._id}`}} key={user._id}>
                
                <img src={user.profile?`${ profilePath + user.profile}` : Profile} style={{height:"40px", width:"40px", borderRadius:"50%", marginRight:"10px"}} alt={user.name}   loading="lazy" />
                {user.name}
              </div>
            ))
          ) : (
          <></>
          )}
        </div>
      </div>
    </div>
          
    </div>
  

    <div className='nav-center-div'>
        <div onClick={()=>{
            window.location.href = '/'
        }} >
            <img src={Home} alt="Home Icon"   loading="lazy" />
            <h6>Home</h6>
        </div>
        <div onClick={()=>{
            window.location.href = '/job'
        }} >
            <img src={Job} alt="Job Icon"  style={{ height: '28px', margin:'5px 0' }}   loading="lazy"/>
            <h6>Search Job</h6>
        </div>{
            roleAs==='Student' &&
        <div onClick={()=>{
            window.location.href = '/quiz'
        }} >
            <img src={Quiz} alt="Quiz Icon"   loading="lazy"/>
            <h6>Quiz</h6>
        </div>}
        <div onClick={()=>{
            window.location.href = '/savedPost'
        }} >
            <img src={Saved} alt="Saved Icon"   loading="lazy"  style={{ height: '35px', marginTop:"3px" }} />
            <h6>Saved Post</h6>
        </div>
        <div onClick={()=>{
            window.location.href = '/chat'
        }} >
            <img src={Msg} alt="Message Icon"   loading="lazy" style={{ height: '38px' }} />
            <h6>Messages</h6>
        </div>
        <div onClick={()=>{
         toggleSidebar()
        }} >
            <img src={Notify} alt="Notification Icon"   loading="lazy" />
            <h6>Notification</h6>
            
        </div>
        
        
    </div>
    <div className='nav-right-div' onMouseOver={()=>{closeAll(); setProfileCard(true)}} onMouseOut={()=>{setProfileCard(false)}}>
        <img className='profile-img' src={profileImage} alt={profileImage}   loading="lazy" />
    {
        ProfileCard &&
        <div onMouseOver={()=>{setProfileCard(true)}} onMouseOut={()=>{setProfileCard(false)}} className='profile-dropdown'>
        <div style={{display:'flex', flexDirection:'column',alignItems: "center" }}>
            <div>
            <div>          
                <img className='profile-img' style={{height:"65px", width:'65px'}} src={Loading? Loader : profileImage} alt={profileImage}   loading="lazy" />

            </div>
            <div style={{
                display:'block',
                marginLeft:"10px"
                
            }}>
                <h6 style={{margin:"0"}}>{ user.name}</h6>
                {user.university &&
                <p style={{margin:"0", fontSize:"14px"}}>Student At: <span > 
                {user.university.name}
                </span> </p> 
                }
            </div>
        </div>
        <button onClick={()=>{
            window.location.href = `/profile/${userId}`
        }} className='button' style={{width:"200px", marginTop:"30px"}}>
            View Profile
        </button> 
        <button onClick={handleLogout} className='button' style={{width:"200px", marginTop:"10px", marginBottom:"20px"}}>
            Logout
        </button> 
        
        </div>
        
    </div>}
    </div>


  
</div>


     <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div id="notifications-container">
      <h2>Notifications</h2>
      <div style={{display:'flex', flexDirection:'column', height:"450px",overflowY:'auto'}}>
        {notifications.map((notification:any, index:number) => (<>
          <div key={index} onClick={()=>{setSelectedNotification(notification);setSidebarVisible(false)}}  style={{display:'flex', alignItems:'center', marginBottom:"10px", boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.1)", padding:"10px", borderRadius:"10px", cursor:"pointer"}}>
           {
           notification.senderId?.profile?
           <img style={{height:"40px", width:"40px", borderRadius:"50%", marginRight:"10px"}} src={profilePath+notification.senderId?.profile} alt={profileImage}   loading="lazy"/>
           :<img style={{height:"40px", width:"40px", borderRadius:"50%", marginRight:"10px"}} src={profilePath+'default.jpg'} alt={profileImage}   loading="lazy"/>
          }<div style={{maxWidth:"74%"}}>
              <h6>{notification.senderId?.name}</h6>
              <h6 style={{ fontSize:"14px"}}>{notification.message}</h6>
              </div>
            <p style={{fontSize:"14px"}}>{timeAgoShort(notification.createdAt)}</p>
           
          </div> 
          
          {selectedNotification && (
        <NotificationCard notification={selectedNotification} setSelectedNotification={setSelectedNotification} />
      )}
          </>
        ))}
      </div>
    </div>
      </div>
   
      
      
      </>
  );
}

export default Navbar;
