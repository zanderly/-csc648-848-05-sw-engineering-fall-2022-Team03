import Header from "./header"
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import Footer from "./footer.js";


const VendorSignUp =()=> {

  /*function handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "firstname": this.firstname.value,
        "lastname": this.lastname.value,
        "email": this.email.value,
      }),

    })
  }*/


    const [reg, setReg] = useState(false);


    // const SendReg=event=>{
    //   setReg(current => !current);
    // }

  function RegSuccess() {
      return (
        <div>
          <br/>
          <br/>
          <h1>You Have Successfully Signed Up to TVFM </h1>
          <h1><Link to = "/">Home</Link></h1>
        </div>
      );
    }



  return (
    <div >
      <Header />
      <br />
      <br />
      <br />
      {!reg &&(
      <div className="signup-box">
      <form>

        <h1>Vendor Sign Up</h1>
        <h4>only takes a minute to sign up!</h4>

        <label><b>Name</b></label>
        <input type="text" placeholder="Enter First Name" id="First" required />
        <input type="text" placeholder="Enter Last Name" name="Last" id="Last" required /><br />

        <label><b>Company Name</b></label>
        <input type="text" placeholder="Company" name="Company" id="Company" required/><br/>

        <label><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" required /><br />

        <label><b>Address</b></label>
        <input type="text" placeholder="Enter Address" name="Address" id="Address" required /><br />

        <label><b>Phone Number</b></label>

        +1

        <input type="tel" placeholder="000" name="Phone" id="ph1" maxLength='3' required />
         -
        <input type="tel" placeholder="000" name="Phone" id="ph2" maxLength='3' required />
         -
        <input type="tel" placeholder="0000" name="Phone" id="ph3" maxLength='4' required />

        <br />


        <label> I agree to the <Link to="/PrivacyPolicy"> Terms and Conditions</Link>
        <input type="checkbox" name="TOS" /></label>

        <br/>
        <input type="submit" value="Submit" onClick={setReg}/>
      </form>
      </div>
      )}
      {reg && <RegSuccess />}
      <Footer />
    </div>

  )

}

export default VendorSignUp;