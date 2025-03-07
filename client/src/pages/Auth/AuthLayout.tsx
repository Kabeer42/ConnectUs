import React, { useEffect, useState } from 'react';
import './Auth.css'
import Logo from "../../img/logo.png";
import {  Navigate, Outlet } from 'react-router-dom';

const AuthLayout=() =>{


  // const roleAs = localStorage.getItem('roleAs');
  const userId = localStorage.getItem('userId');

  return (<>{
    userId?<>
    <Navigate to={'/'}/>
    </>:
    (<div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ConnectUs</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <Outlet/>
    </div>)}</>
  );
}

export default AuthLayout;
