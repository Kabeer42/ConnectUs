import React, { useState } from 'react';

import { useAuth } from '../../../context/AuthContext';

import axios from "axios";
import makeToast from '../../Tosater';

const SigninForm=()=> {
 
 const Api = import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL: 'http://127.0.0.1:3000/';
//  const Api = import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL: 'https://connect-us-be.vercel.app/';
  const [data, setData] = useState({ email:'', password:'' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
setData({...data,[e.target.name] :e.target.value })
  }
  
  const [showPasword, setShowPassword] = useState(false);
const handleSubmit=async(e:any)=>{
  e.preventDefault();
  // const {login} = useAuth();
  // e.preventDefault();
  try {
    let email = data.email;
    let password = data.password;
    const response = await axios.post(`${Api}api/auth/login`, { email, password });
    const response_data = response.data;
    
    // If the login is successful, store the user data in the state
    localStorage.setItem('userId', response_data.userId);
    localStorage.setItem('roleAs', response_data.roleAs);

    
    makeToast('success',  `Welcome! Back`);
    setTimeout(() => {
       window.location.href = `/`;
    }, 2000);
   
  } catch (e: any) {
    makeToast('error', e.response?.data?.message || e.message);
  }
}

  return (
    <div className="a-right">
    <form className="infoForm authForm" onSubmit={handleSubmit} >
      <h3>Log In</h3>

      <div>
        <input
          type="text"
          placeholder="Email"
          className="infoInput"
          name="email"
          onChange={handleChange} 
        />
      </div>

      <div className='passwordInput'>
        <input
          type={showPasword ? "text" : "password"}
          // className="passwordInput"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          
        />
 {showPasword? <svg  onClick={()=>{setShowPassword(!showPasword)}}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
<path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg>
: <svg onClick={()=>{setShowPassword(!showPasword)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
}
      </div>

      <div>
          <span onClick={()=>{window.location.href='sign-up'}} style={{ fontSize: "12px", cursor:"pointer" }}>
            Don't have an account Sign up
          </span>
        <button className="button infoButton">Login</button>
      </div>
    </form>
  </div>
  );
}

export default SigninForm;
