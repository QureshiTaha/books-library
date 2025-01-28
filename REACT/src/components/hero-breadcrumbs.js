import React from 'react'
import { Link } from "react-router-dom";

export default function abouthero(props) {
  return (
      <>
    <section className="hero-inner">
    <div className="hero-inner__bg" data-bg-image="assets/images/bg/inner-bg.jpg">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-breadcrumb">
              <h1 className="heading">{props.title}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                  {props.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>     
</>
  )
}
