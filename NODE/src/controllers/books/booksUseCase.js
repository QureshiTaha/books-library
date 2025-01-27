const { v4: uuidv4 } = require('uuid');
const sql = require('../../Modules/sqlHandler');
sqlQuery = sql.sqlQuery;
module.exports = {
  getAllBooks: async function ({ search = '', page = 0, limit = 25 }) {
    try {
      const offset = page * limit;
      const getAllBooks = await sqlQuery(
        `
        SELECT 
          bookID,
          title,
          author,
          description,
          genre,
          publishDate,
          rating,
          coverImage,
          createdAt
        FROM 
          db_books
        WHERE 
          title LIKE ? OR
          author LIKE ? OR
          description LIKE ?
        ORDER BY 
          createdAt DESC
        LIMIT ?, ?
        `,
        [`%${search}%`, `%${search}%`, `%${search}%`, offset, limit]
      );

      console.log('getAllBooks:', getAllBooks);
      return getAllBooks;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
  getBooksWithReviews: async function ({ search = '', page = 0, limit = 25 }) {
    try {
      const results = await sqlQuery(
        `
        SELECT 
          b.bookID,
          b.title AS bookTitle,
          b.author,
          b.description,
          b.genre,
          b.publishDate,
          b.rating AS bookRating,
          b.coverImage,
          r.review,
          r.rating AS reviewRating,
          r.createdAt AS reviewDate,
          u.userID,
          CONCAT(u.userFirstName, ' ', u.userSurname) AS reviewerName
        FROM 
          db_books AS b
        LEFT JOIN 
          db_reviews AS r 
          ON b.bookID = r.bookID
        LEFT JOIN 
          db_users AS u 
          ON r.userID = u.userID
        WHERE 
          b.title LIKE ?
        ORDER BY 
          b.createdAt DESC
        LIMIT ?, ?
        `,
        [`%${search}%`, page, limit]
      );

      if (results.length === 0) {
        return []; // No books found
      }

      // Group books and their reviews
      const books = [];
      results.forEach((row) => {
        // Find the book already in the books array
        let book = books.find((b) => b.bookID === row.bookID);

        if (!book) {
          // If book is not found, create a new book object
          book = {
            bookID: row.bookID,
            title: row.bookTitle,
            author: row.author,
            description: row.description,
            genre: row.genre,
            publishDate: row.publishDate,
            rating: row.bookRating,
            coverImage: row.coverImage,
            reviews: []
          };
          books.push(book);
        }

        // If the row has a review, push the review data into the book's reviews array
        if (row.review) {
          book.reviews.push({
            review: row.review,
            rating: row.reviewRating,
            reviewDate: row.reviewDate,
            reviewer: {
              userID: row.userID,
              name: row.reviewerName
            }
          });
        }
      });

      return books;
    } catch (error) {
      console.error('Error fetching books with reviews:', error);
      throw error;
    }
  },
  addBook: async function (book) {
    try {
      const addBook = await sqlQuery(
        `INSERT INTO db_books (
          bookID,
          title,
          author,
          description,
          genre,
          publishDate
          ) VALUES (
          '${uuidv4()}',
          '${book.title}',
          '${book.author}',
          '${book.description}',
          '${book.genre}',
          '${book.publishDate}'
          );`
      );
      console.log('addBook:', addBook);

      return addBook;
    } catch (error) {
      console.log('Error adding book:', error);

      return error;
    }
  },
  addReview: async function (review) {
    try {
      const addReview = await sqlQuery(
        `INSERT INTO db_reviews (
          bookID,
          userID,
          review,
          rating
          ) VALUES (
          '${review.bookID}',
          '${review.userID}',
          '${review.review}',
          '${review.rating}'
          );`
      );
      return addReview;
    } catch (error) {
      return error;
    }
  },
  getBookByID: async function (bookID) {
    try {
      const results = await sqlQuery(
        `
        SELECT 
          b.bookID,
          b.title AS bookTitle,
          b.author,
          b.description,
          b.genre,
          b.publishDate,
          b.rating AS bookRating,
          b.coverImage,
          r.review,
          r.rating AS reviewRating,
          r.createdAt AS reviewDate,
          u.userID,
          CONCAT(u.userFirstName, ' ', u.userSurname) AS reviewerName
        FROM 
          db_books AS b
        LEFT JOIN 
          db_reviews AS r 
          ON b.bookID = r.bookID
        LEFT JOIN 
          db_users AS u 
          ON r.userID = u.userID
        WHERE 
          b.bookID = ?
        ORDER BY 
          b.createdAt DESC
        `,
        [bookID]
      );

      if (results.length === 0) {
        return null; // No book found
      }

      // Process results into a single book object with grouped reviews
      const book = {
        bookID: results[0].bookID,
        title: results[0].bookTitle,
        author: results[0].author,
        description: results[0].description,
        genre: results[0].genre,
        publishDate: results[0].publishDate,
        rating: results[0].bookRating,
        coverImage: results[0].coverImage,
        reviews: results
          .filter((row) => row.review) // Only include rows with reviews
          .map((row) => ({
            review: row.review,
            rating: row.reviewRating,
            reviewDate: row.reviewDate,
            reviewer: {
              userID: row.userID,
              name: row.reviewerName
            }
          }))
      };

      return book;
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      throw error;
    }
  }
};
