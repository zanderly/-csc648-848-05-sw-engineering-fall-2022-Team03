import Header from "./header"
import React from 'react';
import { useState } from 'react';
import Footer from "./footer.js";
import { useCookies } from "react-cookie";
// import {Link} from 'react-router-dom';
import HistoryItem from "./HistoryItem";
import '../../Register.css';
// eslint-disable-next-line
import  TestItems from "../../TestItems";
// eslint-disable-next-line
import {useEffect} from 'react';
import {Context} from '../../CookieHandler';
import {useContext} from 'react';

// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const CustomerSettings = () => {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['user','next', 'nextHistory']);
  // eslint-disable-next-line
  const [history, setHistory]=useState(cookies['history']);
  // eslint-disable-next-line
  const [purchaseHist,setPurchaseHist]=useState('');
  // eslint-disable-next-line
  const { description, setDescription} = useContext(Context);


// eslint-disable-next-line
 function ProductList({cart}) {
  // eslint-disable-next-line
    const shopHistory=cart.map(product => <HistoryItem key={cart.indexOf(product)} product={product} />);

    return (
      <div>
        {shopHistory}
      </div>
    );
  }



  return (

    <div>
      <Header />
      <h1>Previous Purchases</h1>
      <h2><button>Edit Recent Order</button></h2>
      <div className="historyContainer">
         <ProductList cart={cookies['history']} />
       </div>

       <div className="infobox">
        <div><b>Item Description</b></div><br/>
        <div>{description}</div>

       </div>
    <Footer/>
    </div>
  );

};



export default CustomerSettings;