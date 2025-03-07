// src/App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { io, Socket } from "socket.io-client";
import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout,SignupForm, SigninForm, Home } from './pages';
import './App.css';
import Profile from './pages/Profile/Profile';
import { AuthProvider } from './context/AuthContext';
import Loading from './pages/Loading';
import JobView from './components/JobView/JobView';
import QuizCart from './components/quiz/QuizCart/quizCart';
import SelectQuiz from './components/quiz/selectQuiz';
import RootLayout from './pages/RootLayout/RootLayout';
import { fetchUserById } from '.';
import { User } from './Types/Types';
import FriendSuggestion from './components/FriendSuggestion/FriendSuggestion';
import Quiz from './components/quiz/Quiz';
import SavedPost from './components/SavedPost/SavedPost';
import SavedPostLayout from './components/SavedPost/SavedPostLayout';
import JobApply from './components/JobApply/JobApply';
import Chat from './pages/Chat/Chat';
import ApplicantList from './components/JobList/ApplicantList';


const App: React.FC = () => {
  
const socket = io('http://localhost:3000'); // Replace with your server URL
  useEffect(() => {
    socket.on('userVerified', ({ userId, isVerified }) => {
      // Update the UI or handle the event as needed
      console.log(`User ${userId} verification status updated to: ${isVerified}`);
    });
  
    return () => {
      socket.off('userVerified');
    };
    
  }, []);
  // const socket = useRef<Socket | null>(null);
  const [screenLoading, setScreenLoading] = useState(false);
  const [user, setUser] = useState<User >({
    _id:'',
    name: '',
    email:'',
    password:'',
    roleAs :'',
    contact:'',
    firstName:'',
    lastName:'',
    profile:'',
    bio:'',
    university:'',
    registrationNo:'', 
    cgpa:'',
    semester:'',
    skills:[],
    program:'',
    address:'',
    coverPhoto: '',
    userLocation:'',
    isVerified:false,
    Website_URL: "",
    companyType:"",
  });
  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 3000);
  }, []);

  // Connect to Socket.io
  useEffect(() => {
    // socket = io("ws://localhost:3000");
    socket.emit("new-user-add", userId);
    socket.on("get-users", (users: { userId: string }[]) => {
      
    });
  }, []);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
   
    if (userId) {
     fetchUserById(userId).then(userData => {
       setUser(userData);
     });
    } 
  }, [userId]);
  return (<>{
  screenLoading?
  <Loading/>
  :
    <div className="App">
    <div className="blur" style={{top: '-18%', right: '0'}}></div>
    <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
    <AuthProvider>
    <Routes>
    <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<SignupForm />} />
            <Route path="/sign-in" element={<SigninForm />} />
          </Route>

      <Route element={<RootLayout />}>
       
          <Route path="/" element={<Home user={user} />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/job" element={<JobView />} />
          <Route path='/quiz' element={<SelectQuiz />}/>
          <Route path="/friends" element={<FriendSuggestion />} />\
          <Route element={<SavedPostLayout />}>
            <Route path="/savedPost" element={<SavedPost />} />
            
          </Route>

          <Route path="/chat" element={<Chat />} />
          <Route path="/applicant/:jobId" element={<ApplicantList />} />
      </Route>
     

    </Routes>


    </AuthProvider>
   
   {/* <Home/> */}
   {/* <Profile/> */}
   </div>

  }
  </>
  
  );
};

export default App;
