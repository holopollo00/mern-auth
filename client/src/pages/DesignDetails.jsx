import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { setCurrentDesign, setError } from "../redux/user/designSlice";
import { useDispatch, useSelector } from "react-redux";
export default function DesignDetails() {
  const { id } = useParams();
  const [designDetail, setDesignDetail] = useState(null);
  const currentDesign = useSelector((state) => state.design.currentDesign);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/design/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setDesignDetail(data);
        dispatch(setCurrentDesign(data));
      } catch (error) {
        setError(error);
      }
    }
    fetchDetail();
  }, []);
  console.log(designDetail);

  return (
    <div className="mt-8">
      <div className="text-4xl font-bold flex justify-center">
        Design Details - {designDetail && designDetail.design.name}
      </div>
      {designDetail ? (
        <div className="flex">
          <div className="flex justify-center mt-8 ml-28">
            <Carousel className="rounded-xl w-[750px] h-[450px]">
              <img
                src={
                  designDetail.design.pictures[0]
                    ? designDetail.design.pictures[0]
                    : ""
                }
                alt="image 1"
                className="h-full w-full object-cover"
              />
              <img
                src={designDetail.design.pictures[1]}
                alt="image 2"
                className="h-full w-full object-cover"
              />
              <img
                src={designDetail.design.pictures[2]}
                alt="image 3"
                className="h-full w-full object-cover"
              />
              <img
                src={designDetail.design.pictures[3]}
                alt="image 3"
                className="h-full w-full object-cover"
              />
            </Carousel>
          </div>
          <div className="flex gap-10 flex-wrap mt-14 ml-16">
            <div className="w-[250px] h-36">
              <p className="text-xl font-bold">Information</p>
              <div className="mt-3 pb-5">
                <div className="flex gap-2 mb-1">
                  <FontAwesomeIcon icon={faBed} />
                  <p>Bedrooms: {designDetail.design.room.bedRoom} </p>
                </div>
                <div className="flex gap-3 mb-1">
                  <FontAwesomeIcon icon={faHouse} />
                  <p>Floors: {designDetail.design.floor}</p>
                </div>
                <div className="flex gap-3 mb-1">
                  <FontAwesomeIcon icon={faMaximize} />
                  <p>
                    Size: {designDetail.size.long * designDetail.size.wide} m2
                  </p>
                </div>
              </div>
            </div>
            {designDetail.size && (
              <div>
                <p className="text-xl font-bold">Price</p>
                <p className="mt-3">
                  {designDetail.size.long *
                    designDetail.size.wide *
                    (designDetail.size.rawPart +
                      designDetail.size.finishingPart)}{" "}
                  VND
                </p>
              </div>
            )}
            <div className="w-[300px]">
              <p className="text-xl font-bold">Description</p>
              <p className="mt-3 w-[550px] text-justify">
                {designDetail.design.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
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
