import React, { useContext } from "react";
import { useFormik } from "formik";
import { Order, OrderContext } from "../../context/order";
import * as Yup from "yup";

export default function AddAddress() {
  let { address } = useContext(OrderContext);
  const inputStyle = {
    width: "100%",
    // padding: '12px 12px',
    margin: "8px 0",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  };
  function validationSchema() {
    const errors = Yup.object({
      details: Yup.string().min(10).max(50).required("This Field Is Required"),
      phone: Yup.string().min(11, "Phone Numner is Not Valid").max(11,"Phone Numner is Not Valid").matches(/^01[0125][0-9]{8}$/,"Phone Numner is Not Valid").required("This Field Is Required"),
      city: Yup.string().min(3).max(10).required("This Field Is Required"),
    });

    return errors;
  }

  const addressDetails = useFormik({
    initialValues: {
      details: "",
      phone: ",",
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
     
     address = {
      shippingAddress: values
      
     }
     localStorage.setItem("address", address)
     
    },
  });

  return (
    <>
      <div className="container">
        <form onSubmit={addressDetails.handleSubmit}>
          <label htmlFor="Details">Details</label>
          <input
            onChange={addressDetails.handleChange}
            style={inputStyle}
            type="text"
            className="form-control"
            name="details"
            id="Details"
          />
          {addressDetails.errors.details && addressDetails.touched.details ? (
            <div className="alert alert-danger">
              {addressDetails.errors.details}
            </div>
          ) : null}

          <label htmlFor="Phone">Phone Number:</label>
          <input
            onChange={addressDetails.handleChange}
            style={inputStyle}
            type="tel"
            className="form-control"
            name="phone"
            id="Phone"
          />
          {addressDetails.errors.phone && addressDetails.touched.phone ? (
            <div className="alert alert-danger">
              {addressDetails.errors.phone}
            </div>
          ) : null}

          <label htmlFor="Details">City</label>
          <input
            onChange={addressDetails.handleChange}
            style={inputStyle}
            type="text"
            className="form-control"
            name="city"
            id="City"
          />
          {addressDetails.errors.city && addressDetails.touched.city ? (
            <div className="alert alert-danger">
              {addressDetails.errors.city}
            </div>
          ) : null}

          <button type="submit" className="bg-main text-white btn w-100 my-5">
            {" "}
            Add Address
          </button>
        </form>
      </div>
    </>
  );
}
