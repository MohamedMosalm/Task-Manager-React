import React, { useState } from "react";
import "./auth.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };

  return (
    <div className="auth-container">
      <div className="header">
        <div className="header-text">{isLogin ? "Login" : "Sign Up"}</div>
      </div>

      <form className="form-container">
        {!isLogin && (
          <>
            <div className="form-group">
              <img src={user_icon} alt="user_icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
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
            required
          />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
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
