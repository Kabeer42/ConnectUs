import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { timeAgo } from "../../pages/home/timeAgo";
import axios from "axios";
import makeToast from "../../pages/Tosater";
import ImageLoader from "../../img/image_loader.gif";
import { fetchAllPosts, fetchPostsById, fetchUserById, PostSave } from "../..";
import { simpleUser} from "../../Types/Types";
import CommentsModal from "../PostComments/CommentsModal";
import PostHeader from "./PostHeader";
import AboutThisAccountModal from "./AboutThisAccountModal";
interface Like {
  _id: string;
  user: string;
}

interface Comment {
  _id: string;
  user: string;
  content: string;
}

interface PostProps {
  data: {
    _id: string;
    user_id: string;
    description: string;
    photo: string;
    date: any;
    tags: string;
    locations: string;
    createdAt: string;
    comment: Comment[];
    likes: Like[];
  }
}

const Post: React.FC<PostProps> = ({ data }) => {

  const [Saved, setSaved] = useState(false);
  const [loader, setLoader] = useState(true);
  const [liked, setLiked] = useState<boolean>(false);
  const [aboutThisAccountModal, setAboutThisAccountModal] = useState<boolean>(false);
  const [Overlay, setOverlay] = useState<boolean>(false);

  const [UserData, setUserData] = useState<any>(data.user_id);

  // const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
  const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';

  useEffect(()=>{
    if(aboutThisAccountModal){
      setOverlay(true)
    }else{
      setOverlay(false)
    }
  },[aboutThisAccountModal])
const userId = localStorage.getItem("userId");
  const storage = `${Api}uploads/user-post/`;
  const profile = `${Api}uploads/profile/`;
  const [Post, setPost] = useState({
    ...data,
    likes: data.likes || [], // Ensure likes is always an array
  });
 
  const postId = data._id;

  
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    const checkLikes = async () => {

      try {
        // console.log(postId+" "+userId)
        const response = await axios.get(
          `${Api}api/posts/${postId}/${userId}/likes/check`
        );
        if (response.data.liked === true) {
          setLiked(true);
     
        }
      } catch (error: any) {
        makeToast("error", error.message);
     
      }
    };
 checkLikes();

    const checkSaved = async ()=>{
      
      try {
        const response = await axios.get(
          `${Api}api/posts/savedPost/check/${postId}/${userId}`
        );
        if (response.data.save === true) {
          setSaved(true);
     
        }
      } catch (error: any) {
        makeToast("error", error.message);
     
      }
    }
    checkSaved()

   
  }, []);

  const handleLike = async () => {
    try {
      await axios.post(`${Api}api/posts/${postId}/likes`, {
        user: userId,
      });
      // Refresh post data
      const response = await axios.get(
        `${Api}api/post/${postId}`
      );
      setPost(response.data);
      setLiked(!liked);
      // setCount(response.data.likes.length)
    } catch (error: any) {
      makeToast("error", `Error Handling Like ${error.message}`);
    }
  };

  const handleSave = async() => {
   PostSave(userId,postId).then(res=>{
    fetchPostsById(postId).then(res=>{
      setPost(res);
    setSaved(!Saved);
    })
    
   })
  }


  return (
    <>
     {
      Overlay && <div className="overlay"  style={{position:"absolute", left:"-30px", top:"-30px", width:"130%", height:"120%", backgroundColor:"rgba(0, 0, 0, 0.3)", }} onClick={()=>{setOverlay(false); setAboutThisAccountModal(false) }}></div>
     }
      { aboutThisAccountModal && <AboutThisAccountModal UserData={UserData}  setAboutThisAccountModal={setAboutThisAccountModal}/>}
    
     
   <div className="Post">
     
   <PostHeader Post={Post} UserData={UserData}  setAboutThisAccountModal={setAboutThisAccountModal}/>

    
      {loader ? (
        <>
          <img src={ImageLoader} alt="ImageLoader"   />
        </>
      ) : (
        <img src={storage + Post.photo} alt={storage + Post.photo}  loading="lazy" />
      )}
{ 
     
      
    }
      
      <div  style={{display:"flex", justifyContent:"space-between"}}>
        <div className="postReact" >
       <img className="icons"
            style={{ height: "25px", width: "25px" }}
            onClick={() => {
              handleLike();
            }}
            src={liked ? Heart : NotLike}
            alt="Like"
              loading="lazy"
          />
        
    
        <img className="icons" onClick={() => {
              setModalOpened(true);
            }} src={Comment} alt="Comment"  loading="lazy" />
        <img className="icons" src={Share} alt="Share"  loading="lazy" />
      </div>
      { Saved?
      
<svg onClick={handleSave} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bookmark-fill icons" viewBox="0 0 16 16">
  <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
</svg>
:<svg  onClick={handleSave}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bookmark icons" viewBox="0 0 16 16">
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
</svg>
}
      </div>
      
      
      <span style={{color: "var(--gray) ", fontSize: '18px', fontWeight:"600", marginLeft:"10px"}}>
        {Post.likes.length} likes
      </span>
      {Post.comment &&
        Post.comment.map(
          (
            comment: Comment // Specify the type for comment
          ) => (
            <div key={comment._id}>
              <p>{comment.content}</p>
            </div>
          )
        )}<div>{Post.locations}</div>
        <div className="detail">
        {/* <span><b>{timeAgo(Post.date)}</b></span> */}
       
        <p> {Post.description}</p>
        <p style={{fontSize:"14px", fontWeight:"600", color:"goldenrod"}}> {Post.tags}</p>
      </div>
     <CommentsModal modalOpened={modalOpened} setModalOpened={setModalOpened} post={Post} UserData={UserData}/>
    </div>
    </>
  );
};

export default Post;