import React from "react";
import logoimg from "../../images/tvfm-logo.jpg"
import searchimg from "../../images/search.png"
import {useState} from 'react';
import registerCustomer from './RegisterLoginComponents.js';
import registerVendor from './RegisterLoginComponents.js';


class Header extends React.Component {
    
    
    
    render () {return   <nav>
                            <div>
                                <div id="navbar" className="navbar">
                                    <div id="nav-belt" className="nav-belt">
                                        <div id="nav-left" className="nav-left">
                                            <div id="nav-logo">
                                                <img className="logo-img" src={logoimg} ></img>
                                            </div>
                                        </div>
                                        <div id="nav-fill" className="nav-fill">
                                            <div id="nav-search">
                                                <div className="dflex">
                                                    <button className="all" type="button">
                                                        All <i class="fa fa-sort-desc"></i>
                                                    </button>
                                                        
                                                    <input id="nav-search-box" placeholder="Search" />  
                                                    <button className="search" type="submit">
                                                        <img className="search-icon" src={searchimg} ></img>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="nav-right" className="nav-right">
                                            <div id="nav-tools" className="nav-tools">
                                                <div className="item">
                                                    <p><button>Cart</button></p>
                                                </div>
                                                <div className="item">
                                                   <p> <button>Sign-Up</button> </p>
                                                </div>
                                                <div className="item">
                                                    <p> <button>Login/Logout</button></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </nav>
    }
}

export default Header;
