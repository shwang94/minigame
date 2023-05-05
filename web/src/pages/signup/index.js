// SignUp.js
import React, { useState } from "react";
import { useAuth } from "../../AuthProvider";
import './style.css'

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const {signUp} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
           await signUp(email, password);
        } catch (error) {
        setError(error.message);
        }
    };

    return (
        <div className="signup-page">
          <h1>Sign Up</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="signup-form">
           
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      );
};

export default SignUpPage;
