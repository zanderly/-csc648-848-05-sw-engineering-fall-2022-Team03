import React from 'react';
import Header from "./header"
import { Link } from 'react-router-dom';
import Footer from "./footer.js";


const Recurring = () => {
  return (
    <div>
      <br/>
      <Header />
      <h1>Recurring Delivery</h1>
      <h4>Recurring Page will be fully implemented in the future</h4>
      <form>
        <label>Delivery Start Date</label>
        <input type="date" /><br />
        <div>
            <label>Recurrence</label>
            <div className="often">
                <input type="number" placeholder="##" />
                <select className="dropdown">
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                    <option value="Months">Months</option>
                </select>

            </div>
        </div>    
        <div>
            <Link to="/Cart">
                <input type="button" value="Checkout" />
            </Link>
        </div>
      </form>
      <Footer/>
    </div>
  );

};



export default Recurring;