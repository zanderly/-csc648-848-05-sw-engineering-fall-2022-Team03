import React from 'react';
import Header from "./header"
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./footer.js";
import {useState} from 'react';
import URL from "./../json/URL.json"




const Login = () => {
  const url = URL.awsURL;
  // const url = URL.localURL;
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const checkAttempts = () => {
    var loginAttempts = localStorage.getItem("loginAttempts");
    var timeAttempt = localStorage.getItem("timeAttempt");
    
    if(!loginAttempts) {
      localStorage.setItem("loginAttempts", 1);
      localStorage.setItem("timeAttempt", new Date().getTime());
      console.log(4 + " more attempts.");
      return 0;
    }
    
    var timeElapsed = Math.floor((new Date().getTime() % timeAttempt) / 30000);

    if( (loginAttempts - timeElapsed) < 0 ) {
      loginAttempts = 0;
      localStorage.removeItem("loginAttempts");
      timeAttempt = localStorage.removeItem("timeAttempt");
    }
    else if( timeElapsed >= 1 ) {
      localStorage.setItem("loginAttempts", loginAttempts - timeElapsed);
      loginAttempts = localStorage.getItem("loginAttempts");
      timeAttempt = localStorage.setItem("timeAttempt", new Date().getTime());
    }

    if(loginAttempts > 3) {
      setEmail("");
      setPassword("");
      console.log("You have been locked out");
      return 1;
    }
    else {
      localStorage.setItem("loginAttempts", ++loginAttempts);
      loginAttempts = localStorage.getItem("loginAttempts");
      timeAttempt = localStorage.setItem("timeAttempt", new Date().getTime());
      
      console.log((4 - loginAttempts) + " more attempts");
    } 
      return 0;
  }

  
  const handleClick = (e) => {
    e.preventDefault();
    const user = {email, password};
    try {
      if(checkAttempts() === 0) {
          // URL ----------------------------------------------------
        fetch(`${url}/login`, {
          method:"POST",
          headers: { 
            "Content-Type": "application/json",
            "User-Agent": "MY-UA-STRING" },
          body: JSON.stringify(user)
        })
        .then(data => data.text())
        .then((result) => {
          console.log(result);
          if(result === "customer") {
            try{
              // URL ----------------------------------------------------
              fetch(`${url}/customer`, {
              method:"GET",
              })
              .then(data => data.json())
              .then((result) => {
                console.log(result);
                localStorage.setItem("customer", JSON.stringify(result));
                if(localStorage.getItem("loginAttempts")) {
                  localStorage.removeItem("loginAttempts");
                  localStorage.removeItem("timeAttempt");
                }
                navigate("/");
              })
            } catch (e) {
              console.log(e.message);
              navigate("/Login");
            }
          }
          if(result === "vendor") {
            try{
              // URL ----------------------------------------------------
              fetch(`${url}/vendor`, {
              method:"GET",
              })
              .then(data => data.json())
              .then((result) => {
                console.log(result);
                localStorage.setItem("vendor", JSON.stringify(result));
                if(localStorage.getItem("loginAttempts")) {
                  localStorage.removeItem("loginAttempts");
                  localStorage.removeItem("timeAttempt");
                }
                navigate("/");
              })
            } catch (e) {
              console.log(e.message);
              navigate("/Login");
            }
          }
          else {
            setEmail("");
            setPassword("");
          }
        })
      }
      else {
        setEmail("");
        setPassword("");
        console.log("Print");
      } 
    } catch (e) {
      console.log(e.message);
      navigate("/Login");
    } 
  }



  return (
    <div>
      <br/>
      <Header />
      <h1>TVFM LOGIN</h1>
      <h4>Login</h4>
      <form>
        <label>User/Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <br />
        <button value="Log In" onClick={handleClick}>Log In</button>
      </form>
      <p>Forgot your password?
        <Link to="/recover"> Account Recovery  </Link>
           Dont have an account?
        <Link to="/Register">Sign Up</Link>
      </p>
      <Footer/>
    </div>
  );
};

export default Login;