import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const { loading, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username,
        password: password, // Replace with actual hashed password
      };
      dispatch(signInStart());
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        user
      );
      const data = await response.data;
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/designs");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Username"
          id="username"
          required
          className="bg-gray-100 p-3 rounded-lg"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          required
          className="bg-gray-100 p-3 rounded-lg"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          disabled={loading}
          className="bg-blue-400 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Incorrect Username or Password" : ""}
      </p>
    </div>
  );
}
