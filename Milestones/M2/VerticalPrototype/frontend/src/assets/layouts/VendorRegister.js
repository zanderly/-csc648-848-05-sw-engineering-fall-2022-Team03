import React from "react";
import '../../style.css';




class VendorRegister extends React.Component{


    render () {return <div>
                        <h1>Vendor Sign Up</h1>
                        <h4>only takes a minute to sign up!</h4>
                        <form>
                            <label>First Name</label>
                            <input type="text" placeholder=""></input>
                            <label>Last Name</label>
                            <input type="text" placeholder=""></input>
                            <label>Email</label>
                            <input type="email" placeholder=""></input>
                            <label>Password</label>
                            <input type="password" placeholder=""></input>
                            <label>Confirm Password</label>
                            <input type="password" placeholder=""></input>
                            <input type="button" value="Submit"></input>
                        </form>
                        <p>By clicking the sign up button, you agree to our 
                            <a href="#">Terms and Conditions</a> and <a href="#">Policy Privacy</a>
                        </p>
                    </div>
    }
}

export default VendorRegister;