   import React from 'react';
  import '../../Register.css';
  import { useCookies } from "react-cookie";
  import {useState} from 'react';
  import {useContext} from 'react';
  import {Context} from '../../CookieHandler';
  import { useNavigate } from "react-router-dom";



// eslint-disable-next-line
const CartItem=({product})=> {
  // eslint-disable-next-line
  const date = new Date().toISOString().slice(0, 10)
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  // eslint-disable-next-line
  const { cart, setCart} = useContext(Context);
  const [remove, setRemove] = useState(product);
  // eslint-disable-next-line
  const redirect = useNavigate()

  
  
  function setDelete(){
    setCookie('deleteNext',product,{path:"/"});
    if(product===cookies['deleteNext']) {
      setRemove(cookies['deleteNext'])
    } else {
        setCookie('deleteNext', product, { path: '/' });
        setRemove(product);
      }
  }
  
  function removeItem(){
    setDelete();
    const index= cart.findIndex(item=>item.name===remove.name);
    console.log(remove);
    console.log(index);
    console.log(cart);
    if (index > -1) {
      cart.splice(index, 1);
      setCookie('cart',cart,{path:"/"});
    }
    if(!cart||cart.length===0){
      removeCookie('deleteNext');
      removeCookie('cart');
      setCart([]);
      window.location.reload(false)
    }
    removeCookie('deleteNext');
    
  }
  
  // eslint-disable-next-line
  return(
     <div className="product">
      {/* eslint-disable-next-line */}
       <img alt={product.name} src={process.env.PUBLIC_URL+product.imgPath} width="90" height="90" />
       {/* eslint-disable-next-line */}
         <h3>Name: {product.name}</h3>
         {/* eslint-disable-next-line */}
         <h3>Price: {product.price}</h3>
         {/* eslint-disable-next-line */}
         <h3>Quantity: {product.quantity}</h3>
         <button onClick={removeItem}>Remove Item</button>

     </div>
   );
 }

 export default CartItem;