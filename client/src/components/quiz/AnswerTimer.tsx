import { useState,useEffect,useRef } from 'react'; 
import "./AnsTimer.css"

interface AnsTimer{
  duration:any;
  onTimeUP:any
}
const AnswerTimer:React.FC<AnsTimer> = ({duration,onTimeUP}) => {

  const [counter,setCounter]=useState(0);
  const [progressLoaded,setProgressLoaded]=useState(0);
  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter(counter => counter + 1);
    }, 1000);
    return () => clearInterval( intervalRef.current);
  },[]);

  useEffect(() => {
    setProgressLoaded(100*(counter/duration));

    if(counter === duration){
      clearInterval(intervalRef.current);  
      setTimeout(()=>{
        onTimeUP();
      },1000);  
    }
  },[counter]); 

 
  return (
    <div className='answer-timer-container'>
      <div style={{
        width:`${progressLoaded}%`,
        backgroundColor: `${
          progressLoaded<30?'#00FFEE':
          progressLoaded<60?'#36F307':
          progressLoaded<90?'#EA9800':
          '#DC0303'
        }`
      
      }}
      className='progress'>      
      </div>
      
        <div className='float-right bottom-3 p-1 m-3'> {counter}:s</div>

    </div>
  )
}

export default AnswerTimer

