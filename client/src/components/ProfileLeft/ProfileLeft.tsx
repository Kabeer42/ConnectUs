import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'

interface userPorps{
  user:any
}
const ProfileLeft:React.FC<userPorps> = ({user}) => {
  return (
   <div className="ProfileSide">
       {/* <LogoSearch/> */}

       <InfoCard user={user}/>
       <FollowersCard/>
   </div>
  )
}

export default ProfileLeft