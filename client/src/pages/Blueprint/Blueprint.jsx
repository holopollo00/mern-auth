import "./Blueprint.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHouse, faMaximize } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBlueprint } from "../../redux/user/blueprintSlice";
import PaginationButton from "../../components/DesignPagination/PaginationButton";
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

const Blueprint = () => {
  const [data, setData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState();
  const [loading, setLoading] = useState(true);
  const [bluePrint, setBluePrint] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `/api/design-save/user/${currentUser?._id}`,
          {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
          }
        );
        if (!res.status == 200) {
          throw new Error("Network response was not Ok!");
        }
        const data = await res.data;
        setCurrentPageData(data.slice(startIndex, endIndex));
        if (data.length <= 0) {
          dispatch(setCurrentBlueprint(null));
        } else {
          dispatch(setCurrentBlueprint(data));
        }
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

  const calculatePrice = () => {
    let total = 0;
    if (bluePrint) {
      total =
        bluePrint?.long *
          bluePrint?.wide *
          ((bluePrint?.process != 2 ? bluePrint?.rawPart : 0) +
            (bluePrint?.process != 1 ? bluePrint?.finishingPart : 0)) +
        (bluePrint
          ? bluePrint?.materials.door.item?.price *
              bluePrint?.materials.door.quantity +
            bluePrint?.materials.floorTitle.item?.price *
              bluePrint?.materials.floorTitle.quantity +
            bluePrint?.materials.wallTitle.item?.price *
              bluePrint?.materials.wallTitle.quantity +
            bluePrint?.materials.paintWall.item?.price *
              bluePrint?.materials.paintWall.quantity +
            bluePrint?.materials.roof.item?.price *
              bluePrint?.materials.roof.quantity +
            bluePrint?.materials.window.item?.price *
              bluePrint?.materials.window.quantity
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

      handleOpen();
    } catch (error) {
      if (error.response) {
        console.error("Error updating design save:", error.response.data);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleSend = async (item) => {
    try {
      const updateData = { ...item };
      updateData.status = { id: "Processing", name: "Đang xử lý" };
      dispatch(setCurrentBlueprint(updateData));
      setData((prevData) =>
        prevData.map((i) => (i._id === updateData._id ? updateData : i))
      );
      const response = await axios.put(
        `http://localhost:3000/api/design-save/${item._id}`,
        updateData,
        {
          headers: { token: `Bearer ${currentUser?.accessToken}` },
        }
      );
      console.log("Design save updated successfully:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error updating design save:", error.response.data);
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleCustom = async (id) => {
    try {
      const res = await axios.get(`/api/design-save/${id}`, {
        headers: { token: `Bearer ${currentUser?.accessToken}` },
      });
      console.log(res);
      if (!res.status == 200) {
        throw new Error("Network response was not ok");
      }
      const data = await res.data;
      console.log(data);
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
                      {item.status.id != "Approved" ? (
                        <div className="flex justify-around pb-5">
                          <button
                            onClick={() => handleCustom(item._id)}
                            className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500"
                          >
                            See Details
                          </button>
                          <button
                            className="bg-blue-400 w-32 h-12 rounded-xl text-white btn-send"
                            style={{ backgroundColor: "green" }}
                            onClick={() => {
                              handleSend(item);
                            }}
                          >
                            Send Blueprint
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-around pb-5">
                          <button
                            onClick={() => showBlueprint(item._id)}
                            className="bg-blue-400 w-32 h-12 rounded-xl text-white hover:bg-yellow-500"
                          >
                            See Details
                          </button>
                        </div>
                      )}
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
                  {bluePrint?.processing == 1 || bluePrint?.processing == 3 ? (
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
                      {bluePrint?.materials?.paintWall.quantity
                        ? bluePrint?.materials?.paintWall.quantity
                        : "Discuss"}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.paintWall.item?.price *
                        bluePrint?.materials?.paintWall.quantity}
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
                      {bluePrint?.materials?.roof.quantity
                        ? bluePrint?.materials?.roof.quantity
                        : "Discuss"}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.roof.item?.price *
                        bluePrint?.materials?.roof.quantity}
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
                      {bluePrint?.materials?.door.quantity
                        ? bluePrint?.materials?.door.quantity
                        : "Discuss"}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.door.item?.price *
                        bluePrint?.materials?.door.quantity}
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
                      {bluePrint?.materials?.window.quantity
                        ? bluePrint?.materials?.window.quantity
                        : "Discuss"}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.window.item?.price *
                        bluePrint?.materials?.window.quantity}
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
                      {bluePrint?.materials?.wallTitle.quantity
                        ? bluePrint?.materials?.wallTitle.quantity
                        : "Discuss"}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.wallTitle.item?.price *
                        bluePrint?.materials?.wallTitle.quantity}
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
                      {bluePrint?.materials?.floorTitle.quantity
                        ? bluePrint?.materials?.floorTitle.quantity
                        : "Discuss"}
                    </TableCell>
                    <TableCell align="center">
                      {bluePrint?.materials.floorTitle.item?.price *
                        bluePrint?.materials?.floorTitle.quantity}
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
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Blueprint;
