import React from "react";

export default function YardBricks() {
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="shadow-lg rounded-md w-[280px] h-[250px] flex flex-col items-center">
          <img
            src="https://www.vn.weber/files/vn/styles/1920x1080_resize/public/pictures/2022-01/gach-lat-san-01.jpeg.webp?itok=czNbE5PI"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Minimalist</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] flex flex-col items-center">
          <img
            src="https://hoabinhminhgach.com/wp-content/uploads/2023/03/MTV52009-PC.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Classic</p>
          </div>
        </div>
        <div className="shadow-lg rounded-md w-[290px] h-[250px] flex flex-col items-center">
          <img
            src="https://khatra.com.vn/wp-content/uploads/2020/03/phoi-canh-gach-hithick-lat-san.jpg"
            alt=""
            className="w-[265px] h-[200px]"
          />
          <div className="w-full">
            <p className="ml-4">Modern</p>
          </div>
        </div>
      </div>
    </div>
  );
}
