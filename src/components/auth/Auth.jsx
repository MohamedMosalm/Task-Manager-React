import React from "react";
import "./auth.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="header">
        <div className="header-text">Sign Up</div>
      </div>

      <form className="form-container">
        <div className="form-group">
          <img src={user_icon} alt="user_icon" />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <img src={user_icon} alt="user_icon" />
          <input type="text" name="lastName" placeholder="Last Name" required />
        </div>
        <div className="form-group">
          <img src={email_icon} alt="email_icon" />
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <img src={password_icon} alt="password_icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
