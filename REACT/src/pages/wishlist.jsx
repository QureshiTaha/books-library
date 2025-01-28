import React from 'react'
import WishlistBody from '../components/wishlistBody'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Wishlist() {
  // check if user is logged in
  // if not logged in, redirect to login page

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  
  if(!isLoggedIn){
    window.location.href = "/login";
  } 

  return (
    <div className="wishlist">
    <Header/>
    <WishlistBody/>
    <Footer/>
    </div>
  )
}
