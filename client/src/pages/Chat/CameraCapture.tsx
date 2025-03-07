import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import  CameraIcon  from '../../img/camera.webp';
import UndoIcon from '../../img/undo.webp';
import sendIcon from '../../img/send_Icon.webp';
import makeToast from '../Tosater';
import { blobToFile, dataURLToBlob } from './typeConvertion';
interface cameraCaptureProps {
    openCamera:boolean;
    setOpenCamera: any;
    chat:any;
     currentUser:any
}
const CameraCapture: React.FC<cameraCaptureProps> = ( {openCamera,setOpenCamera,chat, currentUser,}) => {
    
  const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
  
    
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>('');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null); // Track the media stream
    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.muted;
                    setStream(stream); // Save the stream
                }
            })
            .catch(err => console.error("Error accessing camera: ", err));
    };
useEffect(() => {
    if(!image){
        startCamera();
    }else{
        stopCamera();
    }
    
    return () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };
},[openCamera, image]);
    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0);
                const dataUrl = canvasRef.current.toDataURL('image/jpeg');
                setImageUrl(dataUrl);
                     // Convert dataUrl to Blob
            const blob = dataURLToBlob(dataUrl);
            
            // Convert Blob to File
            const file = blobToFile(blob, `photo-${Date.now()}.jpeg`);
            setImage(file)
                stopCamera();
            }
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop()); // Stop all tracks
            setStream(null); // Clear the stream state
        }
    };

    const uploadImage = async () => {
        if (image) {
            const messages = {
                sender: currentUser,
                file: image,
                chatId: chat._id,
                type: "image",
            };
           
            try {
                const response = await axios.post(`${Api}api/message/`, messages, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
                makeToast('success',response.data.message)
                
              setImage(null);
              setImageUrl(undefined); 
              stopCamera();
              setOpenCamera(false);
              } catch (error:any) {
                makeToast('error',error.response.data.message)
              }
        }
      
    };

    return (
        <div className='camera-container'>
            <div className='camera-header'>
            <label >Take a photo</label>
            <div className='camera-close' onClick={()=>{stopCamera(); setOpenCamera(false);}}>X</div>
            </div>
            { 
                image ? <img  width="320" height="240" src={imageUrl} alt="Captured" loading='lazy' /> :
            <video  style={{ transform: 'scaleX(-1)' }} ref={videoRef} width="320" height="240" autoPlay></video>
            }
            { image ?
            <>
            <div className='camera-footer'>
            <button  onClick={()=>{setImage(null)}}> <img src={UndoIcon} alt="Undo Icon" />  </button>
            <button  onClick={()=>{uploadImage()}}> <img  src={sendIcon} alt="sendIcon" style={{height:"25px", width:"25px"  }} /> </button>
            </div>
            </>
            :
            <button className='camera-button' onClick={capturePhoto}><img src={CameraIcon} alt="CameraIcon" /></button>
            }<canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
         
        </div>
    );
};

export default CameraCapture;
