import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

export default function Brands() {
  const [brands, setBarnds] = useState(null);

  function getBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then(({data}) => setBarnds(data?.data))
      .catch((error) => console.log(error));
  }
  useEffect(()=> {
    getBrands();
  },[])
  return (
    <>    
        <div className="container my-5">
      <div className="row g-5 ">
        {brands?.map(item => <div className="col-md-4 card" key={item._id}>
          <div className="w-100">
          <img className="w-100" style={{height:300}}  src={item.image} alt="" />
          </div>
             
              <h2 className="text-center text-main">{item.name}</h2>
        </div>)}
      </div>
    </div>
    
    
    <Helmet>
    <meta charSet="utf-8" />
    <title>Brands</title>
  </Helmet>
      
    </>
  )
}
