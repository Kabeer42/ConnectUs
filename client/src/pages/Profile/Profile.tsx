import React, { useEffect, useState } from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
import { User } from '../../Types/Types'
import { useParams } from 'react-router-dom'
import { fetchUserById } from '../..'



const Profile = () => {
  const {id} = useParams()
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    fetchUserById(id).then(res=>{
      setUserData(res);
      setLoading(false)
    })
  }, [])
  return (
    <>
    {
      loading?<></>: <div className="Profile">
        <ProfileLeft user={userData} />

        <div className="Profile-center">
        
            <ProfileCard user={userData}/>
            <div style={{paddingBottom:"500px"}}>
            <PostSide />
            </div>
        
           
        </div>

        <RightSide/>
    </div>
    }
    </>
   
  )
}

export default Profile