import "./Blueprint.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBlueprint } from "../../redux/user/blueprintSlice";
import PaginationButton from "../../components/DesignPagination/PaginationButton";

const Blueprint = () => {
  const [data, setData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/design-save/user/${currentUser?._id}`, {
          headers: { token: `Bearer ${currentUser?.accessToken}` },
        });
        console.log(res);
        if (!res.status == 200) {
          throw new Error("Network response was not Ok!");
        }
        const data = await res.data;
        setCurrentPageData(data.slice(startIndex, endIndex));
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      return {
        loading,
        data,
      };
    }

    fetchData();
  }, []);
  
  const handleCustom = async (id) => {
    try {
      const res = await fetch(`/api/design-save/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      dispatch(setCurrentBlueprint(data));
      navigate("/customizes");
    } catch (error) {
      console.log("Failed to fetch design to custom!");
    }
  };
  return (
    <div id="Blueprint">
      <h1>Blueprint</h1>
      <div className="container">
        <div className="">
          {loading ? (
            <div className="text-center text-3xl">Loading ...</div>
          ) : (
            <>
              <div className="card-container flex flex-wrap gap-10 justify-center">
                {currentPageData?.map((item) => {
                  dispatch(setCurrentBlueprint(item));
                  return (
                    <div
                      className="card w-96 shadow-xl rounded-3xl"
                      key={item._id}
                    >
                     
                      <div className="text-2xl font-semibold ml-5 mt-5">
                        
                      </div>
                      <div className="flex justify-evenly mt-3 pb-5">
                        <div className="flex flex-col justify-center gap-1">
                          <FontAwesomeIcon icon={faBed} />
                          <p>Bedrooms: {item.room.bedRoom}</p>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <FontAwesomeIcon icon={faHouse} />
                          <p>Floors: {item.floor}</p>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <FontAwesomeIcon icon={faMaximize} />
                          <p>Size: {item.long * item.wide} m2</p>
                        </div>
                      </div>
                      <div className="flex justify-around pb-5">
                        <Link to={`/designDetail/${item._id}`}>
                          <button className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500">
                            See details
                          </button>
                        </Link>

                        <button
                          onClick={() => handleCustom(item._id)}
                          className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500"
                        >
                          Customize
                        </button>
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
      </div>
    </div>
  )
}

export default Blueprint