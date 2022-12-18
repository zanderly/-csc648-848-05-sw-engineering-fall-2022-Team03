import React from "react";
import '../css/style.css';
import {Link} from 'react-router-dom';
import Header from "./header";
import Footer from "./footer.js";




class VendorRegister extends React.Component{


    render () {return <div >
                        <Header/>
                        <br/>
                        <br/>
                        <div className="signup-box">
                        <h1>Vendor Sign Up</h1>
                        <h4>only takes a minute to sign up!</h4>
                        <form>
                            <label>First Name</label>
                                <input type="text" placeholder=""></input>
                            <label>Last Name</label>
                                <input type="text" placeholder=""></input>
                            <label>Email</label>
                                <input type="email" placeholder=""></input>
                             <label>Company Name</label>
                                <input type="text" placeholder=""></input>
                            <label>Password</label>
                                <input type="password" placeholder=""></input>
                            <label>Confirm Password</label>
                                <input type="password" placeholder=""></input>
                                <input type="button" value="Submit"></input>
                        </form>
                        <p>By clicking the sign up button, you agree to our</p>
                            <Link to="/PrivacyPolicy"><p>Terms and Conditions and Privacy Policy</p></Link>

                        </div>
                    <Footer/>
                    </div>
    }
}

export default VendorRegister;