import React from "react";
import Header from "./header";
// import {Link} from 'react-router-dom';
import '../css/searchPage.css';

import Footer from "./footer.js";





const SearchPage=()=>{
    return( 
        <div>
            <Header/>
            <h2>Search Page will be fully implemented in the future</h2>
            <div className="search-page">
                <div className="filter">
                    <div className="filter-price">
                        <h4>Price</h4>
                        <div className="price-box">
                            <input type="text" placeholder="min"></input>
                        </div>
                        <div className="price-box">
                            <input type="text" placeholder="max"></input>
                        </div>
                    </div>
                    <div>
                        <h4>Exclude</h4>    
                    </div>
                    <div className="filter-exclude">
                        <div className="filter-nuts">
                            <input type="checkbox"></input>
                            <span> Nuts</span>
                        </div>
                        <div className="filter-fish">
                            <input type="checkbox"></input>
                            <span> Fish</span>
                        </div>
                        <div className="filter-eggs">
                            <input type="checkbox"></input>
                            <span> Eggs</span>
                        </div>
                        <div className="filter-dairy">
                            <input type="checkbox"></input>
                            <span> Dairy</span>
                        </div>
                        <div className="filter-shellfish">
                            <input type="checkbox"></input>
                            <span> Shellfish</span>
                        </div>
                        <div className="filter-seseme">
                            <input type="checkbox"></input>
                            <span> Seseme</span>
                        </div>
                        <div className="filter-oats">
                            <input type="checkbox"></input>
                            <span> Oats</span>
                        </div>
                        <div className="filter-gluten">
                            <input type="checkbox"></input>
                            <span> Gluten</span>
                        </div>
                        <div className="filter-soy">
                            <input type="checkbox"></input>
                            <span> Soy</span>
                        </div>
                    </div>
                    <div>
                        <h4>Customer Reviews</h4>    
                    </div>
                    <div className="filter-reviews">
                        <input type="radio" name="rating" value="5" id="5"></input>
                            <label htmlFor="5">☆</label>
                        <input type="radio" name="rating" value="4" id="4"></input>
                            <label htmlFor="4">☆</label>
                        <input type="radio" name="rating" value="3" id="3"></input>
                            <label htmlFor="3">☆</label>
                        <input type="radio" name="rating" value="2" id="2"></input>
                            <label htmlFor="2">☆</label>
                        <input type="radio" name="rating" value="1" id="1"></input>
                            <label htmlFor="1">☆</label>
                    </div>
                </div>
                <div className="search-page-container">
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
    };


export default SearchPage;