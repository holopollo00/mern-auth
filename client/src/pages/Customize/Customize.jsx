import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBlueprint } = useSelector((state) => state.blueprint);
  const { currentUser } = useSelector((state) => state.user);
  const currentPart = useSelector((state) => state.part.currentPart);

  const [blueprintId, setBlueprintId] = useState(currentBlueprint?._id);
  const [bedRoom, setBedRoom] = useState((currentBlueprint) ? (currentBlueprint?.room.bedRoom) : 1);
  const [restRoom, setRestRoom] = useState((currentBlueprint) ? (currentBlueprint?.room.restRoom) : 1);
  const [materials, setMaterials] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState((currentBlueprint) ? (currentBlueprint.floor) : 1);
  const [selectedPart, setSelectedPart] = useState((currentBlueprint) ? 3 : 1);
  const [sizes, setSizes] = useState([]);
  const [paintWall, setPaintWall] = useState(null);
  const [roof, setRoof] = useState(null);
  const [door, setDoor] = useState(null);
  const [window, setWindow] = useState(null);
  const [wallTitle, setWallTitle] = useState(null);
  const [floorTitle, setFloorTitle] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [wide, setWide] = useState((currentBlueprint) ? currentBlueprint.wide : 0);
  const [long, setLong] = useState((currentBlueprint) ? currentBlueprint.long : 0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (validateSubmit()) {
      setOpen(true)
    }
  };
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

  const validateSubmit = () => {
    if (!paintWall || !roof || !door || !window || !wallTitle || !floorTitle) {
      setErrorMsg('Please select all material');
      return false;
    }

    if (wide == 0 || long == 0) {
      setErrorMsg('Please check your design size');
      return false;
    }

    if (parseFloat(wide) > parseFloat(long)) {
      console.log("WIDE:" + wide);
      console.log(long);
      setErrorMsg('Wide can not be higher than long');
      return false;
    }
    setErrorMsg('');
    return true;
  }

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

  const calculatePrice = () => {
    let total = 0;
    if(currentBlueprint) {
      total =
        long *
          wide *
          (((selectedPart == 1 || selectedPart == 3) ? (currentPart.rawPart) : 0) + ((selectedPart == 2 || selectedPart == 3) ? (currentPart.finishingPart) : 0)) +
          ((currentBlueprint) ? ((door?.price * currentBlueprint?.materials.door.quantity) +
             (floorTitle?.price * currentBlueprint?.materials.floorTitle.quantity) +
               (wallTitle?.price * currentBlueprint?.materials.wallTitle.quantity) +
                 (paintWall?.price * currentBlueprint?.materials.paintWall.quantity) +
                   (roof?.price * currentBlueprint?.materials.roof.quantity) +
                     (window?.price * currentBlueprint?.materials.window.quantity)) : 0);
    } else {
      total =
        long *
          wide *
          (currentPart.rawPart + currentPart.finishingPart);
    }
    
    if(selectedFloor != 1) {
      total = total * ((selectedFloor - 1) * 0.7 + 1);
    }
    return total;
  };

  const getBlueprint = async () => {
    if (paintWall == undefined && materials) {
      let PaintWall = null;
      if (currentBlueprint) {
        const res = await axios.get(`http://localhost:3000/api/material/${currentBlueprint?.materials.paintWall.item}`);
        PaintWall = res?.data;
      }
      if (!PaintWall) {
        PaintWall = materials.find((item) => item.item === "PaintWall");
      }
      console.log(PaintWall);
      if (PaintWall) {
        setPaintWall(PaintWall);
      }
    }

    if (!roof && materials) {
      let Roof = null;
      if (currentBlueprint) {
        const res = await axios.get(`http://localhost:3000/api/material/${currentBlueprint?.materials.roof.item}`);
        Roof = res?.data;
      } else {
        if (!Roof) {
          Roof = materials.find((item) => item.item === "Roof");
        }
      }
      if (Roof) {
        setRoof(Roof);
      }
    }

    if (!door && materials) {
      let Door = null;
      if (currentBlueprint) {
        const res = await axios.get(`http://localhost:3000/api/material/${currentBlueprint?.materials.door.item}`);
        Door = res?.data;
      } else {
        if (!Door) {
          Door = materials.find((item) => item.item === "Door");
        }
      }
      if (Door) {
        setDoor(Door);
      }
    }
    if (!window && materials) {
      let Window = null;
      if (currentBlueprint) {
        const res = await axios.get(`http://localhost:3000/api/material/${currentBlueprint?.materials.window.item}`);
        Window = res?.data;
      } else {
        if (!Window) {
          Window = materials.find((item) => item.item === "Window");
        }
      }
      if (Window) {
        setWindow(Window);
      }
    }
    if (!wallTitle && materials) {
      let WallTitle = null;
      if (currentBlueprint) {
        const res = await axios.get(`http://localhost:3000/api/material/${currentBlueprint?.materials.wallTitle.item}`);
        WallTitle = res?.data;
      } else {
        if (!WallTitle) {
          WallTitle = materials.find((item) => item.item === "WallTitle");
        }
      }
      if (WallTitle) {
        setWallTitle(WallTitle);
      }
    }
    if (!floorTitle && materials) {
      let FloorTitle = null;
      if (currentBlueprint) {
        const res = await axios.get(`http://localhost:3000/api/material/${currentBlueprint?.materials.floorTitle.item}`);
        FloorTitle = res?.data;
      } else {
        if (!FloorTitle) {
          FloorTitle = materials.find((item) => item.item === "FloorTitle");
        }
      }
      if (FloorTitle) {
        setFloorTitle(FloorTitle);
      }
    }
  }

  useEffect(() => {
    getBlueprint();
  }, [materials, sizes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSubmit = async () => {
    const data = {
      userId: currentUser._id,
      process: selectedPart,
      rawPart: currentPart?.rawPart,
      finishingPart: currentPart?.finishingPart,
      wide: wide,
      long: long,
      floor: selectedFloor,
      room: {
        bedRoom: bedRoom,
        restRoom: restRoom,
      },
      materials: {
        paintWall: { item: paintWall, quantity: (currentBlueprint) ? (currentBlueprint.materials.paintWall.quantity) : 0 },
        roof: { item: roof, quantity: (currentBlueprint) ? (currentBlueprint.materials.roof.quantity) : 0 },
        door: { item: door, quantity: (currentBlueprint) ? (currentBlueprint.materials.door.quantity) : 0 },
        window: { item: window, quantity: (currentBlueprint) ? (currentBlueprint.materials.window.quantity) : 0 },
        wallTitle: { item: wallTitle, quantity: (currentBlueprint) ? (currentBlueprint.materials.wallTitle.quantity) : 0 },
        floorTitle: { item: floorTitle, quantity: (currentBlueprint) ? (currentBlueprint.materials.floorTitle.quantity) : 0 },
      },
    };

    if (blueprintId) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/design-save/${blueprintId}`,
          data,
          {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
          });
        console.log('Design save updated successfully:', response.data);

      } catch (error) {
        if (error.response) {
          console.error('Error updating design save:', error.response.data);
        } else {
          console.error('Error:', error);
        }
      }
    } else {
      const response = await axios.post('http://localhost:3000/api/design-save', data, {
        headers: { token: `Bearer ${currentUser.accessToken}` },
      });
    }
    navigate('/blueprint');
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
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
              <div className="item">
                <TextField
                  id="outlined-basic"
                  label="Wide"
                  variant="outlined"
                  className="size"
                  value={wide}
                  onChange={(e) => {
                    let input = e.target.value;
                    // Remove leading zeros if the input starts with 0
                    if (input.length > 1 && input[0] === '0') {
                      input = input.replace(/^0+/, '');
                    }
                    // Regular expression to match only numbers
                    const regex = /^[0-9\b]+$/;
                    if (input === '' || regex.test(input)) {
                      // If input is empty or contains only numbers, update state
                      setWide(input);
                    }
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Long"
                  variant="outlined"
                  className="size"
                  value={long}
                  onChange={(e) => {
                    let input = e.target.value;
                    // Remove leading zeros if the input starts with 0
                    if (input.length > 1 && input[0] === '0') {
                      input = input.replace(/^0+/, '');
                    }
                    // Regular expression to match only numbers
                    const regex = /^[0-9\b]+$/;
                    if (input === '' || regex.test(input)) {
                      // If input is empty or contains only numbers, update state
                      setLong(input);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="item">
            <h5>Floor</h5>
            {[1, 2, 3].map(floor => (
              <div className="form-check form-check-inline radio" key={`floorRadio${floor}`}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="floorRadioOptions"
                  id={`floorRadio${floor}`}
                  onChange={(event) => {
                    setSelectedFloor(parseInt(event.target.value));
                  }}
                  value={floor}
                  checked={selectedFloor === floor}
                />
                <label className="form-check-label" htmlFor={`floorRadio${floor}`}>
                  {`${floor} Floor`}
                </label>
              </div>
            ))}
          </div>

          <div className="item">
            <h5>Part</h5>
            <FormControl sx={{ m: 1, minWidth: 140, marginRight: 12 }}>
              <InputLabel id="demo-simple-select-label">Part</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedPart}
                label="Part"
                onChange={(event) => {
                  setSelectedPart(event.target.value);
                }}
              >
                <MenuItem
                  value={1}
                  onChange={() => {
                    setSelectedPart(value);
                  }}
                >
                  Phần thô
                </MenuItem>
                <MenuItem
                  value={2}
                  onChange={() => {
                    setSelectedPart(value);
                  }}
                >
                  Phần hoàn thiện
                </MenuItem>
                <MenuItem
                  value={3}
                  onChange={() => {
                    setSelectedPart(value);
                  }}
                >
                  Phần thô và phần hoàn thiện
                </MenuItem>
              </Select>
            </FormControl>
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
          <p className="text-red-700 mt-5">{errorMsg}</p>
          <div className="btn-submit">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleOpen();
              }}
            >
              Xem chi phí
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
                        {
                          (selectedPart == 1 || selectedPart == 3) ?
                            (

                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": { border: 0 },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  Phần thô
                                </TableCell>
                                <TableCell align="center">{currentPart?.rawPart}</TableCell>
                                <TableCell align="center">
                                  {wide} x {long}
                                </TableCell>
                                <TableCell align="center">
                                  {wide *
                                    long *
                                    currentPart?.rawPart}
                                </TableCell>
                              </TableRow>
                            ) : null
                        }
                        {
                          (selectedPart == 2 || selectedPart == 3) ?
                            (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": { border: 0 },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  Phần hoàn thiện
                                </TableCell>
                                <TableCell align="center">{currentPart?.finishingPart}</TableCell>
                                <TableCell align="center">
                                  {wide} x {long}
                                </TableCell>
                                <TableCell align="center">
                                  {wide *
                                    long *
                                    currentPart?.finishingPart}
                                </TableCell>
                              </TableRow>
                            ) : null
                        }
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
                          <TableCell align="center">{(currentBlueprint?.materials?.paintWall.quantity) ? (currentBlueprint?.materials?.paintWall.quantity) : "Discuss"}</TableCell>
                          <TableCell align="center">
                            {paintWall?.price *  (currentBlueprint?.materials?.paintWall.quantity)}
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
                          <TableCell align="center">{(currentBlueprint?.materials?.roof.quantity) ? (currentBlueprint?.materials?.roof.quantity) : "Discuss"}</TableCell>
                          <TableCell align="center">
                            {roof?.price *  (currentBlueprint?.materials?.roof.quantity)}
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
                          <TableCell align="center">{(currentBlueprint?.materials?.door.quantity) ? (currentBlueprint?.materials?.door.quantity) : "Discuss"}</TableCell>
                          <TableCell align="center">
                            {door?.price *  (currentBlueprint?.materials?.door.quantity)}
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
                          <TableCell align="center">{(currentBlueprint?.materials?.window.quantity) ? (currentBlueprint?.materials?.window.quantity) : "Discuss"}</TableCell>
                          <TableCell align="center">
                            {window?.price *  (currentBlueprint?.materials?.window.quantity)}
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
                          <TableCell align="center">{(currentBlueprint?.materials?.wallTitle.quantity) ? (currentBlueprint?.materials?.wallTitle.quantity) : "Discuss"}</TableCell>
                          <TableCell align="center">
                            {wallTitle?.price *  (currentBlueprint?.materials?.wallTitle.quantity)}
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
                          <TableCell align="center">{(currentBlueprint?.materials?.floorTitle.quantity) ? (currentBlueprint?.materials?.floorTitle.quantity) : "Discuss"}</TableCell>
                          <TableCell align="center">
                            {floorTitle?.price *  (currentBlueprint?.materials?.floorTitle.quantity)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div className="submit-container">
                    <div className="total">
                      <p className="total-label">
                        Tổng chi phí xây dựng dự tính:
                      </p>
                      <p className="total-number">{calculatePrice()} VNĐ</p>
                    </div>
                    <div className="btn-customize-submit">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        {(blueprintId) ? "Cập nhật" : "Xác nhận"}
                      </Button>
                    </div>
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
