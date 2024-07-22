import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { WishlistContext } from "../../context/Wishlist";
import { CartContext } from "../../context/context";
import { toast } from "react-toastify";

export default function Wishlist() {

  const { removeFromWishlist,getWishlist } = useContext(WishlistContext);
  const { addToCart, setCounter, counter } = useContext(CartContext);
  const [items, setItems] = useState(null);
async function getLoggedWishlist(){
  let data = await getWishlist();
  console.log(data);
  setItems(data?.data)
}
  useEffect(() => {
    getLoggedWishlist();
  }, []);

  async function removeItem(id) {
    let data = await removeFromWishlist(id);

    getWishlist();
  }

  async function addItemToCart(id) {
    await addToCart(id);
    toast.success("Item added successfully", {
      theme: "colored",
    });
    removeItem(id);
    setCounter(counter + 1);
    getWishlist();
  }
  return (
    <>
      <div className="container bg-main-light my-5 ">
        <h2 className="text-center p-3 text-success">My Wishlist</h2>
        {items?.map((item) => (
          <div
            style={{ borderBottom: "1px solid gray" }}
            className="row p-4 gy-5"
            key={item._id}
          >
            <div className="col-md-2">
              <img src={item.imageCover} className="img-fluid" alt="product" />
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-between">
                <div className="details pt-4">
                  <h2>{item.title.split(" ").slice(0, 2).join(" ")}</h2>
                  <h3 className="text-main">{item.price} EGP</h3>
                  <button
                    onClick={() => removeItem(item?._id)}
                    className="btn"
                    style={{ color: "#d90808" }}
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </div>
                <div className="d-flex align-items-center ">
                  <button
                    onClick={() => addItemToCart(item._id)}
                    className="btn btn-success"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish List</title>
      </Helmet>
    </>
  );
}
