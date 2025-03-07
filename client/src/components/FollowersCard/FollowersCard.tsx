import  { useEffect, useState } from 'react'
import './FollowersCard.css'
import {  fetchUserByRoleAsExceptCurrent} from '../..'
import FollowAction from './FollowAction'
const FollowersCard = () => {
    
 const [Followers, setFollowers] = useState<any[]>([])
 
  
 const [Loading, setLoading] = useState<any>(true)
const userId = localStorage.getItem("userId")
    useEffect(() => {
        fetchUserByRoleAsExceptCurrent("Student", userId).then((res) => {
            setFollowers(res)
            setLoading(false)
        })

    }, [])



  return (
<>{
        Loading?<></>:  <div className="FollowersCard">
        <h3>Who is following you</h3>
        
        {Followers.map((follower: any, id:any)=>(
            <FollowAction follower={follower} key={id} />
        ))}
    </div>
    }
  </>
    
  )
}

export default FollowersCard