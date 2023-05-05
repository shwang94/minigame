
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import './style.css'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {signIn} = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="signin-form">
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
        <button type="submit">Sign In</button>
      </form>
      <div>
        Don't have an account, <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
