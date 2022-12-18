
/*import Header from "./assets/layouts/header.js"
=======
import Header from "./assets/layouts/header.js"
import Footer from "./assets/layouts/footer.js"
>>>>>>> 91c6810aac8ab363bc9c33b09030e403ebd6475a
import "./App.css";
import "./style.css";

import VendorRegister from './assets/layouts/VendorRegister.js';
import React from 'react';
import {useState} from 'react';

<<<<<<< HEAD
function App() {


  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  

  

  /*function search() {
    body= {
      search: "123"
    };

    settings = {
      method: "post",
      body: JSON.stringify(body)
    };

    fetch().then()
  }
  */
  

  
  

  //https://bobbyhadz.com/blog/react-onclick-show-component
  
  // Each showAbout*Name will determine which about page is shown
 
 /* const showRegister = event => {
    setIsRegister(current => !current);
  };

  function login() {
    const body = 0;
    const settings = {
      method: "post",
      body: JSON.stringify(body),
    }
    fetch("/login", settings).catch(e => console.log(e));
  }

  /**
   * fetch('/getTransactions')
   * .then(res => res.json())
   * .then(data => { do something here };
   */
  /*const vSignup = <VendorRegister/>;

  

  return (
          
  
          <div>
            <Header/>
            <div>
              <p>Home Page</p>            
              <button onClick={showRegister}>Sign-Up Here</button>
              {isRegister && (vSignup)}            
            </div>
            <label>Search</label>
            <input type="text" ></input>
            <button type="submit">Search</button>
            <div>
              
            </div>
            <Footer/>
          </div>
          
          );
}

export default App;
=======
*/
import React from 'react';
// import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CustomerSignUp from "./assets/layouts/CustomerSignUp";
import Home from "./Home";
import About from "./assets/layouts/About.js";
import VendorSignUp from "./assets/layouts/vendor_signup";
import Register from "./assets/layouts/Register";
import Login from "./assets/layouts/Login";
import Not_Found from "./assets/layouts/NotFound";
import Search from "./assets/layouts/Search";
// import  TestItems from "./TestItems";
import AboutUs from './assets/layouts/aboutUs';
// import VendorRegister from "./assets/layouts/VendorRegister";
import FeedBack from "./assets/layouts/Support";
import Policy from "./assets/layouts/PrivacyPolicy";

import ProductInfo from "./assets/layouts/ProductInfo";

import SearchPage from './assets/layouts/SearchPage';


import './assets/css/App.css';





function App() {



  return(
          <>
                <Router>
                  <Routes>

                    <Route path="/" element={<Home/>} exact/>

                    <Route path="/About" element={<About/>} exact />

                    <Route path="/CustomerSignUp" element={<CustomerSignUp/>} exact/>

                    <Route  path="/Register" element={<Register/>} exact/>

                    <Route  path="/VendorRegister" element={<VendorSignUp/>} exact/>

                    <Route  path="/CustomerSupport" element={<FeedBack/>} exact/>

                    <Route  path="/PrivacyPolicy" element={<Policy/>} exact/>

                    <Route  path="/Login" element={<Login/>} exact/>

                    <Route  path="/Search" element={<Search/>} exact/>

                    <Route path="/aboutUs" element={<AboutUs/>} exact/>


                    <Route path="/ProductInfo" element={<ProductInfo/>} exact/>

                    <Route path="/SearchPage" element={<SearchPage/>} exact/>


                    <Route path="*" element={<Not_Found/>} />

                  </Routes>
                </Router>
              </>
            );
}




export default App;

