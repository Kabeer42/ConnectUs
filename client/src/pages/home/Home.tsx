import React, { useEffect, useState } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
import ProfileModal from '../../components/ProfileModal.jsx/ProfileModal'
import { User } from '../../Types/Types'



interface userPorps{
  user:User
}
const Home:React.FC<userPorps> = ({user}) => {
  const [modalOpened, setModalOpened] = useState(false);
 const [Loading,setLoading] = useState<any>(true);
 const roleAs = localStorage.getItem('roleAs')
  useEffect(() => {
if(!user.registrationNo){
  setModalOpened(true)
}
  
  setLoading(false)
  }, []);

 
  return (
    Loading?<></>:
     <div className="Home">
          <ProfileModal
            user={user}
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        <ProfileSide user={user}/>
        <PostSide/>
        <RightSide/>
        
    </div>

  )
}

export default Home