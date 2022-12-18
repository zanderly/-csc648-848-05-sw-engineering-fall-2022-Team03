import React from 'react';
import Header from "./header"
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./footer.js";
import {useState} from 'react';
import URL from "./../json/URL.json"




const Login = () => {
  const url = URL.url;
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const [toVendor, setToVendor] = useState(false);

  const navigate = useNavigate();
  

  const checkAttempts = () => {
    var loginAttempts = localStorage.getItem("loginAttempts");
    var timeAttempt = localStorage.getItem("timeAttempt");
    
    if(!loginAttempts) {
      localStorage.setItem("loginAttempts", 1);
      localStorage.setItem("timeAttempt", new Date().getTime());
      console.log(3 + " more attempts.");
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
    const vendor = (toVendor) ? 1 : 0;
    const user = {email, password, vendor};
    console.log(user);
      if(checkAttempts() === 0) {
        try {
        fetch(`${url}/login`, {
          method:"POST",
          headers: { 
            "Content-Type": "application/json",
            "User-Agent": "MY-UA-STRING" },
          body: JSON.stringify(user)
        })
        .then(data => data.text())
        .then((result) => {
          // console.log(result);
          // console.log(JSON.parse(result));
          if(result) {
            localStorage.setItem("user", result);
            if(localStorage.getItem("loginAttempts")) {
              localStorage.removeItem("loginAttempts");
              localStorage.removeItem("timeAttempt");
            }
            navigate("/");
          }
          else {
            setEmail("");
            setPassword("");
          }
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
        <div className="forVendorSignup">
          <input type="checkbox" className="checkVendorBox" value={toVendor} onChange={() => setToVendor(!toVendor)} ></input>
          <h5>Sign-in as Vendor</h5>
        </div>
        <br/>
        <br/>
        
        
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