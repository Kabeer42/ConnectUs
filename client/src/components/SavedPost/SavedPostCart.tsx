import { Link } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './SavedPost.css'
import { Posts } from '../../Types/Types';
import { deleteSavedPostById, fetchPostsById } from '../..';
import DeleteIcon from '../../img/delete.gif';
interface SavedPost{
    user:string,
    post:any,
    id:string,
    setDeleteSave:any
}
const SavedPostCart:React.FC<SavedPost> = ({id, user, post, setDeleteSave}) => {

    const SavedPost = post;
    const imagePath = `http://localhost:3000/uploads/user-post/`
   

    const handleDelete=()=>{ 
        deleteSavedPostById(id).then(res=>{
            // window.location.href ='/savedPost';
            setDeleteSave(true)
        })
    }
  return (<>{
   
    <div className="post-cart" >
     

<img onClick={handleDelete} className='img-icon' src={DeleteIcon} alt={DeleteIcon} />   
<img 
  src={`${imagePath}/${SavedPost.photo}`} 
  alt={imagePath} 
  style={{height:'100%', width:'100%'  ,margin:'0 auto',}}
/>
      
   </div>}
   </>
   
 
  );
}

export default SavedPostCart;
