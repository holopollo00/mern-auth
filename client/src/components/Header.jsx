import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-blue-400 text-white shadow dark:bg-gray-800">
      <div
        className="flex justify-between items-center max-w-6xl mx-auto
      p-3 h-24"
      >
        <Link to="/">
          <h1 className="font-bold text-2xl">Housing Quote</h1>
        </Link>
        <ul className="flex gap-7 h-16 items-center">
          <Link to="/">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/designs">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Designs
            </li>
          </Link>
          <Link to="/customizes">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Customizes
            </li>
          </Link>
          <Link to="/about">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              About
            </li>
          </Link>
          <Link to="/newsblogs">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              News & Blogs
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="Profile Pic"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li className="flex-grow hover:text-yellow-400 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
