import React, { useEffect, useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faHouse,
  faMaximize,
  faToilet,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { setCurrentDesign, setError } from "../../redux/user/designSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AdminDesignDetail.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function AdminDesignAddings() {
  const currentPart = useSelector((state) => state.part.currentPart);
  const { currentUser } = useSelector((state) => state.user);

  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [name, setName] = useState("");
  const [bedRoom, setBedRoom] = useState(0);
  const [restRoom, setRestRoom] = useState(0);
  const [floor, setFloor] = useState(0);
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [pictures, setPictures] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [addLink, setAddlink] = useState("");
  const [imageMsg, setImageMsg] = useState("");
  const [addMsg, setAddMsg] = useState("");

  const [paintWall, setPaintWall] = useState(0);
  const [roof, setRoof] = useState(0);
  const [door, setDoor] = useState(0);
  const [window, setWindow] = useState(0);
  const [wallTitle, setWallTitle] = useState(0);
  const [floorTitle, setFloorTitle] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSize();
    setImageMsg("");
  }, [isAdding, addMsg]);

  const validate = () => {
    if (name == "") {
      setAddMsg("Please fill the design name");
      return false;
    }

    if (
      paintWall == 0 ||
      roof == 0 ||
      door == 0 ||
      window == 0 ||
      wallTitle == 0 ||
      floorTitle == 0
    ) {
      setAddMsg("Quantity of material can not equal 0");
      return false;
    }

    if (floor < 1 || floor > 3) {
      setAddMsg("Floor should be between 1 and 3");
      return false;
    }

    if (restRoom == 0 || bedRoom == 0) {
      setAddMsg("Quantity of bedroom and restroom can not equal 0");
      return false;
    }

    if (pictures.length == 0) {
      setAddMsg("Please add more image");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    const data = {};
    data.name = name;
    data.description = description;
    data.pictures = pictures;
    data.room = {
      bedRoom: bedRoom,
      restRoom: restRoom,
    };
    data.sizeId = selectedSize._id;
    data.floor = floor;
    data.paintWallQuantity = paintWall;
    data.roofQuantity = roof;
    data.doorQuantity = door;
    data.windowQuantity = window;
    data.wallTitleQuantity = wallTitle;
    data.floorTitleQuantity = floorTitle;

    if (validate()) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/design`,
          data,
          {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
          }
        );
        console.log("Design save updated successfully:", response.data);
        navigate("/designs");
      } catch (error) {
        if (error.response) {
          console.error("Error updating design save:", error.response.data);
        } else {
          console.error("Error:", error);
        }
      }
    }
  };

  const fetchSize = async () => {
    try {
      const res = await fetch(`/api/size`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setSizes(data);
      setSelectedSize(data[0]);
    } catch (error) {
      setError(error);
    }
  };

  const handleTextareaChange = (event) => {
    const { value, selectionStart, selectionEnd } = event.target;
    const { keyCode } = event;

    // If Enter key is pressed
    if (keyCode === 13) {
      const newValue = `${value.substring(
        0,
        selectionStart
      )}\n\n\n${value.substring(selectionEnd)}`;
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
  };

  const handleAddImage = () => {
    const newArray = [...pictures, addLink]; // Make a copy of the original array
    console.log(newArray);
    setPictures(newArray);
    setAddlink("");
    setIsAdding(false);
  };

  return (
    <div className="mt-8" id="AdminDesignDetail">
      <div className="text-4xl font-bold flex justify-center">
        Design Details -{" "}
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex">
        <div className="flex justify-center mt-8 ml-28">
          <div className="rounded-xl w-[650px] h-[450px]">
            <div className="btn-add-image">
              <Button
                variant="contained"
                style={{ marginBottom: "15px" }}
                onClick={() => {
                  setIsAdding(true);
                }}
              >
                Thêm ảnh
              </Button>
              <p className="image-message">{imageMsg}</p>
            </div>
            {isAdding ? (
              <div className="item item-cover">
                <div className="image">
                  <img src={addLink} alt="" />
                </div>
                <div className="image-link">
                  <TextField
                    id="outlined-basic"
                    label="Link"
                    variant="outlined"
                    value={addLink}
                    onChange={(e) => {
                      setAddlink(e.target.value);
                    }}
                  />
                </div>
                <div className="handle">
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleAddImage();
                    }}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "red", marginLeft: "5px" }}
                    onClick={() => {
                      setIsAdding(false);
                    }}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            ) : null}
            {pictures.map((item, index) => {
              if (item == imageLink) {
                return (
                  <div className="item item-cover" key={index}>
                    <div className="image">
                      <img src={imageValue} alt="" />
                    </div>
                    <div className="image-link">
                      <TextField
                        id="outlined-basic"
                        label="Link"
                        variant="outlined"
                        value={imageValue}
                        onChange={(e) => {
                          setImageValue(e.target.value);
                        }}
                      />
                    </div>
                    <div className="handle">
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleSaveImage(index);
                        }}
                      >
                        Lưu
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "red", marginLeft: "5px" }}
                        onClick={() => {
                          setImageLink("");
                        }}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="item item-cover" key={index}>
                    <div className="image">
                      <img src={item} alt="" />
                    </div>
                    <div className="image-link">
                      <TextField
                        id="outlined-basic"
                        label="Link"
                        variant="outlined"
                        value={item}
                      />
                    </div>
                    <div className="handle">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setImageLink(item);
                          setImageValue(item);
                        }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "red", marginLeft: "5px" }}
                        onClick={() => {
                          pictures.length == 1
                            ? setImageMsg("Quantity of image can not equal 0")
                            : setPictures((prevArray) =>
                                prevArray.filter((string) => string !== item)
                              );
                        }}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="flex gap-10 flex-wrap mt-14 ml-16">
          <div className="w-[250px] h-36">
            <p className="text-xl font-bold">Material Quantity</p>
            <div className="mt-3 pb-5">
              <div
                className="flex gap-2 mb-1"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Pain Wall:</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ maxWidth: "50px" }}
                  value={paintWall}
                  onChange={(e) => setPaintWall(e.target.value)}
                />
              </div>
              <div
                className="flex gap-2 mb-1"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Roof:</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ maxWidth: "50px" }}
                  value={roof}
                  onChange={(e) => setRoof(e.target.value)}
                />
              </div>
              <div
                className="flex gap-3 mb-1"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Door:</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ maxWidth: "50px" }}
                  value={door}
                  onChange={(e) => setDoor(e.target.value)}
                />
              </div>
              <div
                className="flex gap-3 mb-1"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Window:</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ maxWidth: "50px" }}
                  value={window}
                  onChange={(e) => setWindow(e.target.value)}
                />
              </div>
              <div
                className="flex gap-3 mb-1"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Wall Title:</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ maxWidth: "50px" }}
                  value={wallTitle}
                  onChange={(e) => setWallTitle(e.target.value)}
                />
              </div>
              <div
                className="flex gap-3 mb-1"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>Floor Title:</div>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ maxWidth: "50px" }}
                  value={floorTitle}
                  onChange={(e) => setFloorTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div style={{ height: "400px" }}>
            <p className="text-xl font-bold">Size</p>
            <div
              className="flex gap-3 mb-1"
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "300px",
              }}
            ></div>
            <div
              className="flex gap-3 mb-1"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <FontAwesomeIcon icon={faMaximize} />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedSize}
                  label="Size"
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                  }}
                >
                  {sizes &&
                    sizes.map((item, index) => {
                      if (item._id == selectedSize?._id) {
                        return (
                          <MenuItem key={index} value={selectedSize}>
                            {selectedSize.long * selectedSize.wide} m2 - R
                            {selectedSize.wide} X R{selectedSize.long}
                          </MenuItem>
                        );
                      } else {
                        return (
                          <MenuItem key={index} value={item}>
                            {item.long * item.wide} m2 - R{item.wide} X R
                            {item.long}
                          </MenuItem>
                        );
                      }
                    })}
                </Select>
              </FormControl>
            </div>
            <div
              className="flex gap-2 mb-1"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <FontAwesomeIcon icon={faBed} />
              <div>Bedrooms:</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ maxWidth: "50px" }}
                value={bedRoom}
                onChange={(e) => setBedRoom(e.target.value)}
              />
            </div>
            <div
              className="flex gap-2 mb-1"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <FontAwesomeIcon icon={faToilet} />
              <div>Restrooms:</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ maxWidth: "50px" }}
                value={restRoom}
                onChange={(e) => setRestRoom(e.target.value)}
              />
            </div>
            <div
              className="flex gap-3 mb-1"
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <FontAwesomeIcon icon={faHouse} />
              <div>Floors:</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ maxWidth: "50px" }}
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </div>
          </div>
          <div className="w-[600px]">
            <p className="text-xl font-bold">Description</p>
            <Textarea
              style={{ width: "600px", minHeight: "300px" }}
              value={description}
              onChange={handleTextareaChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10" style={{ color: "red" }}>
        {addMsg}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            handleUpdate();
          }}
          className="bg-blue-400 w-60 h-16 rounded-xl text-white hover:bg-yellow-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}
