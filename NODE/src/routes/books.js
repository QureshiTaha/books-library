const express = require("express");
const { booksController } =  require('../controllers');
const verifyToken = require('../Modules/authJwt');



const{
    bookController,
    addBookController,
    addReviewController,
    getBookByIDController
} = booksController()

    const router = express.Router();
    router.route("/").get( verifyToken,bookController );
    router.route("/").post( addBookController );
    router.route("/review").post( addReviewController );
    router.route("/:bookID").get( getBookByIDController );
    

module.exports = router;
