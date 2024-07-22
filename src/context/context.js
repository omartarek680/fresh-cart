import axios from 'axios';
import React, { useState } from 'react'
import { createContext } from "react";


export let CartContext =  createContext(null)


export default function ContextProvider({children}) {
  const [counter, setCounter] = useState(0);
  const [cartId, setCartId] = useState(null)
  function addToCart(productId){
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{
       headers: {
         token: localStorage.getItem('token'),
       }
     })
    
   }
 async  function getLoggeduserCart(){
     return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
       headers: {
         token: localStorage.getItem("token"),
       }
     }).then(({data}) => data).catch(error=>error)
   }
  async function updateCartCount(id,count){
    return axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + id,{count},{
      headers: {
        token: localStorage.getItem("token"),
      }
    }).then((data) => data).catch(error=>error)
   }
  async function removeFromCart(id){
   return axios.delete("https://ecommerce.routemisr.com/api/v1/cart/"+id,{
      headers: {
        token: localStorage.getItem("token"),
      }
    }).then(({data}) => data).catch(error=>error)
   }
   function createCheckout(cartId){
     return axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/"+ cartId ,{},{
       headers: {
         token: localStorage.getItem("token"),
       }
     }).then(({data}) => data).catch(error=>error)
   }
  return (
    <CartContext.Provider value={{addToCart,counter,setCounter,getLoggeduserCart,updateCartCount,removeFromCart,setCartId,createCheckout}} >
      {children}
    </CartContext.Provider>
  )
}
