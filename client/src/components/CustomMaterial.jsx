import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function CustomMaterial() {
  return (
    <div>
      <div className="mt-8">
        <ul className="flex justify-center">
          <li>
            <a href="#" className="flex items-center">
              <span>1. </span>
              Find Your Design
              <svg
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-3 mx-4 w-[10px] h-[10px] css-2rvvjx"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 5.599 9 3 6 .402V2H0v2h6V5.6Z"
                  fill="#797979"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center">
              <span>2. </span>
              Customize Area
              <svg
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-3 mx-4 w-[10px] h-[10px] css-2rvvjx"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 5.599 9 3 6 .402V2H0v2h6V5.6Z"
                  fill="#797979"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center">
              <span>3. </span>
              Customize Material
              <svg
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-3 mx-4 w-[10px] h-[10px] css-2rvvjx"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 5.599 9 3 6 .402V2H0v2h6V5.6Z"
                  fill="#797979"
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <span>4. </span>
              Finish and Get Quote
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-8 css-1ol38f2">
        <div className="lg:w-[50%] ml-10 mb-6 lg:mt-8">
          <img
            className="w-[800px] h-[500px] object-cover"
            src="data:image/jpeg;base64,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"
          />
        </div>
        <div className="lg:w-[40%] 2xl:w-[40%] mt-8">
          <Link to="/customDesign">
            <button className="text-gray-3 font-light back-btn hidden lg:flex items-center mb-4 css-dsddds e1h88f600">
              <svg
                viewBox="0 0 22 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 xl:w-4 inline-block mr-2 css-2rvvjx"
              >
                <path
                  d="m7.423 14 1.476-1.41L4.104 8h16.93V6H4.103l4.805-4.59L7.423 0 .093 7l7.33 7Z"
                  fill="#797979"
                ></path>
              </svg>
              Back
            </button>
          </Link>
          <div className="hidden md:flex mb-3 lg:mb-8 pb-4 border-b border-gray-2">
            <div className="flex-col items-start css-0">
              <div className="flex">
                <a className="font-bold rounded-[2px] px-4 py-1 css-1r5sb5d e1ky27510">
                  Customize Material
                </a>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex flex-row flex-wrap">
              <Link
                to="/customMaterial/windows"
                className="
                w-full lg:w-[30%] lg:odd:w-[30%] mr-[2%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border"
              >
                <div>Windows</div>
              </Link>
              <Link
                to="/customMaterial/doors"
                className="
                w-full lg:w-[30%] lg:odd:w-[30%] mr-[2%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border"
              >
                <div>Doors</div>
              </Link>
              <Link
                to="/customMaterial/yardbricks"
                className="
                w-full lg:w-[30%] lg:odd:w-[30%] mr-[2%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border"
              >
                <div>Yard Bricks</div>
              </Link>
              <Link
                to="/customMaterial/roofs"
                className="
                w-full lg:w-[30%] lg:odd:w-[30%] mr-[2%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border"
              >
                <div>Roofs</div>
              </Link>
              <Link
                to="/customMaterial/decoratebricks"
                className="
                w-full lg:w-[30%] lg:odd:w-[30%] mr-[2%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border"
              >
                <div>Decorated Bricks</div>
              </Link>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
          <div className="flex justify-end items-center mb-6 bg-gray-100 h-16">
            Estimated Price:
          </div>
          <div>
            <Link to="/designDetail">
              <button className="bg-blue-400 w-full h-12 rounded-xl text-white hover:bg-yellow-500">
                Finish
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
