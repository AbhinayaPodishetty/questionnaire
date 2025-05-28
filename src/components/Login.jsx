import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

const Login = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://192.168.1.58/save_response/test_login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, password }),
    });

    const result = await response.json();

    if (result.success) {
      sessionStorage.setItem("username", user_name);
      navigate("/instructions");
    } else {
      setError(result.error || "An error occurred");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="text-center mb-4">Login to your account</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input

              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3">Don't have an account? <Link to="/signup">Sign up here</Link></p>

      </div>



    </div>



  );
};

export default Login;
