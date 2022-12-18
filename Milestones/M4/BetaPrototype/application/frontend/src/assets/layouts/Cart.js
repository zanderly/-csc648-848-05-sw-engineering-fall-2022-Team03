import Header from "./header"
import React from 'react';
import { useState } from 'react';
import Footer from "./footer.js";
import { useCookies } from "react-cookie";
// eslint-disable-next-line
import  TestItems from "../../TestItems";
import CartItem from "./CartObject";
import '../../Register.css';
import { useNavigate } from "react-router-dom";
import {useContext} from 'react';
import {Context} from '../../CookieHandler';



import { Link } from 'react-router-dom';


const Cart = () => {
  // eslint-disable-next-line
   const [cookies, setCookie, removeCookie] = useCookies(['user','next']);
   // eslint-disable-next-line
   const [cart, setThisCart]=useState(cookies['cart']);
   const redirect = useNavigate()
   const { cartTotal, setCartTotal, setCart} = useContext(Context);


  function checkout(){
   const topFive = cart.slice(Math.max(cart.length - 5, 0));
    setCookie('lastFive',topFive, 1200, { path: '/' });
    setCookie('total',cartTotal, { path: '/' });
    setCart([]);
    redirect('/Checkout')
  }

  function total(items){
    var totalcost=items.reduce((a,b)=>a+b.price,0);
    setCartTotal(totalcost);
    return totalcost;
    
  }



  // eslint-disable-next-line
  function ProductList({cart}) {
    // eslint-disable-next-line
    const display=cart.map(product => <CartItem key={product.id} product={product} />);

    return (
      <div>
        {display}
      </div>
    );
  }

  return (

    <div>
      <Header />
      
      <h2>Cart Page will be fully implemented in the future</h2>

        {cart && (<div>
            <div className="cartContainer">
                <ProductList cart={cookies['cart']} />
                <br />
                <br />
            </div>
            <div className="carttotal">
           <h4>You Have {cookies['cart'].length} item(s) in your Cart</h4>
           <h4>Your total is: {total(cookies['cart'])}$.</h4>
           <br/>
           <br/>
           <button className= "checkoutButton" type="button" onClick={checkout}>Checkout</button>
           <br/>
           <Link to="/Recurring">
          <button className="checkoutButton" type="button">Recurring Delivery</button>
        </Link>
           </div >
            </div>
        )}


        {!cart && (
        <h3>Your cart is Empty</h3>
        )}


      <br />
      <br />
    <Footer/>
    </div>
  );

};



export default Cart;