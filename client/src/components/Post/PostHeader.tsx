
import { useEffect, useState } from 'react';
import { timeAgo } from '../../pages/home/timeAgo';
import AboutThisAccountModal from './AboutThisAccountModal';
interface PostProps{
    Post: any,
    UserData: any,
    setAboutThisAccountModal: React.Dispatch<React.SetStateAction<boolean>>
}
const PostHeader:React.FC<PostProps> = ({Post, UserData,setAboutThisAccountModal}) => { 

  const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';

  const [moreOption, setMoreOption] = useState(false);
      const profile = `${Api}uploads/profile/`;
  return (<>

      
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",margin:"5px 20px"}}>
      <div onClick={()=>{window.location.href=`/profile/${UserData._id}`}} style={{display:"flex", gap:'12px', alignItems:"center"}}>
        <img height={45} width={45} style={{borderRadius:"50%"}} src={profile + UserData.profile} alt={UserData.name} />
        
        <div>
          <div style={{display:"flex", alignItems:"center", gap:"5px"}}>
              <h6 style={{margin:"0", fontSize:"18px"}}> <b> {UserData.name}</b></h6>
        {Post.createdAt && (
          <span  style={{margin:"0", fontSize:"12px"}}>
            {timeAgo(Post.createdAt)}
          </span>
        )}
          </div>
          <span style={{fontSize:"14px", margin:"0"}}>{UserData.roleAs}</span>
        </div>
      
      </div>

      <div  style={{position:"relative", cursor:"pointer"}}>
          <svg onMouseOver={()=>{setMoreOption(true)}} onMouseOut={()=>{setMoreOption(false)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
</svg>
<div onMouseOver={()=>{setMoreOption(true)}} onMouseOut={()=>{setMoreOption(false)}} className='moreOption' style={{display: moreOption?"flex":"none",  }}>
        <div onClick={()=>{setMoreOption(false); setAboutThisAccountModal(true) }}>
          About this Account
        </div>
      </div>
      </div>
    
   </div>
   </>
  );
}

export default PostHeader;
