import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookBody() {
  const [book, setBook] = useState({});
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("danger");

  const [bookFetched, setBookFetched] = useState(0);
  let { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SLUG}/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.data) {
        setBook(response.data.data);
        setBookFetched(1);
      } else {
        setMsg("Book not found");
        setMsgType("danger");
        setBookFetched(1);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SLUG}/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.data) {
          setBook(response.data.data);
          setBookFetched(1);
        } else {
          setMsg("Book not found");
          setMsgType("danger");
          setBookFetched(1);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [id]);

  const addToWishlist = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_SLUG}/users/wishlist/`,
          {
            bookID: id,
            userID: userData.userID,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          setMsg("Book added to wishlist");
          setMsgType("success");
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error adding to wishlist:", error.response.data);
            if (error.response.data.msg) {
              setMsg(error.response.data.msg);
              setMsgType("danger");
            }
          }
        });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const addReview = async () => {
    const review = prompt("Enter review:");
    const rating = prompt("Enter rating (1-5):");
    if (!review || !rating) {
      setMsg("Review and rating are required");
      setMsgType("danger");
      return;
    } else if (rating < 1 || rating > 5 || isNaN(rating)) {
      setMsg("Rating should be between 1 and 5");
      setMsgType("danger");
      return;
    }
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_SLUG}/books/review`,
          {
            bookID: id,
            userID: userData.userID,
            review,
            rating,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setMsg("Review added successfully");
          setMsgType("success");
          fetchBooks();
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error adding review:", error.response.data);
            if (error.response.data.msg) {
              setMsg(error.response.data.msg);
              setMsgType("danger");
            }
          }
        });
    } catch (error) {
      console.error("Error adding review:", error);
      // setMsg("Error adding review");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        {bookFetched === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-light">{book.title}</h1>
            <div className="flex flex-row items-center">
              <div className="">
                <h5 className="text-light">
                  <span className="font-bold text-light">Author:</span>{" "}
                  {book.author}
                </h5>
                <h5 className="text-light">
                  <span className="font-bold text-light">Genre:</span>{" "}
                  {book.genre}
                </h5>
                <h5 className="text-light">
                  <span className="font-bold text-light">Publish Date:</span>{" "}
                  {book.publishDate}
                </h5>
                <h5 className="text-light">
                  <span className="font-bold text-light">Rating:</span>{" "}
                  {/* Merge all the rating from review */}
                  {book.reviews &&
                  book.reviews.length &&
                  book.reviews.length > 0
                    ? Math.round(
                        (book.reviews.reduce((a, b) => a + b.rating, 0) /
                          book.reviews.length) *
                          10
                      ) / 10
                    : 0}
                </h5>
              </div>
            </div>
            <p className="mt-4 text-light">{book.description}</p>
            {bookFetched === 1 && (
              <p className={`text-center text-2xl font-bold text-${msgType}`}>
                {msg}
              </p>
            )}
            <div className="d-flex flex-row justify-content-center ">
              <button
                className="text-xl font-bold border-0 btn-primary mr-4 px-4 py-2 rounded"
                onClick={addToWishlist}
              >
                Add to wishlist
              </button>
              <button
                className="text-xl font-bold border-0 btn-success border-0 px-4 py-2 rounded"
                onClick={addReview}
              >
                Add Review
              </button>
            </div>
            <hr className="bg-light" />
            <h2 className="text-xl font-bold mt-4 text-light">Reviews</h2>
            {book.reviews && book.reviews.length ? (
              book.reviews.map((review, index) => (
                <div
                  key={review.reviewDate + index}
                  className="border p-4 my-4"
                >
                  <p className="text-light">{review.review}</p>
                  <p className="text-sm text-light">
                    {review.reviewer.name} -{" "}
                    {new Date(review.reviewDate).toDateString()}
                  </p>
                  <p className="text-sm text-light">
                    Rating: {Math.round(review.rating * 10) / 10}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-light">No reviews yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
