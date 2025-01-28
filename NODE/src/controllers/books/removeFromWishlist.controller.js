const booksUseCase = require('./booksUseCase');
module.exports = (dependencies) => {
  return async (req, res, next) => {
    try {
      const { userID, bookID } = req.body;
      const wishlist = await booksUseCase.removeFromWishlist(userID, bookID);

      res.status(200).send({ status: true, msg: 'success', data: wishlist });
    } catch (error) {
      console.log('Error while adding to wishlist:', error);
      res.status(400).json({ status: false, error, msg: 'Something went wrong while Removing from wishlist' });
    }
  };
};
