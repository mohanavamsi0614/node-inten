import React, { useState } from 'react';
import logo from '../src/assets/logo-dark.svg';
import "./App.css"
import axios from 'axios';
import Fire from './firebase';
import { useNavigate } from 'react-router';
function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const nav=useNavigate()
  const handleUsernameChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if(email && password ){
        try{
        axios.post("http://localhost:8001/login",{ password, email}).then((res)=>{
            console.log(res.data)
        })
    }
    catch{
        alert("error")
        console.log("eroor")
    }
    }
  };

  return (
    <div className="main">
      <div className="part">
        <img src={logo} id="logo" alt="Logo" />
        <h1>Welcome, please log in:</h1>
          <input
            className="input"
            autoFocus
            placeholder="Email"
            value={email}
            type='email'
            onChange={handleUsernameChange}
          />
          <input
            className="input"
            autoFocus
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="flex">
            <input type="checkbox" id="box" />
            <label htmlFor="box">Remember me</label>
          </div>
          <div className="flex">
            <button className="sub" onClick={()=>{handleSubmit()}} type="submit">
              Login
            </button>
            <button>Forgot?</button>
            <p onClick={()=>{nav("/sign")}}>sign now</p>
          </div>
      </div>
      <div className="part blue"><Fire/></div>
    </div>
  );
}

export default Login;
