import Header from "./header"
import React from 'react';
// eslint-disable-next-line
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

const EditOrder = () => {
  // eslint-disable-next-line
   const [cookies, setCookie, removeCookie] = useCookies(['user','next', 'nextHistory']);
   // eslint-disable-next-line
   const { description, setDescription} = useContext(Context);

   // eslint-disable-next-line
   function ProductList({cart}) {
    // eslint-disable-next-line
      let shopHistory=cart.map(product => <HistoryItem key={cart.indexOf(product)} product={product}/>);
     // shopHistory=shopHistory.map(<button>remove</button>);

      return (
        <div className='productContainer'>
          {shopHistory}
        </div>
      );
    }




  return (

    <div>
      <Header />
      <h1>Your Recent Order</h1>
        <ProductList cart ={cookies['history']}/>
        <div className="infobox">
        <div><b>Item Description</b></div><br/>
        <div>{description}</div>
        </div>
    <Footer/>
    </div>
  );

};



export default EditOrder;