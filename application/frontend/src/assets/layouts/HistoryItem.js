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
    const [remove, setRemove] = useState(product);
    const history= cookies["history"];




    function setDelete(){
      setCookie('deleteNext',product,{path:"/"});
      if(product===cookies['deleteNext']) {
        setRemove(cookies['deleteNext'])
      } else {
          setCookie('deleteNext', product, { path: '/' });
          setRemove(product);
        }
    }
    
    function removeItem(e){
      e.stopPropagation();
      setDelete();
      const index= history.findIndex(item=>item.name===remove.name);
      console.log(remove);
      console.log(index);
      console.log(history);
      if (index > -1) {
        history.splice(index, 1);
        setCookie('history',history,{path:"/"});
      }
      if(!cookies['history']){
        removeCookie('history');
      }
      removeCookie('deleteNext');
      
    }

    function handleSubmit(){
        // eslint-disable-next-line
        setCookie('nextHistory', product.description, { path: '/' });
        // eslint-disable-next-line
        setDescription(product.description);
    }

  // eslint-disable-next-line
   return(
   <div>
  
     <div className="product" onClick ={handleSubmit}>
     {/* eslint-disable-next-line */}
       <img alt={product.name} src={process.env.PUBLIC_URL+product.imgPath} width="90" height="90" />
        {/* eslint-disable-next-line */}
         <h3>Name: {product.name}</h3>
         {/* eslint-disable-next-line */}
         <h4>Price: {product.price}</h4>
         {/* eslint-disable-next-line */}
         <h4>Quantity: {product.quantity}</h4>
         <h4>Purchased on: {date}</h4>
         <button onClick={removeItem}>Remove Item</button>

     </div>
    
     </div>
   );
 }

 export default HistoryItem;