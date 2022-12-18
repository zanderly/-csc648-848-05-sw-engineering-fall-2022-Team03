// import React, { useState , useEffect } from 'react';
import React from 'react';
// import {useState} from 'react';
import { useCookies } from "react-cookie"; //eslint-disable-line
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CustomerSignUp from "./assets/layouts/CustomerSignUp";
import Home from "./Home";
import VendorSignUp from "./assets/layouts/VendorSignUp";
import Register from "./assets/layouts/SignUp";
import Login from "./assets/layouts/Login";
import Not_Found from "./assets/layouts/NotFound";
import Search from "./assets/layouts/Search";
// import  TestItems from "./TestItems";
import AboutUs from './assets/layouts/aboutUs';
// import VendorRegister from "./assets/layouts/VendorRegister";
import FeedBack from "./assets/layouts/Support";
import Policy from "./assets/layouts/PrivacyPolicy";
import Cart from "./assets/layouts/Cart"
import ProductInfo from "./assets/layouts/ProductInfo";
import SearchPage from './assets/layouts/SearchPage';

import COsuccess from './assets/layouts/CheckoutSuccess';
import Checkout from './assets/layouts/Checkout';
import CustomerSettings from './assets/layouts/Customer_Setting';
import EditOrder from './assets/layouts/EditOrder';

import './assets/css/App.css';
import Recurring from './assets/layouts/Recurring';
import Profile from "./assets/layouts/Profile"
import Settings from './assets/layouts/Settings';

import VendorAddItem from './assets/layouts/VendorAddItem';

import PreviousPurchases from './assets/layouts/PreviousPurchases';


function App() {

  const [cookies, setCookie] = useCookies(['user']); //eslint-disable-line

  return( <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact/>

        <Route path="/CustomerSignUp" element={<CustomerSignUp/>} exact/>

        <Route  path="/Register" element={<Register/>} exact/>

        <Route  path="/VendorRegister" element={<VendorSignUp/>} exact/>

        <Route  path="/CustomerSupport" element={<FeedBack/>} exact/>

        <Route  path="/PrivacyPolicy" element={<Policy/>} exact/>

        <Route  path="/Login" element={<Login/>} exact/>
        <Route  path="/Cart" element={<Cart/>} exact/>
        <Route  path="/Search" element={<Search/>} exact/>

        <Route path="/aboutUs" element={<AboutUs/>} exact/>


        <Route path="/ProductInfo" element={<ProductInfo/>} exact/>

        <Route path="/SearchPage" element={<SearchPage/>} exact/>

        <Route path="/Recurring" element={<Recurring/>} exact/>

        <Route path="/CheckoutSuccess" element={<COsuccess/>} exact/>

        <Route path="/Checkout" element={<Checkout/>} exact/>

        <Route path="/CustomerSettings" element={<CustomerSettings/>} exact/>

        <Route path="/EditOrder" element={<EditOrder/>} exact/>

        <Route path="/Profile" element={<Profile/>} exact/>


        <Route path="/VendorAddItem" element={<VendorAddItem/>} exact/>


        <Route path="/Settings" element={<Settings/>} exact/>
        

        <Route path="/PreviousPurchases" element={<PreviousPurchases/>} exact/>



        <Route path="*" element={<Not_Found/>} />


      </Routes>
    </Router>
  </> );            
}




export default App;

