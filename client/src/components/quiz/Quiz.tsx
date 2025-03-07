import React, { useEffect, useRef, useState } from 'react';
import "./QuizCart.css";
import Answer_Timer from './AnswerTimer';
import axios from 'axios';
import { Loader } from 'lucide-react';
import PageLoader from '../../img/image_loader.gif'
import DonutChart from './DonutChart/DonutChart';

interface Quiz {
  program: string;
  level: number;
}

const Quiz:React.FC<Quiz> = ({program, level}:Quiz) => {
 const userId = localStorage.getItem('userId');
 const [TimerForNextAttempt, setTimerForNextAttempt] = useState<any>(0);
const [checked, setChecked] = useState<any>(false);
 useEffect(() =>{
  const checkLastUpdate = async()=>{
    const filterSkills =  (skills:any, skillName:any) => {
      return skills.filter((item:any) => item.skillName === skillName )
     }
    try{
      const response = await axios.get(`http://localhost:3000/api/quiz/checkLastUpdate/${userId}/${program}`);
      if(response.data.result){
        setChecked(true);
        console.log(response.data.result);
         const skill = filterSkills(response.data.time.skills, program);
         console.log(skill[0].lastView);
           const nextAttempt = new Date(skill[0].lastView.nextAttempt);
           console.log(nextAttempt);
           setTimerForNextAttempt(Math.floor((nextAttempt.getTime() - new Date().getTime()) / 1000));

       }
    }catch(error:any){
      console.log(error.response.data);
    }
  }
 
  checkLastUpdate();
 },[program])
  useEffect(() => {
   
     const updateLastAttempt = async()=>{
      try{
       const response = await axios.get(`http://localhost:3000/api/quiz/updateLateView/${userId}/${program}`)
        console.log(response.data);
      }
        catch(error:any) {
          console.error(error.response.data);
        };
      }
      
      if(checked && TimerForNextAttempt <=0){
         updateLastAttempt();
      }else{
        updateLastAttempt();
      }
      
      
     
  },[program, checked]);
 

  useEffect(() => {
    let timer: any;
    if (TimerForNextAttempt > 0) {
      timer = setInterval(() => {
        setTimerForNextAttempt((prev:any) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [TimerForNextAttempt]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds / 3600) % 24);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return (
      <><div style={{paddingTop:"5%"}}>
         <h4 className='time-heading'>
            Please Wait for Next Attempt
          </h4>
      <div style={{display: 'flex', justifyContent: 'center', gap:'20px'}}>

        <div className='time-column'>
           <div className='time-container'>0{days}</div>
           <span className='time-label'>Days</span>
        </div>
        <div className='time-column'> {
          hours < 10 ?
          <div className='time-container'>0{hours}</div>
          : 
        <div className='time-container'>{hours}</div>}
        <span className='time-label'>Hours</span>
        </div>  
        <div className='time-column'>
            {
        
         
          minutes < 10 ?
          <div className='time-container'>0{minutes}</div>:
          <div className='time-container'>{minutes}</div>
        } 
        <span className='time-label'>Minutes</span>
        </div>
        <div className='time-column'>
           {
          secs < 10?
          <div className='time-container'>0{secs}</div>:<div className='time-container'>{secs}</div>}
          <span className='time-label'>Seconds</span>
        </div>
       
      </div>  
      <p className='reminder-message'>
      Make sure to use the remaining time wisely and prepare thoroughly for the test—getting ready before the countdown ends can significantly improve your results!
      </p>
      </div>
      
      
      </>
    );
  };

 
  const [data, setData] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [WrongAns, setWrongAns] = useState<number>(0);
  const [result, setResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [PagLoader, setPagLoader] = useState<boolean>(true);
  const [showAnswerTimer, setShowAnswerTimer] = useState<boolean>(true);
const [resultLoading, setResultLoading] = useState<boolean>(false);
  const option1 = useRef<HTMLLIElement>(null);
  const option2 = useRef<HTMLLIElement>(null);
  const option3 = useRef<HTMLLIElement>(null);
  const option4 = useRef<HTMLLIElement>(null);

   // Example data
   const [correct, setCorrect] = useState <number>(0);
   const  [wrong, setWrong] = useState<number>(0);
  const optionArray = [option1, option2, option3, option4];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/quiz/getQuiz/${userId}/${program}/${level}`);
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
if(level<6){
    fetchData();
}else{
  setPagLoader(false);
}
  
  }, [program]);
// useEffect(()=>{
//   setTimeout(() => {
//     setPagLoader(false)
//   }, 10000);
// })
useEffect(() =>{
  setResultLoading(true);
  setCorrect ((score/data.length)*100);
   setWrong(((WrongAns/data.length)*100));
   setResultLoading(false);
  },[result])

  const [countdown, setCountdown] = useState<number>(10);

  const [timeOut, setTimeOut] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setTimeOut(true)
      setTimeout(() => {

        setPagLoader(false)
      }, 1000);
    }
  }, [countdown]);



  const checkAns = (e: React.MouseEvent<HTMLLIElement>, ans: number) => {
    if (!lock) {
      const question = data[index];
      if (question.ans === ans) {
        e.currentTarget.classList.add('correct');
        setScore(prev => prev + 1);
      } else {

        setWrongAns(prev=>prev + 1)
        e.currentTarget.classList.add('wrong');
        if (question.ans >= 1 && question.ans <= 4) {
          const correctOption = optionArray[question.ans - 1];
          correctOption.current?.classList.add('correct');
        }
      }
      setLock(true);
    }
  };

  const next = () => {
    setShowAnswerTimer(false);
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      
      setIndex(prevIndex => prevIndex + 1);
      setLock(false);
      optionArray.forEach(option => {
        option.current?.classList.remove('wrong');
        option.current?.classList.remove('correct');
      });
    } else {
      setLock(true);
    }
    setTimeout(() => {
      setShowAnswerTimer(true);
    }, 100);
  };

  const handleTimeUP = () => {
    setLock(true);
  };

  if (loading) {
    return <Loader />;
  }

  const question = data[index];

  return (
    <>
    {TimerForNextAttempt > 0?
     (
        <div style={{height:"85vh", width:"100vw",padding:"auto"}}>
         
          <div> {formatTime(TimerForNextAttempt)}</div>
        </div>
      ):
      PagLoader?<>
      <div style={{height:"85vh", width:"100vw"}}>
        <div style={{width:"65%",alignItems:"center",margin:"auto", position:'relative'}}>
       <h2 className='preLoadText'  data-text="Get ready for the quiz! It starts in just 10 seconds">Get ready for the quiz! It starts in just 10 seconds </h2>
       
      </div>
     <div style={{margin:"auto", width:"55%",position:"relative"}}>
      <img style={{width:"100%",  mixBlendMode: "multiply"}} src={PageLoader} alt=""  loading="lazy"  />
      <h1  style={timeOut?{left:'45%',position:"absolute", top:"45%", color:'orangered'}:{position:"absolute", top:"45%", left:"48%", color:'orangered' } }>
        {timeOut? "GO!" :countdown}
      </h1>
     </div>

      </div>
      
      
      </>:result?<>
    <div className='body'>
      {
        resultLoading?<Loader/>:
        <DonutChart
                    correctPercentage={correct}
                    wrongPercentage={wrong} newSkillLevel={level} skillName={program}        
      />
      }
        
    </div>
        
          {/* <button onClick={()=>{}}>Restart</button> */}
       
      </>:
      
      <div className='container1'>
      {showAnswerTimer && <Answer_Timer duration={10} onTimeUP={handleTimeUP} />}
      <div className='index'>{index + 1} / {data.length} Questions</div>
      <h1>Click The Correct Answer</h1>
      <hr />
          <h2>{index + 1}. {question.Question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
    </div>

    }
    </>
  
  );
};

export default Quiz;
