import React from "react";
import Header from "./header";
// import {Link} from 'react-router-dom';
import '../css/searchPage.css';
import { useCookies } from "react-cookie";
import Footer from "./footer.js";
// eslint-disable-next-line
import  TestItems from "../../TestItems";
import Search from "./Search";
import {useState} from 'react';
import {useEffect} from 'react';
// eslint-disable-next-line
import {useContext} from 'react';
// eslint-disable-next-line
import {Context} from '../../CookieHandler';







const SearchPage=()=>{
    // eslint-disable-next-line
     const [cookies, setCookie] = useCookies(['user', 'next']);
     const [items, setItems] = useState([]);
     // eslint-disable-next-line
     const { cart, setCart, searchtype, setSearchType,filters, setFilters} = useContext(Context);
     const [title, setTitle]=useState("Search The Site")
     // eslint-disable-next-line
     const [allergens, setAllergens] = useState({});

     // eslint-disable-next-line
     function FilterItem({name}, {classname}) {
        const [checked, setChecked] = useState(false);
        function Clicked(){
            if(checked===false){
                filters.push(name);
                setChecked(true); 
            }else{
               var index= filters.findIndex(item=>item===name);
               filters.splice(index, 1);
               setChecked(false);
               
            }
           
            console.log(filters);
            
            updateFilters();
            console.log(allergens);
        }

        return (
            <div className={classname}>
                <input type="checkbox"  onChange={()=>Clicked()}></input>
                <span> {name}</span>
            </div>
        )
    }

    function DisplayFilters(){
        return(
            <div className="filter-exclude">
                <FilterItem name={"Nuts"} classname={"filter-nuts"}/>
                <FilterItem name={"Fish"} classname={"filter-fish"}/>
                <FilterItem name={"Eggs"} classname={"filter-eggs"}/>
                <FilterItem name={"Dairy"} classname={"filter-dairy"}/>
                <FilterItem name={"Shellfish"} classname={"filter-shellfish"}/>
                <FilterItem name={"Sesame"} classname={"filter-seseme"}/>
                <FilterItem name={"Oats"} classname={"filter-oats"}/>
                <FilterItem name={"Gluten"} classname={"filter-gluten"}/>
                <FilterItem name={"Soy"} classname={"filter-soy"}/>
            </div>
        )
    }

    function checkarray(value){
        if(filters.some(item=> item===value)){
            return 1;
        }else{
            return 0;
        }
    }

    function updateFilters(){
        allergens['tree_nut']= checkarray("Nuts");
        allergens['eggs']=checkarray("Eggs");
        allergens['fish']=checkarray("Fish");
        allergens['milk']=checkarray("Dairy");
        allergens['shelfish']=checkarray("Shellfish");
        allergens['sesame']=checkarray("Sesame");
        allergens['wheat']=checkarray("Oats");
        allergens['peanut']=checkarray("Gluten");
        allergens['soy']=checkarray("Soy");
        }

    function updateSearch(){
        if(filters.length!==0){
            setSearchType("filter");
            console.log(searchtype);
            
        }else{
            setSearchType("all");
            console.log(searchtype);
            
        }
    }


    useEffect(() => {
    //fetch("http://ec2-13-52-221-26.us-west-1.compute.amazonaws.com/admin/allItems",
    // eslint-disable-next-line default-case
    // eslint-disable-next-line default-case
    switch(searchtype){
    case "all":
        fetch('/admin/allItems', {method:"GET"})
        .then(response => response.json())
        .then((data) => {
          setItems(data);
        }).catch((e) => {
            console.error(`An error occurred: ${e}`)
          });
          setTitle("Search the Site");
          break;
       
       case "filter" :
        fetch("/search/filtered", {
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body: (JSON.stringify(
                {
                    item: JSON.stringify({
                        name: cookies["search"],
                        id: null,
                        description:null,
                        vendor:null,
                        nutrition:null,
                        quantity: null,
                        price: null,
                    
                    }),
                    allergens: JSON.stringify(allergens),
                },

            )
        ),
        })
        .then(response => response.json())
        // eslint-disable-next-line
        .then((data) => {
          setItems([]);
        }).catch((e) => {
            console.error(`An error occurred: ${e}`)
          });
          setTitle("Excluding The Following: "+ filters);
          setFilters([]);
          break;

        case "zip" ://replace with appropriate api later
        fetch('/admin/allItems', {method:"GET"})
        .then(response => response.json())
        .then((data) => {
          setItems(data);
        }).catch((e) => {
            console.error(`An error occurred: ${e}`)
          });
          setTitle("Search by ZipCode");
          break;
        }
}, [searchtype]);



    return(
        <div>
            <Header/>
            <h2>{title}</h2>
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
                        <DisplayFilters/>
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
                    <button onClick={()=>updateSearch()}>Update Filters</button>
                </div>
                <div className="search-page-container">
                    
                </div>

                {<Search itemlist={items}/> }
            </div>
            <Footer/>
        </div>
    );
    };


export default SearchPage;