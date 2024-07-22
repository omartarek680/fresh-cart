import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../context/context";
export default function Navbar() {
  let { counter, setCounter, getLoggeduserCart } = useContext(CartContext);

  async function getCounter() {
    let data = await getLoggeduserCart();
   
    setCounter(data?.numOfCartItems);
  }
  useEffect(() => {

      getCounter()
    
  
 
   
 
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid mx-5 p-3 px-5">
          <NavLink className="navbar-brand" to="/home">
            <img src={logo} alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="me-5">
            <ul className="navbar-nav">
              <li>
                <button type="button" className="btn  position-relative">
                  <NavLink to="/cart">
                    <i
                      style={{
                        fontSize: "27px",
                        fontWeight: "900",
                        color: "black",
                      }}
                      className="fa-solid fa-cart-shopping"
                    ></i>
                  </NavLink>
                  <span
                    style={{ fontSize: "12px", fontWeight: "700", top: "20%" }}
                    className="position-absolute  start-75 translate-middle badge rounded-1 bg-main"
                  >
                    {counter}
                  </span>
                </button>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
