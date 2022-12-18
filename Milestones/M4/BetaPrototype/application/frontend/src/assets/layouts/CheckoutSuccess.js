import Header from "./header"
import React from 'react';
// import { useState } from 'react';
import Footer from "./footer.js";
import {Link} from 'react-router-dom';
import {useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// eslint-disable-next-line
import { useEffect } from 'react';


// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const COsuccess = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [removeCookie] = useCookies();

    setTimeout(() => {
      navigate('/')
    }, 3000);







  return (

    <div>
      <Header />
      <br />
      <br />
      <br />
      <h1>Your Transaction Was Accepted!</h1>
      <h2>We are redirecting you to our homepage, click <Link to="/">here</Link> if you are not redirected.</h2>

      <br />
      <br />
      <br />
    <Footer/>
    </div>
  );

};



export default COsuccess;