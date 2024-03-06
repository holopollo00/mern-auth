import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import QuoteModal from "./QuoteModal";

export default function CustomMaterial() {
  const currentDesign = useSelector((state) => state.design.currentDesign);
  const [materials, setMaterials] = useState();
  const [quoteModal, setQuoteModal] = useState(false);
  const handleClose = () => setQuoteModal(false);
  const [selectedPaintWallId, setSelectedPaintWallId] = useState();
  const [selectedRoofId, setSelectedRoofId] = useState();
  const [selectedDoorId, setSelectedDoorId] = useState();
  const [selectedWindowId, setSelectedWindowId] = useState();
  const [selectedWallTileId, setSelectedWallTileId] = useState();
  const [selectedFloorTileId, setSelectedFloorTileId] = useState();
  const choosePaintWall = (id) => {
    setSelectedPaintWallId(id);
  };
  const chooseRoof = (id) => {
    setSelectedRoofId(id);
  };
  const chooseDoor = (id) => {
    setSelectedDoorId(id);
  };
  const chooseWindow = (id) => {
    setSelectedWindowId(id);
  };
  const chooseWallTile = (id) => {
    setSelectedWallTileId(id);
  };
  const chooseFloorTile = (id) => {
    setSelectedFloorTileId(id);
  };

  useEffect(() => {
    async function fetchMaterial() {
      try {
        const res = await fetch("/api/material");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setMaterials(data);
      } catch (error) {
        console.log("Error fetching sizes!");
      }
    }
    fetchMaterial();
  }, []);
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
        <div className="lg:w-[40%] 2xl:w-[40%] mt-8 ml-32">
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
            <div className="item">
              <h5>Paint Wall</h5>
              <div className="flex gap-10 w-[1300px] mb-5 mt-3 justify-evenly">
                {materials &&
                  materials
                    .filter((item) => item.item === "PaintWall")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() => choosePaintWall(item._id)}
                          className="flex flex-col gap-2 shadow-sm"
                          key={item._id}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-[200px] h-[200px] shadow-sm"
                          />
                          <div className="flex justify-between mx-2">
                            <p>{item.name}</p>
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=""
                            >
                              <path
                                d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                                fill={
                                  selectedPaintWallId === item._id
                                    ? "#797979"
                                    : "#fff"
                                }
                              ></path>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="item">
              <h5>Roof</h5>
              <div className="flex gap-10 w-[1300px] mb-5 mt-3 justify-evenly">
                {materials &&
                  materials
                    .filter((item) => item.item === "Roof")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() => chooseRoof(item._id)}
                          className="flex flex-col gap-2 shadow-sm"
                          key={item._id}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-[200px] h-[200px] shadow-sm"
                          />
                          <div className="flex justify-between mx-2">
                            <p>{item.name}</p>
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=""
                            >
                              <path
                                d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                                fill={
                                  selectedRoofId === item._id
                                    ? "#797979"
                                    : "#fff"
                                }
                              ></path>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="item">
              <h5>Door</h5>
              <div className="flex gap-10 w-[1300px] mb-5 mt-3 justify-evenly">
                {materials &&
                  materials
                    .filter((item) => item.item === "Door")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() => chooseDoor(item._id)}
                          className="flex flex-col gap-2 shadow-sm"
                          key={item._id}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-[200px] h-[200px] shadow-sm"
                          />
                          <div className="flex justify-between mx-2">
                            <p>{item.name}</p>
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=""
                            >
                              <path
                                d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                                fill={
                                  selectedDoorId === item._id
                                    ? "#797979"
                                    : "#fff"
                                }
                              ></path>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="item">
              <h5>Window</h5>
              <div className="flex gap-10 w-[1300px] mb-5 mt-3 justify-evenly">
                {materials &&
                  materials
                    .filter((item) => item.item === "Window")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() => chooseWindow(item._id)}
                          className="flex flex-col gap-2 shadow-sm"
                          key={item._id}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-[200px] h-[200px] shadow-sm"
                          />
                          <div className="flex justify-between mx-2">
                            <p>{item.name}</p>
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=""
                            >
                              <path
                                d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                                fill={
                                  selectedWindowId === item._id
                                    ? "#797979"
                                    : "#fff"
                                }
                              ></path>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="item">
              <h5>WallTile</h5>
              <div className="flex gap-10 w-[1300px] mb-5 mt-3 justify-evenly">
                {materials &&
                  materials
                    .filter((item) => item.item === "WallTile")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() => chooseWallTile(item._id)}
                          className="flex flex-col gap-2 shadow-sm"
                          key={item._id}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-[200px] h-[200px] shadow-sm"
                          />
                          <div className="flex justify-between mx-2">
                            <p>{item.name}</p>
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=""
                            >
                              <path
                                d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                                fill={
                                  selectedWallTileId === item._id
                                    ? "#797979"
                                    : "#fff"
                                }
                              ></path>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="item">
              <h5>FloorTile</h5>
              <div className="flex gap-10 w-[1300px] mb-5 mt-3 justify-evenly">
                {materials &&
                  materials
                    .filter((item) => item.item === "FloorTile")
                    ?.map((item) => {
                      return (
                        <div
                          onClick={() => chooseFloorTile(item._id)}
                          className="flex flex-col gap-2 shadow-sm"
                          key={item._id}
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="w-[200px] h-[200px] shadow-sm"
                          />
                          <div className="flex justify-between mx-2">
                            <p>{item.name}</p>
                            <svg
                              width={20}
                              height={20}
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className=""
                            >
                              <path
                                d="M3.5 6.1 1.4 4l-.7.7 2.8 2.8 6-6-.7-.7-5.3 5.3Z"
                                fill={
                                  selectedFloorTileId === item._id
                                    ? "#797979"
                                    : "#fff"
                                }
                              ></path>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mb-6 bg-gray-100 h-16">
            Estimated Price:
          </div>
          <div>
            <button
              onClick={() => {
                setQuoteModal(true);
                window.scrollTo(0, 0);
              }}
              className="bg-blue-400 w-full h-12 rounded-xl text-white hover:bg-yellow-500"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
      <QuoteModal onClose={handleClose} visible={quoteModal} />
    </div>
  );
}
