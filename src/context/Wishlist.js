import axios from 'axios'
import React, { createContext } from 'react'

export const WishlistContext = createContext(null)
export default function WishlistProvider({children}) {
    function removeFromWishlist(id){
        return axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/"+id,{
            headers: {
                token: localStorage.getItem("token"),
              }
        }).then(({data})=> data).catch(error=> error);
    }
    function getWishlist() {
      return  axios
          .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
              token: localStorage.getItem("token"),
            },
          })
          .then(( {data} ) => data)
          .catch((error) => console.log(error));
      }

  return (
    <WishlistContext.Provider value={{removeFromWishlist,getWishlist}}>
        {children}
      
    </WishlistContext.Provider>
  )
}
