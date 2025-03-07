import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import RecordRTC from 'recordrtc';
import WaveSurfer from 'wavesurfer.js';
import { UploadAudio } from '../..';
import SendIcon from "../../img/send_Icon.webp"
import recording  from "../../img/recording.gif"
interface RecordAudioProps{
    currentUser:any,
    chatId:any,
    setAudioRecord:any
}
const RecordAudio: React.FC<RecordAudioProps> = ({currentUser, chatId,setAudioRecord}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<any>(null);
  const recorderRef = useRef<RecordRTC | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
   
  const startRecording = async () => {
    deleteAudio();
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorderRef.current = new RecordRTC(stream, { type: 'audio' });
        recorderRef.current.startRecording();
        setIsRecording(true);
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
  };
  if(!audioURL){
startRecording();
  }
  
  }, [currentUser ]);



  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const audioBlob = recorderRef.current?.getBlob();
        setAudioBlob(audioBlob);
        if (audioBlob) {
          const audioURL = URL.createObjectURL(audioBlob);
          setAudioURL(audioURL);
          setIsRecording(false);
          clearInterval(intervalRef.current!);
        //   uploadAudio(audioBlob);
        } else {
          console.error('Failed to get audio blob');
        }
      });
    }
  };
const deleteAudio = () => {
    setAudioURL('');
    setIsRecording(false);
  };
  const uploadAudio = async () => {
    const formData = new FormData();
    formData.append('sender', currentUser);
    formData.append('audio', audioBlob, 'audio-file.wav');
    formData.append('chatId', chatId);
    formData.append('type', 'audio');
  
    

    await UploadAudio(formData); // Call the upload function from the API
  deleteAudio();
  setAudioRecord(false);

  };

  return (
    <div style={{display:'flex', height:'70px', alignItems:"center", justifyContent:"end",width:'100%', gap:'15px', marginRight:"40px"}}>
     
      {audioURL ? <audio style={{height:"45px"}} src={audioURL} controls />:
      <img src={recording} alt="recording" height={55} width={300} style={{mixBlendMode:"multiply"}} />
      }
      
   {isRecording?   <svg onClick={stopRecording} style={{cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pause-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"/>
</svg>:
<svg onClick={()=>{deleteAudio(); setAudioRecord(false)}} xmlns="http://www.w3.org/2000/svg" style={{color:'red', cursor:"pointer"}} width="27" height="27" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>}
<img onClick={()=>{uploadAudio()}} src={SendIcon} height={35} style={{cursor:"pointer"}} alt="SendIcon" />
    </div>
  );
};

export default RecordAudio;
