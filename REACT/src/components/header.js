import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // remove token from local storage
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-header">
      <header className="header d-flex justify-content-between align-items-center">
        <div
          className="p-0 m-2 mx-4 logo-container"
          onClick={() => navigate("/")}
        >
          <img
            className="p-0 text-dark logo"
            src="https://reactjs.org/logo-og.png"
            height={"70px"}
            alt="logo"
          />
        </div>
        <h4 className="px-2 py-1 m-2 text-light">Welcome User</h4>

        <div className="p-0 m-2 mx-4">
          <button
            // Check if slug have wishlist show home page
            onClick={() => {
              if (window.location.href.includes("wishlist")) {
                navigate("/");
              } else {
                navigate("/wishlist");
              }
            }}
            className="px-2 py-1 m-2 bg-success text-white rounded border-0"
          >
            {window.location.href.includes("wishlist") ? "Home" : "Wishlist"}
          </button>
          <button
            onClick={logout}
            className="px-2 py-1 m-2 bg-danger text-white rounded border-0"
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
