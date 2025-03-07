
import Modal from 'react-bootstrap/Modal';
import UpdateProfile from './UpdateProfile';
import { User } from '../../Types/Types';
interface ProfileModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  user: User
}
const ProfileModal: React.FC<ProfileModalProps> =({modalOpened,setModalOpened, user })=> {
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
         Your Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <UpdateProfile user={user} setModalOpened={setModalOpened}/>
      </Modal.Body>
    
    </Modal>
  );
}

export default ProfileModal;

