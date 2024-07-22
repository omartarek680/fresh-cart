import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

export default function Products() {
   function getProducts() {
  return  axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    ).then(result=> (result?.data.data))
     
  }
  useEffect(()=>{
    getProducts()
  },[])

  let { data: products, isLoading } = useQuery("getProduct", getProducts,{
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container mt-4">
        <input
          className="form-control w-50 m-auto"
          placeholder="Search..."
          type="search"
          name="seach"
          id="Search"
        />
        <div className="row">
          {products?.map((item) => {
            return <Product item={item} key={item._id} />;
          })}
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
    </>
  );
}
