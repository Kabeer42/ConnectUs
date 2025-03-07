import React, { useEffect, useState } from 'react'
import './Posts.css'
// import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'

import axios from 'axios';
import PencilLoader from '../../pages/PencilLoader';
import { fetchAllPosts } from '../..';

interface PostsProps{
  userId:any;
}
const Posts:React.FC<PostsProps> = ({userId}) => {
  const [PostData, SetPostData] = useState<any[]>([]);
  const [Loading, setLoading] = useState(true);
 useEffect(() => {

  const fetchPosts = async ()=>{
  fetchAllPosts().then(
    res=>{
      SetPostData(res);
    }
  );
}
if(userId==="allPosts"){
  fetchPosts();
}
  setTimeout(() => {
    setLoading(false); 
 }, 2000);
   
 }, []);
  
  return (
  <>{
   (
      <div className="Posts">
        {PostData.map((post: any)=>(
           <Post key={post._id} data={post}/>
          // <p>{post.description}</p>
          
        ))}
    </div>
    )
  }
  </>
    
  )
}

export default Posts