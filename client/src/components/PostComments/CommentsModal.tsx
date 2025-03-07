
import Modal from 'react-bootstrap/Modal';
import { User } from '../../Types/Types';
import Comments from './Comments';
interface CommentsModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  post: any;
  UserData:any;
}
const CommentsModal: React.FC<CommentsModalProps> =({modalOpened,setModalOpened, post, UserData})=> {
  return (
    <Modal
     show={modalOpened}
     onHide={() => setModalOpened(false)}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
        <Comments post={post} UserData={UserData}/>
      </Modal.Body>
    
    </Modal>
  );
}

export default CommentsModal;

