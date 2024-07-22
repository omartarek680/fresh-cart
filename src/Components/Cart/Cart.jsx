import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/context";
import style from "./style.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Cart() {
  const [items, setItems] = useState(null);
  const [cartId, setCartId] = useState(null);
  let {
    getLoggeduserCart,
    counter,
    updateCartCount,
    removeFromCart,
    createCheckout,
  } = useContext(CartContext);
  async function userCart() {
    let data = await getLoggeduserCart();
    setItems(data?.data);
    setCartId(data?.data?._id);
  }

  useEffect(() => {
    userCart();
  }, []);

  async function updateCount(id, count) {
    let { data } = await updateCartCount(id, count);
    setItems(data?.data);
  }

  function clearCart() {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ response }) => setItems(response?.data))
      .catch((error) => console.log(error));
  }
  async function removeItem(id) {
    const data = await removeFromCart(id);
  }
  async function checkout(id) {
    let data = await createCheckout(id);

    window.location.href = data?.session.url;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      {counter && items?.totalCartPrice ? (
        <div className={`${style.box} container`}>
          <div className=" d-sm-block d-md-flex justify-content-between align-items-center mb-3">
            <h2>Order Summary</h2>

            <button
              onClick={() => checkout(cartId)}
              className="btn bg-main text-white d-block"
            >
              Check out
            </button>
          </div>
          <div className=" d-sm-block d-md-flex justify-content-between align-items-center">
            <h3>
              Total Price:{" "}
              <span className="text-main">{items?.totalCartPrice}</span>{" "}
            </h3>

            <h3 className="">
              Total Number of Items:{" "}
              <span className="text-main">{counter}</span>
            </h3>
          </div>

          {items?.products?.map((item) => {
            return (
              <div key={item?._id} className="row my-5 border-bottom">
                <div className="col-md-2">
                  <img
                    src={item.product.imageCover}
                    alt="cover"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between">
                    <div className="ps-2 pt-2">
                      <h4>{item?.product.category.name}</h4>
                      <span>
                        <strong>{item?.price} EGP</strong>
                      </span>
                      <button
                        onClick={() => removeItem(item?.product._id)}
                        style={{ color: "red" }}
                        className="btn d-block ps-0"
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() =>
                          updateCount(item.product._id, item.count + 1)
                        }
                        className={`btn ${style.changeCountBtn}`}
                      >
                        +
                      </button>

                      <span className="mx-3">{item.count}</span>
                      <button
                        onClick={() =>
                          updateCount(item.product._id, item.count - 1)
                        }
                        className={`btn ${style.changeCountBtn}`}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="d-flex justify-content-center">
            <button
              onClick={() => clearCart()}
              className={`btn ${style.clearBtn}`}
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
