import React from 'react';
import Header from "./header"
import Footer from "./footer.js";

const VendorAddItem = () =>{
    return (
        <div>
            <Header />
            <h1>Add item</h1>
            <form>
                <label>Name</label>
            </form>
            <Footer />
        </div>
    )
}
export default VendorAddItem;