import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import { useParams } from 'react-router-dom'
const PostSide = () => {
  // const { userId } = useParams();
  const userId="allPosts";
  return (
   <div className="PostSide">
       {/* <PostShare/> */}
       <Posts userId={userId}/>
   </div>
  )
}

export default PostSide