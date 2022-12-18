import Header from "./header"
import React from 'react';
import { useState } from 'react';
import Footer from "./footer.js";
import { BrowserRouter as Link } from 'react-router-dom';
import '../css/style.css';

const FeedBack = () => {
  const [page, setPage] = useState(true);


  const SendFB= () => {
    setPage(current => !current);
  }
  // const SendFB=event=>{
  //   setPage(current => !current);
  // }

  function SentPage() {
    return (
      <div>
        <br/>
        <br/>
        <h1>Thank You. Your Feedback has been Sent.</h1>
        <h1><Link to = "/">Home</Link></h1>
      </div>
    );
  }



  return (

    <div>
    <Header />
    <br/>
    <br/>
        {page &&(
            <div className="center" >
                <br/>
                <br/>
                <h1>Send Us Your Feedback</h1>
                <form>
                <div>
                <textarea placeholder="Enter Your Feedback" id ="feedbackbox"></textarea>
                <button onClick={SendFB}>Send</button>
                </div>
                </form>


            </div>
        )}

       {!page && <SentPage />}


    <Footer/>
    </div>
  );

};

export default FeedBack;