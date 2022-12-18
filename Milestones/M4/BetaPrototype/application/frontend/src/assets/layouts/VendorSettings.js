import React from 'react';
import Header from "./header"
import Footer from "./footer.js";

const VendorSettings = () =>{
    return (
        <div>
            <Header />
            <button>Add new item</button>
            <h1>Inventory</h1>
            <h1>Item</h1>
            <Footer />
        </div>
    )
}
export default VendorSettings;