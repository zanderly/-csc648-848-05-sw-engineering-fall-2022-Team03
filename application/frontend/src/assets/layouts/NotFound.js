import Header from "./header"
import React from 'react';
// import { useState } from 'react';
import Footer from "./footer.js";
// import {Link} from 'react-router-dom';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Not_Found = () => {
  return (

    <div>
      <Header />
      <br />
      <br />
      <br />
      <h1>The Page You were Looking For Does Not Exist</h1>
      <br />
      <br />
      <br />
    <Footer/>
    </div>
  );

};



export default Not_Found;