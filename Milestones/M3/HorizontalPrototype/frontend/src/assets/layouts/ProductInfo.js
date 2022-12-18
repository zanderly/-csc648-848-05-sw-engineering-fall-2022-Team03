import Header from "./header"
import React from 'react';
// import { useState } from 'react';
import Footer from "./footer.js";
// import { Link } from 'react-router-dom';
import '../../Register.css';
import searchimg from "../../images/search.png"
import policy from "./policyDocument.json"

const ProductInfo = () => {
  return (

    <div>
    <Header />
        <div className='productname'>
        Product Name
        </div>

        <div >
         <img src={searchimg} alt="" className="info" ></img>
        </div>

        <div className="productdescription">
            <b>The product description is here</b>
            {policy.description}
        </div>

        <div className="vendorinfo">
           vendor name vendor address
           vendor@mail.com
        </div>

         <div className="productreviews">
            <b>insert product review here</b>
            {policy.description}
         </div>

    <Footer/>
    </div>
  );

};



export default ProductInfo;