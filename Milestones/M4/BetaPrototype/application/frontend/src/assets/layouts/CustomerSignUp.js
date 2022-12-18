import Header from "./header"
import React from 'react';
import { useState } from 'react';
// eslint-disable-next-line
import { PasswordValidation } from "./PasswordValidation";
import { Link, useNavigate} from 'react-router-dom';
import '../css/style.css';
import Footer from "./footer.js";
import URL from "./../json/URL.json"


const CustomerSignUp = () => {
  const url = URL.awsURL;
  // const url = URL.localURL;

  const [name, setFName]  = useState('');
  const [lastname, setLName]  = useState('');
  const [email, setEmail]  = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const user = {name, lastname,email, password};
    // URL ----------------------------------------------------
    fetch(`${url}/registration`, {
          method:"POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        })
        .then(data => data.text())
        .then((result) => {
          if(result === "registered as a customer") {
            navigate("/Login");
          }
          else {
            setFName("");
            setLName("");
            setEmail("");
            setPassword("");
            setRePassword("");
            console.log(result);
          }
          
        })
  }
  

  // const [password, setPassword] = useState({
  //   firstPassword: "",
  //   secondPassword: "",
  //  });
  
  // const [
  // validLength,
  // hasNumber,
  // upperCase,
  // lowerCase,
  // match,
  // specialChar,
  // ] = PasswordValidation({
  // firstPassword: password.firstPassword,
  // secondPassword: password.secondPassword,
  // });
  
  
  // const setFirst = (event) => {
  // setPassword({ ...password, firstPassword: event.target.value });
  // };
  // const setSecond = (event) => {
  // setPassword({ ...password, secondPassword: event.target.value });
  // };

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   fetch('/api', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       "firstname": this.firstname.value,
  //       "lastname": this.lastname.value,
  //       "email": this.email.value,
  //     }),

  //   })
  // }


  return (
    <div>
      <Header />
      <div className="register">
      <form>
        <br />
        <br />

        <h1> TVFM Customer Registration</h1>
        <label htmlFor="First"><b>Name</b></label>
        <input type="text" placeholder="Enter First Name" name="First" id="First" 
        value={name} onChange={(e) => setFName(e.target.value)}required />
        <label htmlFor="Last"><b>Last Name</b></label>
        <input type="text" placeholder="Enter Last Name" name="Last" id="Last"
        value={lastname} onChange={(e) => setLName(e.target.value)} required /><br />

        <label htmlFor="email"><b>Email</b></label>
        <input type="text" placeholder="Enter Email" name="email" id="email" 
        value={email} onChange={(e) => setEmail(e.target.value)} required /><br />

        <label htmlFor="Password"><b>Password</b></label>
        <input type="text" placeholder="Enter New Password" name="Password" 
        id="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />

        <label htmlFor="Password"><b> Re-Enter Password</b></label>
        <input type="text" placeholder="EnterPassword" name="rePassword" 
        id="rePassword" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required /><br />

    

        
        <label htmlFor="TOS"><Link to="/TOC">Terms and Conditions</Link></label> 
        <input type="checkbox" name="TOS" />
        
        

        <br/>
        <input type="submit" value="Submit" onClick={handleClick}/>
      </form>

      </div>
      <Footer />
    </div>

  );

}
export default CustomerSignUp;