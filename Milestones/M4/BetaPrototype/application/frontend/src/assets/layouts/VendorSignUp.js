import Header from "./header"
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/style.css';
import Footer from "./footer.js";
import URL from "./../json/URL.json"
// import { PasswordValidation } from "./PasswordValidation";


const VendorSignUp =()=> {
  const url = URL.awsURL;
  // const url = URL.localURL;

  const [name, setFName]  = useState('');
  const [lastname, setLName]  = useState('');
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const vendor = 1;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const user = {name, lastname, email, password, vendor};
    // URL ----------------------------------------------------
    fetch(`${url}/registration`, {
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        })
        .then(data => data.text())
        .then((result) => {
          console.log(result);
          if(result === "registered as vendor") {
            navigate("/Login");
          }
          else {
            setFName("");
            setLName("");
            setEmail("");
            setPassword("");
            setRePassword("");
            console.log(result);
          }
        })
  }

  return (
    <div>
      <Header />
      <div className="register">
      <form>
        <br />
        <br />

        <h1> TVFM Vender Registration</h1>
        <label htmlFor="First"><b>Name</b></label>
        <input type="text" placeholder="Enter First Name" name="First" id="First" 
        value={name} onChange={(e) => setFName(e.target.value)}required />
        <label htmlFor="Last"><b>Last Name</b></label>
        <input type="text" placeholder="Enter Last Name" name="Last" id="Last"
        value={lastname} onChange={(e) => setLName(e.target.value)} required /><br />

        <label htmlFor="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" 
        value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

        <label htmlFor="Password"><b>Password</b></label>
        <input type="text" placeholder="Enter New Password" name="Password" 
        id="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

        <label htmlFor="Password"><b> Re-Enter Password</b></label>
        <input type="text" placeholder="EnterPassword" name="rePassword" 
        id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required /><br />

    
        <label htmlFor="TOS"><Link to="/TOC">Terms and Conditions</Link></label> 
        <input type="checkbox" name="TOS" />
        
        <br/>
        <input type="submit" value="Submit" onClick={handleClick}/>
      </form>

      </div>
      <Footer />
    </div>
  );
}

export default VendorSignUp;