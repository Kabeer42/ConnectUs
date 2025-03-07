import React, { useEffect, useState } from 'react';
import PostHeader from '../Post/PostHeader';
import { io } from 'socket.io-client';
import { timeAgo } from '../../pages/home/timeAgo';
interface CommentsModalProps {
    post: any,
    UserData:any,
  }
  const socket = io('http://localhost:3000');
const Comments: React.FC<CommentsModalProps>  = ({post,UserData}) => {
  const userId = localStorage.getItem('userId');
    const [Content, setContent] = useState('');
    const Post = post;
    const [Comments, setComments] = useState<any[]>([]);
  const postImage = "http://localhost:3000/uploads/user-post/";
  const profileImage = "http://localhost:3000/uploads/profile/";

 

const handleSubmit = () => {
    if(Content.length>0 || Content!==""){
      socket.emit('newComment', {postId:post._id, user:userId, content:Content});
      
      setContent("");
    }
  
}
useEffect(() => {
setComments(post.comments)
  },[post])
useEffect(() => {
  socket.on("receiveComment", (data:any) => {
    setComments((prevComments:any) => [data, ...prevComments]);
    console.log(data);
  }
); 
  return () => {
    socket.off("receiveComment");
  };
  },[])

return (
    <div style={{display:"flex", gap:"20px"}}>
      <div style={{width:"45%", maxHeight:"450px", backgroundColor:"#f0f2f5"}}>
  <img  src={postImage+Post.photo} alt="Post Image" style={{width:"100%", height:"100%", objectFit:"cover"}} />
      </div>
    
      <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", width:"55%" }}>
        <div>
             <PostHeader Post={Post} UserData={UserData} />
              <hr />
              <div style={{height:"300px", overflowY:"scroll", width:"90%"}}>
                 {
                Comments.map((comment:any)=>(
                  
                  <div key={comment._id} style={{margin:"20px"}}>
                   <div style={{display:"flex",  gap:"10px"}}>
                    {
                      comment.user.profile?
                    <img src={profileImage+comment.user.profile} alt={profileImage+comment.user.profile} style={{width:"45px", height:"45px", borderRadius:"50%"}} />
                    :
                    <img src={profileImage+"default.jpg"} alt={profileImage+"default.png"} style={{width:"45px", height:"45px", borderRadius:"50%"}} />
                    }<div>
                      <p style={{fontSize:"14px", margin:"0"}}><span style={{fontWeight:"600"}}>{comment.user.name} </span>{comment.content}</p>
                      <div style={{fontSize:"13px", color:"#65676b"}}>
                    {timeAgo(comment.createdAt)}
                  </div>
                    </div>
                     
                   </div>
                  
                    
                  
                  </div>
                ))
              }
              </div>
             
        </div>

        <div>
            <textarea  name='content' value={Content} onChange={(e) => setContent(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} style={{outline:"none", border:"none", margin:"10px 20px", width:"90%", padding:"10px", backgroundColor:"#f0f2f5", borderRadius:"10px"}}  placeholder='Add a comment...' />
        </div>

     
      </div>
    </div>
  );
}

export default Comments;
