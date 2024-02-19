import React from "react";
import { newsData } from "../../mockdata.js";
export default function News() {
  return (
    <div className="">
      <div className="flex justify-center my-11 text-5xl font-semibold">
        <h1>News and Blogs</h1>
      </div>
      <div className="card-container flex flex-wrap gap-10 justify-center">
        {newsData.map((news, id) => {
          return (
            <div className="card w-80 shadow-xl rounded-3xl" key={id}>
              <div>
                <img src={news.img} alt="house" className="rounded-t-3xl" />
              </div>
              <div className="flex justify-center truncate text-2xl font-semibold mt-5">
                {news.title}
              </div>

              <div className="mx-5 mt-2 h-20">
                <p className="text-gray-400 text-sm line-clamp-3">
                  {news.description}
                </p>
              </div>

              <div className="flex justify-around pb-5">
                <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                  See more
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
