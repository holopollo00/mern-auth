import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearBlueprint } from "../redux/user/blueprintSlice";

export default function AdminHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="bg-blue-400 text-white shadow dark:bg-gray-800">
      <div
        className="flex justify-between items-center max-w-6xl mx-auto
      p-3 h-24"
      >
        <Link to="/" className="no-underline font-bold text-white">
          <h1 className="">Housing Quote</h1>
        </Link>
        <ul className="flex gap-7 h-16 items-center">
          <Link to="/" className="no-underline text-white">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/admin-material" className="no-underline text-white">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Materials
            </li>
          </Link>
          <Link to="/designs" className="no-underline text-white">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Designs
            </li>
          </Link>
          <Link to="/admin-blueprint" className="no-underline text-white" onClick={dispatch(clearBlueprint())}>
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Blueprints
            </li>
          </Link>
          <Link to="/about" className="no-underline text-white">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              About
            </li>
          </Link>
          <Link to="/newsblogs" className="no-underline text-white">
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              News & Blogs
            </li>
          </Link>
          {(currentUser?.roleID == "User") ? 
          (<Link to="/blueprint" className="no-underline text-white" 
          onClick={()=> {
            dispatch(clearBlueprint())
          }}>
            <li className="flex-grow hover:text-yellow-400 hover:underline">
              Blueprint
            </li>
          </Link>) 
          : null}
          <Link
            to="/profile"
            className="no-underline font-bold text-2xl text-white"
          >
            {currentUser ? (
              <img
                src={currentUser.avatar}
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
