  import React from 'react';
  import '../../Register.css';
  import { useCookies } from "react-cookie";
  // eslint-disable-next-line
  import {useState} from 'react';
  import {useContext} from 'react';
  import {Context} from '../../CookieHandler';
  // eslint-disable-next-line
  import  TestItems from "../../TestItems";


// eslint-disable-next-line
const HistoryItem=({product})=> {
    const date = new Date().toISOString().slice(0, 10)
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    // eslint-disable-next-line
    const { description, setDescription} = useContext(Context);

    function handleSubmit(){
        // eslint-disable-next-line
        setCookie('nextHistory', product.description, { path: '/' });
        // eslint-disable-next-line
        setDescription(product.description);
    }

  // eslint-disable-next-line
   return(
   <div>
   <button onClick ={handleSubmit}>
     <div className="product">
     {/* eslint-disable-next-line */}
       <img alt={product.name} src={process.env.PUBLIC_URL+product.imgPath} width="90" height="90" />
        {/* eslint-disable-next-line */}
         <h3>Name: {product.name}</h3>
         {/* eslint-disable-next-line */}
         <h4>Price: {product.price}</h4>
         {/* eslint-disable-next-line */}
         <h4>Quantity: {product.quantity}</h4>
         <h4>Purchased on: {date}</h4>
     </div>
     </button>
     </div>
   );
 }

 export default HistoryItem;