 import React from 'react';
 import '../../Register.css';
import { useCookies } from "react-cookie";
// eslint-disable-next-line
import {useState} from 'react';
import {useContext} from 'react';
import {Context} from '../../CookieHandler';
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line
const Product=({product})=> {
    const [cookies, setCookie] = useCookies(['user','next']);
    // eslint-disable-next-line
    const { cart, setCart} = useContext(Context);
    const redirect = useNavigate();



   function description() {
        setCookie('description',product, 20, { path: '/' });
        redirect('/ProductInfo')
   }

   function handlesubmit() {
      setCookie('next', product, { path: '/' });
    }

    function updateCart(){

        if(product===cookies['next']) {
          cart.push(cookies['next'])
        } else{
          setCookie('next', product, { path: '/' });
          cart.push(product);

          setCookie('cart', cart, { path: '/' });
          console.log(cart);
        }
    }

    function submitCart(e){
        e.stopPropagation();
        handlesubmit();
        updateCart();
    }







  // eslint-disable-next-line
   return(

    <div>
     <div className="product" onClick={description}>
        {/* eslint-disable-next-line */}
       <img alt={product.name} src={process.env.PUBLIC_URL+product.imgPath} width="90" height="90" />
       {/* eslint-disable-next-line */}
         <h3>{product.name}</h3>
         {/* eslint-disable-next-line */}
         <div>{product.description}</div>
         {/* eslint-disable-next-line */}
         <div>Price: {product.price}</div>
         {/* eslint-disable-next-line */}
          <div>Quantity: {product.quantity}</div>
        <button className="addbutton" type="submit" onClick={submitCart}>Add to Cart</button>
     </div>

     </div>
   );
 }

 export default Product;