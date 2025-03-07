import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { UpdateCoverImage, UpdateProfile } from "../..";
interface ProfileModalProps {
    modalOpened: boolean;
    setModalOpened: (opened: boolean) => void;
    setCoverImages: (opened: boolean) => void;
    coverImage: any;
    userId:any
  }
const CoverImageModal:React.FC<ProfileModalProps> = ({modalOpened,setModalOpened,setCoverImages, coverImage,userId }) => {

  const [CoverImage, setCoverImage] = useState<string>(coverImage);
  const [UploadButton, setUploadButton ] = useState(false);
  const [File, setFile] = useState<any>();


  useEffect(() => {
    setCoverImage(coverImage);
  }, [coverImage]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setUploadButton(true)
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    

    }
  };

  const handleSubmit=()=>{
    
    if(File){
    const formData = new FormData();
    formData.append('coverImage', File);
    UpdateCoverImage(userId, formData).then(res=> { 
      if(res.coverPhoto){
        setCoverImages(true) 
        setModalOpened(false)
    window.location.reload
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
      <img src={CoverImage} style={{height:"250px",}} alt="CoverImage" />  </label> <input type="file" hidden id="profileImg"   accept="image/*"  onChange={handleImageChange}/>
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

export default CoverImageModal;