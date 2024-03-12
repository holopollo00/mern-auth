import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import "../Customize/Customize.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Customizes() {
  const [bedRoom, setBedRoom] = useState(1);
  const [restRoom, setRestRoom] = useState(1);
  const [materials, setMaterials] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [paintWall, setPaintWall] = useState(null);
  const [roof, setRoof] = useState(null);
  const [door, setDoor] = useState(null);
  const [window, setWindow] = useState(null);
  const [wallTitle, setWallTitle] = useState(null);
  const [floorTitle, setFloorTitle] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchMaterials = async () => {
    try {
      const res = await fetch("/api/material");

      if (!res.ok) {
        throw new Error("Network response was not Ok!");
      }
      const jsonData = await res.json();
      setMaterials(jsonData);
    } catch (error) {
      setError(error);
    }
  };

  const fetchSizes = async () => {
    try {
      const res = await fetch("/api/size");

      if (!res.ok) {
        throw new Error("Network response was not Ok!");
      }
      const jsonData = await res.json();
      setSizes(jsonData);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchSizes();
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (!paintWall && materials) {
      const paintWall = materials.find((item) => item.item === "PaintWall");
      if (paintWall) {
        setPaintWall(paintWall);
      }
    }
    if (!roof && materials) {
      const roof = materials.find((item) => item.item === "Roof");
      if (roof) {
        setRoof(roof);
      }
    }
    if (!door && materials) {
      const door = materials.find((item) => item.item === "Door");
      if (door) {
        setDoor(door);
      }
    }
    if (!window && materials) {
      const window = materials.find((item) => item.item === "Window");
      if (window) {
        setWindow(window);
      }
    }
    if (!wallTitle && materials) {
      const wallTitle = materials.find((item) => item.item === "WallTitle");
      if (wallTitle) {
        setWallTitle(wallTitle);
      }
    }
    if (!floorTitle && materials) {
      const floorTitle = materials.find((item) => item.item === "FloorTitle");
      if (floorTitle) {
        setFloorTitle(floorTitle);
      }
    }
  }, [materials, sizes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmit = () => {
    const data = {
      size: selectedSize._id,
      floor: selectedFloor,
      room: {
        bedRoom: bedRoom,
        restRoom: restRoom,
      },
      materials: {
        paintWall: paintWall,
        roof: roof,
        door: door,
        window: window,
        wallTitle: wallTitle,
        floorTitle: floorTitle,
      },
    };
    console.log(data);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <div className="" id="Customize">
      <div className="flex justify-center my-11 text-5xl font-semibold">
        <h1>Customizes</h1>
      </div>
      <div className="container">
        <div className="">
          <h3 className="header">Structure</h3>
          <div className="item">
            <div>
              <h5>Size</h5>
              {sizes &&
                sizes?.map((size, index) => {
                  const isChecked = size?._id == selectedSize?._id;
                  return (
                    <div
                      className="form-check form-check-inline radio"
                      key={index}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id={size?._id} // Unique IDs for radios
                        value={isChecked} // Use size ID as value
                        onChange={() => setSelectedSize(size)}
                      />
                      <label className="form-check-label" htmlFor={size?._id}>
                        Square: W{size?.wide} x L{size?.long}
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="item">
            <h5>Floor</h5>
            <div className="form-check form-check-inline radio">
              <input
                className="form-check-input"
                type="radio"
                name="floorRadioOptions"
                id="floorRadio1"
                onChange={(event) => {
                  setSelectedFloor(event.target.value);
                }}
                value="option1"
                defaultChecked
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio1">
                One Floor
              </label>
            </div>
            <div className="form-check form-check-inline radio">
              <input
                className="form-check-input"
                type="radio"
                name="floorRadioOptions"
                id="floorRadio2"
                onChange={(event) => {
                  setSelectedFloor(event.target.value);
                }}
                value="option2"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio2">
                Two Floor
              </label>
            </div>
            <div className="form-check form-check-inline radio">
              <input
                className="form-check-input"
                type="radio"
                name="floorRadioOptions"
                id="floorRadio3"
                onChange={(event) => {
                  setSelectedFloor(event.target.value);
                }}
                value="option3"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio3">
                Three Floor
              </label>
            </div>
            <div className="form-check form-check-inline radio">
              <input
                className="form-check-input"
                type="radio"
                name="floorRadioOptions"
                id="floorRadio3"
                onChange={(event) => {
                  setSelectedFloor(event.target.value);
                }}
                value="option3"
              ></input>
              <label className="form-check-label" htmlFor="inlineRadio3">
                Four Floor
              </label>
            </div>
          </div>
          <div className="item">
            <h5>Room</h5>
            <FormControl sx={{ m: 1, minWidth: 140, marginRight: 12 }}>
              <InputLabel id="demo-simple-select-label">Bed Room</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bedRoom}
                label="Bed Room"
                onChange={(event) => {
                  setBedRoom(event.target.value);
                }}
              >
                <MenuItem
                  value={1}
                  onChange={() => {
                    setBedRoom(value);
                  }}
                >
                  One Room
                </MenuItem>
                <MenuItem
                  value={2}
                  onChange={() => {
                    setBedRoom(value);
                  }}
                >
                  Two Room
                </MenuItem>
                <MenuItem
                  value={3}
                  onChange={() => {
                    setBedRoom(value);
                  }}
                >
                  Three Room
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 140 }}>
              <InputLabel id="demo-simple-select-label">Rest Room</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={restRoom}
                label="Rest Room"
                onChange={(event) => {
                  setRestRoom(event.target.value);
                }}
              >
                <MenuItem
                  value={1}
                  onChange={() => {
                    setRestRoom(value);
                  }}
                >
                  One Room
                </MenuItem>
                <MenuItem
                  value={2}
                  onChange={() => {
                    setRestRoom(value);
                  }}
                >
                  Two Room
                </MenuItem>
                <MenuItem
                  value={3}
                  onChange={() => {
                    setRestRoom(value);
                  }}
                >
                  Three Room
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <h3 className="header">Material</h3>
          <div className="item">
            <h5>Paint Wall</h5>
            <div className="material">
              {materials &&
                materials
                  .filter((item) => item.item === "PaintWall")
                  ?.map((item, key) => {
                    return (
                      <div
                        className={
                          paintWall && paintWall._id === item._id
                            ? "material-item checked"
                            : "material-item"
                        }
                        key={key}
                        onClick={() => setPaintWall(item)}
                      >
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="item">
            <h5>Roof</h5>
            <div className="material">
              {materials &&
                materials
                  .filter((item) => item.item === "Roof")
                  ?.map((item, key) => {
                    return (
                      <div
                        className={
                          roof && roof._id === item._id
                            ? "material-item checked"
                            : "material-item"
                        }
                        key={key}
                        onClick={() => setRoof(item)}
                      >
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="item">
            <h5>Door</h5>
            <div className="material">
              {materials &&
                materials
                  .filter((item) => item.item === "Door")
                  ?.map((item, key) => {
                    return (
                      <div
                        className={
                          door && door._id === item._id
                            ? "material-item checked"
                            : "material-item"
                        }
                        key={key}
                        onClick={() => setDoor(item)}
                      >
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="item">
            <h5>Window</h5>
            <div className="material">
              {materials &&
                materials
                  .filter((item) => item.item === "Window")
                  ?.map((item, key) => {
                    return (
                      <div
                        className={
                          window && window._id === item._id
                            ? "material-item checked"
                            : "material-item"
                        }
                        key={key}
                        onClick={() => setWindow(item)}
                      >
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="item">
            <h5>WallTitle</h5>
            <div className="material">
              {materials &&
                materials
                  .filter((item) => item.item === "WallTitle")
                  ?.map((item, key) => {
                    return (
                      <div
                        className={
                          wallTitle && wallTitle._id === item._id
                            ? "material-item checked"
                            : "material-item"
                        }
                        key={key}
                        onClick={() => setWallTitle(item)}
                      >
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="item">
            <h5>FloorTitle</h5>
            <div className="material">
              {materials &&
                materials
                  .filter((item) => item.item === "FloorTitle")
                  ?.map((item, key) => {
                    return (
                      <div
                        className={
                          floorTitle && floorTitle._id === item._id
                            ? "material-item checked"
                            : "material-item"
                        }
                        key={key}
                        onClick={() => setFloorTitle(item)}
                      >
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div className="btn-submit">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleOpen();
              }}
            >
              Submit
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Dự đoán phần thô và phần hoàn thiện của căn nhà
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Vật liệu</TableCell>
                          <TableCell align="center">Đơn giá</TableCell>
                          <TableCell align="center">Số lượng</TableCell>
                          <TableCell align="center">Thành tiền</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Phần thô
                          </TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center">
                            {selectedSize?.wide} x {selectedSize?.long}
                          </TableCell>
                          <TableCell align="center">
                            {selectedSize?.wide *
                              selectedSize?.long *
                              selectedSize?.rawPart}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Phần hoàn thiện
                          </TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center">
                            {selectedSize?.wide} x {selectedSize?.long}
                          </TableCell>
                          <TableCell align="center">
                            {selectedSize?.wide *
                              selectedSize?.long *
                              selectedSize?.finishingPart}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Sơn hoàn thiện
                          </TableCell>
                          <TableCell align="center">
                            {paintWall?.price}
                          </TableCell>
                          <TableCell align="center">145</TableCell>
                          <TableCell align="center">
                            {paintWall?.price * 145}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Mái nhà
                          </TableCell>
                          <TableCell align="center">{roof?.price}</TableCell>
                          <TableCell align="center">135</TableCell>
                          <TableCell align="center">
                            {roof?.price * 135}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Cửa đi
                          </TableCell>
                          <TableCell align="center">{door?.price}</TableCell>
                          <TableCell align="center">18</TableCell>
                          <TableCell align="center">
                            {door?.price * 18}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Cửa sổ
                          </TableCell>
                          <TableCell align="center">{window?.price}</TableCell>
                          <TableCell align="center">15</TableCell>
                          <TableCell align="center">
                            {window?.price * 15}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Tường ốp
                          </TableCell>
                          <TableCell align="center">
                            {wallTitle?.price}
                          </TableCell>
                          <TableCell align="center">23</TableCell>
                          <TableCell align="center">
                            {wallTitle?.price * 23}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Gạch bông gió
                          </TableCell>
                          <TableCell align="center">
                            {floorTitle?.price}
                          </TableCell>
                          <TableCell align="center">7</TableCell>
                          <TableCell align="center">
                            {floorTitle?.price * 7}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="total">
                    <p className="total-label">
                      Tổng chi phí xây dựng dự tính:
                    </p>
                    <p className="total-number">868825000 VNĐ</p>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
