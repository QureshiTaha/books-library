const booksUseCase = require('./booksUseCase');
module.exports = (dependencies) => {
  return async (req, res, next) => {
    // Add book
    try {
      const { title, author, genre, description, publishDate } = req.body;
      const bookData = await booksUseCase.addBook({ title, author, genre, description, publishDate });
      res.status(200).send({ status: true, msg: 'success', data: bookData });
    } catch (error) {
      console.log('Error adding book:', error);
      res.status(400).json({ message: 'Book not added', error: error });
    }
  };
};
