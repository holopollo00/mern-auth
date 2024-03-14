import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(false);
      // Basic input validation (more robust validation recommended)
      if (!username || !password || !email) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      // Hash password using a secure library like bcrypt (server-side)
      // This example simulates password hashing for demonstration purposes only.
      // In a real application, password hashing should be done on the server.
      const newUser = {
        username,
        roleID: "User",
        accountStatus: true,
        password: password, // Replace with actual hashed password
        email,
        fullName: "Dat",
      };

      const response = await axios.post('http://localhost:3000/api/auth/register', newUser); // Replace with your actual API endpoint
      if (response.status === 200) {
        setSuccessMessage('Account created successfully!');
        setUsername('');
        setPassword('');
        setFullName('');
        setEmail('');
        setRoleID('');
        setAccountStatus(''); // Clear form fields after successful signup
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          required
          className="bg-gray-100 p-3 rounded-lg"
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          required
          className="bg-gray-100 p-3 rounded-lg"
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          className="bg-gray-100 p-3 rounded-lg"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onClick={() => { handleSubmit() }}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </div>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{(errorMessage == '') ? successMessage : errorMessage}</p>
    </div>
  );
}
