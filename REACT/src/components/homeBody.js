import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/home.css";
import { useNavigate } from "react-router-dom";

function HomeBody() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishDate: "",
    description: "",
  });
  const navigate = useNavigate();
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SLUG}/books/?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SLUG}/books/?search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetch();
  }, [search]);

  // Handle new book submission
  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_SLUG}/books/`, newBook, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNewBook({
        title: "",
        author: "",
        genre: "",
        publishDate: "",
        description: "",
      });
      fetchBooks(); // Refresh the book list after adding
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  function clipText(text) {
    // Split the text into an array of words
    let words = text.split(" ");

    // Check if the text has more than 100 words
    if (words.length > 30) {
      // Join the first 100 words and add an ellipsis
      return words.slice(0, 30).join(" ") + "...";
    } else {
      // Return the original text if it's 100 words or less
      return text;
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Add Book Form */}
      <div className="mb-8">
        <form onSubmit={handleAddBook} className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Author"
            className="p-2 border rounded"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Genre"
            className="p-2 border rounded"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            required
          />
          <input
            type="date"
            placeholder="Publish Date"
            className="p-2 border rounded"
            value={newBook.publishDate}
            onChange={(e) =>
              setNewBook({ ...newBook, publishDate: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            className="p-2 border rounded col-span-4"
            value={newBook.description}
            onChange={(e) =>
              setNewBook({ ...newBook, description: e.target.value })
            }
            required
          />
          <br />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded md:col-span-2"
          >
            Add Book
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Book Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          // on click show book details
          <div
            key={book.bookID}
            className="p-4 border rounded shadow card"
            onClick={() => navigate(`/book/${book.bookID}`)}
          >
            <h2 className="text-lg font-bold">{book.title}</h2>
            <h4 className="text-lg font-bold">
              Rating{" "}
              <strong>
                {book.reviews && book.reviews.length && book.reviews.length > 0
                  ? Math.round(
                      (book.reviews.reduce((a, b) => a + b.rating, 0) /
                        book.reviews.length) *
                        10
                    ) / 10
                  : 0}
              </strong>
            </h4>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre}
            </p>
            <p>
              <strong>Published:</strong>{" "}
              {new Date(book.publishDate).toDateString()}
            </p>
            <p>{clipText(book.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeBody;
