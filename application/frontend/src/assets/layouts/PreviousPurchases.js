import React from "react";
import Header from "./header";
import Footer from "./footer";
import { useState } from 'react';
import '../../Register.css';
import { useCookies } from "react-cookie";





const PreviousPurchases = () => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['user','next','nextHistory']);
    // eslint-disable-next-line
    const [cart, setThisCart]=useState(cookies['cart']);



   

    return (
        <div>
            <Header/>
            <h2>purchase history implementation not complete</h2>
            
            <div className="cartContainer">
                
                <br />
                <h4>You Have Previously Purchased these {cookies['user']} item(s) in your Cart</h4>
                <br />
                
            </div>
            <Footer/>
        </div>
    )

    }
export default PreviousPurchases;