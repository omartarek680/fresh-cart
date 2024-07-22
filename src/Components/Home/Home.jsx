import React from "react";
import { Helmet } from "react-helmet";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import slider4 from "../../assets/images/slider4.jpg";
import style from "./Home.module.css";

export default function Home() {
  return (
    <>
      <div className={`${style.bottom} container `}>
        <div
          className="row d-flex justify-content-center"
          style={{ height: 400 }}
        >
          <div className="col-md-3">
            <div className="row">
              <div id="home-carousel" className="carousel slide">
               
                <div className="carousel-inner" style={{height:400}}>
                  <div className="carousel-item active">
                    <img src={slider1} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={slider2} className="d-block w-100" alt="..." />
                  </div>
                
                </div>
                <div className={`${style.indicator} `}>
                  <button
              
                    type="button"
                    data-bs-target="#home-carousel"
                    data-bs-slide-to={0}
                    className={`active ${style.ind}`}
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#home-carousel"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                    className={style.ind}
                  />
            
                </div>
        
             
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <img src={slider3} className="img-fluid" alt="" />
            <img src={slider4} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
        


      <Helmet>
        <title>Home Page</title>
      </Helmet>
    </>
  );
}
