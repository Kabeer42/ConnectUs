import React from 'react';
import loadingGif from '../img/quizLoader.gif';
const Loading = () => {
  return (
    <div style={{height:'100vh', width:'100vw'}}>
      <img  style={{ marginLeft:"25%",marginTop:'6%', height:"500px"}} src={loadingGif} alt="Loading" />
    </div>
  );
}

export default Loading;
