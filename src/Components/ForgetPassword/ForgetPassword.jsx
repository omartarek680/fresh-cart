import React, { useState } from "react";
import axios from "axios";
import {  useFormik } from "formik";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
    const [errorMsg, setErrorMessage] = useState(null)
    const [successMsg, setSuccessMessage] = useState(null)
  function resetPassword(values) {
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
      .then(({data}) => {if(data.statusMsg==='success'){
        setSuccessMessage(data.message)
      }})
      .catch(err=>{if(err.response.data.statusMsg==='fail'){
        setErrorMessage(err.response.data.message)
      }})
  }

  const verify = useFormik({
    initialValues: {
        email: ''
    },
    onSubmit: (values)=> {
        console.log(values);
        resetPassword(values)
    }
  })


  return <div className="container">
  <h2>Enter Your Email Addreess</h2>
  <form onSubmit={verify.handleSubmit}>
  <input onChange={verify.handleChange} value={verify.values.email} className="form-control py-4" placeholder='Email' type="email" name="email" id="" />
  
  
  {errorMsg? <div className="text-danger">{errorMsg}</div>:null}
<Link to="forget-password">
<button  type="submit" className="btn bg-main text-white my-3 " >Verify</button>

</Link>





  </form>

  </div>;
}
