import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CustomArea() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/designs");
  };
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
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:w-[60%] mb-6 lg:mt-8">
          <img src="https://xaynhanhanh.vn/img/image/goc-tu-van/tu-van/ban-ve-nha-cap-4-mai-thai-3-phong-ngu-1-phong-tho.jpg" />
        </div>
        <div className="lg:w-[40%] 2xl:w-[40%] mt-8">
          <button
            onClick={handleClick}
            className="text-gray-3 font-light back-btn hidden lg:flex items-center mb-4 css-dsddds e1h88f600"
          >
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
          <div className="hidden md:flex mb-3 lg:mb-8 pb-4 border-b border-gray-2">
            <div className="flex-col items-start css-0">
              <div className="flex">
                <a className="font-bold rounded-[2px] px-4 py-1 css-1r5sb5d e1ky27510">
                  Customize Area
                </a>
              </div>
            </div>
          </div>
          <div className="mb-8 mr-5">
            <div className="flex flex-row flex-wrap">
              <div
                className="
                w-full lg:w-[48%] lg:odd:w-[48%] lg:odd:mr-[4%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border flex justify-between"
              >
                Diện tích: R9 x D15
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="invisible css-2rvvjx"
                >
                  <path
                    d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <div
                className="
                w-full lg:w-[48%] lg:odd:w-[48%] lg:odd:mr-[4%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border flex justify-start "
              >
                Diện tích: R8 x D14
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="invisible css-2rvvjx"
                >
                  <path
                    d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <div
                className="
                w-full lg:w-[48%] lg:odd:w-[48%] lg:odd:mr-[4%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border flex justify-between"
              >
                Diện tích: R8 x D15
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="invisible css-2rvvjx"
                >
                  <path
                    d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <div
                className="
                w-full lg:w-[48%] lg:odd:w-[48%] lg:odd:mr-[4%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border flex justify-between
                border border-main-7 bg-main-9"
              >
                Diện tích: R9 x D14
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="visible text-main-7 css-2rvvjx"
                >
                  <path
                    d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <div
                className="
                w-full lg:w-[48%] lg:odd:w-[48%] lg:odd:mr-[4%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border flex justify-between"
              >
                Diện tích: R10 x D14
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="invisible css-2rvvjx"
                >
                  <path
                    d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
              <div
                className="
                w-full lg:w-[48%] lg:odd:w-[48%] lg:odd:mr-[4%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border flex justify-between"
              >
                Diện tích: R10 x D15
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="invisible css-2rvvjx"
                >
                  <path
                    d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                    fill="#fff"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mb-6 bg-gray-100 h-16">
            Estimated Price:
            <span className="font-bold"> 1.000.000.000 VND</span>
          </div>
          <div>
            <Link to="/customMaterial">
              <button className="bg-blue-400 w-full h-12 rounded-xl text-white hover:bg-yellow-500">
                Customize Material
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
