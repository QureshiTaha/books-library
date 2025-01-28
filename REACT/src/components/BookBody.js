import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookBody() {
  const [book, setBook] = useState({});
  const [msg, setMsg] = useState("");
  const [bookFetched, setBookFetched] = useState(0);
  let { id } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SLUG}/books/${id}`
        );
        if (response.data.data) {
          setBook(response.data.data);
          setBookFetched(1);
        } else {
          setMsg("Book not found");
          setBookFetched(1);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [id]);

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
                  {book.rating}
                </h5>
              </div>
            </div>
            <p className="mt-4 text-light">{book.description}</p>
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
                  <p className="text-sm text-light">Rating: {review.rating}</p>
                </div>
              ))
            ) : (
              <p className="text-light">No reviews yet</p>
            )}
          </div>
        )}
        {bookFetched === 1 && (
          <p className="text-center text-2xl font-bold">{msg}</p>
        )}
      </div>
    </div>
  );
}
