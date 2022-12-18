import Header from "./assets/layouts/header.js"
import "./App.css";
import "./style.css";

import VendorRegister from './assets/layouts/VendorRegister.js';
import React from 'react';
import {useState} from 'react';

function App() {


  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  

  //https://bobbyhadz.com/blog/react-onclick-show-component
  
  // Each showAbout*Name will determine which about page is shown
 
  const showRegister = event => {
    setIsRegister(current => !current);
  };

  function login() {
    const body = 0;
    const settings = {
      method: "post",
      body: JSON.stringify(body),
    }
    fetch("/login", settings).catch(e => console.log(e));
  }

  /**
   * fetch('/getTransactions')
   * .then(res => res.json())
   * .then(data => { do something here };
   */
  const vSignup = <VendorRegister/>;

  return (
          
  
          <div>
            <Header/>
            <div>
            <p>Home Page</p>            
            <button onClick={showRegister}>Sign-Up Here</button>
            {isRegister && (vSignup)}            
            </div>
          </div>
          );
}

export default App;
