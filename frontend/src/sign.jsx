import React, { useState } from 'react';
import logo from '../src/assets/logo-dark.svg';
import "./App.css"
import axios from "axios"
import { useNavigate } from 'react-router';
import Fire from './firebase';
function Sign(){
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setvalue] = useState("");
  const [email,setemail]=useState("")
  const nav=useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if(username && password && data){
        try{
        axios.post("http://localhost:8001/sign",{ email, password, username, data }).then((res)=>{
            console.log(res.data)
        })
    }
    catch{
        alert("error")
        console.log("eroor")
    }
    }
  };
  const handleEmailChange=(event)=>{
    setemail(event.target.value)
  }
  const photo = async (e) => {
    const reader=new FileReader()
    reader.onload =async  function(e) {
        try {
            console.log(e.target.result)
            const response = await axios.post('https://api.cloudinary.com/v1_1/dus9hgplo/image/upload', {file:e.target.result,upload_preset:"vh0llv8b"});
            console.log('File uploaded successfully:', response.data);
            document.cookie=`photo=${response.data.secure_url}`
            setvalue(response.data.secure_url)
          } catch (error) {
            console.error('Error uploading photo:', error);
          }
    }
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="main">
      <div className="part">
        <img src={logo} id="logo" alt="Logo" />
        <h1>Welcome, please sigin:</h1>
        <input
        className="input"
            autoFocus
            placeholder="name"
            value={username}
            type='email'
            onChange={handleUsernameChange}/>
          <input
            className="input"
            autoFocus
            placeholder="Email"
            value={email}
            type='email'
            onChange={handleEmailChange}
          />
          <input
            className="input"
            autoFocus
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
                        className="input"
                        name="file"
                        type="file"
                        onChange={(e) => {
                            photo(e);
                        }}
                        placeholder="files"
                    />
          <div className="flex">
            <input type="checkbox" id="box" />
            <label htmlFor="box">Remember me</label>
          </div>
          <div className="flex">
            <button className="sub" onClick={()=>{handleSubmit()}} type="submit">
              Sign
            </button>
            <p onClick={()=>{nav("/login")}}>login now</p>

          </div>
      </div>
      <div className="part blue"><Fire/></div>
    </div>
  );

}
export default Sign;