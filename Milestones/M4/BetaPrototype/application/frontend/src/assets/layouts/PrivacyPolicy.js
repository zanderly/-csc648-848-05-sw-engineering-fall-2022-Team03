import Header from "./header"
import React from 'react';
// import { useState } from 'react';
import Footer from "./footer.js";
import '../css/style.css';
import policy from "./policyDocument.json"

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Policy = () => {




  return (

    <div>
      <Header />
      <br/>
      <br/>
      <br/>
      <h1>Privacy Policy</h1>
        <div className="TOS">
        {policy.description}

        </div>
    <Footer/>
    </div>
  );

};



export default Policy;