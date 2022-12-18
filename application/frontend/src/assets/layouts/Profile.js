import React from "react";
import Header from "./header";
import Footer from "./footer.js";
import "./../css/profile.css";
import {Link} from 'react-router-dom';


const Profile = () => {

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    


    return(
        <div>
            <Header/>
            <div className="profileContainer">
                <div className="profileEdit">
                    <h2>User Info</h2>
                    <div className="user-info-style">
                        <h4>Username</h4>
                        { loggedUser.name } { loggedUser.lastname }
                    </div>
                    <br/>
                    <div className="user-info-style">
                        <h4>E-mail</h4>   
                        {loggedUser.email}
                    </div>
                    <br></br>
                    <div>
                        <h4>Address</h4>
                        {(loggedUser.address && ( <>
                            { loggedUser.address.number } { loggedUser.address.street } <br/>
                            { loggedUser.address.city } { loggedUser.address.state }, { loggedUser.address.zipcode }
                        </>)) || (<> Update Address </>)
                        }
                    </div>
                    <br/>
                    <Link to ="/Settings"><button>Edit User Info</button></Link>
                </div>
            </div>
            {loggedUser.vendor === "1" && (
                <div className="addNewItem">
                    <h1>Add New Item</h1>
                    <div>
                        <h3>Inventory</h3>
                        <Link to ="/VendorAddItem"><button>Add Item</button></Link>
                    </div>
                </div>
            )}
            
            <div>
                <h1>Previous Purchases</h1>
            </div>
            <Link to ="/PreviousPurchases"><button>PreviousPurchases</button></Link>
            <Footer/>
        </div>
    );
    };


export default Profile;