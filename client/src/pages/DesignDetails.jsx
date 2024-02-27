import React from "react";
import { Carousel } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faHouse,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function DesignDetails() {
  return (
    <div className="mt-8">
      <div className="text-4xl font-bold flex justify-center">
        Design Details
      </div>
      <div className="flex">
        <div className="flex justify-center mt-8">
          <Carousel className="rounded-xl w-3/4 h-[450px]">
            <img
              src="https://www.pinoyeplans.com/wp-content/uploads/2017/12/15.jpg"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <img
              src="https://i.pinimg.com/564x/71/ca/9e/71ca9ed91a1b3f22c1ad77aa9a10cbc6.jpg"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              src="https://ulrichome.com/wp-content/uploads/2018/12/01-8-678x348.jpg"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
        <div className="flex gap-52 justify-center mt-14">
          <div>
            <p className="text-xl font-bold">Information</p>
            <div className="mt-3 pb-5">
              <div className="flex gap-2 mb-1">
                <FontAwesomeIcon icon={faBed} />
                <p>Bedrooms: </p>
              </div>
              <div className="flex gap-4 mb-1">
                <FontAwesomeIcon icon={faSquarePlus} />
                <p>Area: </p>
              </div>
              <div className="flex gap-3 mb-1">
                <FontAwesomeIcon icon={faHouse} />
                <p>Floors: </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl font-bold">Design Idea</p>
            <p className="w-96">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Link to="/customDesign">
          <button className="bg-blue-400 w-60 h-16 rounded-xl text-white hover:bg-yellow-500">
            Customize
          </button>
        </Link>
      </div>
    </div>
  );
}
