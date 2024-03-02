import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
export default function DesignDetails() {
  const { id } = useParams();
  const [designDetail, setDesignDetail] = useState(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/design/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setDesignDetail(data);
      } catch (error) {
        console.log("Error fetching design detail!");
      }
    }

    fetchDetail();

    // Call the size fetching function conditionally after designDetail is set
    if (designDetail && designDetail.sizes && designDetail.sizes.length > 0) {
      const firstSizeId = designDetail.sizes[0];
      // eslint-disable-next-line no-inner-declarations
      async function fetchSize() {
        // ... your size fetching logic here using firstSizeId
        try {
          const res = await fetch(`/api/size/${firstSizeId}`);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await res.json();
          setSize(data);
        } catch (error) {
          console.log("Error fetching size!");
        }
      }
      fetchSize();
    }
  }, [designDetail, id]);

  return (
    <div className="mt-8">
      <div className="text-4xl font-bold flex justify-center">
        Design Details
      </div>
      {designDetail ? (
        <div className="flex">
          <div className="flex justify-center mt-8 ml-28">
            <Carousel className="rounded-xl w-[750px] h-[450px]">
              <img
                src={designDetail.pictures[0]}
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
          <div className="flex gap-10 flex-wrap mt-14 ml-16">
            <div className="w-[150px]">
              <p className="text-xl font-bold">Information</p>
              <div className="mt-3 pb-5">
                <div className="flex gap-2 mb-1">
                  <FontAwesomeIcon icon={faBed} />
                  <p>Bedrooms: {designDetail.room} </p>
                </div>
                <div className="flex gap-3 mb-1">
                  <FontAwesomeIcon icon={faHouse} />
                  <p>Floors: {designDetail.floor}</p>
                </div>
              </div>
            </div>
            <div className="w-[300px]">
              <p className="text-xl font-bold">Description</p>
              <p className="mt-3">{designDetail.description}</p>
            </div>
            {size && (
              <div>
                <p className="text-xl font-bold">Price</p>
                <p className="mt-3">
                  {size.long * size.wide * (size.rawPart + size.finishingPart)}{" "}
                  VND
                </p>
              </div>
            )}
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
