import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const Signup = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch("http://192.168.1.58/save_response/register_user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, password }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Signup successful. Please login");
      navigate("/login");
    } else {
      setError(result.error || "An error occurred");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="signup-card">
          <h2 className="signup-title">Create an Account</h2>
          <form onSubmit={handleSignup}>
            <div className="signup-form-group">
              <label className="signup-label">Username:</label>
              <input
                type="text"
                className="signup-input form-control"
                value={user_name}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-group">
              <label className="signup-label">Password:</label>
              <input
                type="password"
                className="signup-input form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="signup-form-group">
              <label className="signup-label">Confirm Password:</label>
              <input
                type="password"
                className="signup-input form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="signup-error">{error}</p>}
            <button type="submit" className="btn btn-success w-100 mt-3">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
