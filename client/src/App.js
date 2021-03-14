import React, { useState, useEffect } from 'react';

//import logo from './logo.svg';
import './App.css';
import Register from './Components/Register'
//import e from 'express';
import axios from 'axios';

function App() {
 /*const run= ()=>{
    setData({
      name:"",
    password:"",
    email:""
    })
  }
  const [data,setData]=useState({
    name:"",
    password:"",
    email:""
  })
  
  const InputEvent =(event) =>{
  
    console.log("done")
    const {name,value}=event.target;
      
      setData((preValue) =>{

      
     
     return {
         ...preValue,
         [name]:value,
     }
    });
  }
  const submit=async (e)=>{

    e.preventDefault();
    console.log("linked");
    console.log(data);
    await axios.post('http://localhost:4000/send',data).then((data)=>{
      console.log(data,"nhi mila koi response");
    }).catch((err)=>{console.error(err)});
    /*fetch('http://localhost:4000/send', {
      method: 'post',
      body:data
    }).then((data)=>{
      console.log(data,"nhi mila koi response");
    }).catch((err)=>{console.error(err)});*/
  //}

    
  

 /* const submit=()=>{
    
    console.log("linked");
    
    fetch(`http://localhost:4000/send`).then((res)=>{
      console.log(res.json())
      console.log("linked")
    })
  }*/
  return (<>
    <div className="App">
      
     <Register/>
    </div>
    </>
  );

  }

export default App;
