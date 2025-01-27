const booksUseCase = require('./booksUseCase');
module.exports = (dependencies) => {
  return async (req, res, next) => {
    try {
      const { bookID } = req.params;
      const booksData = await booksUseCase.getBookByID(bookID);
      res.status(200).send({ status: true, msg: 'success', data: booksData });
    } catch (error) {
      console.log('Error fetching books:', error);

      res.status(400).json({ message: 'No Books found' });
    }
  };
};
