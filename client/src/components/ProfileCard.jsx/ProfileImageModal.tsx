import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { UpdateProfile } from "../..";
interface ProfileModalProps {
    modalOpened: boolean;
    setModalOpened: (opened: boolean) => void;
    profile: any;
    userId:any;
    setProfileImages: (opened: boolean) => void;
  }
const ProfileImageModal:React.FC<ProfileModalProps> = ({modalOpened,setModalOpened,setProfileImages, profile,userId }) => {

  const [profileImage, setProfileImage] = useState<string>(profile);
  const [UploadButton, setUploadButton ] = useState(false);
  const [File, setFile] = useState<any>();
  
const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setUploadButton(true)
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    

    }
  };

  const handleSubmit=()=>{
    
    if(File){
    const formData = new FormData();
    formData.append('profile', File);
    
    UpdateProfile(userId, formData).then(res=> { 
      if(res){
          setProfileImages(true)
    setModalOpened(false)
      }
    }
    )
    }
   
  }
  
    return (
      <>
        <Modal
    show={modalOpened}
    onHide={() => setModalOpened(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
    
    <div style={{display:'flex', justifyContent:"center"}}>  <label htmlFor="profileImg">
      <img src={profileImage} style={{height:"350px", width:"350px", borderRadius:"50%"}} alt="" />  </label> <input type="file" hidden id="profileImg"   accept="image/*"  onChange={handleImageChange}/>
    </div>{
      UploadButton?<>
      <button onClick={handleSubmit} className="button r-button" style={{width:"20%", margin:'auto', marginTop:"20px"}}>Upload</button>
      </>:<></>
    }
  
    </Modal.Body>
  
  </Modal>
        </>
    );
};

export default ProfileImageModal;