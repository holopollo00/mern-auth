import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentDesign } from "../redux/user/designSlice";
import UseDataFetcher from "../components/DesignPagination/UseDataFetcher";
import PaginationButton from "../components/DesignPagination/PaginationButton";
export default function Designs() {
  const { loading, data } = UseDataFetcher();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const dispatch = useDispatch();

  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div className="">
      <div className="flex justify-center my-11 text-5xl font-semibold">
        <h1>Designs</h1>
      </div>
      {loading ? (
        <div className="text-center text-3xl">Loading ...</div>
      ) : (
        <>
          <div className="card-container flex flex-wrap gap-10 justify-center">
            {currentPageData.map((item) => {
              dispatch(setCurrentDesign(item));
              console.log(item);
              return (
                <div
                  className="card w-96 shadow-xl rounded-3xl"
                  key={item.design._id}
                >
                  <div>
                    <img
                      src={
                        item.design.pictures[0] ? item.design.pictures[0] : ""
                      }
                      alt="house"
                      className="rounded-t-3xl w-full h-[250px] object-cover"
                    />
                  </div>
                  <div className="text-2xl font-semibold ml-5 mt-5">
                    {item.design.name}
                  </div>
                  <div className="flex justify-evenly mt-3 pb-5">
                    <div className="flex flex-col justify-center gap-1">
                      <FontAwesomeIcon icon={faBed} />
                      <p>Bedrooms: {item.design.room.bedRoom}</p>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <FontAwesomeIcon icon={faHouse} />
                      <p>Floors: {item.design.floor}</p>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <FontAwesomeIcon icon={faMaximize} />
                      <p>Size: {item.size.long * item.size.wide} m2</p>
                    </div>
                  </div>
                  <div className="flex justify-around pb-5">
                    <Link to={`/designDetail/${item.design._id}`}>
                      <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                        See details
                      </button>
                    </Link>
                    <Link to="/customDesign">
                      <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                        Customize
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <PaginationButton
            totalPages={Math.ceil(data.length / itemsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}

      <div className="card-container flex flex-wrap gap-10 justify-center"></div>
    </div>
  );
}
