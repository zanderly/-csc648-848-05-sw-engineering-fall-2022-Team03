import React from "react";
// eslint-disable-next-line
import { useCookies } from "react-cookie";
import {useState} from 'react';

export const Context = React.createContext();
// eslint-disable-next-line
export const CartHandle = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [description, setDescription] = useState('Click on an item to see its Description');
    const [cartTotal, setCartTotal] = useState();

    return (
        <Context.Provider value={{cart, setCart, description, setDescription, cartTotal, setCartTotal}}>
            {children}
        </Context.Provider>
    );
};
