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
            src="https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
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
