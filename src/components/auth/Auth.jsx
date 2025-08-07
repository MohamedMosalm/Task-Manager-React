import React, { useState } from "react";
import axios from "axios";
import "./auth.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        console.log("Login data:", {
          email: formData.email,
          password: formData.password,
        });
        alert("Login successful!");
        onLogin();
      } else {
        const registrationData = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        };

        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          registrationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          alert("Registration successful!");
          onLogin();
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          setError(
            "Invalid request. Please check your information and try again."
          );
        } else {
          setError("Registration failed. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
    setError("");
  };

  return (
    <div className="auth-container">
      <div className="header">
        <div className="header-text">{isLogin ? "Login" : "Sign Up"}</div>
      </div>

      {error && (
        <div
          className="error-message"
          style={{
            color: "#ff4444",
            backgroundColor: "#ffe6e6",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px 0",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form className="form-container" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <img src={user_icon} alt="user_icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <img src={user_icon} alt="user_icon" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <img src={email_icon} alt="email_icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <img src={password_icon} alt="password_icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
      </form>

      <div className="toggle-container">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="toggle-link" onClick={toggleMode}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
