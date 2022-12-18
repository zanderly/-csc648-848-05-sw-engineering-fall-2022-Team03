import React from 'react';
import Product from './Product';
import '../../Register.css';
import { useCookies } from "react-cookie";





// eslint-disable-next-line
function ProductList({display}) {

  // eslint-disable-next-line
  const displayproduct = display.map(product => <Product key={product.id} product={product} />);
  return (
    <div>
      {displayproduct}
    </div>
  );
}
// eslint-disable-next-line
function Search ({itemlist}) {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();

  // eslint-disable-next-line
  const organizedProducts = itemlist.filter(
    product => {
      return (
        product
        .name
        .toLowerCase()
        .includes(cookies["search"])
        )
    }
  );


  function productList() {
    return (
      <div>
        <ProductList display={organizedProducts} />

      </div>
    );
  }

  return (
    <div className="productContainer">

     {productList()}
     </div>
  );
}

export default Search;