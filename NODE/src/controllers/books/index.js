const bookController = require("./book.controller")
const addBookController = require("./addBook.controller")
const addReviewController = require("./addReview.controller")
const getBookByIDController = require("./getBookByID.controller.js")
module.exports=(dependencies)=>{
    return{
        bookController:bookController(dependencies),
        addBookController:addBookController(dependencies),
        addReviewController:addReviewController(dependencies),
        getBookByIDController:getBookByIDController(dependencies),
    }
}