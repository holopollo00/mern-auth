import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = ["Materials", "Price", "Quantities", "Sub Total (VND)"];

export default function QuoteModal({ visible, onClose }) {
  const { currentUser } = useSelector((state) => state.user);
  const currentDesign = useSelector((state) => state.design.currentDesign);
  const selectedMaterials = useSelector((state) => state.selectedMaterials);
  const currentPart = useSelector((state) => state.part.currentPart);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  if (!visible) return null;
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  const calculatePrice = () => {
    if (!currentDesign.size || !selectedMaterials?.length) return 0;
    return (
      currentDesign.size.long *
      currentDesign.size.wide *
      (currentPart?.rawPart + currentPart?.finishingPart) +
      selectedMaterials[0]?.price * currentDesign.design?.doorQuantity +
      selectedMaterials[1]?.price * currentDesign.design?.floorTitleQuantity +
      selectedMaterials[2]?.price * currentDesign.design?.wallTitleQuantity +
      selectedMaterials[3]?.price * currentDesign.design?.paintWallQuantity +
      selectedMaterials[4]?.price * currentDesign.design?.roofQuantity +
      selectedMaterials[5]?.price * currentDesign.design?.windowQuantity
    );
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      navigate("/sign-in");
    } else {
      const data = {
        userId: currentUser._id,
        rawPart: currentPart?.rawPart,
        finishingPart: currentPart?.finishingPart,
        wide: currentDesign.size?.wide,
        long: currentDesign.size?.long,
        floor: currentDesign.design?.floor,
        room: {
          bedRoom: currentDesign.bedRoom,
          restRoom: currentDesign.restRoom,
        },
        materials: {
          paintWall: { ...selectedMaterials.filter((e) => e.item == "PaintWall")[0], quantity: currentDesign.design?.paintWallQuantity },
          roof: { ...selectedMaterials.filter((e) => e.item == "Roof")[0], quantity: currentDesign.design?.roofQuantity },
          door: { ...selectedMaterials.filter((e) => e.item == "Door")[0], quantity: currentDesign.design?.doorQuantity },
          window: { ...selectedMaterials.filter((e) => e.item == "Window")[0], quantity: currentDesign.design?.windowQuantity },
          wallTitle: { ...selectedMaterials.filter((e) => e.item == "WallTitle")[0], quantity: currentDesign.design?.wallTitleQuantity },
          floorTitle: { ...selectedMaterials.filter((e) => e.item == "FloorTitle")[0], quantity: currentDesign.design?.floorTitleQuantity },
        },
      };
      const response = await axios.post('http://localhost:3000/api/design-save', data, {
        headers: { token: `Bearer ${currentUser.accessToken}` },
      });
      if (response.status === 201) {
        setSuccessMessage('Your blueprint have been sent!');
        navigate("/blueprint");
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  }
  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center flex-col"
    >
      <Card className="h-[700px] w-[900px]">
        <div className="font-bold bg-white w-[100%] text-center h-[50px] pt-3">
          Estimate the rough and finished parts of the house -{" "}
          {currentDesign.design.name}
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 pl-10 pt-4 pb-2"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  Raw Part
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentPart?.rawPart}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long} x {currentDesign.size.wide}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long *
                    currentDesign.size.wide *
                    currentPart?.rawPart}
                </Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  Finshing Part
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentPart?.finishingPart}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long} x {currentDesign.size.wide}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long *
                    currentDesign.size.wide *
                    currentPart?.finishingPart}
                </Typography>
              </td>
            </tr>
            {
              selectedMaterials &&
              selectedMaterials?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal pl-10 pt-3"
                      >
                        {item.item} - {item.name}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal pl-10 pt-3"
                      >
                        {item.price}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray" className="font-normal pl-10 pt-3">
                        {(() => {
                          const quantity =
                            currentDesign.design?.[`${item.item.charAt(0).toLowerCase() + item.item.slice(1)}Quantity`] || 0;
                          return quantity;
                        })()}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray" className="font-normal pl-10 pt-3">
                        {(() => {
                          const quantity =
                            currentDesign.design?.[`${item.item.charAt(0).toLowerCase() + item.item.slice(1)}Quantity`] || 0;
                          return quantity * item.price;
                        })()}
                      </Typography>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        <div className="flex justify-between font-bold bg-white w-[100%] text-center h-[60px] pt-3 total-estimate">
          Total estimated construction costs:{" "}
          <span>{calculatePrice()} VND</span>
        </div>
        <Button onClick={() => { handleSubmit() }} style={{ backgroundColor: "green", marginTop: "24px", borderRadius: "0px" }}>Submit</Button>
      </Card>
    </div>
  );
}
