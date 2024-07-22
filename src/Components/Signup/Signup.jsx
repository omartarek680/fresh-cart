import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Signup() {
    const [errorMsg,setErrorMessage] = useState(null)
  let navigate = useNavigate();

  const validationSchema = () => {
    const errors = Yup.object({
      name: Yup.string("Enter A Valid Name")
        .min(3, "Name Must be at Least 3 Characters")
        .max(10, "Maximum Length is 10")
        .required("Enter Your Name"),
      email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a Valid Email")
        .required("Enter Your Email"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Enter a Valid Password"
        )
        .required("Enter Your Password"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password Does Not Match")
        .required("Re-Enter Your Password"),
    });
    return errors;
  };
  function sendData(values) {
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        if (data.message === "success") {
          navigate("/signin");
        }
      })
      .catch((err) => setErrorMessage(err.response.data.message));
  }

  const register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,

    onSubmit: (values) => {
      sendData(values);
      console.log(values);
    },
  });
  console.log(register);
  return (
    <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="container my-5">
        <h2>Register: </h2>
        <form onSubmit={register.handleSubmit}>
          <label htmlFor="Name">Name: </label>
          <input
            className={`form-control ${register.errors.name&& register.touched.name?'is-invalid':''} ${!register.errors.name&&register.touched.name?'is-valid':'' } mb-2`}
            type="text"
            name="name"
            id="Name"
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.name}
          />
          {register.errors.name && register.touched.name ? (
            <div className="alert alert-danger">{register.errors.name}</div>
          ) : null}
          <label htmlFor="Email">Email: </label>
          <input
                       className={`form-control ${register.errors.email&& register.touched.email?'is-invalid':''} ${!register.errors.email&&register.touched.email?'is-valid':'' } mb-2`}

            type="email"
            name="email"
            id="Email"
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.email}
          />
          {register.errors.email && register.touched.email ? (
            <div className="alert alert-danger">{register.errors.email}</div>
          ) : null}

          <label htmlFor="Password">Password: </label>
          <input
                        className={`form-control ${register.errors.password&& register.touched.password?'is-invalid':''} ${!register.errors.password&&register.touched.password?'is-valid':'' } mb-2`}

            type="password"
            name="password"
            id="Password"
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.password}
          />
          {register.errors.password && register.touched.password ? (
            <div className="alert alert-danger">{register.errors.password}</div>
          ) : null}
          <label htmlFor="Repassword">Re-Password:: </label>
          <input
            className={`form-control ${register.errors.rePassword&& register.touched.rePassword?'is-invalid':''} ${!register.errors.rePassword&&register.touched.rePassword?'is-valid':'' } mb-2`}

type="password"
            name="rePassword"
            id="Repassword"
            onChange={register.handleChange}
            onBlur={register.handleBlur}
            value={register.values.rePassword}
          />
          {register.errors.rePassword && register.touched.rePassword ? (
            <div className="alert alert-danger">
              {register.errors.rePassword}
            </div>
          ) : null}
          <div className="text-danger text center m-auto">{errorMsg?errorMsg:null}</div>
  
          <button
            type="submit"
            className="btn bg-main text-light d-block text-bolder m-auto mt-5 w-25 "
            disabled={!(register.isValid&&register.dirty)}
          >
          
            Register Now
          </button>
        </form>
      </div>
    </>
  );
}
