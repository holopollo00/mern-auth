import "./Blueprint.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBlueprint } from "../../redux/user/blueprintSlice";
import PaginationButton from "../../components/DesignPagination/PaginationButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

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

const statusList = [
  {
    id: "Processing",
    name: "Đang xử lý",
  },
  {
    id: "Approved",
    name: "Đã xác nhận",
  },
];

const AdminBlueprint = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState();
  const [loading, setLoading] = useState(true);
  const [bluePrint, setBluePrint] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [paintWall, setPaintWall] = useState(0);
  const [door, setDoor] = useState(0);
  const [roof, setRoof] = useState(0);
  const [window, setWindow] = useState(0);
  const [wallTitle, setWallTitle] = useState(0);
  const [floorTitle, setFloorTitle] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(statusList[0]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemsPerPage = 6;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  async function fetchUser(userId) {
    try {
      const res = await axios.get(`http://localhost:3000/api/user/${userId}`, {
        headers: { token: `Bearer ${currentUser?.accessToken}` },
      });

      if (res.status !== 200) {
        throw new Error("Network response was not Ok!");
      }

      return res.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`http://localhost:3000/api/design-save`, {
          headers: { token: `Bearer ${currentUser?.accessToken}` },
        });
        if (!res.status == 200) {
          throw new Error("Network response was not Ok!");
        }
        const data = await res.data.filter(
          (e) => e.status.id == selectedStatus.id
        );

        // Fetch user data for each design save
        const userDataPromises = data.map((designSave) =>
          fetchUser(designSave.userId)
        );
        const userData = await Promise.all(userDataPromises);

        // Combine design save data with user data
        const combinedData = data.map((designSave, index) => ({
          ...designSave,
          user: userData[index],
        }));

        setCurrentPageData(combinedData.slice(startIndex, endIndex));
        if (combinedData.length <= 0) {
          dispatch(setCurrentBlueprint(null));
        } else {
          dispatch(setCurrentBlueprint(combinedData));
        }
        setData(combinedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedStatus]);

  const handleSubmit = async () => {
    const data = { ...bluePrint };
    data.materials.door.quantity = door;
    data.materials.paintWall.quantity = paintWall;
    data.materials.window.quantity = window;
    data.materials.roof.quantity = roof;
    data.materials.wallTitle.quantity = wallTitle;
    data.materials.floorTitle.quantity = floorTitle;

    data.status.id = "Approved";
    data.status.name = "Đã xác nhận";

    try {
      const response = await axios.put(
        `http://localhost:3000/api/design-save/${data._id}`,
        data,
        {
          headers: { token: `Bearer ${currentUser?.accessToken}` },
        }
      );
      console.log("Design save updated successfully:", response.data);
      handleClose();
    } catch (error) {
      if (error.response) {
        console.error("Error updating design save:", error.response.data);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const calculatePrice = () => {
    let total = 0;
    if (bluePrint) {
      total =
        bluePrint?.long *
          bluePrint?.wide *
          ((bluePrint?.process != 2 ? bluePrint?.rawPart : 0) +
            (bluePrint?.process != 1 ? bluePrint?.finishingPart : 0)) +
        (bluePrint
          ? bluePrint?.materials.door.item?.price * door +
            bluePrint?.materials.floorTitle.item?.price * floorTitle +
            bluePrint?.materials.wallTitle.item?.price * wallTitle +
            bluePrint?.materials.paintWall.item?.price * paintWall +
            bluePrint?.materials.roof.item?.price * roof +
            bluePrint?.materials.window.item?.price * window
          : 0);
    } else {
      total =
        bluePrint?.long *
        bluePrint?.wide *
        (bluePrint?.rawPart + bluePrint?.finishingPart);
    }
    if (bluePrint?.floor != 1) {
      total = total * ((bluePrint?.floor - 1) * 0.7 + 1);
    }
    return total;
  };

  const showBlueprint = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/design-save/view/${id}`,
        {
          headers: { token: `Bearer ${currentUser?.accessToken}` },
        }
      );
      setBluePrint(response.data);
      setFloorTitle(response.data.materials.floorTitle.quantity);
      setWindow(response.data.materials.window.quantity);
      setRoof(response.data.materials.roof.quantity);
      setPaintWall(response.data.materials.paintWall.quantity);
      setDoor(response.data.materials.door.quantity);
      setWallTitle(response.data.materials.wallTitle.quantity);
      handleOpen();
    } catch (error) {
      if (error.response) {
        console.error("Error updating design save:", error.response.data);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div id="Blueprint">
      <h1>Blueprint</h1>
      <div className="container">
        <div className="filter">
          <Box sx={{ width: "fit-content" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedStatus}
                label="Age"
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                }}
              >
                {statusList.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="">
          {loading ? (
            <div className="text-center text-3xl">Loading ...</div>
          ) : (
            <>
              <div className="card-container flex flex-wrap gap-10 justify-center">
                {currentPageData?.map((item) => {
                  dispatch(setCurrentBlueprint(item));
                  const timeString = item?.createdAt;
                  const dateTime = new Date(timeString);

                  const hours = dateTime.getHours().toString().padStart(2, "0");
                  const minutes = dateTime
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");
                  const day = dateTime.getDate().toString().padStart(2, "0");
                  const month = (dateTime.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = dateTime.getFullYear();

                  const formattedTime = `${hours}:${minutes} ${day}/${month}/${year}`;
                  return (
                    <div
                      className="card w-96 shadow-xl rounded-3xl"
                      key={item._id}
                    >
                      <div className="text-2xl font-semibold ml-5 mt-5">
                        <div className={`status ${item.status.id}`}>
                          <p>{item.status.name}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-semibold ml-5 mt-5">
                        <div>
                          <p>User: {item.user?.username}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-semibold ml-5 mt-5">
                        <div>
                          <p>Created date: {formattedTime}</p>
                        </div>
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
                      .
                      <div className="flex justify-around pb-5">
                        <button
                          onClick={() => showBlueprint(item._id)}
                          className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500"
                        >
                          See Details
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
                  {bluePrint?.process == 1 || bluePrint?.process == 3 ? (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Phần thô
                      </TableCell>
                      <TableCell align="center">{bluePrint?.rawPart}</TableCell>
                      <TableCell align="center">
                        {bluePrint?.wide} x {bluePrint?.long}
                      </TableCell>
                      <TableCell align="center">
                        {bluePrint?.wide * bluePrint?.long * bluePrint?.rawPart}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  {bluePrint?.process == 2 || bluePrint?.process == 3 ? (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        Phần hoàn thiện
                      </TableCell>
                      <TableCell align="center">
                        {bluePrint?.finishingPart}
                      </TableCell>
                      <TableCell align="center">
                        {bluePrint?.wide} x {bluePrint?.long}
                      </TableCell>
                      <TableCell align="center">
                        {bluePrint?.wide *
                          bluePrint?.long *
                          bluePrint?.finishingPart}
                      </TableCell>
                    </TableRow>
                  ) : null}
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      Sơn hoàn thiện {bluePrint?.materials?.paintWall?.name}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials?.paintWall.item?.price}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.status.id != "Approved" ? (
                        <TextField
                          style={{ maxWidth: "50px" }}
                          id="outlined-basic"
                          variant="outlined"
                          className="size"
                          value={paintWall}
                          onChange={(e) => {
                            let input = e.target.value;
                            // Regular expression to match only numbers
                            const regex = /^[0-9\b]+$/;
                            if (input === "" || regex.test(input)) {
                              // If input is empty or contains only numbers, update state
                              setPaintWall(input);
                            }
                          }}
                        />
                      ) : (
                        paintWall
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.paintWall.item?.price * paintWall}
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
                    <TableCell align="center">
                      {bluePrint?.materials?.roof.item?.price}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.status.id != "Approved" ? (
                        <TextField
                          style={{ maxWidth: "50px" }}
                          id="outlined-basic"
                          variant="outlined"
                          className="size"
                          value={roof}
                          onChange={(e) => {
                            let input = e.target.value;
                            // Regular expression to match only numbers
                            const regex = /^[0-9\b]+$/;
                            if (input === "" || regex.test(input)) {
                              // If input is empty or contains only numbers, update state
                              setRoof(input);
                            }
                          }}
                        />
                      ) : (
                        roof
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.roof.item?.price * roof}
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
                    <TableCell align="center">
                      {bluePrint?.materials?.door.item?.price}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.status.id != "Approved" ? (
                        <TextField
                          style={{ maxWidth: "50px" }}
                          id="outlined-basic"
                          variant="outlined"
                          className="size"
                          value={door}
                          onChange={(e) => {
                            let input = e.target.value;
                            // Regular expression to match only numbers
                            const regex = /^[0-9\b]+$/;
                            if (input === "" || regex.test(input)) {
                              // If input is empty or contains only numbers, update state
                              setDoor(input);
                            }
                          }}
                        />
                      ) : (
                        door
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.door.item?.price * door}
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
                    <TableCell align="center">
                      {bluePrint?.materials?.window.item?.price}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.status.id != "Approved" ? (
                        <TextField
                          style={{ maxWidth: "50px" }}
                          id="outlined-basic"
                          variant="outlined"
                          className="size"
                          value={window}
                          onChange={(e) => {
                            let input = e.target.value;
                            // Regular expression to match only numbers
                            const regex = /^[0-9\b]+$/;
                            if (input === "" || regex.test(input)) {
                              // If input is empty or contains only numbers, update state
                              setWindow(input);
                            }
                          }}
                        />
                      ) : (
                        window
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.window.item?.price * window}
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
                      {bluePrint?.materials?.wallTitle.item?.price}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.status.id != "Approved" ? (
                        <TextField
                          style={{ maxWidth: "50px" }}
                          id="outlined-basic"
                          variant="outlined"
                          className="size"
                          value={wallTitle}
                          onChange={(e) => {
                            let input = e.target.value;
                            // Regular expression to match only numbers
                            const regex = /^[0-9\b]+$/;
                            if (input === "" || regex.test(input)) {
                              // If input is empty or contains only numbers, update state
                              setWallTitle(input);
                            }
                          }}
                        />
                      ) : (
                        wallTitle
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.wallTitle.item?.price * wallTitle}
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
                      {bluePrint?.materials?.floorTitle.item?.price}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.status.id != "Approved" ? (
                        <TextField
                          style={{ maxWidth: "50px" }}
                          id="outlined-basic"
                          variant="outlined"
                          className="size"
                          value={floorTitle}
                          onChange={(e) => {
                            let input = e.target.value;
                            // Regular expression to match only numbers
                            const regex = /^[0-9\b]+$/;
                            if (input === "" || regex.test(input)) {
                              // If input is empty or contains only numbers, update state
                              setFloorTitle(input);
                            }
                          }}
                        />
                      ) : (
                        floorTitle
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.floorTitle.item?.price * floorTitle}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="submit-container">
              <div className="total">
                <p className="total-label">Tổng chi phí xây dựng dự tính:</p>
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
                  Xác nhận
                </Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminBlueprint;
