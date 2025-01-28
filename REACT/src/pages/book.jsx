import React from 'react'
import BookBody from '../components/BookBody'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Book() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if(!isLoggedIn){
    window.location.href = "/login";
  } 

  return (
    <div className="home">
    <Header/>
    <BookBody/>
    <Footer/>
    </div>
  )
}
