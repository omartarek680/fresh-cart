import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState(null);

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({data}) => setCategories(data?.data))
      .catch((error) => console.log(error));
  }
  useEffect(()=> {
    getCategories();
  },[])

  return (
    <>
    <div className="container">
      <div className="row g-5 ">
        {categories?.map(item => <div className="col-md-4 card" key={item._id}>
          <div className="w-100">
          <img className="w-100" style={{height:300}}  src={item.image} alt="" />
          </div>
             
              <h2 className="text-center text-main">{item.name}</h2>
        </div>)}
      </div>
    </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
    </>
  );
}
