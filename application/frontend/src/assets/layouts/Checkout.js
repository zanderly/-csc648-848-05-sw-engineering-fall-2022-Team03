import Header from "./header"
// eslint-disable-next-line
import React, { useEffect } from 'react';
import { useState } from 'react';
import Footer from "./footer.js";
import { useCookies } from "react-cookie";
import '../../Register.css';

import { useNavigate } from "react-router-dom";
import {useContext} from 'react';
import {Context} from '../../CookieHandler';

const Checkout = () => {
   const [cookies, setCookie, removeCookie] = useCookies(['user']);
   // eslint-disable-next-line
   const [thiscart, setThisCart]=useState(cookies['checkout']);
   const redirect = useNavigate()
   const { setCart} = useContext(Context);
   

  function checkout(){
      setCookie('history', thiscart,  { path: '/' });
      removeCookie('cart');
      setCart([]);
      handlesubmit();
      removeCookie('checkout');
      redirect('/CheckoutSuccess')
  }

   function handlesubmit(){
     // fetch("http://ec2-13-52-221-26.us-west-1.compute.amazonaws.com/cart/placeOrder", 
     fetch('/cart/placeOrder', {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({cart: cookies['checkout']}),
    })
     .then(response => response.text())
     .then((data) => {
       console.log(data);
     })
     .catch((e) => {
       console.error(`An error occurred: ${e}`)
     });
 }



  return (

    <div>
      <Header />
      <h1>Checkout</h1>
      <h2>You have {thiscart.length} Items in your Cart. The Total is {cookies['total']} $.</h2>
      <div className="checkoutbox">
      <form>

      <label><b>Name</b></label>
      <input type="text" placeholder="First" name="First" id="name" />
      <input type="text" placeholder="Last" name="Last" id="name2" /><br/>


      <label><b>Email</b></label>
      <input type="text" placeholder="email@emailprovider.com" name="email" id="email"  /><br />


      <label><b>Shipping Address</b></label>
      <input type="text" placeholder=" Enter Address" name="Address" id="Address" /><br/>

     <label><b>Credit Card Number</b></label>
     <input type="text" placeholder="**********" name="card" id="card" width="45"  />
     <input type="text" placeholder="***" name="code" id="ph3" maxLength='3'  />

      <label><b>Phone</b></label>
      <input type="text" placeholder="(000)-000-0000" name="phone" id="phone"/><br/>

      </form>
      <button className="checkoutButton" type="button" onClick={checkout}>Complete Checkout</button>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    <Footer/>
    </div>
  );

};



export default Checkout;