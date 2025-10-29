import { getDocument } from 'pdfjs-dist';
import React, { useEffect, useState } from 'react'

import DocIcon from "../../img/DocIcon.webp"
import { timeAgo } from '../../pages/home/timeAgo';
import makeToast from '../../pages/Tosater';

interface PdfProps {
  msg: any
}
const PdfPreview:React.FC<PdfProps> = ({msg}) => {
    
  // const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
  const Api =  import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';
  
  const isPDF = (filename: string): boolean => {
    return filename.toLowerCase().endsWith('.pdf');
  };

  const fetchFileFromServer = async (filename: string): Promise<Blob> => {
  
    const fileUrl = `${Api}uploads/message/${filename}`;
  
    try {
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
  
      return await response.blob();
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  };
  
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  useEffect(() => {
    const fetchFileAndGenerateThumbnail = async () => {
      if (isPDF(msg.content)) {
        try {
          const blob = await fetchFileFromServer(msg.content);
          console.log("Fetched Blob:", blob);
          const file = new File([blob], msg.content, { type: blob.type });
          await generateThumbnail(file);
        } catch (error) {
          makeToast('error', 'Error generating thumbnail');
        }
      } else {
        setThumbnail(null);
      }
        
      
    };
    fetchFileAndGenerateThumbnail();
  }, [msg.content]);
  // Generate thumbnail from the first page of the PDF
  
  const generateThumbnail = async (file: File) => {
    try {
      const url = URL.createObjectURL(file);
      const loadingTask = getDocument(url);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      const viewport = page.getViewport({ scale: 0.5 }); // Adjust scale as needed
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      setThumbnail(canvas.toDataURL());
      URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error generating thumbnail:', error);
     makeToast('error', 'Error ');
    }
  };
  const handleOpenClick = () => {
    if (`${Api}uploads/message/${msg.content}`) {
      window.open(`${Api}uploads/message/${msg.content}`, '_blank');
    } else {
      alert('Please select a file first');
    }
  };

  return (
   <>{thumbnail?<>
   <div style={{position:'relative'}}>
     <img src={thumbnail} alt="Pdf Preview" height={250} width={250} /> 
     <div className='pdf-thumbnail-name-container'>
      {msg.content}
      <span style={{fontSize:'12px', fontWeight:'400'}}>{timeAgo(msg?.timestamp)}</span>
      <hr />
      <button onClick={handleOpenClick} className='btn'>
        Open
      </button>
     </div>
   </div>
 

   </>:
                <div className="document-preview">
                       <div style={{display: "flex", alignItems: "center"}}>
                         <img src={DocIcon} alt="document" height={40} />
                         <div style={{marginLeft: "10px", display:'flex', flexDirection:'column', fontSize:"14px", fontWeight:"500"}}> 
                          
                         <span>{msg?.content}</span>
                         <span style={{fontSize:'12px', fontWeight:'400'}}>{timeAgo(msg?.timestamp)}</span>
                         </div>
                       </div>
                       <div>
                       
                       </div>
                     </div>}
   </>

  )
}

export default PdfPreview