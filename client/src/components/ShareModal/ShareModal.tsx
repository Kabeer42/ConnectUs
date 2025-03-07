
import Modal from 'react-bootstrap/Modal';
import CreatePost from '../CreatePost/CreatePost';
import { useState } from 'react';


interface ShareModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
}

const ShareModal: React.FC<ShareModalProps>  =({ modalOpened, setModalOpened} ) => {
  const [Size , setSize] = useState(false);

  return (
    <Modal
size={
  Size ? "lg" : "sm"
}
   
    show={modalOpened}  
    onHide={() => setModalOpened(false)}
    
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <Modal.Header closeButton>
       <Modal.Title id="contained-modal-title-vcenter">
        Create New Post
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
    <CreatePost setSize ={setSize} setModalOpened= {setModalOpened} />
     </Modal.Body>
   
   </Modal>
  );
}

export default ShareModal;
