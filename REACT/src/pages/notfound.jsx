import React from 'react'
import { Link } from "react-router-dom";

export default function notfound() {
  return (
    <>
  <div>
  <div id="wrapper" className="wrapper">
    <div id="main__content">
      {/* ======= Main Wrapper Start ======= */}
      <main className="main-wrapper">
        {/* ======= 404 Start ======= */}
        <section className="error error-bg pt-80 pb-50" data-bg-image="assets/images/error-bg.png">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="error-inner">
                  <div className="row">
                    <div className="col-lg-5 mx-auto mb-50">
                      <div className="error__thumb">
                        <img src="../assets/images/error/error-404-image.png" alt="Error" width={835} height={722} className="error-thumb wow fadeInDownMedium animated" data-wow-delay=".6s" data-wow-duration="1.5s" />
                        <img src="../assets/images/error/error-404-image-2.png" alt="Error" className="error-thumb error-thumb--two wow fadeInUpMedium animated" data-wow-delay=".6s" data-wow-duration="1.5s" />
                      </div>
                    </div>
                    <div className="col-12 mx-auto">
                      <div className="error-content mb-30">
                        <h2 className="heading">Sorry! Page Not Found!</h2>
                        <p className="paragraph">
                          Oops! The page which you are looking for does not
                          exist. Please return to the homepage.
                        </p>
                        <Link to="/" className="btn btn--common btn--primary rt-button-animation-out" data-animation="fadeInUp" data-delay=".8s">
                          Back to home
                          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="34px" height="16px" viewBox="0 0 34.53 16" xmlSpace="preserve">
                            <rect className="rt-button-line" y="7.6" width={34} height=".4" />
                            <g className="rt-button-cap-fake">
                              <path className="rt-button-cap" d="M25.83.7l.7-.7,8,8-.7.71Zm0,14.6,8-8,.71.71-8,8Z" />
                            </g>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ======= 404 End ======= */}</main>
    </div></div></div>

    </>
  )
}
