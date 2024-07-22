import { ErrorMessage, useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Signin() {
  const Forget = styled.a`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    color: #000;
    &:hover {
      color: #0aad0a;
    }
  `;
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  function validationSchema() {
    const errors = Yup.object({
      email: Yup.string().required("Enter Your Email"),
      password: Yup.string().required("Enter Your Password"),
    });
    return errors;
  }

  function sendData(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data.token);
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response.data.statusMsg === "fail") {
          setErrorMessage(error.response.data.message);
        }
      });
  }

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: (values) => {
      console.log(values);
      sendData(values);
    },
  });

  return (
    <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="container w-75">
        <h2 className="text-main mt-3 text-center ">Login</h2>
        <form onSubmit={login.handleSubmit}>
          <label htmlFor="Email">Email: </label>
          <input
            className="form-control my-3"
            type="email"
            name="email"
            id="Email"
            onChange={login.handleChange}
            value={login.values.email}
          />
          {login.errors.email && login.touched.email ? (
            <div className="alert alert-danger">{login.errors.email}</div>
          ) : null}
          <label htmlFor="Password">Password: </label>
          <input
            className="form-control my-3"
            type="password"
            name="password"
            id="Password"
            onChange={login.handleChange}
            value={login.values.password}
          />
          {login.errors.password && login.touched.password ? (
            <div className="alert alert-danger">{login.errors.password}</div>
          ) : null}

          {errorMessage ? (
            <div className="text-danger">{errorMessage}</div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between ">
            <Link to="/forget-password">Forget Password?</Link>
            <button
              type="submit"
              className="btn bg-main text-white w-25 d-block  my-3"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
