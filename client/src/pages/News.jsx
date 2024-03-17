import React, { useEffect, useState } from "react";
import { newsData } from "../../mockdata.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function News() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/blog`);
      if (!res.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setBlogs(data);
  } catch (error) {
      setError(error);
  }
  }

  return (
    <div className="">
      <div className="flex justify-center my-11 text-5xl font-semibold">
        <h1>{(currentUser?.roleID != "Admin") ? "News and Blogs" : "News and Blogs Management"}</h1>
      </div>
      {
        (currentUser?.roleID == "Admin") ?
          (
            <div className="btn-add-design">
              <button
                onClick={() => { navigate("/admin-blog-adding") }}
                className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500"
              >
                Thêm mới
              </button>
            </div>
          )
          : null
      }
      <div className="card-container flex flex-wrap gap-10 justify-center">
        {blogs.map((news, id) => {
          return (
            <div className="card w-80 shadow-xl rounded-3xl" key={id}>
              <div>
                <img src={news.pictures[0]} alt="house" className="rounded-t-3xl" />
              </div>
              <div className="flex justify-center truncate text-2xl font-semibold mt-5">
                {news.name}
              </div>

              <div className="mx-5 mt-2 h-20">
                <p className="text-gray-400 text-sm line-clamp-3">
                  {news.description}
                </p>
              </div>

              <div className="flex justify-around pb-5">
                <Link to={`/admin-blogDetail/${news._id}`}>
                  <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                    See more
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
