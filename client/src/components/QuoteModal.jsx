import React from "react";
import { useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Materials", "Price", "Quantities", "Sub Total (VND)"];

export default function QuoteModal({ visible, onClose }) {
  const currentDesign = useSelector((state) => state.design.currentDesign);
  const selectedMaterials = useSelector((state) => state.selectedMaterials);
  if (!visible) return null;
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  const calculatePrice = () => {
    if (!currentDesign.size || !selectedMaterials?.length) return 0;
    return (
      currentDesign.size.long *
        currentDesign.size.wide *
        (currentDesign.size.rawPart + currentDesign.size.finishingPart) +
      selectedMaterials[0].price * 20 +
      selectedMaterials[1].price * 30 +
      selectedMaterials[2].price * 20 +
      selectedMaterials[3].price * 20
      // selectedMaterials[4].price * 10 +
      // selectedMaterials[5].price * 10
    );
  };
  return (
    <div
      id="container"
      onClick={handleClose}
      className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center flex-col"
    >
      <div className="font-bold bg-white w-[600px] text-center h-[50px] pt-3">
        Estimate the rough and finished parts of the house -{" "}
        {currentDesign.design.name}
      </div>
      <Card className="h-[500px] w-[600px]">
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
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  Raw Part
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.rawPart}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long} x {currentDesign.size.wide}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long *
                    currentDesign.size.wide *
                    currentDesign.size.rawPart}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  Finshing Part
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.finishingPart}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long} x {currentDesign.size.wide}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {currentDesign.size.long *
                    currentDesign.size.wide *
                    currentDesign.size.finishingPart}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[0].item} - {selectedMaterials[0].name}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[0].price}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  20
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[0].price * 20}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[1].item} - {selectedMaterials[1].name}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[1].price}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  30
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[1].price * 30}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[2].item} - {selectedMaterials[2].name}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[2].price}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  20
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[2].price * 20}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[3].item} - {selectedMaterials[3].name}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[3].price}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  20
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {selectedMaterials[3].price * 20}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* {selectedMaterials[4].item} - {selectedMaterials[4].name} */}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* {selectedMaterials[4].price} */}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* 20 */}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* {selectedMaterials[4].price * 20} */}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* {selectedMaterials[5].item} - {selectedMaterials[5].name} */}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* {selectedMaterials[5].price} */}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* 20 */}
                </Typography>
              </td>
              <td className>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal pl-10 pt-3"
                >
                  {/* {selectedMaterials[5].price * 20} */}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between font-bold bg-white w-[600px] text-center h-[50px] pt-3">
          Total estimated construction costs:{" "}
          <span>{calculatePrice()} VND</span>
        </div>
      </Card>
    </div>
  );
}
