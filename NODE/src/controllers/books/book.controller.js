const booksUseCase = require('./booksUseCase');
module.exports = (dependencies) => {
  return async (req, res, next) => {
    try {
      const {search,page,limit} = req.query;
      const booksData = await booksUseCase.getBooksWithReviews({search,page,limit});
      res.status(200).send({ status: true, msg: 'success', data: booksData });
    } catch (error) {
      console.log('Error fetching books:', error);
      
      res.status(400).json({ message: 'No Books found' });
    }
  };
};
