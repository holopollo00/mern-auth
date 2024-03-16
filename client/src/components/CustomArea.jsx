import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentDesign } from "../redux/user/designSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "../pages/CustomArea.css";

export default function CustomArea() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentDesign = useSelector((state) => state.design.currentDesign);
  const currentPart = useSelector((state) => state.part.currentPart);
  const [size, setSize] = useState();
  const [selectedSizeId, setSelectedSizeId] = useState('');

  const [bedRoom, setBedRoom] = useState(currentDesign?.design.room.bedRoom);
  const [restRoom, setRestRoom] = useState(currentDesign?.design.room.restRoom);
  const handleClick = () => {
    navigate("/designs");
  };

  const handleChange = async () => {
    try {
      // Update current design with the fetched size data
      const updatedDesign = {
        ...currentDesign,
        size: size.filter((e) => {
          if (e._id == selectedSizeId) {
            return e;
          }
        })[0], // Update size with fetched data
        bedRoom: bedRoom,
        restRoom: restRoom
      };
      dispatch(setCurrentDesign(updatedDesign));
    } catch (error) {
      console.log("Error fetching sizes!");
    }
  };

  const calculatePrice = () => {
    if (!currentDesign.size || !currentDesign.design) return 0;
    return (
      currentDesign.size.long *
      currentDesign.size.wide *
      (currentPart.rawPart + currentPart.finishingPart) * currentDesign.design.floor * 0.7
    );
  };

  useEffect(() => {
    async function fetchSizes() {
      try {
        const res = await fetch("/api/size");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setSize(data);
        if (selectedSizeId == '' && !currentDesign.size?._id) {
          setSelectedSizeId(data[0]._id);
        } else if (currentDesign.size?._id) {
          setSelectedSizeId(currentDesign.size?._id);
        }
      } catch (error) {
        console.log("Error fetching sizes!");
      }
    }
    fetchSizes();
  }, []);
  return (
    <div id="CustomArea">
      <div className="mt-8">
        <ul className="flex justify-center">
          <li>
            <Link
              to="/designs"
              className="flex items-center no-underline text-black hover:opacity-50"
            >
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
            </Link>
          </li>
          <li>
            <Link
              to="/customDesign"
              className="flex items-center no-underline text-black hover:opacity-50"
            >
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
            </Link>
          </li>
          <li>
            <Link
              to="/customMaterial"
              className="flex items-center no-underline text-black hover:opacity-50"
            >
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
            </Link>
          </li>
          <li>
            <a href="#" className="no-underline text-black">
              <span>4. </span>
              Finish and Get Quote
            </a>
          </li>
        </ul>
      </div>
      <button
        style={{ marginLeft: "30px" }}
        onClick={handleClick}
        className="text-gray-3 font-light back-btn hidden lg:flex items-center mb-4 no-underline"
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
      <div className="flex flex-col lg:flex-row lg:space-x-8 container">
        <div className="mt-8">
          <div className="hidden md:flex mb-3 lg:mb-8 pb-4 border-b border-gray-2">
            <div className="flex-col items-start css-0">
              <div className="flex">
                <a className="font-bold rounded-[2px] px-4 py-1 no-underline text-black">
                  Customize Area
                </a>
              </div>
            </div>
          </div>
          <div className="mb-8 mr-5">
            <div className="flex flex-row flex-wrap">
              {size &&
                size?.map((size) => {
                  return (
                    <div
                      onClick={() => setSelectedSizeId(size._id)}
                      key={size._id}
                      className="
                w-full lg:w-[48%] lg:odd:w-[48%] lg:odd:mr-[4%] rounded
                cursor-pointer mb-3 py-3 lg:py-4 px-4 border flex justify-between"
                    >
                      Diện tích: R{size.wide} x D{size.long}
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
                            selectedSizeId === size._id ? "#797979" : "#fff"
                          }
                        ></path>
                      </svg>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="hidden md:flex mb-3 lg:mb-8 pb-4 border-b border-gray-2">
            <div className="flex-col items-start css-0">
              <div className="flex">
                <a className="font-bold rounded-[2px] px-4 py-1 no-underline text-black">
                  Customize Room
                </a>
              </div>
            </div>
          </div>
          <div className="mb-8 mr-5">
            <div className="flex flex-row flex-wrap">

              <FormControl sx={{ m: 1, minWidth: 140, marginRight: 12 }}>
                <InputLabel id="demo-simple-select-label">Bed Room</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bedRoom}
                  label="Bed Room"
                  onChange={(event) => {
                    setBedRoom(event.target.value);
                  }}
                >
                  <MenuItem
                    value={1}
                    onChange={() => {
                      setBedRoom(value);
                    }}
                  >
                    One Room
                  </MenuItem>
                  <MenuItem
                    value={2}
                    onChange={() => {
                      setBedRoom(value);
                    }}
                  >
                    Two Room
                  </MenuItem>
                  <MenuItem
                    value={3}
                    onChange={() => {
                      setBedRoom(value);
                    }}
                  >
                    Three Room
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 140 }}>
                <InputLabel id="demo-simple-select-label">Rest Room</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={restRoom}
                  label="Rest Room"
                  onChange={(event) => {
                    setRestRoom(event.target.value);
                  }}
                >
                  <MenuItem
                    value={1}
                    onChange={() => {
                      setRestRoom(value);
                    }}
                  >
                    One Room
                  </MenuItem>
                  <MenuItem
                    value={2}
                    onChange={() => {
                      setRestRoom(value);
                    }}
                  >
                    Two Room
                  </MenuItem>
                  <MenuItem
                    value={3}
                    onChange={() => {
                      setRestRoom(value);
                    }}
                  >
                    Three Room
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex justify-end items-center mb-6 bg-gray-100 h-16">
            Estimated Price:
            <span className="font-bold"> {calculatePrice()} VND</span>
          </div>
          <div>
            <Link to="/customMaterial">
              <button onClick={() => {
                handleChange();
              }} className="bg-blue-400 w-full h-12 rounded-xl text-white hover:bg-yellow-500">
                Customize Material
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
