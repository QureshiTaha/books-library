const booksUseCase = require('./booksUseCase');
module.exports = (dependencies) => {
  return async (req, res, next) => {
    try {
      const { userID } = req.params;
      const wishlist = await booksUseCase.getWishlistByUserID(userID);
      res.status(200).send({ status: true, msg: 'success', data: wishlist });
    } catch (error) {
      console.log('Error fetching wishlist:', error);
      res.status(400).json({ status: false, message: 'No wishlist found' });
    }
  };
};
