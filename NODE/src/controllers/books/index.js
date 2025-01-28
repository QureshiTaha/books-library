const bookController = require("./book.controller")
const addBookController = require("./addBook.controller")
const addReviewController = require("./addReview.controller")
const getBookByIDController = require("./getBookByID.controller.js")
const getWishlistByuserIDController = require("./getWishlistByuserID.controller.js")
const addToWishlistController = require("./addToWishlist.controller.js")
const removeFromWishlistController = require("./removeFromWishlist.controller.js")
module.exports=(dependencies)=>{
    return{
        bookController:bookController(dependencies),
        addBookController:addBookController(dependencies),
        addReviewController:addReviewController(dependencies),
        getBookByIDController:getBookByIDController(dependencies),
        getWishlistByuserIDController:getWishlistByuserIDController(dependencies),
        addToWishlistController:addToWishlistController(dependencies),
        removeFromWishlistController:removeFromWishlistController(dependencies),
    }
}