import  { useEffect, useState } from 'react';
import makeToast from '../../Tosater';
import axios from 'axios';


const SignupForm = () => {
  const [data, setData] = useState({name:'',email:'', password:'',roleAs:'Student' });
  const [conform, setpasword] = useState('');
  const [geterror, setError] = useState({name:'',email:'', password:'',roleAs:'' });
  const [conformPass, setConformPass] = useState(true);
  const [loader, setLoader] = useState(false);

const Api = import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'http://localhost:3000/';
// const Api = import.meta.env.VITE_API_URL? import.meta.env.VITE_API_URL:'https://connect-us-be.vercel.app/';
  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
let Error = false;
    console.log(data);

    
    if(data.password!== conform){
      setConformPass(false);
    }else{
      setConformPass(true);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setError({...geterror,'email':'Invalid email format'});
      Error = true;
  }else{
    setError({...geterror,'email':''});
  }
  if (!/^[a-zA-Z0-9]/.test(data.name)) {
    setError({...geterror,'name':'Name must be alphanumeric'});
    Error= true;
  }else{
  setError({...geterror,'name':''});
}
if (data.password.length < 6 ) {
  
  setError({...geterror,'password':'Password must be at least 6 characters!'}) ;
  Error= true;
}else{
  setError({...geterror,'password':''});
}

if(Error){
  return;
}else{
  try {
    setLoader(true)
    let name = data.name;
    let email = data.email;
    let password = data.password;
    let roleAs = data.roleAs;
    const response = await axios.post(`${Api}api/auth/signup`, {name, email, password, roleAs },);
      
            // Store token in local storage or state for future requests
        if(response.data){
        setTimeout(() => {
          setLoader(false)
        }, 1500);

          makeToast("success", response.data.message);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('isAuthenticated','true');
        localStorage.setItem('roleAs', response.data.roleAs);




          window.location.pathname=`/`;


        }
              
    
  
  } catch (err) {
    setLoader(false)
    console.log("error during Register")
    console.error('Error during login:', err);
      makeToast("error", "Error during Register:");
  }
}

    }
  }

  return (
    <div className="a-right">
    <form className="infoForm authForm" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
<div>
    <input
          type="email"
          className="infoInput"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
</div>
      
      <span style={{ display: geterror.email ? "block" : "none", fontSize: '12px', color: 'red' }}>
    {geterror.email}</span>
      <div>
        <input
          type="text"
          className="infoInput"
          name="name"
          placeholder="Usernames"
          
          onChange={handleChange}
        />
      
        <select name="roleAs" id="" className='infoInput' onChange={handleChange} >
        <option value="Student" >Student </option>
                  <option value="University">University</option>
                  <option value="Company">Company</option>
        </select>
      </div>
  <span style={{ display: geterror.name ? "block" : "none", fontSize: '12px', color: 'red' }}>
    {geterror.name}</span>
     
      <div>
        <input
          type="password"
          className="infoInput"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="password"
          className="infoInput"
          name="confirmpass"
          placeholder="Confirm Password"
          onChange={(e:any)=>{setpasword(e.target.value)}}
        />
      </div>
      <span style={{ display: geterror.password ? "block" : "none", fontSize: '12px', color: 'red' }}>
    {geterror.password}</span>
      <span style={{display:conformPass?"none":"block", fontSize: '12px', color:'red'}}>
        *Password is not Matching...
      </span>
      <div>
          <span onClick={()=>{window.location.href='sign-in'}} style={{fontSize: '12px', cursor:"pointer"}}>Already have an account. Login!</span>
        <button className="button infoButton" type="submit"   >Signup</button>
        </div>
        
    </form>
  </div>
  );
}

export default SignupForm;