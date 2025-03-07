import React, { useEffect, useState } from 'react';
import { GetSavedPosts } from '../..';
import SavedPostCart from './SavedPostCart';
import { PostProps, Posts } from '../../Types/Types';
import NotPost from '../../img/post.png'
import imgLoader from '../../img/loading.gif' 
interface SavedPost{
    user:string,
    post:string,
    _id:string,
}
const SavedPost = () => {
    const [SavedPost, setSavedPost] = useState<SavedPost[]>([]);
    
    const [check, setCheck] = useState(false)
    const [deleteSaved, setDeleteSave] = useState(false)
    const [loader, setLoader] = useState(true)
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        GetSavedPosts(userId).then(res=>{
            setSavedPost(res)
            setDeleteSave(false)
            if(res.length <= 0) {
                setCheck(true);
            }
        })

        setTimeout(() => {
            setLoader(false)
        }, 2000);
    }, [deleteSaved]);
    return (
        <>
           
        <div style={{ width: "90%" }}>
            <div style={{width:'25%'}}>
                 <h2  >Saved Post</h2>
            </div>
       <hr />{
       loader?<>
            <img src={imgLoader} style={{width:"80%", margin:"auto", mixBlendMode: "multiply"}} alt="" />
            </>:
         check?<>
        <div style={{height:'70vh', width:"100%"}}>
          
            <div onClick={()=>{window.location.href = '/'}} style={{width:"100%",textAlign:'center', marginTop:"10%"}}> 
                 <img style={{margin:"auto",mixBlendMode:'multiply' }} src={NotPost} alt={NotPost} />
                 <h1>Start Saving</h1>
           <h6 >Save posts and job to for future.</h6> 
            </div>
           
        </div>

        </>:
          <div className='post-grid'>
            {SavedPost.map((post:{user:any, post:any, _id:any}, index:any) => (
              <SavedPostCart key={index} user={post.user} post={post.post} setDeleteSave={setDeleteSave}  id={post._id} />
            ))}
          </div>
        }</div>
        </>
      );
}

export default SavedPost;
