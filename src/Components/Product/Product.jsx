import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/context";
import { toast } from "react-toastify";
import axios from "axios";

export default function Product({ item }) {
  const { addToCart, counter, setCounter } = useContext(CartContext);

let [isRed,setIsRed] = useState(false)
  const [loading, setLoading] = useState(false);

  async function addItemToCart(id) {
  
    let response = await addToCart(id);
    if (response?.data.status === "success") {
      setLoading(false);
      toast.success("Item added successfully", {
        theme: "colored",
      });
      setCounter(response?.data.numOfCartItems);
    }
  }
async  function addToWishlist(productId) {
     setIsRed(true)
     axios
      .post("https://ecommerce.routemisr.com/api/v1/wishlist" ,{productId} ,{
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({data}) =>{
        if (data?.status==='success'){
            
            toast.success("Item added successfully", {
              theme: "colored",
            });
            console.log(isRed);
            
        }
      }
     
    )
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="col-md-3">
        <div className="product p-2 my-2">
          <Link
            style={{ textDecoration: "none", color: "#212529" }}
            to={"/product-details/" + item._id}
          >
            <img src={item.imageCover} className="w-100 rounded" alt="" />
            <p className="text-main">{item.category.name}</p>
            <h4 className="dark-color">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h4>
            <div className="price-rating d-flex justify-content-between">
              <div className="price">
                <span>{item.price}EGP</span>
              </div>
              <div className="rating">
                <i className="fa-solid fa-star rating-color"></i>
                <span className="dark-color">{item.ratingsAverage}</span>
              </div>
            </div>
          </Link>
          <button  style ={{}} className={` btn ${isRed? 'text-danger' :null}`} onClick={()=>addToWishlist(item._id)}>

          <i  className={`fa-solid fa-heart d-block my-3 fs-3 cursor-pointer `}></i>
          </button>

          
          <button
            disabled={loading}
            onClick={() => addItemToCart(item._id)}
            className="btn bg-main text-white d-block w-50 m-auto"
          >
            {loading ? "Loading..." : "+Add"}
          </button>
        </div>
      </div>
    </>
  );
}
