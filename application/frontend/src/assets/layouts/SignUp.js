import Header from "./header"
import React from "react";
import { Link } from 'react-router-dom';
import Footer from "./footer.js";
import '../css/style.css';
import policy from "./policyDocument.json"
const Register =()=>{
return (
<div>
<Header/>
            <br/>
           <h1>Register Today</h1>
             <div className="register">
             <div>
                <b>{policy.register}</b>
             </div>
                <br/>
             <div>
                <div>Join Us Today<br/>
                <button><Link to ="/CustomerSignUp">Sign Up As Customer</Link></button>
                </div>

                <div>Want to sell Products instead?<br/>
                <button><Link to ="/VendorRegister">Sign Up As Vendor</Link></button></div>
                </div>
           </div>
<Footer/>
</div>


  );

};



export default Register;