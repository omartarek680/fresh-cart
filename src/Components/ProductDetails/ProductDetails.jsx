import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProduct(data?.data);

        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProductDetails(id);
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {product ? (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-3">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div
                  className={`carousel-indicators ${style["carousel-indicators"]}`}
                >
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={0}
                    className={`active ${style.indicator}`}
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                    className={style.indicator}
                  />
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={product?.images[0]}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={product?.images[1]}
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className={style.content}>
                <h2>{product?.title}</h2>
                <p className="mt-3">{product?.description}</p>
                <div className="d-flex justify-content-between my-5" >
                  <div>
                    <span>{product?.price}EGP</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    <span>{product?.ratingsAverage}</span>
                  </div>
                </div>
                <button className="btn bg-success w-75 mx-3 text-white">+Add</button>
                <i className="fa-solid fa-heart fa-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
