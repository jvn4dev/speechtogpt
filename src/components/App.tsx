import React, {useEffect, useState} from 'react';
import './App.module.scss';
import Button from './Button';
import {requestAccessToken} from "../apis/stt";

function App() {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    requestAccessToken()
      .then(res => setAccessToken(res?.data.access_token));
  }, [])

  return (
    <Button token={accessToken}/>
  );
}

export default App;
