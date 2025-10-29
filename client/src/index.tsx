import axios from "axios";
import makeToast from "./pages/Tosater";
 const Api = import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
//  const Api = import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';


export const fetchUserById = async (id: any) => {
  try {
    const response = await axios.get(`${Api}api/user/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("host",Api)
    console.log('Error fetching data:', error.response.data.message);
    return null;
  }
};

export const fetchUserByRoleAs = async(roleAs:any)=>{
  try {
    const response = await axios.get(`${Api}api/user/roleAs/${roleAs}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error.response.data.message);
    return null;
  }
}

export const fetchUserByRoleAsExceptCurrent = async(roleAs:any, userId:any)=>{
  try {
    const response = await axios.get(`${Api}api/user/roleAs/${roleAs}/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error.response.data.message);
    return null;
  }
}

 
  export const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${Api}api/post/getAll`);
    return  response.data
    } catch (err:any) {
        makeToast('error',err.message);
        return null;
    }
  };

  export const fetchPostsById = async (id:any) => {
    try {
      const response = await axios.get(`${Api}api/post/${id}`);
    return  response.data
    } catch (err:any) {
        makeToast('error',err.message);
        return null;
    }
  };

  
  export const fetchPostsByUserId = async (id:any) => {
    try {
      const response = await axios.get(`${Api}api/post/getByUserId/${id}`);
    return  response.data
    } catch (err:any) {
        makeToast('error',`Fetching Post By UserId ${err.message}`);
        return null;
    }
  };

  export const sharePost = async (userId:any,postId:any)=>{
    try {
      await axios.post(`${Api}api/posts/${postId}/share`, {
        user: userId,
      });
      // Refresh post data
      // const response = await axios.get(
      //   `http://localhost:3000/api/post/${postId}`
      // );
      // return (response.data);
    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  
  }

  

  export const PostSave = async (userId:any,postId:any)=>{
    try {
      await axios.post(`${Api}api/posts/savedPost`, {
        user_id:userId, post_id:postId
      
      });
      // Refresh post data
    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  
  }

  export const GetSavedPosts = async (userId:any)=>{
    try {
     const response = await axios.get(`${Api}api/posts/savedPost/${userId}`);
      // Refresh post data
      // const response = await axios.get(
      //   `http://localhost:3000/api/post/${postId}`
      // );
      return (response.data);
    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  
  }

  
  export const deleteSavedPostById = async (id:any) => {
    try {
      const response = await axios.delete(`${Api}api/posts/deleteSavedPost/${id}`);
    return  response.data
    } catch (err:any) {
        makeToast('error',`Fetching Post By UserId ${err.message}`);
        return null;
    }
  };


  export const createJob = async (formData:any)=>{
    try {
      const response = await axios.post(`${Api}api/jobs/create-jobs`, formData, { headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }});
    return  response.data
    } catch (err:any) {
        makeToast('error',`Fetching Post By UserId ${err.message}`);
        return null;
    }
  }


  export const GetJobPosts = async ()=>{
    try {
     const response = await axios.get(`${Api}api/jobs/allJobs`);
      return (response.data);
    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  
  }
export const GetJobPostsByRelatedKeywordsAndLocation = async (keyword:string, location:string)=>{
    
    try {
      
        // console.log(id);
      const response = await axios.get(`${Api}api/jobs/searchByKeyword-Location/${keyword}/${location}`);
      console.log(response.data)
      return response.data

      }catch(err:any) {
        console.log(err.response.message);
      }
}
  
  export const GetJobById = async (id:string)=>{
    const jobId =  id;
    try {
      
      if(id !== ''){
        console.log(id);
      const response = await axios.get(`${Api}api/jobs/jobsById/${jobId}`);
      console.log(response.data)
      return (response.data);
      
      }else{
        makeToast('error', 'id is not avalable')
      }
    
    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  
  }

  
  export const GetJobByUserId = async (id:string)=>{
    const userId =  id;
    try {
      
      if(id !== ''){
        console.log(id);
      const response = await axios.get(`${Api}api/jobs/jobsByUserId/${userId}`);
      return (response.data);
      
      }
    
    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  
  }

  export const UpdateProfile =async (id:any,formData:any)=>{
    try {
      const response = await axios.put(`${Api}api/user/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data
    } catch (error) {
      
    }
  }

  
  export const UpdateCoverImage =async (id:any,formData:any)=>{
    try {
      const response = await axios.put(`${Api}api/user/update-coverImage/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data
    } catch (error) {
      
    }
  }


   
  export const createChat =async (senderId:any, receiverId:any)=>{
    try {
      console.log(senderId +" - "+receiverId);
      const response = await axios.post(`${Api}api/chat/`, {senderId:senderId, receiverId:receiverId});
      makeToast("success", response.data.message);
      return response.data

    } catch (error:any) {
      console.log(error);
      makeToast("error", error.response.data.message);
    }
  }   
  export const getChatByUserId =async (id:any)=>{
    try {
      const response = await axios.get(`${Api}api/chat/${id}`);
      return response.data
    } catch (error) {
      
    }
  }
  export const getChatByUserIds =async (firstId:any, secondId:any)=>{
    try {
      const response = await axios.get(`${Api}api/chat/find/${firstId}/${secondId}`);
      return response.data
    } catch (error) {
      
    }
  }

  export const getMessageByChatId =async (id:any)=>{
    try {
      const response = await axios.get(`${Api}api/message/${id}`);
      return response.data
    } catch (error) {
      
    }
  }


  
  export const addMessage =async (message:any)=>{
    try {
      const response = await axios.post(`${Api}api/message/`, message, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data
    } catch (error) {
      
    }
  }  
  export const JobApplyFunction =async (formData:any)=>{
    try {
      const response = await axios.post(`${Api}api/apply/jobs-apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      makeToast("success", response.data.message);
      return response.data
    } catch (error:any) {
      makeToast("error", error.response.data.message);
      console.log(error)
    }
  }


  export const getApplicantByJobId =async (id:any)=>{
    try {
      const response = await axios.get(`${Api}api/apply/JobApplication/${id}`);
      return response.data

    } catch (error) {
      
    }
  }


  export const getApplicantById =async (id:any)=>{
    try {
      const response = await axios.get(`${Api}api/apply/JobsApplicationById/${id}`);
      return response.data

    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  }

  export const UploadAudio = async (formData:any)=>{
    try {
      const response = await axios.post(`${Api}api/message/uploadAudio`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data
    } catch (error:any) {
      makeToast('error', error.response.data.message)
    }
  }