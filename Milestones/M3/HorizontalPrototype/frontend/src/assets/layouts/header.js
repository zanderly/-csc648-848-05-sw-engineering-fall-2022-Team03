import React from 'react';
// import {useState} from 'react';
import {Link} from 'react-router-dom';
// import  TestItems from "../../TestItems";
import searchimg from "../../images/search.png"
import logoimg from "../../images/tvfm-logo.jpg"
// import Search from "./Search"




class Header extends React.Component {


    
    render () { return  <nav>
            <div>
                <div className="navbar">
                    <div className="nav-belt">
                        <div className="nav-left">
                            <div>
                                  <Link to="/">
                                <img className="logo-img" src={logoimg} alt="" ></img>
                                </Link>
                            </div>
                        </div>
                        <div className="nav-center">
                                <div className="searchbar">
                                    <button className="all" type="button">
                                        All <i className="fa fa-sort-desc"></i>
                                    </button>
                                    <input type="text" placeholder="Search"/>
                                    <Link to="/SearchPage">  
                                    <button className="search" type="submit">
                                        <img className="search-icon" src={searchimg} alt="" ></img>
                                    </button>
                                    </Link>
                                    
                                </div> 
                        </div>
                        <div className="nav-right">
                            <div className="nav-tools">
                                <div className="tool">
                                   <Link to= "/cart">
                                    <p> <button className="cart">Cart</button> </p>
                                    </Link>
                                </div>
                                <div className="tool">
                                  <Link to="/Register">
                                    <p> <button className="Sign-up">Sign-Up</button> </p>
                                    </Link>
                                </div>
                                <div className="tool">
                                    <Link to="/Login">
                                    <p> <button className="log">Login/Logout</button></p>
                                 </Link>
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

