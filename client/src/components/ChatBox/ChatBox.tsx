import React, { useEffect, useState, useRef } from "react";
import "./ChatBox.css";
import InputEmoji from "react-input-emoji";
import Profile from "../../img/profile.jpg";
import { addMessage, fetchUserById, getMessageByChatId } from "../..";
import { timeAgo } from "../../pages/home/timeAgo";
import Hello from "../../img/Hi.webp"
import imageIcon from "../../img/imageIcon.webp"
import docIcon from "../../img/file.webp"
import DocIcon from "../../img/DocIcon.webp"
import UndoIcon from '../../img/undo.webp';
import sendIcon from '../../img/send_Icon.webp';
import CameraIcon  from "../../img/camera.webp";
import CameraCapture from "../../pages/Chat/CameraCapture";

import SendIcon from "../../img/send_Icon.webp"
import makeToast from "../../pages/Tosater";
import axios from "axios";

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import PdfPreview from "./PdfPreview";
import RecordAudio from "./RecordVoice";
interface ChatBoxProps {
  chat: any;
  currentUser: string | null;
  setSendMessage: (message: any) => void;
  receivedMessage: any;
  setOpenCamera: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chat, currentUser, setSendMessage, receivedMessage,setOpenCamera}) => {
 
// Configure the worker
GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).href;

 
  // const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
  const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';
  const REACT_APP_PUBLIC_FOLDER = `${Api}uploads/profile/`;
  const [userData, setUserData] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const docRef = useRef<HTMLInputElement | null>(null);
  const [Overlay, setOverlay] = useState(false);
  const [fileCard, setFileCard] = useState(false);
  const userId = chat?.members?.find((id: string) => id !== currentUser);
  const [image, setImage] = useState< File | null>(null);
  const [preview, setPreview] = useState<string| null>("");
  const [docPreview, setDocPreview] = useState<string| null>("");
  const [doc, setDoc] = useState<File| null>(null);
const [AudioRecord, setAudioRecord] = useState(false);

  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const isPDF = (filename: string): boolean => {
    return filename.toLowerCase().endsWith('.pdf');
  };
  // Generate thumbnail from the first page of the PDF
  const generateThumbnail = async (dataUrl: string) => {
    try {
      const loadingTask = getDocument({ url: dataUrl });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
     

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;


      await page.render({ canvasContext: context, viewport: page.getViewport({ scale: 1 }) }).promise;

      setThumbnail(canvas.toDataURL());
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    }
  };



  useEffect(() => {
    const getUserData = async () => {
      if (userId) {
        const data = await fetchUserById(userId);
        setUserData(data);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (chat && chat._id) {
        const data = await getMessageByChatId(chat._id);
        setMessages(data);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat?._id) {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  }, [receivedMessage, chat?._id]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const message = {
        sender: currentUser,
        content: newMessage,
        chatId: chat._id,
        type: "text",
        
      };

      const receiverId = chat.members.find((id: string) => id !== currentUser);

      setSendMessage({ ...message, message });
      setNewMessage("");
     
    }
   
  };
  
  const sendImage = async () => {

    if (image) { 
      const message = {
        sender: currentUser,
        file: image,
        chatId: chat._id,
        type: "image",
      };
      try {
        const response = await axios.post(`${Api}api/message/`, message, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        makeToast('success',response.data.message)
        
      setImage(null);
      setPreview(null);
      } catch (error:any) {
        makeToast('error',error.response.data.message)
      }
    
      const receiverId = chat.members.find((id: string) => id !== currentUser);

     
    }
   
  };

  const uploadDocument = async () => {

    if (doc) { 
      const message = {
        sender: currentUser,
        file: doc,
        chatId: chat._id,
        type: "document",
      };
      console.log(message);
      try {
        const response = await axios.post(`${Api}api/message/`, message, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        makeToast('success',response.data.message)
        
      setDoc(null);
      setDocPreview(null);
      setThumbnail(null);
      } catch (error:any) {
        console.log(error);
        makeToast('error',error.response.data.message)
      }
    
      const receiverId = chat.members.find((id: string) => id !== currentUser);

     
    }
   
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggle();
    const file = event.target.files?.[0];
    // console.log('Selected file:');
    // console.log('Selected file:',file);
    if (file) {
      setImage(file);
      ImageCardToggle()
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreview(imageUrl);
        // console.log('Image URL:',imageUrl);
      };
      
      reader.readAsDataURL(file);
    }
  };

  
  const handleDocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggle();
    const file = event.target.files?.[0];
    // console.log('Selected file:');
    // console.log('Selected file:',file);
    if (file) {
      setDoc(file);
    console.log('Selected file:', file);
const dataUrl = URL.createObjectURL(file);
setDocPreview(dataUrl);

      if(isPDF(file.name)){
          generateThumbnail(dataUrl); 
      }
  
    }
  };

  const toggle=()=>{
    setFileCard(!fileCard); setOverlay(!Overlay)
  }

  const ImageCardToggle=()=>{
     setOverlay(!Overlay)
  }
  return (
    <>{
    Overlay&&  <div onClick={toggle} className="Overlay"></div>
    }
    <div className="ChatBox-container">
      {chat?._id ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profile
                      ? REACT_APP_PUBLIC_FOLDER + userData.profile
                      : Profile
                  }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                  loading="lazy"
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>{userData?.name}</span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          <div className="chat-body">
            {messages.length > 0 ?
              messages.map((msg, index) => (
                <div
                  ref={scroll}
                  key={index}
                  className={`${msg?.sender === currentUser ? "message own" : "message "}`}
                >

                  {
                  msg?.type === "audio"?<>
                  <audio controls src={`${Api}uploads/message/Voice/${msg?.content}`} />
                  </>:
                  msg?.type === "image" ?
                  
                  <img src={`${Api}uploads/message/${msg?.content}`} height={250} alt={`${Api}uploads/message/${msg?.content}`} loading="lazy" />
                  : 

                  
                  
                  msg?.type === "document" ?
                  
                <PdfPreview msg={msg} />
                    :
                  <>
                    <span>{msg?.content}</span>
                  <span>{timeAgo(msg?.timestamp)}</span>

                </>
              }
                </div>
              ))
            :<>
            <img   src={Hello} alt="Hello" style={{width:"25%", margin:'auto' }} loading="lazy" />
            </>
            
            }
           
          </div>
          <div className="chat-sender" style={{margin:"0px 20px"}}>
          {preview ? <div style={{position:'relative', width:'100%', background:'none'}}> 
            <div className="previewCard">
              
                <div className="preview-box">
          <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />
        </div>
        
            <div className='preview-footer'>
            <button  onClick={()=>{setImage(null); setPreview(null)}}> <img src={UndoIcon} alt="Undo Icon" />  </button>
            <button  onClick={()=>{sendImage()}}> <img  src={sendIcon} alt="sendIcon" style={{height:"25px", width:"25px"  }} /> </button>
            </div>
 
       

              </div>
          </div>:
            docPreview?
            <div style={{position:'relative', width:'100%', background:'none'}}> 
            <div className="previewCard">
              
                <div className="preview-box" >
                {thumbnail ? <img src={thumbnail} alt="PDF Thumbnail" style={{ height: '250px', width:'95%', margin:'auto', objectFit:'contain' }} />
                
              : <div>
                <img src={DocIcon} alt="DocIcon"  height={200} style={{marginLeft:'30%'}}/>
              </div>
              }
  
        </div> <span style={{color:'black'}}>{doc? doc.name:'No file selected'}</span>
        
            <div className='preview-footer'>
            <button  onClick={()=>{setDoc(null); setDocPreview(null), setThumbnail(null)}}> <img src={UndoIcon} alt="Undo Icon" />  </button>
            <button  onClick={()=>{uploadDocument()}}> <img  src={sendIcon} alt="sendIcon" style={{height:"25px", width:"25px"  }} /> </button>
            </div>
            </div>
            </div>
             :
             AudioRecord?
               
            <span style={{position:'absolute', bottom:"-8px", right:"0",left:'0', display:"flex", justifyContent:"center", alignItems:"center"}}>
            <RecordAudio currentUser={currentUser} chatId= {chat._id} setAudioRecord={setAudioRecord}/>
          </span>
             :
            <>
             <div style={{position:"relative"}}>
             {
             fileCard &&
             <div className="file-selector-card">
              <input
              type="file"
              style={{ display: "none" }}
              id="imageRef"
            
              onChange={handleImageChange}
               accept="image/*"
            />
              <input
              type="file"
              style={{ display: "none" }}
              id ="docRef"
              onChange={handleDocChange}
              // onChange={handleDocChange}
            accept=".pdf, .doc, .docx, .txt"
            /> 
            <label htmlFor="imageRef">
              <div 
               className="file-selector">
                  <img src={imageIcon} alt="Image Icon" loading="lazy" />
                  <span>
                    Photos
                  </span>
                </div>
            </label>
            <label htmlFor="docRef">
                <div className="file-selector">
                  <img src={docIcon} alt="Doc Icon" loading="lazy" />
                  <span>
                    Documents
                  </span>
                </div>
            </label>

                <div onClick={()=>{setOpenCamera(true); toggle()}} className="file-selector">
                  <img src={CameraIcon}  alt="Image Icon" loading="lazy" />
                  <span>
                    Camera
                  </span>
              </div>
              </div>}
              <div onClick={() =>{toggle()}}>+</div>
            </div>
            
            <div style={{position:"relative", width:"100%", display:"flex", justifyContent:"center"}}>
            
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              } } shouldReturn={false} shouldConvertEmojiToImage={false}/> 
            </div>
              <svg  style={{cursor:"pointer"}}  onClick={()=>{setAudioRecord(true)}} xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-mic" viewBox="0 0 16 16">
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
</svg>
           
            <img onClick={sendMessage} src={SendIcon} height={35} style={{cursor:"pointer"}} alt="SendIcon" />
          
          
              </>
           
            }
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
    </>
    
  );
};

export default ChatBox;
