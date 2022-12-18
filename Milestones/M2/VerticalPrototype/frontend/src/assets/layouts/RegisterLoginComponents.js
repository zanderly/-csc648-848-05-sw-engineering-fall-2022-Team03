import React from 'react';


class RegisterVendor extends React.Component {
render () { return  <div>
                        <h1>Vendor Sign Up</h1>
                        <form>
                            <label>Name</label>
                            <input type="text" placeholder=""></input>
                            <label>Phone Number</label>
                            <input type="number" placeholder=""></input>
                            <label>Email</label>
                            <input type="email" placeholder=""></input>
                            <label>Password</label>
                            <input type="password" placeholder=""></input>
                            <label>Confirm Password</label>
                            <input type="password" placeholder=""></input>
                            <input type="button" value="Submit"></input>
                        </form> 
                    </div>
    };
}

class RegisterCustomer extends React.Component {
render () { return  <div>
                        <h1>Customer Sign Up</h1>
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
                    </div>
    };
}