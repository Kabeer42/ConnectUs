
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import JobApply from './JobApply';
import { fetchUserById } from '../..';

interface StepperProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  data: any,
}

const JobApplyModal: React.FC<StepperProps> = ({modalOpened,setModalOpened, data }) => {

  const userId = localStorage.getItem('userId')
  const [userData, setUserData] = useState({})
  useEffect(()=>{
    fetchUserById(userId).then(res=>{
      setUserData(res);
    })
  },[userId])
  return (
  

<Modal
show={modalOpened}
onHide={() => setModalOpened(false)}
 size="lg"
 aria-labelledby="contained-modal-title-vcenter"
 centered
>
 <Modal.Header closeButton>
   <Modal.Title id="contained-modal-title-vcenter">
   Apply For Job
   </Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <JobApply modalOpened={modalOpened} setModalOpened={setModalOpened } job={data} userData= {userData}/>
 </Modal.Body>

</Modal>
  );
};

export default JobApplyModal;


