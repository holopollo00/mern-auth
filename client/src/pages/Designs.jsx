import React from "react";
import { mockData } from "../../mockdata.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faSquarePlus,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
export default function Designs() {
  return (
    <div className="">
      <div className="flex justify-center my-11 text-5xl font-semibold">
        <h1>Designs</h1>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-evenly items-center mb-10 bg-slate-200 h-16 w-80">
          <button className="focus:bg-yellow-400 h-12 w-32 focus:text-white">
            Customizable
          </button>
          <button className="focus:bg-yellow-400 h-12 w-32 focus:text-white">
            Fixed Designs
          </button>
        </div>
      </div>
      <div className="card-container flex flex-wrap gap-10 justify-center">
        {mockData.map((house, id) => {
          return (
            <div className="card w-96 shadow-xl rounded-3xl" key={id}>
              <div>
                <img src={house.img} alt="house" className="rounded-t-3xl" />
              </div>
              <div className="text-2xl font-semibold ml-5 mt-5">
                {house.title}
              </div>
              <div className="flex justify-evenly mt-3 pb-5">
                <div className="flex flex-col justify-center gap-1">
                  <FontAwesomeIcon icon={faBed} />
                  <p>Bedrooms: {house.room}</p>
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <FontAwesomeIcon icon={faSquarePlus} />
                  <p>Area: {house.area}</p>
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <FontAwesomeIcon icon={faHouse} />
                  <p>Floors: {house.floors}</p>
                </div>
              </div>
              <div className="flex justify-around pb-5">
                <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                  See details
                </button>
                <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                  Customize
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
