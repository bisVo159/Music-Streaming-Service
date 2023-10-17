import "./login.css"
import React, { useState } from "react";
import axios from 'axios';

const App = () => {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => {
    axios.post('http://localhost:5000/api/users', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignIn = () => {
    axios.post('http://localhost:5000/api/users/login', formData)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.token);
               localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  return (
    <div className="body">
      {signIn ? (
        <div className="sign-up-container">
          <h2>Create Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      ) : (
        <div className="sign-in-container">
          <h2>Sign in</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <a href='#'>Forgot your password?</a>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}

      <div className="overlay-container">
        <div className="overlay">
          <div className="left-overlay-panel">
            <h2>Welcome Back!</h2>
            <p>To keep connected with us, please login with your personal info.</p>
            <button onClick={toggleSignIn}>Sign In</button>
          </div>
          <div className="right-overlay-panel">
            <h2>Hello, Friend!</h2>
            <p>Enter your personal details and start your journey with us.</p>
            <button onClick={toggleSignIn}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
