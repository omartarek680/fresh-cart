import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";

export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light">
        <div className="container-fluid p-3 px-5">
          <NavLink className="navbar-brand" to="/home">
            <img src={logo} alt="" />
          </NavLink>
          
       
          <div className="me-5">
            <ul className="navbar-nav">
      
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Signin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  );
}
