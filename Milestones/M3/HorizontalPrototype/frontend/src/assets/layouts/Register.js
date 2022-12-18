import Header from "./header"
import React from "react";
import { Link } from 'react-router-dom';
import Footer from "./footer.js";
const Register =()=>{
return (
<div>
<Header/>
            <br/>
           <h1>Register Today</h1>
             <div>
             <Link to ="/CustomerSignUp"><p>Sign Up As Customer</p></Link>
             </div>

            <div>
           <Link to ="/VendorRegister"><p>Sign Up As Vendor</p></Link>
           </div>
<Footer/>
</div>


  );

};



export default Register;