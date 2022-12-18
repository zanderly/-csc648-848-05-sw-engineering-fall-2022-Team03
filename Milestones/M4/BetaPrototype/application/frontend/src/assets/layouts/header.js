import React from 'react';

import {useState} from 'react';
// eslint-disable-next-line
import  TestItems from "../../TestItems";

import {Link, useNavigate} from 'react-router-dom';

import searchimg from "../../images/search.png"
import logoimg from "../../images/tvfm-logo.jpg"
import profileicon from "../../images/profile-icon.png" //eslint-disable-line
// eslint-disable-next-line
import Search from "./Search"
import URL from "./../json/URL.json"
import { useCookies } from "react-cookie";



    



const Header =()=> {
    const url = URL.awsURL;
    // const url = URL.localURL;

    const [query, setQuery] = useState('');
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['user']);


    function handlesubmit(){
        setCookie('search', query, { path: '/' });
    }

    
    const loggedCustomer = localStorage.getItem("customer");
    const loggedVendor = localStorage.getItem("vendor");

    const navigate = useNavigate();

    const logoutUser = () => {
        // URL ----------------------------------------------------
        fetch(`${url}/logout`, {
            method:"GET",
        });
        localStorage.removeItem("customer");
        localStorage.removeItem("vendor");
        navigate("/");
    }   
    
    return ( <>

        <nav>
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

                                    <input type="search" placeholder="Search" onChange ={(e) => setQuery(e.target.value)}/>
                                    <Link to="/SearchPage">  
                                    <button className="search" type="submit" onClick={handlesubmit}>

                                        <img className="search-icon" src={searchimg} alt="" ></img>
                                    </button>
                                    </Link>
                                    
                                </div> 
                        </div>
                        <div className="nav-right">
                            <div className="nav-tools">
                                <div className="tool">
                                   <Link to= "/Cart" className="tools">
                                        <button className="cart">Cart</button> 
                                    </Link>
                                </div>

                                
                                {(!loggedCustomer || !loggedVendor) && ( <>
                                    <div className="tool">
                                        <Link to="/Register" className="tools">
                                            <button className="Sign-up">Sign-Up</button> 
                                        </Link>
                                    </div>
                                    <div className="tool">
                                        <Link to="/Login" className="tools">
                                            <button className="log">Login</button>
                                        </Link>
                                    </div>
                                </>)}

                                {loggedCustomer && ( <>
                                    <div className="tool2" >
                                        <div className="tool-profile">
                                            <img className="profile-icon" src={profileicon}></img>
                                            <div className="sub-menu-wrap">
                                                <div className="sub-menu">
                                                    <div className="dropdown-profile">
                                                        <ul>
                                                            <li><Link to= "/Profile" className="tools">My Profile</Link></li>
                                                            <li><Link to= "/VendorRegister" className="tools">Vendor Register</Link></li>
                                                            <li><Link to= "/Settings" className="tools">Settings</Link></li>
                                                            <li><Link to= "/" className="tools" onClick={logoutUser}>Logout</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </>)}

                                {loggedVendor && ( <>
                                    <div className="tool2" >
                                        <div className="tool-profile">
                                            <img className="profile-icon" src={profileicon}></img>
                                            <div className="sub-menu-wrap">
                                                <div className="sub-menu">
                                                    <div className="dropdown-profile">
                                                        <ul>
                                                            <li><Link to= "/Profile" className="tools">My Profile</Link></li>
                                                            <li><Link to= "/Settings" className="tools">Settings</Link></li>
                                                            <li><Link to= "/" className="tools" onClick={logoutUser}>Logout</Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </>);
    

}


export default Header;