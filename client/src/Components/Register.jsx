
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Register(props) {

    const run= ()=>{
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
      }
    
    
    return (
        <>
        <h1>Registration</h1>
        <form onSubmit={submit} method="post">
        <input type="text" placeholder="enter name" value={data.name} onChange={InputEvent} name="name"></input><br></br><br></br>
        <input type="password" placeholder="enter password" value={data.password} onChange={InputEvent} name="password"></input><br></br><br></br>
        <input type="email" placeholder="enter email" value={data.email}  onChange={InputEvent} name="email"></input><br></br><br></br>
        <button type="submit" onDoubleClick={run}>add emp</button>
        </form>
            
        </>
    );
}

export default Register;