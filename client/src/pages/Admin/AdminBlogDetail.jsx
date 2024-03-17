import React, { useEffect, useState } from "react";
import { Carousel, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import "./AdminDesignDetail.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function AdminBlogDetails() {
    const { id } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [blogDetail, setBlogDetail] = useState(null);
    const [description, setDescription] = useState(null);
    const [imageLink, setImageLink] = useState("");
    const [imageValue, setImageValue] = useState("");
    const [pictures, setPictures] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [addLink, setAddlink] = useState("");
    const [imageMsg, setImageMsg] = useState("");
    const [addMsg, setAddMsg] = useState("");
    const [name, setName] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchDetail() {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await res.json();
                setPictures(data?.pictures);
                setName(data?.name);
                setDescription(data?.description);
                setBlogDetail(data);
                dispatch(setCurrentDesign(data));
            } catch (error) {
            }
        }
        fetchDetail();
    }, [addMsg]);

    const validate = () => {
        if (name == "") {
            setAddMsg("Please fill the design name");
            return false;
        }

        if (pictures.length == 0) {
            setAddMsg("Please add more image");
            return false;
        }

        if (description.length == 0) {
            setAddMsg("Please add more description");
            return false;
        }

        return true;
    }

    const handleUpdate = async () => {
        const data = {};
        data.name = name;
        data.description = description;
        data.pictures = pictures;

        if (validate()) {
            try {
                const response = await axios.put(
                    `http://localhost:3000/api/blog/${id}`,
                    data,
                    {
                        headers: { token: `Bearer ${currentUser?.accessToken}` },
                    });
                console.log('Design save updated successfully:', response.data);
                navigate("/newsblogs");
            } catch (error) {
                if (error.response) {
                    console.error('Error updating design save:', error.response.data);
                } else {
                    console.error('Error:', error);
                }
            }
        }
    }

    const handleRemove = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/blog/${id}`,
                {
                    headers: { token: `Bearer ${currentUser?.accessToken}` },
                });
            console.log('Design save updated successfully:', response.data);
            navigate("/newsblogs");
        } catch (error) {
            if (error.response) {
                console.error('Error updating blog save:', error.response.data);
            } else {
                console.error('Error:', error);
            }
        }
    }

    const handleTextareaChange = (event) => {
        const { value, selectionStart, selectionEnd } = event.target;
        const { keyCode } = event;

        // If Enter key is pressed
        if (keyCode === 13) {
            const newValue = `${value.substring(0, selectionStart)}\n\n\n${value.substring(selectionEnd)}`;
            setDescription(newValue);

            // Adjust the cursor position
            event.target.selectionStart = selectionEnd + 2;
            event.target.selectionEnd = selectionEnd + 2;
        } else {
            setDescription(value);
        }
    };


    const handleSaveImage = (index) => {
        const newArray = [...pictures]; // Make a copy of the original array
        newArray[index] = imageValue; // Replace the string at the specified index
        setPictures(newArray);
        setImageLink("");
        setImageValue("");
    }

    const handleAddImage = () => {
        const newArray = [...pictures, addLink]; // Make a copy of the original array
        console.log(newArray);
        setPictures(newArray);
        setAddlink("");
        setIsAdding(false);
    }

    return (
        <div className="mt-8" id="AdminDesignDetail">
            <div className="text-4xl font-bold flex justify-center">
                <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            {blogDetail ? (
                <div className="flex">
                    <div className="flex justify-center mt-8 ml-28">
                        <div className="rounded-xl w-[650px] h-[450px]">
                            <div className="btn-add-image">
                                <Button variant="contained" style={{ marginBottom: "15px" }} onClick={() => { setIsAdding(true) }}>Thêm ảnh</Button>
                                <p className="image-message">{imageMsg}</p>
                            </div>
                            {
                                (isAdding)
                                    ?
                                    (
                                        <div className="item item-cover">
                                            <div className="image">
                                                <img src={addLink} alt="" />
                                            </div>
                                            <div className="image-link"><TextField id="outlined-basic" label="Link" variant="outlined" value={addLink} onChange={(e) => { setAddlink(e.target.value) }} /></div>
                                            <div className="handle">
                                                <Button variant="contained" onClick={() => { handleAddImage() }}>Lưu</Button>
                                                <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }} onClick={() => { setIsAdding(false); }}>Hủy</Button>
                                            </div>
                                        </div>
                                    )
                                    : null
                            }
                            {
                                pictures.map((item, index) => {
                                    if (item == imageLink) {
                                        return (
                                            <div className="item item-cover" key={index}>
                                                <div className="image">
                                                    <img src={imageValue} alt="" />
                                                </div>
                                                <div className="image-link"><TextField id="outlined-basic" label="Link" variant="outlined" value={imageValue} onChange={(e) => { setImageValue(e.target.value) }} /></div>
                                                <div className="handle">
                                                    <Button variant="contained" onClick={() => { handleSaveImage(index) }}>Lưu</Button>
                                                    <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }} onClick={() => { setImageLink(""); }}>Hủy</Button>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="item item-cover" key={index}>
                                                <div className="image">
                                                    <img src={item} alt="" />
                                                </div>
                                                <div className="image-link"><TextField id="outlined-basic" label="Link" variant="outlined" value={item} /></div>
                                                <div className="handle">
                                                    <Button variant="contained" onClick={() => { setImageLink(item); setImageValue(item) }}>Sửa</Button>
                                                    <Button variant="contained" style={{ backgroundColor: "red", marginLeft: "5px" }} onClick={() => { (pictures.length == 1) ? setImageMsg("Quantity of image can not equal 0") : setPictures(prevArray => prevArray.filter(string => string !== item)); }}>Xóa</Button>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="flex gap-10 flex-wrap mt-14 ml-16">
                        <div className="w-[600px]">
                            <p className="text-xl font-bold">Description</p>
                            <Textarea style={{ width: "600px", minHeight: "300px" }} value={description} onChange={handleTextareaChange} />
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <div className="flex justify-center mt-10" style={{ color: "red" }}>{addMsg}</div>
            <div className="flex justify-center mt-10">
                <button onClick={() => { handleUpdate() }} className="bg-blue-400 w-60 h-16 rounded-xl text-white hover:bg-yellow-500">
                    Save
                </button>
                <button onClick={() => { handleRemove() }} style={{ backgroundColor: "red", marginLeft: "25px" }} className="bg-blue-400 w-60 h-16 rounded-xl text-white hover:bg-yellow-500">
                    Delete
                </button>
            </div>
        </div>
    );
}
