import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Designs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/design");

        if (!res.ok) {
          throw new Error("Network response was not Ok!");
        }
        const jsonData = await res.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="">
      <div className="flex justify-center my-11 text-5xl font-semibold">
        <h1>Designs</h1>
      </div>
      <div className="card-container flex flex-wrap gap-10 justify-center">
        {data &&
          data.map((design) => {
            return (
              <div className="card w-96 shadow-xl rounded-3xl" key={design._id}>
                <div>
                  <img
                    src={design.pictures[0]}
                    alt="house"
                    className="rounded-t-3xl"
                  />
                </div>
                <div className="text-2xl font-semibold ml-5 mt-5">
                  {design.name}
                </div>
                <div className="flex justify-evenly mt-3 pb-5">
                  <div className="flex flex-col justify-center gap-1">
                    <FontAwesomeIcon icon={faBed} />
                    <p>Bedrooms: {design.room}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <FontAwesomeIcon icon={faHouse} />
                    <p>Floors: {design.floor}</p>
                  </div>
                </div>
                <div className="flex justify-around pb-5">
                  <Link to={`/designDetail/${design._id}`}>
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
    </div>
  );
}
