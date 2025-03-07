import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'

import "./ProfileSide.css"
import { User } from '../../Types/Types'

interface userPorps{
  user:User
}
const ProfileSide:React.FC<userPorps> = ({user}) => {
  return (
    <div className="ProfileSide">
        {/* <LogoSearch size="32" color="white" /> */}
        <ProfileCard user={user}/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileSide