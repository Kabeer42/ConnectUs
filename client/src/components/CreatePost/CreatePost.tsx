import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Profile from '../../img/img2.png';
import { fetchUserById } from '../..';
interface ModalProps {
  
    setSize: (opened: boolean) => void;
    setModalOpened: (opened: boolean) => void;

  }
  
const CreatePost: React.FC<ModalProps> =({ setSize, setModalOpened} ) => {
    const [image, setImage] = useState<File | null>(null);
    const [tagsButton, setTagsButton] = useState(false);
    const [tags, setTags] = useState<any[]>([]);
    const user_id =  localStorage.getItem('userId');
    const postBy =  localStorage.getItem('roleAs');     
    const [user, setUser] = useState<any>(null);
    const [locations, setLocations] = useState('');
    const [description, setDescription] = useState('');
    const profilePath = `http://127.0.0.1:3000/uploads/profile/`;
    useEffect(() => {
      if(image===null || !image){
            setSize(false);
         }
        

         
        }, [image]);

  useEffect(() => {
   fetchUserById(user_id).then((res)=>{
    setUser(res)
   })
  },[])

        
const uploadPost = async (postDetails: {
    user_id: any ;
    description: string;
    locations: string;
    tags: any;
    postBy: any;
    image: File | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append('user_id', postDetails.user_id as string);
      formData.append('description', postDetails.description);
      formData.append('locations', postDetails.locations);
      formData.append('tags', postDetails.tags);
      formData.append('postBy', postDetails.postBy as string);
      if (postDetails.image) {
        formData.append('image', postDetails.image);
      }
      
      const response = await axios.post('http://127.0.0.1:3000/api/post/upload-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
    //   alert('Post uploaded successfully');
    setModalOpened(false)
    } catch (error) {
      console.error('Error uploading post:', error);
      
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();
        await uploadPost({ user_id, description, locations, tags, postBy, image });
      
    }
  return (
    <>
     <div style={image?{display:"flex", width:"100%"}:{width:"100%"}} >
        <div style={image?{width:'42%'}:{}}>
               <div style={{marginLeft:"20%", marginBottom:"20px"}}>
            {
                image &&  <label htmlFor="image">
                     <img src={URL.createObjectURL(image)} style={{width:"250px", height:'250px', border:"1px solid grey", borderRadius:"5px"}}/>
                </label>
            }
              {!image && <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16">
  <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
  <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z"/>
</svg>
              }
        </div>
   {/* <h4 style={{textAlign:"center"}}>Drag photos and videos here</h4> */}
{
    !image &&
    <label style={{margin:"auto"}} className="button r-button" htmlFor="image">
  <div style={{padding:"0"}}>
  Select From Computer
  </div>
    </label>
}


    
     <input type="file" id='image'  accept="image/*" onChange={(e) => {setImage(e.target.files?.[0] || null); setSize(true); 
        
     }} style={{display:"none"}} />
      
        </div>
    {image?
<>
<div style={{width:"60%", padding:"8px",height:"250px",  overflow:'hidden', overflowY:"scroll"}}>
        <div style={{display:"flex", gap:"10px", justifyItems:'end', marginBottom:"10px"}}>
            <img src={user.profile?profilePath+user.profile:profilePath+'default.jpg'} style={{height:'35px'}} alt="image" />
            <h6>{user.name}</h6>
        </div>
        <textarea  name="description" onChange={(event)=>{
         setDescription(event.target.value)
        }} style={{width:"100%", minHeight:"150px", border:'1px solid grey', borderStyle: 'ridge', borderRadius:'5px', padding:"5px 10px", marginBottom:"20px"}} placeholder='Wright a Cation...' id=""></textarea>
        <div style={{width:"90%",display:"flex",alignItems:"center", justifyContent:"space-between", }} ><div style={{width:"90%"}} >
           <input style={{width:"90%", height:"50px"}} type="text" placeholder='Location' name="locations" onChange={(e)=>{
                setLocations(e.target.value)
              }} className='infoInput' list="locationsList" />
           <datalist id="locationsList">
             <option value="Lahore, Pakistan" />
             <option value="Karachi, Pakistan" />
             <option value="Islamabad, pakistan" />
           </datalist>
        </div>
             
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
        </div>
        <div className='row' style={{alignItems:"center", marginTop:"10px",marginLeft:"10px", cursor:"pointer"}} onClick={() => setTagsButton(prevState => !prevState)}>
            <h6 style={{width:"70%"}}>
                   Add Your Tags
            </h6>
            {tagsButton &&  <svg style={{width:"30%"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
            </svg>
            }
            {
                !tagsButton && <svg style={{width:"30%"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            </svg>
            }
        </div>
       {
        tagsButton &&
        <div >
            <div style={{display:"flex", gap:'10px', marginBottom:"10px"}} >
         
            {
                tags.map((tag, index) => (
                 <>
                    <div style={{display:'flex', justifyContent:"center",gap:"5px", padding:"5px 8px",borderRadius:"8px", background:"orange",fontSize:"14px", color:"white", cursor:"pointer"}} key={index}>
                         {tag}
                         
                         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" onClick={() => setTags(tags.filter((_, i) => i !== index))} >
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>
                    </div>
                    </>
                )
            )
            }       
            </div>
              <input style={{width:"90%"}} type="text" placeholder='Python, Data Science....' className='infoInput' onKeyDown={(e:any) => {
                if (e.key === 'Enter') {
                  const value = e.target.value;
                  if (value !== '') {
                    setTags([...tags, `#${value}`]);
                  
                    e.target.value = '';
                  }
                }
              }} />
        </div>
      }

      <div style={{width:"100%", marginTop:"20px"}}>
        <button style={{margin:"auto"}} className='button r-button' onClick={handleSubmit}>
            Post
        </button>
      </div>
</div>
</>:<>
</>    
}
    </div> 
    </>
  
  );
}

export default CreatePost;
