import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/home.css";
import { useNavigate } from "react-router-dom";

function WishlistBody() {
  const [books, setBooks] = useState([]);
  const userData = JSON.parse(localStorage.getItem("UserData"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SLUG}/users/wishlist/${userData.userID}`,
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
    fetchBooks();
  }, [userData.userID]);

  function clipText(text) {
    let words = text.split(" ");
    if (words.length > 25) {
      return words.slice(0, 25).join(" ") + "...";
    } else {
      return text;
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Book Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          // on click show book details
          <div
            key={book.bookID}
            className="p-4 border rounded shadow card pointer-none"
          >
            <h2 className="text-lg font-bold mt-2">{book.bookTitle}</h2>
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
            <div className=" relative">
              <button
                className="btn btn-success border-0 m-2 rounded"
                style={{ position: "absolute", bottom: 0, left: 0 }}
                onClick={() => {
                  navigate(`/book/${book.bookID}`);
                }}
              >
                View book
              </button>
              <button
                className="btn btn-danger border-0 m-2 rounded"
                title="Remove from wishlist"
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => {
                  axios
                    .delete(
                      `${process.env.REACT_APP_API_SLUG}/users/wishlist/${userData.userID}/${book.bookID}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((response) => {
                      setBooks(books.filter((b) => b.bookID !== book.bookID));
                    })
                    .catch((error) => {
                      console.error(
                        "Error removing book from wishlist:",
                        error
                      );
                    });
                }}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistBody;
