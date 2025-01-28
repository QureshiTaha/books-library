import React from 'react'
import HomeBody from '../components/homeBody'
import Header from '../components/header'
import Footer from '../components/footer'

export default function home() {
  // check if user is logged in
  // if not logged in, redirect to login page

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if(!isLoggedIn){
    window.location.href = "/login";
  } 

  return (
    <div className="home">
    <Header/>
    <HomeBody/>
    <Footer/>
    </div>
  )
}
