
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import CreateJob from '../CreateJob/CreateJob';


interface ModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
}

const JobModal: React.FC<ModalProps>  =({ modalOpened, setModalOpened} ) => {
const [Size, setSize] = useState(true);
  return (
    <Modal
size={Size?'sm':"xl"}
   
    show={modalOpened}  
    onHide={() =>{ 
      setSize(true);
      setModalOpened(false); 
    }}
    
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <Modal.Header closeButton>
       <Modal.Title id="contained-modal-title-vcenter">
       Post a job 
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
    <CreateJob setSize= {setSize}  setModalOpened= {setModalOpened} />
     </Modal.Body>
   
   </Modal>
  );
}

export default JobModal;
