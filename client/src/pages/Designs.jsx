import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentDesign } from "../redux/user/designSlice";
import UseDataFetcher from "../components/DesignPagination/UseDataFetcher";
import PaginationButton from "../components/DesignPagination/PaginationButton";
import { useSelector } from "react-redux";
export default function Designs() {
  const { currentUser } = useSelector((state) => state.user);

  const { loading, data } = UseDataFetcher();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);

  const handleCustom = async (id) => {
    console.log("Clickked Customize button");
    try {
      const res = await fetch(`/api/design/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      dispatch(setCurrentDesign(data));
      navigate("/customDesign");
    } catch (error) {
      console.log("Failed to fetch design to custom!");
    }
  };

  return (
    <div className="">
      <div className="flex justify-center my-11 text-5xl font-semibold">
        <h1>{(currentUser?.roleID != "Admin") ? "Designs" : "Design Management"}</h1>
      </div>
      {loading ? (
        <div className="text-center text-3xl">Loading ...</div>
      ) : (
        <>
          {
            (currentUser?.roleID == "Admin") ?
              (
                <div className="btn-add-design">
                  <button
                    onClick={() => {navigate("/admin-design-adding")}}
                    className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500"
                  >
                    Thêm mới
                  </button>
                </div>
              )
              : null
          }
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
                    <Link to={`/${(currentUser?.roleID != "Admin") ? "designDetail" : "admin-designDetail"}/${item.design._id}`}>
                      <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                        See details
                      </button>
                    </Link>
                    {
                      (currentUser?.roleID != "Admin") ?
                        (<button
                          onClick={() => handleCustom(item.design._id)}
                          className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500"
                        >
                          Customize
                        </button>)
                        : null
                    }

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
