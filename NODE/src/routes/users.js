const express = require('express');
const { userController, testController } = require('../controllers');
const { booksController } = require('../controllers');
const verifyToken = require('../Modules/authJwt');
const {
  loginController,
  signupController,
  logoutController,
  editUserController,
  getAllUsersController,
  getUserByUserEmailController,
  getUserByUserPhoneController
} = userController();

const { getWishlistByuserIDController, addToWishlistController, removeFromWishlistController } = booksController();

const { testingController } = testController();

const router = express.Router();
router.route('/').get(testingController);
router.route('/login').post(loginController);
router.route('/signup').post(signupController);
router.route('/logout').delete(logoutController);
router.route('/allUsers').get(verifyToken, getAllUsersController);
router.route('/getUserByEmail/:userEmail').get(getUserByUserEmailController);
router.route('/getUserByPhone/:userPhone').get(getUserByUserPhoneController);
router.route('/edituser').post(editUserController);
router.route('/wishlist/:userID').get(verifyToken, getWishlistByuserIDController);
router.route('/wishlist').post(verifyToken, addToWishlistController);
router.route('/wishlist/:userID/:bookID').delete(verifyToken, removeFromWishlistController);
router.route('/test').get(testingController);

module.exports = router;
