import React from "react";
import Header from "./header";
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import "./../css/settings.css";
import closeIcon from "./../../images/closeIcon.png";
import URL from "./../json/URL.json";

import Footer from "./footer.js";

const Settings=()=>{
    var loggedUser = JSON.parse(localStorage.getItem("user"));
    const url = URL.url;
    const id = loggedUser.id;
    const [name, setFName]  = useState('');
    const [lastname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber]  = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    var userPath;
    if(loggedUser.vendor === "0") {
        userPath = "Customer";
    } else if(loggedUser.vendor === "1") {
        userPath = "Vendor";
    }

    const closePopUp = () => {
        document.querySelector(".name-change-popup").style.display = "none";
        document.querySelector(".email-change-popup").style.display = "none";
        document.querySelector(".address-change-popup").style.display = "none";
        document.querySelector(".password-change-popup").style.display = "none";
    }
    
    const changeName = () => { document.querySelector(".name-change-popup").style.display = "flex"; }
    const changeEmail = () => { document.querySelector(".email-change-popup").style.display = "flex"; }
    const changeAddress = () => { document.querySelector(".address-change-popup").style.display = "flex"; }
    const changePassword = () => { document.querySelector(".password-change-popup").style.display = "flex"; }

    const nameChange = (e) => {
        e.preventDefault();
        const user = {id, name, lastname};
        try {
        fetch(`${url}/update${userPath}FullName/${id}`, {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
            })
            .then(data => data.text())
            .then((result) => {
            if(result === "info updated") {
                loggedUser.name = name;
                loggedUser.lastname = lastname;
                localStorage.setItem("user", JSON.stringify(loggedUser));
                document.querySelector(".name-change-popup").style.display = "none";
                navigate("/Settings");
            }
            else {
                setFName("");
                setLName("");
                console.log(result);
            }
            
            })
        } catch (e) {
            console.log(e.message);
        }    
    }

    const emailChange = (e) => {
        e.preventDefault();
        const user = {id, email};
        try {
        fetch(`${url}/update${userPath}Email/${id}`, {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
            })
            .then(data => data.text())
            .then((result) => {
            if(result === "info updated") {
                loggedUser.email = email;
                localStorage.setItem("user", JSON.stringify(loggedUser));
                document.querySelector(".email-change-popup").style.display = "none";
                navigate("/Settings");
            }
            else {
                setEmail("");
                console.log(result);
            }
            
            })
        } catch (e) {
            console.log(e.message);
        }    
    }

    const addressChange = (e) => {
        e.preventDefault();
        const address = {number, street, city, state, zipcode};
        try {
        fetch(`${url}/update${userPath}Address/${id}`, {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(address)
            })
            .then(data => data.text())
            .then((result) => {
                if(result === ("update failed" || "customer not found" || "vendor not found" || null)) {
                    setNumber("");
                    setStreet("");
                    setCity("");
                    setState("");
                    setZipcode("");
                    console.log(result);
                }
                else {
                    loggedUser = JSON.parse(result);
                    localStorage.setItem("user", JSON.stringify(loggedUser));
                    document.querySelector(".address-change-popup").style.display = "none";
                    navigate("/Settings");
                }
            
            })
        } catch (e) {
            console.log(e.message);
        }    
    }

    const passwordChange = (e) => {
        e.preventDefault();
        const user = {password};
        try {
        fetch(`${url}/update${userPath}Password/${id}`, {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
            })
            .then(data => data.text())
            .then((result) => {
                if(result === ("update failed" || "customer not found" || "vendor not found" || null)) {
                    setEmail("");
                    console.log(result);
                }
                 else {
                    loggedUser.password = result;
                    localStorage.setItem("user", JSON.stringify(loggedUser));
                    document.querySelector(".password-change-popup").style.display = "none";
                    navigate("/Settings");
                }
            
                
                })
        } catch (e) {
            console.log(e.message);
        }    
    }




    return( 
        <div>
            <Header/>
            <br/>
            <div className="profileContainer">
                <div>
                    <h5>Name</h5>
                    <div>
                        { loggedUser.name } { loggedUser.lastname }
                        <button onClick={changeName}>Edit</button>
                        <div className="name-change-popup">
                            <div className="name-change-popup-content">
                                <form>
                                    <img src={closeIcon} className="close" onClick={closePopUp}></img>
                                    <label>First name</label>
                                    <input type="text" value={name} onChange={(e) => setFName(e.target.value)} placeholder={loggedUser.name} />
                                    <label>Last Name</label>
                                    <input type="text" value={lastname} onChange={(e) => setLName(e.target.value)} placeholder={loggedUser.lastname} />
                                    <button onClick={nameChange}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>E-mail</h5>
                    <div >
                        {loggedUser.email}
                        <button onClick={changeEmail}>Edit</button>
                        <div className="email-change-popup">
                            <div className="name-change-popup-content">
                                <form>
                                    <img src={closeIcon} className="close" onClick={closePopUp}></img>
                                    <label>E-mail</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={loggedUser.email} />
                                    <label>Re-enter E-mail</label>
                                    <input type="text" placeholder={email} />
                                    <button onClick={emailChange}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h5>Address</h5>
                    <div>
                        {(loggedUser.address && ( <>
                            { loggedUser.address.number } { loggedUser.address.street } <br/>
                            { loggedUser.address.city } { loggedUser.address.state }, { loggedUser.address.zipcode }
                        </>)) || (<> Update Address </>)
                        }
                        <button onClick={changeAddress}>Edit</button>
                        <div className="address-change-popup">
                            <div className="name-change-popup-content">
                                <form>
                                    <img src={closeIcon} className="close" onClick={closePopUp}></img>
                                    <label>Street Number</label>
                                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder={loggedUser.number} />
                                    <label>Street Name</label>
                                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder={loggedUser.street} />
                                    <label>City</label>
                                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={loggedUser.city} />
                                    <label>State</label>
                                    <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder={loggedUser.state} />
                                    <label>Zip</label>
                                    <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder={loggedUser.zipcode} />
                                    <button onClick={addressChange}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                    <div>
                        <h5>Password</h5>
                        <div>
                            <Link onClick={changePassword}>Update Password</Link>
                            <div className="password-change-popup">
                            <div className="name-change-popup-content">
                                <form>
                                    <img src={closeIcon} className="close" onClick={closePopUp}></img>
                                    <label>New Password</label>
                                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label>Re-enter Password</label>
                                    <input type="text" />
                                    <button onClick={passwordChange}>Submit</button>
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <br/>
            <div/>    
            <Footer/>
        </div>
    );
    };


export default Settings;