import React from 'react';
import Header from "./header"
import { Link } from 'react-router-dom';
import Footer from "./footer.js";

/*function login() {
    const body = 0;
    const settings = {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
    fetch("/login", settings).catch(e => console.log(e));
  }*/


const Login = () => {
  return (
    <div>
      <br/>
      <Header />
      <h1>TVFM LOGIN</h1>
      <h4>Login</h4>
      <form>
        <label>User/Email</label>
        <input type="text" placeholder="email" /><br />
        <label>Password</label>
        <input type="password" placeholder="password" /><br />
        <br />
        <label>Vendor:</label>
        <input type="button" value="Log In" />
        <label>Customer:</label>
        <input type="button" value="Log In" />

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