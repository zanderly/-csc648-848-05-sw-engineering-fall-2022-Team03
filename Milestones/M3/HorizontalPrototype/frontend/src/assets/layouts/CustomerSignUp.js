import Header from "./header"
import React from 'react';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import Footer from "./footer.js";


const CustomerSignUp = () => {

  const handleSubmit = e => {
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
  }


  return (
    <div>
      <Header />
      <div className="register">
      <form onSubmit={handleSubmit}>
        <br />
        <br />

        <h1> TVFM Customer Registration</h1>
        <label htmlFor="First"><b>name</b></label>
        <input type="text" placeholder="Enter First Name" id="First" required />

        <input type="text" placeholder="Enter Last Name" name="Last" id="Last" required /><br />

        <label htmlFor="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" required /><br />

        <label htmlFor="Address"><b>Address</b></label>
        <input type="text" placeholder="Enter Address" name="Address" id="Address" required /><br />

        <label htmlFor="Phone"><b>Phone Number</b></label>

        +1

        <input type="tel" placeholder="000" name="Phone" id="ph1" maxLength='3' required />
         -
        <input type="tel" placeholder="000" name="Phone" id="ph2" maxLength='3' required />
         -
        <input type="tel" placeholder="0000" name="Phone" id="ph3" maxLength='4' required />

        <br />


        <label htmlFor="TOS"> I agree to the <Link to="/TOC"> Terms and Conditions</Link>
        <input type="checkbox" name="TOS" /></label>

        <br/>
        <input type="submit" value="Submit" />
      </form>
      </div>
      <Footer />
    </div>

  )

}
export default CustomerSignUp;