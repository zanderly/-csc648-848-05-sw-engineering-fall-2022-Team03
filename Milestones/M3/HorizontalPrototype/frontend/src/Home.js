import Header from "./assets/layouts/header"
import React from 'react';
// import {useState} from 'react';
// import Search from "./assets/layouts/Search";
// import  TestItems from "./TestItems";
import Footer from "./assets/layouts/footer.js";

// import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

const Home =()=>{
return (

    <div>
    <Header/>
    <br/>
    <br/>
      <h1>Home Page</h1>
      <h2>Fresh Food to Your Door</h2>
      <br/>
      {/* <Search itemlist={TestItems}/> */}
    <Footer/>
    </div>
  );

};



export default Home;