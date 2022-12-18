import React from "react";
import {Link} from 'react-router-dom';


class Footer extends React.Component {
    render () { return  <div className="footer-bar">
        <div className="footer-row">
            <div className="footer-col">
                <div className="footer-item">
                    <ul>
                        <Link to= "/aboutUs">
                        <li><a> About Us </a></li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="footer-col">
                <div className="footer-item">
                    <ul>
                        <Link to ="/CustomerSupport"><li><a> Customer Support </a></li></Link>
                    </ul>
                </div>
            </div>
            <div className="footer-col">
                <div className="footer-item">
                    <ul>
                        <Link to ="/PrivacyPolicy"><li><a> Privacy Policy </a></li></Link>
                    </ul>
                </div>
            </div>
        </div>  
                        </div>
    }
}

export default Footer;

