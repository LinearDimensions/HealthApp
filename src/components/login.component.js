import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

export const Login = (prop) => {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    
  }, [rerender])

  function onClickSelect(e){
    if (e.target.selected==="false"){
      e.target.setAttribute('style','border:#0011ff 6px outset;');
      e.target.selected="true";
    }
    else{
      e.target.setAttribute('style','border:none;');
      e.target.selected="false";
    }
  }

  /*https://www.formget.com/javascript-login-form/ */
  function checkCredentials(e){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ((username==='daniel')&&(password==='helloworld')){
      alert ("Login successfully");
      window.location = "/search";
    }
       // Redirecting to other page.
    else {
      alert ("Incorrect Password / Username");
    }
  }

  return (
    <body>
      <div class="box">
        <form id="login_form_id" onSubmit={(e)=>checkCredentials(e)}>
          <h2>Login</h2>
          <div class="inputBox">
            <i class="fa-solid fa-user"></i>
            <input id="username" type="text" placeholder="Username" required='required' />     
          </div>
          <div class="inputBox">
            <i class="fa-solid fa-lock"></i>
            <input id="password" type="password" placeholder="Password" required='required'/>  
          </div>
          <input class='loginButton' type="button" value="Login" onClick={(e)=>{checkCredentials(e)}}/>
        </form>
      </div>
    </body>
    )
}