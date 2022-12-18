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

const EditOrder = () => {
  // eslint-disable-next-line
   const [cookies, setCookie, removeCookie] = useCookies(['user','next', 'nextHistory']);

   // eslint-disable-next-line
   function ProductList({cart}) {
    // eslint-disable-next-line
      let shopHistory=cart.map(product =><> <HistoryItem key={cart.indexOf(product)} product={product} /><button>remove</button></>);
     // shopHistory=shopHistory.map(<button>remove</button>);

      return (
        <div>
          {shopHistory}
        </div>
      );
    }




  return (

    <div>
      <Header />
      <h1>Your Recent Order</h1>
        <ProductList cart ={cookies['history']}/>
    <Footer/>
    </div>
  );

};



export default EditOrder;