import React, { useRef, useState, useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import "./Chat.css";
import { io, Socket } from "socket.io-client";
import { getChatByUserId } from "../..";
import makeToast from "../Tosater";
import CameraCapture from "./CameraCapture";


interface Chat {
  _id: string,
  sender: string;
  content: string;
  chatId:string;
  type: any;
  members:[],
  timestamp: any;
}

const ChatRoom: React.FC = () => {
  const socket = useRef<any>();
  const socketUrl = import.meta.env.VITE_SOCKET_URL? import.meta.env.VITE_SOCKET_URL : "http://localhost:3000";
   
console.log(`socketUrl: ${socketUrl}`)

 
  const userId: string | null = localStorage.getItem("userId");
  const [currentChat, setCurrentChat] = useState<any>({});
  const [chats, setChats] = useState<any[]>([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  useEffect(() => {
    const getChats = async () => {
      try {
        if (userId) {
          getChatByUserId(userId).then(
            data=>setChats(data)
          )
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [userId]);

 

  useEffect(() => {
    socket.current = io(`${socketUrl}`);

    socket.current.emit("new-user-add", userId);

    // newSocket.on("disconnect", () => {
    //   setSocket(null);
    //   setTimeout(setupSocket, 2000000);
    //   makeToast("error", "Socket Disconnected!");
    // });
    

    socket.current.on("connect", () => {
     makeToast("success",'scoket connected')
     });
    socket.current.on("get-users", (users:any) => {
      setOnlineUsers(users);
    });
  }, [userId]);

 // Send Message to socket server
 useEffect(() => {
  if (sendMessage!==null) {
    socket.current.emit("sendMessage", sendMessage);
    console.log(sendMessage)
  }
}, [sendMessage]);


// Get the message from socket server
useEffect(() => {
  socket.current.on("receiveMessage", (data:any) => {
    console.log(data)
    setReceivedMessage(data);
  }

  );
}, []);

const checkOnlineStatus = (chat:any) => {
  const chatMember = chat.members.find((member:any) => member !== userId);
  const online = onlineUsers.find((user:any) => user.userId === chatMember);
  return online ? true : false;
};
  return (
    <div className="Chat">{
      openCamera && <div className="Overlay"></div>}
       {openCamera&& <div className="access-camera">
              <CameraCapture setOpenCamera={setOpenCamera} openCamera={openCamera} chat={currentChat} currentUser={userId}/>
            </div> }
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div style={{margin:"0", padding:"0", height:"auto"}}
                key={chat._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={userId}
                  online={checkOnlineStatus(chat)
                   
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox

          chat={currentChat}
          currentUser={userId}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          setOpenCamera={setOpenCamera}
        /> 
      </div>
    </div>
  );
};

export default ChatRoom;
