import Header from "./header"
import React from 'react';
import { useState } from 'react';
import Footer from "./footer.js";
// import { Link } from 'react-router-dom';
import '../../Register.css';
import searchimg from "../../images/search.png"
import policy from "./policyDocument.json"
import { useCookies } from "react-cookie";
import {useContext} from 'react';
import {Context} from '../../CookieHandler';
import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const ProductInfo = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user','description']);
  // eslint-disable-next-line
  const [product,setProduct]=useState(cookies['description']);
   const redirect = useNavigate();
   // eslint-disable-next-line
   const {cart, setCart}=useContext(Context)

  useEffect(()=>{
    if(!product){
    redirect('/SearchPage')
        }
    });
  useEffect(()=>{removeCookie('description')});

  function submitCart(){
    cart.push(product);
    setCookie('cart', cart, { path: '/' });
    redirect('/SearchPage')
  }
  
  
  return (

    <div>
    <Header />

   { product && (
        <div>

        <div className='productname'>
        {product.name}
        </div>

        <div>
         <img src={searchimg} alt="" className="info" />
        </div>

        
        
        <div className="productdescription">
            <b>Description: </b>
            <br/>
            {product.description}<br/>
            {product.price}<br/>
            {product.nutrition}<br/>
        </div>


        <div className="vendorinfo">
           <b>vendor name vendor address
           vendor@mail.com</b>
        </div>

        <div className="productinfobutton">
        <button className="addbutton" type="submit" onClick={submitCart}>Add to Cart</button>
        </div>

         <div className="productreviews">
            <b>insert product review here</b>
            {policy.description}
         </div>

         
    </div>
         )}

        {!product &&(<div><h1> No product selected </h1></div>)}

    <Footer/>
    </div>
  );

};



export default ProductInfo;