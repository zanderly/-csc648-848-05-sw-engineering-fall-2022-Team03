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

// eslint-disable-next-line
const Cart = (props) => {
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
    setCookie('checkout',cart, { path: '/' });
    removeCookie('cart');
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

  function CartPage(){
    return(
      <div>
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
    );
  }

  function EmptyCartPage(){
    return(
      <div>
        <h2>Your Cart Is Empty</h2>
        <h4>Click <Link to="/SearchPage">Here</Link> To Return to The Search Page</h4>
      </div>
    );
  }
// eslint-disable-next-line
  function CartRender(props){
    // eslint-disable-next-line
    const emptypage=props.emptypage
    if (emptypage) {
      return <CartPage/>;
    }
    return <EmptyCartPage />;
  }

  return (

    <div>
      <Header />
      
      <h2>Cart Page will be fully implemented in the future</h2>

        <CartRender emptypage={cart}/>


      <br />
      <br />
    <Footer/>
    </div>
  );

};



export default Cart;