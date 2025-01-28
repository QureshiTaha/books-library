import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to login
      const response = await axios
        .post(`${process.env.REACT_APP_API_SLUG}/users/login`, {
          userEmail: email,
          userPassword: password,
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error during login1:", error.response.data);
            if (error.response.data.msg) {
              setErrorMessage(error.response.data.msg);
            }
          }
        });
      const { data, status } = response.data;
      const { UserData, token } = data;

      if (status && token) {
        // Save token in localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", token);
        localStorage.setItem("UserData", JSON.stringify(UserData)); // Optionally save user data
        navigate("/");
      } else {
        setErrorMessage("Login failed, please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (errorMessage === "") {
        setErrorMessage(
          "Something went wrong on server. Please try again later."
        );
      }
    }
  };

  return (
    <div className="loginHome">
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Login to Dashboard</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0">
                <h3 className="mb-4 text-center">Have an account?</h3>
                <form onSubmit={handleSubmit} className="signin-form">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      toggle="#password-field"
                      className="fa fa-fw fa-eye field-icon toggle-password"
                      onClick={() => {
                        var x = document.getElementById("password-field");
                        if (x.type === "password") {
                          x.type = "text";
                        } else {
                          x.type = "password";
                        }
                      }}
                    />
                  </div>
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                      onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
