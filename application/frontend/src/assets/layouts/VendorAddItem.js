import React, { useEffect } from 'react';
import Header from "./header"
import Footer from "./footer.js";
import { useState } from 'react';
import '../css/searchPage.css';

const VendorAddItem = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [description, setDescription] = useState();
    const [nutrition, setNutrition] = useState();
    const [vendor,setVendor] = useState();
    // eslint-disable-next-line
    const [filters, setFilters] = useState([]);
    // eslint-disable-next-line
    const [allergens,setAllergens] = useState({});
    
    useEffect(() => {
       const data = JSON.parse(localStorage.getItem("user"));
        setVendor(data);
      }, []);


    function handlesubmit() {
        var item={
             name: name,
             price: price,
             quantity: quantity,
             description: description,
             nutrition: nutrition,
             vendor: null,
         };

         var items =JSON.stringify(item);
        updateFilters();
         var allergen= JSON.stringify(allergens);
         var vend =JSON.stringify(vendor)
        var addItem= new Map([["vendor",vend],["item",item],['allergens',allergen]])
        console.log(addItem.get("item"))
        console.log (addItem);
        // fetch("http://ec2-13-52-221-26.us-west-1.compute.amazonaws.com/vendor/addItems", 
        fetch('/vendor/addItems/allergens', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: (JSON.stringify({
                vendor: JSON.stringify(vendor),
                item: items,
                allergens:allergen
            })
        ),
        })
            .then(response => response.text())
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    }

    function checkarray(value){
        if(filters.some(item=> item===value)){
            return 1;
        }else{
            return 0;
        }
    }
    // eslint-disable-next-line
    function FilterItem({name}) {
        const [checked, setChecked] = useState(false);
        const style ={
            display:"grid",
            gridTemplateColumns: "max-content max-content",
            gridGap:"9px",
        }
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
            
        }

        return (
            <div style={style}>
                <input type="checkbox"  onChange={()=>Clicked()}></input>
                <span> {name}</span>
            </div>
        )
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


    function Filters() {
        const filterbox = {
            border: '4px solid black',
            borderRadius: '10px',
            height: 30 + '%',
            width: 100 + '%',
            backgroundColor: 'white',
            paddingBottom: "10px",
            float: "left",
        }

        return (
            <div >
                <h4>Filters</h4>
                <div style={filterbox}>
                    <div className="filter-exclude">
                        <FilterItem name={"Nuts"}/>
                        <FilterItem name={"Fish"}/>
                        <FilterItem name={"Eggs"}/>
                        <FilterItem name={"Dairy"}/>
                        <FilterItem name={"Shellfish"}/>
                        <FilterItem name={"Sesame"}/>
                        <FilterItem name={"Oats"}/>
                        <FilterItem name={"Gluten"}/>
                        <FilterItem name={"Soy"}/>
                    </div>
                </div>
            </div>

        )
    }
    // eslint-disable-next-line
    function testVendor(){
        console.log(vendor);
    }

    return (
        <div>
            <Header />
            <h1>Add item</h1>
                <form>
                <label>Name</label>
                <input type='text' onChange={(e) => setName(e.target.value)} />
                <label>Quantity</label>
                <input type='text' onChange={(e) => setQuantity(e.target.value)} />
                <label>Price</label>
                <input type='text' onChange={(e) => setPrice(e.target.value)} />
                <label>Nutrition</label>
                <input type='text' onChange={(e) => setNutrition(e.target.value)} />
                <label>Description</label>
                <input type='text' onChange={(e) => setDescription(e.target.value)} />
                
                <Filters />
                <button onClick={handlesubmit}>Add Item</button>
            </form>
            <Footer />
        </div>
    )
}
export default VendorAddItem;