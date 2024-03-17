import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function BlogDetails() {
    const { id } = useParams();
    const [blogDetail, setBlogDetail] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchDetail() {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setBlogDetail(data);
                dispatch(setCurrentDesign(data));
            } catch (error) {
                setError(error);
            }
        }
        fetchDetail();
    }, []);

    return (
        <div className="mt-8">
            <div className="text-4xl font-bold flex justify-center">
                {blogDetail && blogDetail.name}
            </div>
            {blogDetail ? (
                <div className="flex">
                    <div className="flex justify-center mt-8 ml-28">
                        <Carousel className="rounded-xl w-[650px] h-[450px]">
                            {
                                blogDetail && blogDetail?.pictures.map((item, index) => {
                                    return (
                                        <img
                                            src={
                                                item
                                                    ? item
                                                    : ""
                                            }
                                            alt="image 1"
                                            className="h-full w-full object-cover"
                                        />
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="flex gap-10 flex-wrap mt-14 ml-16">
                        <div className="w-[300px]">
                            <p className="text-xl font-bold">Description</p>
                            <p className="mt-3 w-[550px] text-justify">
                                {blogDetail.description}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
