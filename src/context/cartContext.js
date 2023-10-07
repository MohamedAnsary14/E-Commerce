import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();
export function CartContextProvider({ children }) {
    const [cartProducts, setcartProducts] = useState(null)
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [cartId, setcartId] = useState(null)

    async function addProductToCart(productId) {
        try {

            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                "productId": productId
            },
                {
                    headers: { token: localStorage.getItem("tkn") }

                })
            getUserCart();
            // setnumOfCartItems(data.numOfCartItems);
            // settotalCartPrice(data.data.totalCartPrice);
            // // setcartProducts(data.data.products)
            return data;
        }
        catch (e) {
            console.log("error", e);
        }
    }
    async function getUserCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            });
            setnumOfCartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
            setcartProducts(data.data.products);
            setcartId(data.data._id)
        } catch (e) {
            console.log("Error", e);
        }
    }
    async function removeCartData() {
        try {
            const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            });
            setnumOfCartItems(0)
            settotalCartPrice(0)
            setcartProducts([])
        } catch (e) {
            console.log("Error", e);
        }
    }

    async function deletProduct(productId) {
        try {


            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            setnumOfCartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
            setcartProducts(data.data.products);
            return data

        } catch (error) {
            console.log("Erroe", error);
        }

    }
    async function updateCount(productId, count) {
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                "count": count
            }, {
                headers: { token: localStorage.getItem("tkn") }
            });
            setnumOfCartItems(data.numOfCartItems);
            settotalCartPrice(data.data.totalCartPrice);
            setcartProducts(data.data.products);
            return data;
        } catch (error) {
            console.log('Error', error);
        }
    }

    useEffect(function () {

        getUserCart();
    }, []);
    return <cartContext.Provider value={{
        addProductToCart,
        cartProducts,
        totalCartPrice,
        numOfCartItems,
        getUserCart,
        deletProduct,
        updateCount,
        removeCartData,
        cartId,
        setcartProducts,
        settotalCartPrice,
        setnumOfCartItems
    }}>
        {children}
    </cartContext.Provider>
}