const booksUseCase = require('./booksUseCase');
module.exports = (dependencies) => {
  return async (req, res, next) => {
    try {
      const { userID, bookID } = req.body;
      const wishlist = await booksUseCase.addToWishlist(userID, bookID);
      if (wishlist.err) {
        return res.status(400).json({ status: false, msg: wishlist.err });
      } else {
        res.status(200).send({ status: true, msg: 'success', data: wishlist });
      }
    } catch (error) {
      console.log('Error while adding to wishlist:', error);
      res.status(400).json({ status: false, error, msg: 'Something went wrong while adding to wishlist' });
    }
  };
};
